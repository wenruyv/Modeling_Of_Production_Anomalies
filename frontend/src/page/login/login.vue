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
                <div class="reg-view" @click="regi = regi=='登录'?'注册':'登录'">
                    <p>{{regi}}</p>
                </div>
                <!-- 登录和注册按钮提交 -->
                <el-button v-if="regi=='注册'" type="primary" class="log-btn" @click="login" :loading="false">登录</el-button>
                <el-button v-else type="primary" class="log-btn"  @click="register" :loading="false">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs,getCurrentInstance } from 'vue'
import {ElMessage}  from 'element-plus'
import {orgRouter} from 'vue-router'
export default {
    setup(){
        const {proxy} = getCurrentInstance()
        const router = orgRouter()
        const user = reactive({
            account:'',
            password:'',
            regi:'注册',
            load:false
        })
        async function login(){
            user.load = true
            //window.location.href = '/'
            const obj = {account:user.account,password:user.password}
            try {
                const res = await new proxy.$request(proxy.$urls.m().register,obj).modepost()
                console.log(res)
                if(res.status!=200){
                    new proxy.$tips(res.data.msg,'warning').message_()
                }else{
                    //跳转页面
                    router.push({name:'index'})
                    //token缓存到本地
                    localStorage.setItem('token',res.data.data.token)
                }      
                user.load = false          
            } catch (error) {
                user.load = false
                new proxy.$tips('服务器发生错误','error').message_()
            }


        }
        async function register (){//async await异步请求
            //console.log(proxy.$urls.m().register)
            const obj = {account:user.account,password:user.password}
            try {
                const res = await new proxy.$request(proxy.$urls.m().register,obj).modepost()
                console.log(res)
                
                if(res.status!=200){
                    new proxy.$tips(res.data.msg,'warning').message_()
                }else{
                    user.regi = '注册'
                }                
            } catch (error) {
                new proxy.$tips('服务器发生错误','error').message_()
            }

        }

        return {...toRefs(user),login,register}
    }
}
</script>

<style>

</style>
