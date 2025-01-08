import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {//登陆界面
        path:'/login',
        name:'login',
        component:()=>import(/*webpackChunkName:'Login'*/ '@/page/login/login.vue')
    },
    {//主界面
        path:'/',
        name:'index',
        component:()=>import(/*webpackChunkName:'Index'*/ '@/page/index/index.vue'),
        redirect:'organization',    /* 定向到第一个页面 */
        //二级界面
        children:[
            {//生产组织
                path:'/organization',
                name:'organization',
                component:()=>import(/*webpackChunkName:'Organization'*/ '@/page/organization/organization.vue')
            },
            {//生产资源
                path:'/resource',
                name:'resource',
                component:()=>import(/*webpackChunkName:'Resource'*/ '@/page/resource/resource.vue')
            },
            {//生产信息
                path:'/information',
                name:'information',
                component:()=>import(/*webpackChunkName:'Information'*/ '@/page/information/information.vue')
            },
            {//异常分类
                path:'/class',
                name:'class',
                component:()=>import(/*webpackChunkName:'Class'*/ '@/page/abnormity/class.vue')
            },
            {//异常间关系
                path:'/relation',
                name:'relation',
                component:()=>import(/*webpackChunkName:'Class'*/ '@/page/abnormity/relation.vue')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router