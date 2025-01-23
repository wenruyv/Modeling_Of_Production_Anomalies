import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/page/login/login.vue')
    },
    {
        path: '/',
        name: 'index',
        component: () => import('@/page/index/index.vue'),
        redirect: '/organization', // 修改为绝对路径
        children: [
            {
                path: '/organization', //
                name: 'organization',
                component: () => import('@/page/organization/organization.vue')
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