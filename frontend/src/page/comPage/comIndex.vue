<template>
  <div class='sidebar-top'>
    <!-- 顶部栏 -->
    <div>生产要素异常管理</div>
    <div @click="exit">退出</div>
  </div>
  <div class="sidebar-cont">
    <el-menu ><!--:default-active="ac_index" @select="select"去掉菜单激活回调-->
      <div v-for="(item,index) in menu" :key="index">
        <router-link :to="{path:item.router}">
          <el-menu-item v-if="item.Subclass.length === 0" :index="item.id">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon><!-- 展示组件 -->
              <span>{{item.title}}</span>
            </template>
          </el-menu-item>
        </router-link>

        <!-- 二级菜单 -->
        <el-sub-menu v-if="item.Subclass.length > 0" :index="item.id">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{item.title}}</span>
          </template>
          <div v-for="(two,index_two) in item.Subclass" :key="index_two">
            <RouterLink :to="{path:two.router}">
              <el-menu-item :index="two.id">{{two.title}}</el-menu-item>
            </RouterLink>

          </div>

        </el-sub-menu>
      </div>
    </el-menu>
  </div>
  <Router-view></Router-view>
</template>

<script>
import {OfficeBuilding} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue';
import { useRouter  } from 'vue-router'
export default {
  components:{OfficeBuilding,},

  setup(){
    const router = useRouter ()
    //遍历侧边栏
    const menu = [
      {
        id: '1',
        icon: OfficeBuilding,
        title: '企业信息',
        router: 'comInfo',
        Subclass: []//是否有二级菜单
      },
      {
        id: '2',
        icon: OfficeBuilding,
        title: '部门管理',
        router: '',
        Subclass: [
          {
            id: '2.1',
            title: '部门信息',
            router: 'organization',
          },
          {
            id: '2.2',
            title: '添加部门',
            router: 'addCompany',
          }
        ]//是否有二级菜单
      }
    ]
    function exit(){
      router.push({name:'login'});
    }
    return {menu,exit}
  }
}
</script>

<style>

</style>
