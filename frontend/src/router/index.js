import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/page/login/login.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/page/index/index.vue'),
        redirect: '/user', // 修改为绝对路径
        children: [
            {
                path: '/user', //
                name: 'user',
                component: () => import('@/page/user/user.vue')
            },
            {
                path: '/companyList', //
                name: 'companyList',
                component: () => import('@/page/organization/companyList.vue')
            },
            {
                path: '/org', //树状图？？？
                name: 'org',
                component: () => import('@/page/organization/org.vue')
            },
            {
                path: '/addCompany', //
                name: 'addCompany',
                component: () => import('@/page/organization/addCompany.vue')
            },
            {
                path: '/resource', //
                name: 'resource',
                component: () => import('@/page/resource/resource.vue')
            },
            {
                path: '/information', //
                name: 'information',
                component: () => import('@/page/information/information.vue')
            },
            {
                path: '/class', //
                name: 'class',
                component: () => import('@/page/abnormity/class.vue')
            },
            {
                path: '/bpmn-viewer', //
                name: 'bpmn-viewer',
                component: () => import('@/page/abnormity/bpmn-viewer')
            },
            {
                path: '/bpmn-modeler', //
                name: 'bpmn-modeler',
                component: () => import('@/page/abnormity/bpmn-modeler')
            }
        ]
    },
    {   //企业index
        path: '/comIndex',
        name: 'comIndex',
        component: () => import('@/page/comPage/comIndex.vue'),
        redirect: '/companyIndex', // 修改为绝对路径
        children: [
            {
                path: '/companyIndex', //首页
                name: 'companyIndex',
                component: () => import('@/page/comPage/index1.vue')
            },
            {
                path: '/comInfo', //企业信息
                name: 'comInfo',
                component: () => import('@/page/comPage/comInfo.vue')
            },
            {
                path: '/comOrg', //企业组织结构图
                name: 'comOrg',
                component: () => import('@/page/comPage/comOrganization.vue')
            },
            {
                path: '/departmentList', //部门列表
                name: 'departmentList',
                component: () => import('@/page/comPage/departmentInfo.vue')
            },
            {
                path: '/peopleList', //员工列表
                name: 'peopleList',
                component: () => import('@/page/comPage/comPeople.vue')
            },

        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;