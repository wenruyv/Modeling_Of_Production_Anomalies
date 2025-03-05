<template>
  <div>
    <!-- 顶部栏 -->

    <el-aside class = "title1">
      <el-icon><Menu /></el-icon>生产要素异常管理
    </el-aside>
    <div class="sidebar-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item
        ><a href="/">promotion management</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="exit" text style="width: 100px;float: right">退出</el-button>
    </div>

    <!-- 主体内容 -->
    <div class="main-container">

      <!-- 左侧菜单栏 -->
      <el-aside class="sidebar" >
        <el-menu
            active-text-color="#409EFF"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            position="fixed"
        >
          <div v-for="(item, index) in menu" :key="index">
            <router-link :to="{ path: item.router }">
              <el-menu-item v-if="item.Subclass.length === 0" :index="item.id">
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
                  <el-menu-item :index="two.id">{{ two.title }}</el-menu-item>
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
import { Box, Document, User, WarningFilled ,OfficeBuilding,Menu} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

export default {
  components: { User, Box, Document, WarningFilled ,Menu},

  setup() {
    const router = useRouter();

    // 遍历侧边栏
    const menu = [
      {
        id: '1',
        icon: User,
        title: '账户管理',
        router: 'user',
        Subclass: [], // 是否有二级菜单
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
        ], // 是否有二级菜单
      },
      {
        id: '3',
        icon: Box,
        title: '生产资源',
        router: 'resource',
        Subclass: [], // 是否有二级菜单
      },
      {
        id: '4',
        icon: Document,
        title: '生产信息',
        router: 'information',
        Subclass: [], // 是否有二级菜单
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
        ], // 是否有二级菜单
      },
    ];

    function exit() {
      router.push({ name: 'login' });
    }

    return { menu, exit };
  },
};
</script>

<style>
</style>