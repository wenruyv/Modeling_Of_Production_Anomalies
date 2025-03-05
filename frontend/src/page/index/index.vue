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
            router: 'org',
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

    // 从 localStorage 中读取面包屑
    const loadBreadcrumb = () => {
      const savedBreadcrumb = localStorage.getItem('breadcrumb');
      if (savedBreadcrumb) {
        breadcrumbItems.value = JSON.parse(savedBreadcrumb);
      } else {
        // 如果 localStorage 中没有保存的面包屑，则根据当前路由初始化面包屑
        updateBreadcrumbFromRoute();
      }
    };

    // 保存面包屑到 localStorage
    const saveBreadcrumb = () => {
      localStorage.setItem('breadcrumb', JSON.stringify(breadcrumbItems.value));
    };

    // 根据当前路由更新面包屑
    const updateBreadcrumbFromRoute = () => {
      const currentMenu = menu.find((item) => item.router === route.path);
      if (currentMenu) {
        breadcrumbItems.value = [currentMenu.title];
      } else {
        const subMenu = menu.find((item) =>
            item.Subclass.some((sub) => sub.router === route.path)
        );
        if (subMenu) {
          const subItem = subMenu.Subclass.find((sub) => sub.router === route.path);
          breadcrumbItems.value = [subMenu.title, subItem.title];
        }
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
      updateBreadcrumb(menuItem);
      // 保存面包屑
      saveBreadcrumb();
    };

    // 更新面包屑
    const updateBreadcrumb = (menuItem) => {
      const parentMenu = menu.find((item) =>
          item.Subclass.some((sub) => sub.id === menuItem.id)
      );
      if (parentMenu) {
        breadcrumbItems.value = [parentMenu.title, menuItem.title];
      } else {
        breadcrumbItems.value = [menuItem.title];
      }
    };

    // 监听路由变化
    watch(
        () => route.path,
        () => {
          updateBreadcrumbFromRoute();
        },
        { immediate: true }
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