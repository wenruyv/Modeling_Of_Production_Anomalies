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
                path: '/organization', //
                name: 'organization',
                component: () => import('@/page/organization/organization.vue')
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
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;