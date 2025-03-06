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
    // 树形结构数据
    const data = [
      {
        label: '研发公司',
        children: [
          {
            label: '项目管理部门',
            children: [{label: '项目经理',},{label: '项目助理',}, {label: '风险控制组',}]
          },
          {
            label: '市场部门',
            children: [{label: '市场分析师'}]
          },
          {
            label: '研发部门',
            children: [
              {
                label: '产品设计组',
                children: [{label: '设计工程师',}, {label: '交互设计师',}]
              },
              {
                label: '技术研发组',
                children: [{label: '软件工程师',}, {label: '硬件工程师',}, {label: '嵌入式工程师',}]
              },
              {
                label: '测试与验证组',
                children: [{label: '测试工程师',}]
              }
            ],
          }
        ],
      },
      {
        label: '生产公司',
        children: [
          {
            label: '生产部门',
            children: [
              {
                label: '生产车间',
                children: [{label: '生产线主管',}, {label: '技术员',}, {label: '操作工人',}]
              }
            ],
          },
          {
            label: '质量控制部门',
            children: [{label: '质量经理'},{label: '质检员'}]
          },
          {
            label: '设备维护部门',
            children: [{label: '设备工程师'},{label: '维修工'}]
          }
        ],
      },
      {
        label: '供应公司',
        children: [
          {
            label: '采购部门',
            children: [
              {
                label: '采购经理',children: [{label: '采购团队', children: [{label: '采购员'}]}]
              },
              {
                label: '供应商管理组',
                children: [{label: '供应商协调员'}]
              }
            ],
          },
          {
            label: '仓储和物流部门',
            children: [
              {
                label: '仓库管理组',
                children: [{label: '库存经理'},{label: '库存管理员'}]
              },
              {
                label: '物流协调组',
                children: [{label: '物流经理'},{label: '物流团队'}]
              },
            ],
          },
        ],
      },
      {
        label: '销售公司',
        children: [
          {
            label: '销售部门',
            children: [
              {
                label: '销售经理',
              },
              {
                label: '销售团队',
                children: [{label: '销售人员'}]
              }
            ],
          },
          {
            label: '市场部门',
            children: [{label: '市场经理',},{label: '市场调研团队'}],
          },
        ],
      },
      {
        label: '服务公司',
        children: [
          {
            label: '客服部门',
            children: [{label: '客服经理',},{label: '客服人员'}]
          },
          {
            label: '技术支持部门',
            children: [{label: '技术经理',},{label: '技术工程师'}]
          },
          {
            label: '售后物流部们',
            children: [{label: '物流经理',},{label: '物流协调员'}]
          },
        ],
      },
    ];

    return { menu, exit };
  },
};
</script>

<style>
</style>
