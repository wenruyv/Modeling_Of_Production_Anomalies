<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><Document /></el-icon>
      <span>公司信息</span>
    </div>
  </div>
    <div>
      <el-card class="box-card" style="width: 100%;" :body-style="{ padding: '20px' }">
      <el-form :model="company" label-width="120px" style="padding-right: 10px">
        <el-row style="padding-top: 10px">
          <el-col :span="12">
            <el-form-item label="公司名称">
              <el-input v-model="company.name" readonly size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址">
              <el-input v-model="company.location" readonly size="large"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司类型">
              <el-input v-model="company.type" readonly size="large"/>
            </el-form-item>
            <el-form-item label="公司规模">
              <el-input v-model="company.size" readonly size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间">
              <el-input v-model="company.established_date" readonly size="large"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="company.phone" readonly size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系邮箱">
              <el-input v-model="company.email" readonly size="large"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="CEO姓名">
              <el-input v-model="company.ceo_name" readonly size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="官方网站">
              <el-input v-model="company.web" readonly size="large"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="管理员账号">
              <el-input v-model="company.c_username" readonly size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员密码">
              <el-input v-model="company.c_password" readonly size="large"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="公司介绍">
          <el-input v-model="company.introduction" type="textarea" readonly size="large"/>
        </el-form-item>
        <div style="text-align: center;" >
<!--          type="info"-->
          <el-button
                     type="primary"
                     @click="openDialog"
                     size="large" style="width: 150px;"
                      round>修改信息</el-button>
        </div>
      </el-form>
      <!-- 弹窗修改信息 -->
      <el-dialog v-model="dialogFormVisible" title="修改公司信息" @close="resetForm">
        <el-form :model="tempCompany" :rules="rules" ref="companyForm" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="tempCompany.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司地址" prop="location">
                <el-input v-model="tempCompany.location" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司类型" prop="type">
                <el-select v-model="tempCompany.type" placeholder="请选择公司类型" style="width: 100%">
                  <el-option
                      v-for="type in companyTypes"
                      :key="type"
                      :label="type"
                      :value="type"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="公司规模" prop="size">
                <el-select v-model="tempCompany.size" placeholder="请选择">
                  <el-option label="小型企业" value="小型企业" />
                  <el-option label="中型企业" value="中型企业" />
                  <el-option label="大型企业" value="大型企业" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="成立时间" prop="established_date">
                <el-date-picker
                    v-model="tempCompany.established_date"
                    type="date"
                    placeholder="请选择日期"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="tempCompany.phone" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系邮箱" prop="email">
                <el-input v-model="tempCompany.email" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="CEO姓名" prop="ceo_name">
                <el-input v-model="tempCompany.ceo_name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="官方网站" prop="web">
                <el-input v-model="tempCompany.web" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="管理员账号" prop="c_username">
                <el-input v-model="tempCompany.c_username" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员密码" prop="c_password">
                <el-input v-model="tempCompany.c_password" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="公司介绍" prop="introduction">
            <el-input v-model="tempCompany.introduction" type="textarea" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false" >取消</el-button>
            <el-button type="primary" @click="updateCom" >
              修改
            </el-button>
          </span>
        </template>
      </el-dialog>
      </el-card>
    </div>

</template>

<script>
import { getCurrentInstance, reactive, ref, onMounted } from 'vue';

import { Document,Menu} from '@element-plus/icons-vue';
export default {
  components: {Document,Menu},
  setup() {
    const { proxy } = getCurrentInstance();

    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';
    const companyTypes = ref([]);
    // 公司信息（主界面数据）
    const company = reactive({
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
      introduction: '',
    });

    // 临时公司信息（弹窗数据）
    const tempCompany = ref({
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
      introduction: '',
    });
    // 添加resetForm方法
    // 添加resetForm方法 - 修改为仅重置表单验证状态
    const resetForm = () => {
      if (proxy.$refs.companyForm) {
        proxy.$refs.companyForm.resetFields();
      }
    };
    // 校验规则
    const rules = {
      name: [{ required: true, message: '公司名称不能为空', trigger: 'blur' }],
      location: [{ required: true, message: '公司地址不能为空', trigger: 'blur' }],
      type: [{ required: true, message: '公司类型不能为空', trigger: 'change' }],
      size: [{ required: true, message: '公司规模不能为空', trigger: 'change' }],
      established_date: [{ required: true, message: '成立时间不能为空', trigger: 'change' }],
      phone: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
      email: [{ required: true, message: '联系邮箱不能为空', trigger: 'blur' }],
      ceo_name: [{ required: true, message: 'CEO姓名不能为空', trigger: 'blur' }],
      web: [{ required: true, message: '官方网站不能为空', trigger: 'blur' }],
      c_username: [{ required: true, message: '企业管理员账号不能为空', trigger: 'blur' }],
      c_password: [{ required: true, message: '企业管理员密码不能为空', trigger: 'blur' }],
      introduction: [{ required: true, message: '公司介绍不能为空', trigger: 'blur' }],
    };

    const openDialog = () => {
      // 使用JSON深拷贝避免引用问题
      tempCompany.value = JSON.parse(JSON.stringify(company));
      dialogFormVisible.value = true;
    };

    const updateCom = async () => {
      try {
        const valid = await proxy.$refs.companyForm.validate();
        console.log("表单验证结果" + valid);
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }
        // 发送修改请求
        const res = await new proxy.$request(proxy.$urls.m().updateCompany, tempCompany.value).modepost();
        console.log(res);
        if (res.data == 1) {
          new proxy.$tips('修改成功', 'success').message_();
          dialogFormVisible.value = false; // 关闭弹窗
          // 将临时变量的值赋给主界面数据
          Object.assign(company, tempCompany.value);
          await loadCompanyInfo();
        } else {
          new proxy.$tips('修改失败', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误 或 表单验证不通过', 'error').message_();
      }
    };

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
    // 加载公司信息
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
      loadCompanyTypes();
    });

    return {
      company,
      tempCompany,resetForm,
      dialogFormVisible,
      formLabelWidth,
      rules,
      openDialog,
      updateCom,
      companyTypes
    };
  },
};
</script>

<style>
</style>