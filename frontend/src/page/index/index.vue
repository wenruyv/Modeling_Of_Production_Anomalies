<template>
    <div class='sidebar-top'>
        <!-- 顶部栏 -->
        <div>生产要素异常管理</div>
        <div>退出</div>
    </div>
    <div class="sidebar-cont">
        <el-menu :default-active="ac_index" @select="select">
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
import {Box, Document, User, WarningFilled} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue';

export default {
    components:{User,Box,Document,WarningFilled},

    setup(){

        //菜单激活回调
        const ac_index = ref('1')
        function select(index,path){
            console.log(index)
            localStorage.setItem('menuId',JSON.stringify(index))
        }
        onMounted(()=>{
            ac_index.value = JSON.parse(localStorage.getItem('menuId'))
        })
        //遍历侧边栏
      const menu = [
          {
            id: '1',
            icon: User,
            title: '生产组织',
            router: 'organization',
            Subclass: []//是否有二级菜单
          },
          {
            id: '2',
            icon: Box,
            title: '生产资源',
            router: 'resource',
            Subclass: []//是否有二级菜单
          },
          {
            id: '3',
            icon: Document,
            title: '生产信息',
            router: 'information',
            Subclass: []//是否有二级菜单
          },
          {
            id: '4',
            icon: WarningFilled,
            title: '异常建模',
            router: '',
            Subclass: [
              {
                id: '4.1',
                title: '异常分类',
                router: 'class',
              },
              {
                id: '4.2',
                title: '流程查看器',
                router: 'bpmn-viewer',
              },
              {
                id: '4.3',
                title: '流程建模器',
                router: 'bpmn-modeler',
              }
            ]//是否有二级菜单
          }
        ]

        return {menu,ac_index,select}
    }
}
</script>

<style>

</style>
