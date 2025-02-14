<template>
  <div class="ordering">
    <div class="heading">添加公司</div>
    <div>
      <el-form :model="company" :rules="rules" ref="companyForm" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="name">
              <el-input v-model="company.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址" prop="location">
              <el-input v-model="company.location" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司类型" prop="type">
              <el-select v-model="company.type" placeholder="请选择">
                <el-option label="研发公司" value="研发公司" />
                <el-option label="生产公司" value="生产公司" />
                <el-option label="供应公司" value="供应公司" />
                <el-option label="销售公司" value="销售公司" />
                <el-option label="服务公司" value="服务公司" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间" prop="established_date">
              <el-date-picker
                  v-model="company.established_date"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="company.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系邮箱" prop="email">
              <el-input v-model="company.email" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="CEO姓名" prop="ceo_name">
              <el-input v-model="company.ceo_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="官方网站" prop="web">
              <el-input v-model="company.web" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业管理员账号" prop="c_username">
              <el-input v-model="company.c_username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业管理员密码" prop="c_password">
              <el-input v-model="company.c_password" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="公司介绍" prop="introduction">
          <el-input v-model="company.introduction" type="textarea" />
        </el-form-item>

        <div style="text-align: center;" >
          <el-button type="primary" @click="onSubmit" style="width: 100px;">添加</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance, reactive} from 'vue'
export default{
  setup(){
    const {proxy} = getCurrentInstance()
    const company = reactive({
      name: '',
      location: '',
      type: '',
      established_date: '',
      phone:'',
      email:'',
      ceo_name:'',
      web:'',
      c_username:'',
      c_password:'',
      introduction: '',
    })
    const rules = {
      name: [{ required: true, message: '公司名称不能为空', trigger: 'blur' }],
      location: [{ required: true, message: '公司地址不能为空', trigger: 'blur' }],
      type: [{ required: true, message: '公司类型不能为空', trigger: 'change' }],
      established_date: [{ required: true, message: '成立时间不能为空', trigger: 'change' }],
      phone: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
      email: [{ required: true, message: '联系邮箱不能为空', trigger: 'blur' }],
      ceo_name: [{ required: true, message: 'CEO姓名不能为空', trigger: 'blur' }],
      web: [{ required: true, message: '官方网站不能为空', trigger: 'blur' }],
      c_username: [{ required: true, message: '企业管理员账号不能为空', trigger: 'blur' }],
      c_password: [{ required: true, message: '企业管理员密码不能为空', trigger: 'blur' }],
      introduction: [{ required: true, message: '公司介绍不能为空', trigger: 'blur' }],
    }
    const onSubmit = async () => {
      try {
        const valid = await proxy.$refs.companyForm.validate();
        console.log(valid);
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }
        const res = await new proxy.$request(proxy.$urls.m().add_company, company).modepost();
        console.log(res);
        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
        } else {
          new proxy.$tips('添加失败', 'error').message_();
        }
      } catch (e) {
        console.error(e);
      }
    }
    return {onSubmit,company,rules}
  }

}
</script>

<style>
</style>