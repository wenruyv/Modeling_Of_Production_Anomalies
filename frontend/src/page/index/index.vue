<template>
  <div>
    <!-- 顶部栏 -->
    <div class="sidebar-top">
      <el-aside class="title1">
        <el-icon><Menu /></el-icon>生产要素异常管理
      </el-aside>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="exit" text>退出</el-button>
    </div>

    <!-- 主体内容 -->
    <div class="main-container">
      <!-- 左侧菜单栏 -->
      <el-aside class="sidebar">
        <el-menu
            active-text-color="#409EFF"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="activeMenu"
            text-color="#fff"
            position="fixed"
        >
          <div v-for="(item, index) in menu" :key="index">
            <router-link :to="{ path: item.router }">
              <el-menu-item
                  v-if="item.Subclass.length === 0"
                  :index="item.id"
                  @click="handleMenuClick(item)"
              >
                <template #title>
                  <el-icon>
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span>{{ item.title }}</span>
                </template>
              </el-menu-item>
            </router-link>

            <!-- 二级菜单 -->
            <el-sub-menu v-if="item.Subclass.length > 0" :index="item.id">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <div v-for="(two, index_two) in item.Subclass" :key="index_two">
                <router-link :to="{ path: two.router }">
                  <el-menu-item :index="two.id" @click="handleMenuClick(two)">{{ two.title }}</el-menu-item>
                </router-link>
              </div>
            </el-sub-menu>
          </div>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main class="content">
        <router-view></router-view>
      </el-main>
    </div>
  </div>
</template>

<script>
import { Box, Document, User, WarningFilled, OfficeBuilding, Menu } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch, onMounted,reactive } from 'vue';

export default {
  components: { User, Box, Document, WarningFilled, Menu },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const menu = [
      {
        id: '1',
        icon: User,
        title: '账户管理',
        router: 'user',
        Subclass: [],
      },
      {
        id: '2',
        icon: OfficeBuilding,
        title: '生产组织',
        router: '',
        Subclass: [
          {
            id: '2.1',
            title: '生产组织',
            router: 'orgAll',
          },
          {
            id: '2.2',
            title: '公司信息',
            router: 'companyList',
          },
        ],
      },
      {
        id: '3',
        icon: Box,
        title: '生产资源',
        router: 'resource',
        Subclass: [],
      },
      {
        id: '4',
        icon: Document,
        title: '生产信息',
        router: 'information',
        Subclass: [],
      },
      {
        id: '5',
        icon: WarningFilled,
        title: '异常建模',
        router: '',
        Subclass: [
          {
            id: '5.1',
            title: '异常分类',
            router: 'class',
          },
          {
            id: '5.2',
            title: '流程查看器',
            router: 'bpmn-viewer',
          },
          {
            id: '5.3',
            title: '流程建模器',
            router: 'bpmn-modeler',
          },
        ],
      },
    ];

    // 初始化面包屑
    const breadcrumbItems = ref(['账户管理']);

    // 根据路由路径获取对应的菜单项
    const getMenuItemByPath = (path) => {
      // 先检查一级菜单
      const mainMenuItem = menu.find(item => item.router === path.slice(1));
      if (mainMenuItem) {
        return {
          item: mainMenuItem,
          parent: null
        };
      }

      // 检查二级菜单
      for (const parentItem of menu) {
        if (parentItem.Subclass && parentItem.Subclass.length > 0) {
          const subItem = parentItem.Subclass.find(sub => sub.router === path.slice(1));
          if (subItem) {
            return {
              item: subItem,
              parent: parentItem
            };
          }
        }
      }

      // 如果没有找到匹配项，返回默认菜单
      return {
        item: menu[0],
        parent: null
      };
    };

    // 保存面包屑到 localStorage
    const saveBreadcrumb = () => {
      localStorage.setItem('breadcrumb', JSON.stringify(breadcrumbItems.value));
      // 同时保存当前路径，用于刷新页面时恢复
      localStorage.setItem('currentPath', route.path);
    };

    // 根据当前路由更新面包屑
    const updateBreadcrumbFromRoute = () => {
      const { item, parent } = getMenuItemByPath(route.path);

      if (parent) {
        // 如果是二级菜单
        breadcrumbItems.value = [parent.title, item.title];
      } else {
        // 如果是一级菜单
        breadcrumbItems.value = [item.title];
      }

      // 保存面包屑
      saveBreadcrumb();
    };

    // 处理菜单点击事件
    const handleMenuClick = (menuItem) => {
      if (menuItem.Subclass && menuItem.Subclass.length > 0) {
        // 如果是父菜单，不更新面包屑
        return;
      }

      // 更新面包屑
      const parentMenu = menu.find(item =>
        item.Subclass && item.Subclass.some(sub => sub.id === menuItem.id)
      );

      if (parentMenu) {
        breadcrumbItems.value = [parentMenu.title, menuItem.title];
      } else {
        breadcrumbItems.value = [menuItem.title];
      }

      // 保存面包屑
      saveBreadcrumb();
    };

    // 从 localStorage 中读取面包屑
    const loadBreadcrumb = () => {
      const savedBreadcrumb = localStorage.getItem('breadcrumb');
      const savedPath = localStorage.getItem('currentPath');

      if (savedBreadcrumb && savedPath) {
        // 如果有保存的面包屑和路径
        breadcrumbItems.value = JSON.parse(savedBreadcrumb);

        // 如果当前路径与保存的路径不同，需要更新面包屑
        if (route.path !== savedPath) {
          updateBreadcrumbFromRoute();
        }
      } else {
        // 如果没有保存的面包屑，则根据当前路由初始化面包屑
        updateBreadcrumbFromRoute();
      }
    };

    // 监听路由变化
    watch(
      () => route.path,
      (newPath) => {
        // 只有当路由真正变化时才更新面包屑
        const currentPath = localStorage.getItem('currentPath');
        if (newPath !== currentPath) {
          updateBreadcrumbFromRoute();
        }
      }
    );

    // 页面加载时从 localStorage 中读取面包屑
    onMounted(() => {
      loadBreadcrumb();
    });

    const exit = () => {
      router.push({ name: 'login' });
    };

    return { menu, exit, breadcrumbItems, activeMenu: route.path, handleMenuClick };
  },
};
</script>

<style>
</style>