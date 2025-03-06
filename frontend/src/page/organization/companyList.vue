<template>
  <div class="heading">公司信息
    <el-button type="primary"
               @click="dialogFormVisible = true"
               size="large"
               style="width: 100px;float: right;" >添加公司</el-button>
  </div>
    <div>
      <div>

      </div>
      <el-card class="box-card" style="width: 100%">
        <el-table :data="paginatedData" stripe style="width: 100%">
  <!--        <el-table-column prop="id" label="id" min-width="100" />-->
          <el-table-column prop="name" label="公司名称" min-width="100" />
          <el-table-column prop="location" label="地址" min-width="100"/>
          <el-table-column prop="established_date" label="成立时间" min-width="100"/>
          <el-table-column prop="type" label="类型" min-width="100" />
          <el-table-column prop="phone" label="联系电话" min-width="100" />
          <el-table-column prop="email" label="邮箱" min-width="100"/>
          <el-table-column prop="ceo_name" label="CEO姓名" min-width="100"/>
          <el-table-column prop="web" label="网址" min-width="100" />
          <el-table-column prop="introduction" label="简介" min-width="100" />
          <el-table-column prop="c_username" label="管理员账号" min-width="100"/>
          <el-table-column prop="c_password" label="管理员密码" min-width="100"/>
        </el-table>
      </el-card>
      <!-- 弹窗添加公司-->
      <el-dialog v-model="dialogFormVisible" title="添加公司信息">
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
                  <el-option label="研发相关" value="研发相关" />
                  <el-option label="生产相关" value="生产相关" />
                  <el-option label="供应相关" value="供应相关" />
                  <el-option label="销售相关" value="销售相关" />
                  <el-option label="服务相关" value="服务相关" />
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
              <el-form-item label="管理员账号" prop="c_username">
                <el-input v-model="company.c_username" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员密码" prop="c_password">
                <el-input v-model="company.c_password" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="公司介绍" prop="introduction">
            <el-input v-model="company.introduction" type="textarea" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="insertCom" >
              添加
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="pageSize"
          @current-change="currentchange"
          :hide-on-single-page="true"
      />
    </div>
</template>

<script>
import {reactive, onMounted, getCurrentInstance, toRefs, computed, ref} from 'vue';
export default{
  setup(){
    const {proxy} = getCurrentInstance()
    //请求数据
    onMounted(()=>{
      companyList()
    })
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
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
    const company_data = reactive({
      company_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })
    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (company_data.page - 1) * company_data.pageSize;
      const end = start + company_data.pageSize;
      return company_data.company_array.slice(start, end);
    });
    //加载公司列表
    async function companyList(){
      try {
        const res = await new proxy.$request(proxy.$urls.m().company_list).modeget()
        console.log(res)
        // 假设返回的res包含数据对象data和总条数total
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          company_data.company_array = res.data;
          company_data.total = res.data.length || 0; // 更新总条数
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.log(error)
        new proxy.$tips('服务器发生错误','error').message_()
      }
    }
    const insertCom = async () => {
      try {
        const valid = await proxy.$refs.companyForm.validate();
        console.log("表单验证结果" + valid);
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }
        const res = await new proxy.$request(proxy.$urls.m().add_company, company).modepost();
        console.log(res);
        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
          dialogFormVisible.value = false; // 关闭弹窗
          await companyList(); // 刷新页面内容
        } else {
          new proxy.$tips('添加失败', 'error').message_();
        }
      } catch (e) {
        console.error(e);
      }
    }

    // 分页触发事件
    function currentchange(e) {
      company_data.page = e; // 更新页码
    }
    return {...toRefs(company_data),paginatedData,currentchange,dialogFormVisible,formLabelWidth,company,rules,insertCom}
  }

}
</script>

<style>
</style>