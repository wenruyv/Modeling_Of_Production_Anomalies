<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><Menu /></el-icon>
      <span>首页</span>
    </div>
  </div>
    <div >欢迎访问 {{ company.name }} 首页。</div>
  <div class="tips">
    <div >公司简介：{{company.introduction}}</div>
    <div>联系电话：{{company.phone}}</div>
    <div>联系邮箱：{{company.email}}</div>
  </div>

</template>

<script>

import {getCurrentInstance, onMounted, reactive} from "vue";
import {Menu} from '@element-plus/icons-vue';
export default{
  components:{Menu},
  setup(){
    const { proxy } = getCurrentInstance();
    // 公司信息
    const company = reactive({
      name: '',
      location: '',
      type: '',
      established_date: '',
      phone: '',
      email: '',
      ceo_name: '',
      web: '',
      c_username: '',
      c_password: '',
      introduction: '',
    });
    // 加载公司名称
    const loadCompanyInfo = async () => {
      try {
        const c_username = localStorage.getItem('c_username');
        if (!c_username) {
          new proxy.$tips('未找到账户信息', 'error').message_();
          return;
        }
        const res = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        console.log(res);
        if (res && res.data) {
          Object.assign(company, res.data); // 将后端数据赋值给 company
        } else {
          new proxy.$tips('获取公司信息失败', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    };

    // 页面加载时获取公司信息
    onMounted(() => {
      loadCompanyInfo();
    });
    return {
      company,
    };
  }

}
</script>

<style>
.tips{
  margin-left: 20px;
  margin-top: 400px;
}
</style>