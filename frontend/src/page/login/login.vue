<template>
  <div id="backcont">
    <div class="denglukuang-content">
      <div class="login-cont">
        <div class="shengchan-title">生产要素异常管理</div>

        <!-- 使用 form 标签包裹账号和密码输入框 -->
        <form @submit.prevent="login">
          <div class="meituan-user">
            <el-input class="inputflex" v-model="account" placeholder="请输入账号" size="large"> </el-input>
          </div>
          <div class="meituan-user">
            <el-input class="inputflex" v-model="password" placeholder="请输入密码" show-password size="large"></el-input>
          </div>

          <!-- 登录提交按钮 -->
          <el-button color="#27425e" class="log-btn" native-type="submit" size="large">登录</el-button>
        </form>

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

          if(res.data.user_type == 1){
            localStorage.setItem('s_username', res.data.username);
            await router.push({name:'index'})
          }else if(res.data.user_type == 2){
            // 保存账户信息到 localStorage
            localStorage.setItem('c_username', res.data.username);
            await router.push({name:'comIndex'})
          }else if(res.data.user_type == 3){
            // 保存账户信息到 localStorage
            localStorage.setItem('d_username', res.data.username);
            await router.push({name:'depIndex'})
          }
          new proxy.$tips('登陆成功', 'success').message_();
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
/* 页面背景 */
#backcont {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 背景颜色与背景图片叠加 */

  background:
      linear-gradient(rgba(39, 66, 94, 0.7), rgba(50, 50, 50, 0.5)),
      url(~@/static/主楼.png);

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 登录框容器 */
.denglukuang-content {
  width: 100%;
  max-width: 400px;
}


.login-cont {
  background-color: rgba(255, 255, 255, 0.6); /* 白色背景，透明度为 80% */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 标题样式 */
.shengchan-title {
  color: rgba(39, 66, 94);
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

/* 输入框样式 */
.inputflex {
  width: 100%;
  padding-top: 40px;

}

/* 登录按钮样式 */
.log-btn {
  width: 100%;
  margin-top: 40px;
  margin-bottom: 20px;


}
</style>