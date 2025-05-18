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

import { useRouter, useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { OfficeBuilding, Menu,User,Document,Box } from '@element-plus/icons-vue';
export default {
components:{OfficeBuilding, Menu,User,Document},
  setup() {
    const router = useRouter();
    const route = useRoute();

    // 遍历侧边栏
    const menu = [
      {
        id: '1',
        icon: Menu,
        title: '首页',
        router: 'companyIndex',
        Subclass: [], // 是否有二级菜单
      },
      {
        id: '2',
        icon: OfficeBuilding,
        title: '企业信息',
        router: 'comInfo',
        Subclass: [], // 是否有二级菜单
      },
      {
        id: '3',
        icon: OfficeBuilding,
        title: '组织结构',
        router: 'comOrg',
        Subclass: [], // 是否有二级菜单
      },
      {
        id: '4',
        icon: Document,
        title: '生产信息',
        router: 'comInformation',
        Subclass: [], // 是否有二级菜单
      },
      {
        id: '5',
        icon: Box,
        title: '生产资源',
        router: '',
        Subclass: [
            {
              id: '5.1',
              title: '原材料',
              router: 'comMaterial',
            },
            {
              id: '5.2',
              title: '生产设备',
              router: 'comEquipment',
            },
        ], // 是否有二级菜单
      },
      {
        id: '6',
        icon: OfficeBuilding,
        title: '部门管理',
        router: 'departmentList',
        Subclass: [], // 是否有二级菜单
      },
      {
        id: '7',
        icon: User,
        title: '人员管理',
        router: 'peopleList',
        Subclass: [], // 是否有二级菜单
      },
      {
        id: '8',
        icon: WarningFilled,
        title: '异常建模',
        router: '',
        Subclass: [
          {
            id: '8.1',
            title: '流程查看器',
            router: 'companyBpmn-viewer',
          },
          {
            id: '8.2',
            title: '流程建模器',
            router: 'companyBpmn-modeler',
          },
        ],
      },

    ];

    // 初始化面包屑
    const breadcrumbItems = ref(['首页']);

    // 根据路由路径获取对应的菜单项
    const getMenuItemByPath = (path) => {
      // 处理路径，去掉前导斜杠
      const normalizedPath = path.startsWith('/') ? path.substring(1) : path;

      // 先检查一级菜单
      const mainMenuItem = menu.find(item => item.router === normalizedPath);
      if (mainMenuItem) {
        return {
          item: mainMenuItem,
          parent: null
        };
      }

      // 检查二级菜单
      for (const parentItem of menu) {
        if (parentItem.Subclass && parentItem.Subclass.length > 0) {
          const subItem = parentItem.Subclass.find(sub => sub.router === normalizedPath);
          if (subItem) {
            return {
              item: subItem,
              parent: parentItem
            };
          }
        }
      }

      // 如果没有找到匹配项，不返回默认菜单，而是保持当前面包屑
      return null;
    };

    // 保存面包屑到 localStorage
    const saveBreadcrumb = () => {
      localStorage.setItem('com_breadcrumb', JSON.stringify(breadcrumbItems.value));
      // 同时保存当前路径，用于刷新页面时恢复
      localStorage.setItem('com_currentPath', route.path);
    };

    // 根据当前路由更新面包屑
    const updateBreadcrumbFromRoute = () => {
      const result = getMenuItemByPath(route.path);

      // 如果找不到匹配项，保持当前面包屑不变
      if (!result) {
        // 检查是否有保存的面包屑
        const savedBreadcrumb = localStorage.getItem('com_breadcrumb');
        if (savedBreadcrumb) {
          breadcrumbItems.value = JSON.parse(savedBreadcrumb);
          return; // 保持当前面包屑，不进行更新
        }
        // 如果没有保存的面包屑，使用默认值
        return;
      }

      const { item, parent } = result;

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
      const parentMenu = menu.find((item) =>
          item.Subclass && item.Subclass.some((sub) => sub.id === menuItem.id)
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
      const savedBreadcrumb = localStorage.getItem('com_breadcrumb');
      const savedPath = localStorage.getItem('com_currentPath');

      // 设置一个标志，表示是否已经从本地存储加载了面包屑
      let breadcrumbLoaded = false;

      if (savedBreadcrumb && savedPath) {
        // 如果有保存的面包屑和路径
        try {
          const parsedBreadcrumb = JSON.parse(savedBreadcrumb);
          if (Array.isArray(parsedBreadcrumb) && parsedBreadcrumb.length > 0) {
            breadcrumbItems.value = parsedBreadcrumb;
            breadcrumbLoaded = true;

            // 如果当前路径与保存的路径不同，需要更新面包屑
            // 但不要强制更新，而是保持当前面包屑
            if (route.path !== savedPath) {
              // 将当前路径保存，但不更新面包屑
              localStorage.setItem('com_currentPath', route.path);
            }
          }
        } catch (e) {
          console.error('Failed to parse breadcrumb:', e);
        }
      }

      // 只有在没有成功加载面包屑的情况下，才根据路由初始化
      if (!breadcrumbLoaded) {
        // 尝试根据当前路由更新面包屑，但不要强制更新
        const result = getMenuItemByPath(route.path);
        if (result) {
          const { item, parent } = result;
          if (parent) {
            breadcrumbItems.value = [parent.title, item.title];
          } else {
            breadcrumbItems.value = [item.title];
          }
          saveBreadcrumb();
        }
      }
    };

    // 监听路由变化
    watch(
      () => route.path,
      (newPath) => {
        // 只有当路由真正变化时才更新面包屑
        const currentPath = localStorage.getItem('com_currentPath');

        // 如果路径变化了，先保存当前路径
        if (newPath !== currentPath) {
          localStorage.setItem('com_currentPath', newPath);

          // 检查是否是通过菜单点击导致的路由变化
          // 如果是菜单点击，面包屑已经在handleMenuClick中更新
          // 如果不是，才需要根据路由更新面包屑
          const result = getMenuItemByPath(newPath);
          if (result) {
            const { item, parent } = result;
            if (parent) {
              breadcrumbItems.value = [parent.title, item.title];
            } else {
              breadcrumbItems.value = [item.title];
            }
            saveBreadcrumb();
          }
          // 如果没有找到匹配项，保持当前面包屑不变
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