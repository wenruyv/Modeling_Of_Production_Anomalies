<template>
  <div class="container">
    <!-- 操作按钮 -->
    <div style="margin-bottom: 10px;">
      <div class="heading">账户管理
        <el-button @click="openAddDialog" type="primary" style="width: 80px;float: right;" >新增</el-button></div>

    </div>
    <div class="table-container">
      <el-card class="box-card">
        <!-- 表格组件 -->
        <el-table :data="paginatedData" stripe style="width: 100%">
          <el-table-column prop="user_id" label="id" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.user_id">{{ scope.row.user_id }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.username">{{ scope.row.username }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="password" label="密码" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.password">{{ scope.row.password }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="user_type" label="用户类型" min-width="100" :formatter="tableUserTypeFormatter">
          </el-table-column>
          <!-- 操作列 -->
          <el-table-column label="操作" min-width="120">
            <template #default="scope">
              <el-button size="small" @click="openEditDialog(scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="deleteRow(scope.row.user_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total="user_data.total"
            :current-page="user_data.page"
            :page-size="user_data.pageSize"
            @current-change="currentChange"

        />
      </el-card>
    </div>

    <!-- 新增对话框 -->
    <el-dialog v-model="addDialogVisible" title="新增记录">
      <el-form :model="newRecord" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="newRecord.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="newRecord.password"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户类型">
              <el-select v-model="newRecord.user_type" placeholder="请选择">
                <el-option label="系统管理员" value="1" />

              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="addDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addRow">确定</el-button>
    </span>
      </template>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog v-model="editDialogVisible" title="修改记录">
      <el-form :model="editRecord" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="id">
              <el-input v-model="editRecord.user_id" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型">
              <el-input :value="formatUserType(editRecord.user_type)" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="editRecord.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="editRecord.password"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateRow">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {reactive, onMounted, computed, ref, getCurrentInstance} from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import axios from 'axios';

const {proxy} = getCurrentInstance()
// 定义响应式数据
const user_data = reactive({
  user_array: [],//数据
  total: 0, // 总条数
  page: 1, // 当前页码
  pageSize: 10, // 每页条数
})

// 新增对话框相关
const addDialogVisible = ref(false);
const newRecord = reactive({
  user_id: '',
  username: '',
  password: '',
  user_type: '',
});

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
// 表格专用的wrapper函数
function tableUserTypeFormatter(row, column, cellValue, index) {
  return formatUserType(cellValue);
}
// 计算当前页的数据
const paginatedData = computed(() => {
  const start = (user_data.page - 1) * user_data.pageSize;
  const end = start + user_data.pageSize;
  return user_data.user_array.slice(start, end);
});

// 请求数据
const userList = async () => {
  try {
    const res = await axios.get('api/user/list');
    console.log(res)
    // 假设返回的res包含数据对象data和总条数total
    if (res && res.data && Array.isArray(res.data)) {
      // 更新组织数据
      user_data.user_array = res.data;
      user_data.total = res.data.length || 0; // 更新总条数
    } else {
      new proxy.$tips('数据格式不正确', 'error').message_();
    }
  } catch (error) {
    console.log(error)
    new proxy.$tips('服务器发生错误','error').message_()
  }
};

// 分页触发事件
const currentChange = (e) => {
  user_data.page = e; // 更新页码
};

// 打开新增对话框
const openAddDialog = () => {
  addDialogVisible.value = true;
};

// 新增记录
const addRow = async () => {
  try {
    await axios.post('api/user/add', newRecord);
    addDialogVisible.value = false;
    userList(); // 刷新数据
    // 清空新增表单
    Object.keys(newRecord).forEach(key => {
      newRecord[key] = '';
    });
  } catch (error) {
    console.error('新增记录失败', error);
  }
};

// 打开修改对话框
const openEditDialog = (row) => {
  editDialogVisible.value = true;
  Object.assign(editRecord, row);
};

// 修改记录
const updateRow = async () => {
  try {
    await axios.put('api/user/update', editRecord);
    editDialogVisible.value = false;
    userList(); // 刷新数据
  } catch (error) {
    console.error('修改记录失败', error);
  }
};

// 删除记录
const deleteRow = async (user_id) => {
  try {
    if (confirm('确定要删除这条记录吗？')) {
      await axios.delete(`api/user/delete/${user_id}`);
      userList(); // 刷新数据
      new proxy.$tips('删除记录成功', 'success').message_();
    }
  } catch (error) {
    console.error('删除记录失败', error);
  }
};

// 组件挂载时请求数据
onMounted(() => {
  userList();
});
</script>

<style scoped>

</style>
