<template>
  <div id="backcont">
    <div class="denglukuang-content">
      <div class="login-cont">
        <div class="shengchan-title">生产要素异常管理</div>
        <div class="meituan-user">
          <p>账号</p>
          <el-input class="inputflex" v-model="account" placeholder="请输入账号"></el-input>
        </div>
        <div class="meituan-user">
          <p>密码</p>
          <el-input  class="inputflex" v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>
        <!-- 登录和注册的切换 -->

        <!-- 登录和注册按钮提交 -->
        <el-button  type="primary" class="log-btn" @click="login">登录</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs,getCurrentInstance } from 'vue'
import {ElMessage}  from 'element-plus'
import { useRouter  } from 'vue-router'
export default {
  setup(){
    const {proxy} = getCurrentInstance()
    const router = useRouter ()
    const user = reactive({
      account:'',
      password:'',

    })
    async function login(){

      //window.location.href = '/'
      const obj = {username:user.account,password:user.password}
      try {
        const res = await new proxy.$request(proxy.$urls.m().login,obj).modepost()
        console.log(res);
        if (res.data) {
          new proxy.$tips('登陆成功', 'success').message_();
          if(res.data.user_type == 1){
            await router.push({name:'index'})
          }else if(res.data.user_type == 2){
            await router.push({name:'comIndex'})
          }
         }else{
             new proxy.$tips('用户名或密码错误', 'error').message_();
        }
      } catch (error) {
        new proxy.$tips('服务器发生错误','error').message_()
      }
    }

    return {...toRefs(user),login}
  }
}
</script>

<style>

</style>
