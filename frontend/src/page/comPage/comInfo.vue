<template>
  <div class="ordering">
    <div class="heading">公司信息</div>
    <div>
      <el-form :model="company" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称">
              <el-input v-model="company.name" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址">
              <el-input v-model="company.location" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司类型">
              <el-input v-model="company.type" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间">
              <el-input v-model="company.established_date" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="company.phone" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系邮箱">
              <el-input v-model="company.email" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="CEO姓名">
              <el-input v-model="company.ceo_name" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="官方网站">
              <el-input v-model="company.web" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="管理员账号">
              <el-input v-model="company.c_username" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员密码">
              <el-input v-model="company.c_password" readonly />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="公司介绍">
          <el-input v-model="company.introduction" type="textarea" readonly />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, onMounted } from 'vue';

export default {
  setup() {
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

    // 加载公司信息
    const loadCompanyInfo = async () => {
      try {
        const res = await new proxy.$request(proxy.$urls.m().get_company).modeget();
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
  },
};
</script>

<style>
/* 只读输入框样式 */
.el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #606266;
  cursor: not-allowed;
}
</style>