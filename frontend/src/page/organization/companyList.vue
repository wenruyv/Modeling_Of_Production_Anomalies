<template>
  <div class="container">
    <!-- 页面标题和操作区 -->
    <div class="page-header">
      <div class="heading">
        <el-icon><OfficeBuilding /></el-icon>
        <span>公司信息管理</span>
      </div>
      <div class="operation-area">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索公司名称"
          clearable
          class="search-input"
          @clear="handleSearchClear"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="dialogFormVisible = true">
          <el-icon><Plus /></el-icon>添加公司
        </el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="main-content">
      <el-card class="table-container" shadow="hover">
        <el-table
          :data="filteredData"
          stripe
          style="width: 100%"
          v-loading="tableLoading"
          row-key="id"
          :header-cell-style="{backgroundColor: '#f5f7fa'}"
          @row-click="handleRowClick"
          highlight-current-row
        >
          <el-table-column prop="name" label="公司名称" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="company-name-cell">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="location" label="地址" min-width="120" show-overflow-tooltip/>
          <el-table-column prop="established_date" label="成立时间" min-width="100" show-overflow-tooltip/>
          <el-table-column prop="type" label="类型" min-width="100" show-overflow-tooltip>
            <template #default="scope">
              <el-tag :type="getTypeTagType(scope.row.type)">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="ceo_name" label="CEO姓名" min-width="100" show-overflow-tooltip/>
          <el-table-column prop="c_username" label="管理员账号" min-width="120" show-overflow-tooltip/>
          <el-table-column label="管理员密码" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <el-tag type="info">******</el-tag>
              <el-button link type="primary" size="small" @click.stop="showPassword(scope.row)">
                <el-icon><View /></el-icon>
              </el-button>
            </template>
          </el-table-column>

          <!-- 操作列 -->
          <el-table-column label="操作" fixed="right" width="180">
            <template #default="scope">
              <el-button size="small" type="primary" @click.stop="openDetailDialog(scope.row)">
                <el-icon><InfoFilled /></el-icon>详情
              </el-button>
              <el-button size="small" type="danger" @click.stop="confirmDelete(scope.row)">
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="total"
            :current-page="page"
            :page-size="pageSize"
            @current-change="currentChange"
            :hide-on-single-page="false"
          />
        </div>
      </el-card>
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
            添加
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 公司详情弹窗 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="公司详情"
      width="70%"
      destroy-on-close
    >
      <el-descriptions :column="2" border direction="vertical" class="company-details">
        <el-descriptions-item label="公司名称">
          <el-tag size="large">{{ currentCompany.name }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="公司地址">{{ currentCompany.location }}</el-descriptions-item>
        <el-descriptions-item label="公司类型">
          <el-tag :type="getTypeTagType(currentCompany.type)">{{ currentCompany.type }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="成立时间">{{ currentCompany.established_date }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ currentCompany.phone }}</el-descriptions-item>
        <el-descriptions-item label="联系邮箱">{{ currentCompany.email }}</el-descriptions-item>
        <el-descriptions-item label="CEO姓名">{{ currentCompany.ceo_name }}</el-descriptions-item>
        <el-descriptions-item label="官方网站">
          <a :href="formatWebUrl(currentCompany.web)" target="_blank" class="web-link">
            <el-icon><Link /></el-icon> {{ currentCompany.web }}
          </a>
        </el-descriptions-item>
        <el-descriptions-item label="管理员账号">{{ currentCompany.c_username }}</el-descriptions-item>
        <el-descriptions-item label="管理员密码">
          <span v-if="showDetailPassword">{{ currentCompany.c_password }}</span>
          <span v-else>******</span>
          <el-button link type="primary" size="small" @click="toggleDetailPassword">
            <el-icon v-if="showDetailPassword"><Hide /></el-icon>
            <el-icon v-else><View /></el-icon>
          </el-button>
        </el-descriptions-item>
        <el-descriptions-item label="公司介绍" :span="2">
          <div class="company-intro">{{ currentCompany.introduction }}</div>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 密码查看弹窗 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="管理员密码"
      width="30%"
      destroy-on-close
    >
      <div class="password-display">
        <p>{{ selectedCompany.c_password }}</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {reactive, onMounted, getCurrentInstance, toRefs, computed, ref} from 'vue';
import {
  OfficeBuilding, Search, Plus, View, Hide, Delete, InfoFilled, Link
} from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import axios from 'axios';

export default{
  components: {
    OfficeBuilding, Search, Plus, View, Hide, Delete, InfoFilled, Link
  },
  setup(){
    const {proxy} = getCurrentInstance()

    // 响应式状态
    const tableLoading = ref(false);
    const submitLoading = ref(false);
    const dialogFormVisible = ref(false);
    const detailDialogVisible = ref(false);
    const passwordDialogVisible = ref(false);
    const passwordVisible = ref(false);
    const showDetailPassword = ref(false);
    const searchKeyword = ref('');
    const currentCompany = ref({});
    const selectedCompany = ref({});
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

    // 公司列表数据
    const company_data = reactive({
      company_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })

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

    // 初始化数据
    onMounted(()=>{
      loadCompanyList()
      loadCompanyTypes();
    })
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

    const getTypeTagType = (type) => {
      // 动态生成标签类型，确保所有从后端返回的类型都有对应的样式
      const typeColors = ['primary', 'success', 'warning', 'danger', 'info'];
      const hash = Array.from(type).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return typeColors[hash % typeColors.length];
    }

    // 格式化网站URL
    const formatWebUrl = (url) => {
      if (!url) return '#';
      return url.startsWith('http') ? url : `http://${url}`;
    }

    // 搜索过滤后的数据
    const filteredData = computed(() => {
      if (!searchKeyword.value) {
        return paginatedData.value;
      }
      return paginatedData.value.filter(item =>
        item.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
      );
    });

    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (company_data.page - 1) * company_data.pageSize;
      const end = start + company_data.pageSize;
      return company_data.company_array.slice(start, end);
    });

    // 清除搜索
    const handleSearchClear = () => {
      searchKeyword.value = '';
    }

    // 行点击事件
    const handleRowClick = (row) => {
      openDetailDialog(row);
    }

    // 显示密码
    const showPassword = (row) => {
      selectedCompany.value = row;
      passwordDialogVisible.value = true;
    }

    // 切换详情页密码显示
    const toggleDetailPassword = () => {
      showDetailPassword.value = !showDetailPassword.value;
    }

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

    // 打开详情对话框
    const openDetailDialog = (row) => {
      currentCompany.value = { ...row };
      showDetailPassword.value = false; // 重置密码显示状态
      detailDialogVisible.value = true;
    };

    // 加载公司列表
    async function loadCompanyList(){
      tableLoading.value = true;
      try {
        const res = await new proxy.$request(proxy.$urls.m().company_list).modeget()
        // 假设返回的res包含数据对象data和总条数total
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          company_data.company_array = res.data;
          company_data.total = res.data.length || 0; // 更新总条数
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.error(error)
        new proxy.$tips('服务器发生错误','error').message_()
      } finally {
        tableLoading.value = false;
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

          new proxy.$tips('添加成功', 'success').message_();
          dialogFormVisible.value = false; // 关闭弹窗
          await loadCompanyList(); // 刷新页面内容
        } else if(res.data == 2){
          new proxy.$tips('添加失败,用户名重复', 'error').message_();
        } else {
          new proxy.$tips('添加失败', 'error').message_();
        }
      } catch (e) {
        console.error(e);
        new proxy.$tips('提交过程中发生错误', 'error').message_();
      } finally {
        submitLoading.value = false;
      }
    }

    // 确认删除
    const confirmDelete = (row) => {
      ElMessageBox.confirm(
        '确定要删除这条记录吗？此操作不可恢复',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        deleteRow(row.id);
      })
      .catch(() => {
        // 用户取消删除
      });
    };

    // 删除记录
    const deleteRow = async (id) => {
      try {

        tableLoading.value = true;
        await axios.delete(`api/organization/delete/${id}`);
        await loadCompanyList(); // 修复：调用正确的刷新函数
        new proxy.$tips('删除记录成功', 'success').message_();
      } catch (error) {
        console.error('删除记录失败', error);
        new proxy.$tips('删除记录失败', 'error').message_();
      } finally {
        tableLoading.value = false;
      }
    };

    // 分页触发事件
    function currentChange(e) {
      company_data.page = e; // 更新页码
    }

    return {
      ...toRefs(company_data),
      paginatedData,
      filteredData,
      currentChange,
      dialogFormVisible,
      resetForm,
      company,
      rules,
      insertCom,
      deleteRow,
      confirmDelete,
      detailDialogVisible,
      currentCompany,
      openDetailDialog,
      tableLoading,
      submitLoading,
      searchKeyword,
      handleSearchClear,
      handleRowClick,
      getTypeTagType,
      formatWebUrl,
      passwordDialogVisible,
      passwordVisible,
      showDetailPassword,
      toggleDetailPassword,
      showPassword,
      selectedCompany,
      companyTypes
    }
  }
}
</script>

<style scoped>
/* 页面布局 */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.heading {
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #303133;
}

.heading .el-icon {
  margin-right: 8px;
  font-size: 24px;
  color: #409EFF;
}

.operation-area {
  display: flex;
  gap: 15px;
}

.search-input {
  width: 250px;
}

.main-content {
  margin-bottom: 20px;
}

/* 表格样式 */
.table-container {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.company-name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.company-name-cell .el-icon {
  color: #409EFF;
}

.pagination-container {
  padding: 15px 0;
  display: flex;
  justify-content: flex-end;
}

/* 表单样式 */
.company-form {
  margin-top: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
}

/* 详情页样式 */
.company-details {
  margin-top: 10px;
}

.company-intro {
  line-height: 1.6;
  white-space: pre-line;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.web-link {
  color: #409EFF;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
}

.web-link:hover {
  text-decoration: underline;
}

/* 密码显示弹窗 */
.password-display {
  padding: 20px;
  text-align: center;
  font-size: 18px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: 10px 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .operation-area {
    width: 100%;
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }
}
</style>