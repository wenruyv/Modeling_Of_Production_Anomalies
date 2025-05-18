<template>
  <div id="backcont">
    <div class="denglukuang-content">
      <div class="login-cont">
        <div class="shengchan-title">生产要素异常管理</div>

        <!-- 使用 form 标签包裹账号和密码输入框 -->
        <form @submit.prevent="login">
          <div class="meituan-user">
            <el-input class="inputflex" v-model="account" placeholder="请输入账号" size="large"></el-input>
          </div>
          <div class="meituan-user">
            <el-input class="inputflex" v-model="password" placeholder="请输入密码" show-password size="large"></el-input>
          </div>

          <!-- 登录和注册按钮容器 -->
          <div class="auth-buttons">
            <el-button color="#27425e" class="log-btn" native-type="submit" size="large">登录</el-button>
            <el-button class="reg-btn" size="large" @click="dialogFormVisible = true">注册</el-button>
          </div>
        </form>

      </div>
    </div>
  </div>
  <!-- 添加公司弹窗 -->
  <el-dialog
      v-model="dialogFormVisible"
      title="添加公司信息"
      @close="resetForm"
      width="60%"
      destroy-on-close
  >
    <el-form
        :model="company"
        :rules="rules"
        ref="companyForm"
        label-width="120px"
        class="company-form"
        status-icon
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="company.name" placeholder="请输入公司名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司地址" prop="location">
            <el-input v-model="company.location" placeholder="请输入公司地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="公司类型" prop="type">
            <el-select v-model="company.type" placeholder="请选择公司类型" style="width: 100%">
              <el-option
                  v-for="type in companyTypes"
                  :key="type"
                  :label="type"
                  :value="type"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司类型" prop="size">
            <el-select v-model="company.size" placeholder="请选择公司规模" style="width: 100%">
              <el-option label="小型企业" value="小型企业" />
              <el-option label="中型企业" value="中型企业" />
              <el-option label="大型企业" value="大型企业" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="成立时间" prop="established_date">
            <el-date-picker
                v-model="company.established_date"
                type="date"
                placeholder="请选择日期"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="company.phone" placeholder="请输入联系电话" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系邮箱" prop="email">
            <el-input v-model="company.email" placeholder="请输入联系邮箱" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="CEO姓名" prop="ceo_name">
            <el-input v-model="company.ceo_name" placeholder="请输入CEO姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="官方网站" prop="web">
            <el-input v-model="company.web" placeholder="请输入官方网站地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="管理员账号" prop="c_username">
            <el-input v-model="company.c_username" placeholder="请输入管理员账号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管理员密码" prop="c_password">
            <el-input
                v-model="company.c_password"
                placeholder="请输入管理员密码"
                :type="passwordVisible ? 'text' : 'password'"
                show-password
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="公司介绍" prop="introduction">
        <el-input
            v-model="company.introduction"
            type="textarea"
            :rows="4"
            placeholder="请输入公司介绍"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="insertCom" :loading="submitLoading">
          注册
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>


<script>
import {reactive, toRefs, getCurrentInstance, ref, onMounted} from 'vue'
import {ElMessage}  from 'element-plus'
import { useRouter  } from 'vue-router'
export default {
  setup(){
    const {proxy} = getCurrentInstance()
    // 初始化数据
    onMounted(()=>{
      loadCompanyTypes();
    })
    const router = useRouter ()
    const user = reactive({
      account:'',
      password:'',

    })

    const dialogFormVisible = ref(false);
    const submitLoading = ref(false);
    const passwordVisible = ref(false);
    const companyTypes = ref([]);
    // 公司表单数据
    const company = reactive({
      name: '',
      location: '',
      type: '',
      size: '',
      established_date: '',
      phone:'',
      email:'',
      ceo_name:'',
      web:'',
      c_username:'',
      c_password:'',
      introduction: '',
    })
    // 重置表单
    const resetForm = () => {
      if (proxy.$refs.companyForm) {
        proxy.$refs.companyForm.resetFields(); // 重置表单验证和字段
        // 手动重置company对象
        Object.assign(company, {
          name: '',
          location: '',
          type: '',
          size: '',
          established_date: '',
          phone: '',
          email: '',
          ceo_name: '',
          web: '',
          c_username: '',
          c_password: '',
          introduction: ''
        });
      }
    };
    // 表单验证规则
    const rules = {
      name: [{ required: true, message: '公司名称不能为空', trigger: 'blur' }],
      location: [{ required: true, message: '公司地址不能为空', trigger: 'blur' }],
      type: [{ required: true, message: '公司类型不能为空', trigger: 'change' }],
      size: [{ required: true, message: '公司规模不能为空', trigger: 'change' }],
      established_date: [{ required: true, message: '成立时间不能为空', trigger: 'change' }],
      phone: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
      email: [{ required: true, message: '联系邮箱不能为空', trigger: 'blur' }],
      ceo_name: [{ required: true, message: 'CEO姓名不能为空', trigger: 'blur' }],
      c_username: [{ required: true, message: '企业管理员账号不能为空', trigger: 'blur' }],
      c_password: [{ required: true, message: '企业管理员密码不能为空', trigger: 'blur' }],
      introduction: [{ required: true, message: '公司介绍不能为空', trigger: 'blur' }],
    }
    // 新增：从后端加载公司类型
    const loadCompanyTypes = async () => {
      try {
        const res = await new proxy.$request(proxy.$urls.m().company_types).modeget();
        if (res && res.data && Array.isArray(res.data)) {
          companyTypes.value = res.data;
        } else {
          new proxy.$tips('获取公司类型失败', 'error').message_();
        }
      } catch (error) {
        console.error('获取公司类型失败:', error);
        new proxy.$tips('获取公司类型失败', 'error').message_();
      }
    }
    // 添加公司
    const insertCom = async () => {
      try {
        const valid = await proxy.$refs.companyForm.validate();
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }

        submitLoading.value = true;
        const res = await new proxy.$request(proxy.$urls.m().add_company, company).modepost();

        if (res.data == 1) {
          // 获取默认XML模板
          const getUrl = `api/bpmn-xml/findByNameAndUserName/main/123`; // 假设123是默认用户
          const getResponse = await axios.get(getUrl);
          const xmlStr = getResponse.data.data;

          // 提交新流程
          const postUrl = `api/bpmn-xml/insertByNameAndUserName`;
          const postResponse = await axios.post(postUrl, {
            name: "main",
            data: xmlStr,
            userName: company.c_username // 假设company是表单数据对象
          });

          new proxy.$tips('注册成功', 'success').message_();
          dialogFormVisible.value = false; // 关闭弹窗
        } else if(res.data == 2){
          new proxy.$tips('注册失败,用户名重复', 'error').message_();
        } else {
          new proxy.$tips('注册失败', 'error').message_();
        }
      } catch (e) {
        console.error(e);
        new proxy.$tips('提交过程中发生错误', 'error').message_();
      } finally {
        submitLoading.value = false;
      }
    }

    async function login(){

      //window.location.href = '/'
      const obj = {username:user.account,password:user.password}
      try {
        const res = await new proxy.$request(proxy.$urls.m().login,obj).modepost()
        console.log(res);
        if (res.data) {
          sessionStorage.setItem("username", res.data.username);

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

    return {...toRefs(user),login,
      dialogFormVisible,resetForm,company,rules,insertCom,companyTypes,
      submitLoading,passwordVisible
    }
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

.auth-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  .log-btn {
    flex: 1;
    margin-right: 10px;
  }

  .reg-btn {
    flex: 1;
    margin-left: 10px;

    background-color: white;

    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>