<template>

  <div class="heading">首页</div>
  <div >欢迎访问 {{ dep.department }} 首页。</div>
  <div class="tips">
    <div >部门简介：{{dep.introduction}}</div>

  </div>

</template>

<script>

import {getCurrentInstance, onMounted, reactive} from "vue";

export default{
  setup(){
    const { proxy } = getCurrentInstance();
    // 公司信息
    const dep = reactive({
      department: '',
      d_username: '',
      d_password: '',
      location: '',
      introduction: '',
    });
    // 加载部门名称
    const loadDepInfo = async () => {
      try {
        const d_username = localStorage.getItem('d_username');
        if (!d_username) {
          new proxy.$tips('未找到账户信息', 'error').message_();
          return;
        }
        const res = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        console.log(res);
        if (res && res.data) {
          Object.assign(dep, res.data); // 将后端数据赋值给 company
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
      loadDepInfo();
    });
    return {
      dep,
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