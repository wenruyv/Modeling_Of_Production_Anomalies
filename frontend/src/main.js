import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { zhCn } from 'element-plus/es/locale/lang/zh-cn'

import vue3TreeOrg from 'vue3-tree-org';
import "vue3-tree-org/lib/vue3-tree-org.css";
//全局引入css
import '../style/headtap.css'
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

const app = createApp(App)
app.use(ElementPlus,{locale: zhCn})
app.use(router)
app.use(vue3TreeOrg)

//请求地址
import urls from '../api/api.js'
app.config.globalProperties.$urls = urls
//请求方法
import request from '../api/request'
app.config.globalProperties.$request = request
// 弹窗提示
import tips from '../config/tips.js'
app.config.globalProperties.$tips = tips

app.mount('#app')
