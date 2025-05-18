<template>
  <div class="container">
    <!-- 页面标题和操作区 -->
    <div class="page-header">
      <div class="heading">
        <el-icon><User /></el-icon>
        <span>账户管理</span>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="main-content">
      <el-card class="table-container" shadow="hover">
        <!-- 表格组件 -->
        <el-table
          :data="paginatedData"
          stripe
          style="width: 100%"
          @sort-change="handleSortChange"
          v-loading="tableLoading"
          row-key="user_id"
          :header-cell-style="{backgroundColor: '#f5f7fa'}"
          highlight-current-row
        >
          <el-table-column prop="username" label="用户名" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="username-cell">
                <el-icon><Avatar /></el-icon>
                <span>{{ scope.row.username }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="密码" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="password-cell">
                <el-tag type="info">******</el-tag>
                <el-button link type="primary" size="small" @click.stop="showPassword(scope.row)">
                  <el-icon><View /></el-icon>
                </el-button>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="user_type"
            label="用户类型"
            min-width="120"
            sortable
            :sort-orders="['ascending', 'descending']"
          >
            <template #default="scope">
              <el-tag :type="getUserTypeTagType(scope.row.user_type)">
                {{ formatUserType(scope.row.user_type) }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- 操作列 -->
          <el-table-column v-if="false" label="操作" fixed="right" width="150">
            <template #default="scope">
              <el-button size="small" type="primary" @click.stop="openEditDialog(scope.row)">
                <el-icon><Edit /></el-icon>修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <div class="pagination-container">
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="user_data.total"
            :current-page="user_data.page"
            :page-size="user_data.pageSize"
            @current-change="currentChange"
            :hide-on-single-page="false"
          />
        </div>
      </el-card>
    </div>



    <!-- 修改对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="修改用户信息"
      width="50%"
      destroy-on-close
    >
      <el-form
        :model="editRecord"
        :rules="formRules"
        ref="editFormRef"
        label-width="120px"
        class="user-form"
        status-icon
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户ID">
              <el-input v-model="editRecord.user_id" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型">
              <el-tag :type="getUserTypeTagType(editRecord.user_type)" size="large">
                {{ formatUserType(editRecord.user_type) }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="editRecord.username" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="editRecord.password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateRow" :loading="submitLoading">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 密码查看弹窗 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="用户密码"
      width="30%"
      destroy-on-close
    >
      <div class="password-display">
        <p>{{ selectedUser.password }}</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {reactive, onMounted, computed, ref, getCurrentInstance} from 'vue';
import {
  User, View, Edit, Avatar, Hide
} from '@element-plus/icons-vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElMessageBox } from 'element-plus'
import axios from 'axios';

const {proxy} = getCurrentInstance()

// 响应式状态
const tableLoading = ref(false);
const submitLoading = ref(false);
const passwordDialogVisible = ref(false);
const selectedUser = ref({});
const editFormRef = ref(null);

// 定义响应式数据
const user_data = reactive({
  user_array: [],//数据
  total: 0, // 总条数
  page: 1, // 当前页码
  pageSize: 10, // 每页条数
})

// 表单验证规则
const formRules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
};



// 修改对话框相关
const editDialogVisible = ref(false);
const editRecord = reactive({
  user_id: '',
  username: '',
  password: '',
  user_type: '',
});

function formatUserType(value) {
  switch (value) {
    case 1: return "系统管理员";
    case 2: return "企业管理员";
    case 3: return "部门管理员";
    default: return "未知";
  }
}

// 获取用户类型标签类型
function getUserTypeTagType(type) {
  const typeMap = {
    1: 'danger',   // 系统管理员
    2: 'primary',  // 企业管理员
    3: 'success',  // 部门管理员
  };
  return typeMap[type] || 'info';
}
// 表格专用的wrapper函数
function tableUserTypeFormatter(row, column, cellValue, index) {
  return formatUserType(cellValue);
}
// 添加排序状态
const sortOptions = reactive({
  prop: 'user_type',
  order: 'ascending'
});

// 处理排序变化
const handleSortChange = ({ prop, order }) => {
  sortOptions.prop = prop;
  sortOptions.order = order;
};

// 显示密码
const showPassword = (row) => {
  selectedUser.value = row;
  passwordDialogVisible.value = true;
}

// 排序后的数据
const sortedData = computed(() => {
  // 复制数组避免修改原数据
  let sortedArray = [...user_data.user_array];

  // 排序逻辑
  if (sortOptions.prop) {
    sortedArray.sort((a, b) => {
      const aValue = a[sortOptions.prop];
      const bValue = b[sortOptions.prop];

      if (sortOptions.order === 'ascending') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }
  return sortedArray;
});

// 分页后的数据
const paginatedData = computed(() => {
  const start = (user_data.page - 1) * user_data.pageSize;
  const end = start + user_data.pageSize;
  return sortedData.value.slice(start, end);
});



// 请求数据
const userList = async () => {
  tableLoading.value = true;
  try {
    const res = await axios.get('api/user/list');
    // 假设返回的res包含数据对象data和总条数total
    if (res && res.data && Array.isArray(res.data)) {
      // 更新组织数据
      user_data.user_array = res.data;
      user_data.total = res.data.length || 0; // 更新总条数
    } else {
      new proxy.$tips('数据格式不正确', 'error').message_();
    }
  } catch (error) {
    console.error(error)
    new proxy.$tips('服务器发生错误，无法获取用户数据','error').message_()
  } finally {
    tableLoading.value = false;
  }
};

// 分页触发事件
const currentChange = (e) => {
  user_data.page = e; // 更新页码
};



// 打开修改对话框
const openEditDialog = (row) => {
  editDialogVisible.value = true;
  Object.assign(editRecord, row);
};

// 修改记录
const updateRow = async () => {
  if (!editFormRef.value) return;

  try {
    const valid = await editFormRef.value.validate();
    if (!valid) return;

    submitLoading.value = true;
    await axios.put('api/user/update', editRecord);
    new proxy.$tips('更新用户成功', 'success').message_();
    editDialogVisible.value = false;
    await userList(); // 刷新数据
  } catch (error) {
    console.error('修改记录失败', error);
    new proxy.$tips('更新用户失败', 'error').message_();
  } finally {
    submitLoading.value = false;
  }
};

// 组件挂载时请求数据
onMounted(() => {
  userList();
});
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

.main-content {
  margin-bottom: 20px;
}

/* 表格样式 */
.table-container {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.id-cell {
  font-family: monospace;
  color: #606266;
  font-weight: 500;
}

.username-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username-cell .el-icon {
  color: #409EFF;
}

.password-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-container {
  padding: 15px 0;
  display: flex;
  justify-content: flex-end;
}

/* 表单样式 */
.user-form {
  margin-top: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
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


</style>
