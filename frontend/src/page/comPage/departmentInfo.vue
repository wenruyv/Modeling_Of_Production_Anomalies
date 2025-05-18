<template>
  <div class="container">
    <!-- 页面标题和操作区 -->
    <div class="page-header">
      <div class="heading">
        <el-icon><OfficeBuilding /></el-icon>
        <span>部门管理</span>
      </div>
      <div class="operation-area">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索部门名称"
          clearable
          class="search-input"
          @clear="handleSearchClear"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button
          @click="dialogFormVisible = true"
          type="primary"
          class="add-button"
        >
          <el-icon><Plus /></el-icon>
          新增部门
        </el-button>
      </div>
    </div>

    <div class="table-container">
      <el-card class="box-card" shadow="hover">
        <!-- 表格组件 -->
        <el-table
          :data="paginatedData"
          stripe
          style="width: 100%"
          v-loading="tableLoading"
          row-key="id"
          :header-cell-style="{backgroundColor: '#f5f7fa'}"
          highlight-current-row
        >
          <el-table-column prop="department" label="部门名称" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="department-cell">
                <span>{{ scope.row.department }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="d_name" label="负责人姓名" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="name-cell">
                <span>{{ scope.row.d_name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="d_username" label="管理员账号" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="username-cell">
                <el-icon><Avatar /></el-icon>
                <span>{{ scope.row.d_username }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="管理员密码" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="password-cell">
                <el-tag type="info">******</el-tag>
                <el-button link type="primary" size="small" @click.stop="showPassword(scope.row)">
                  <el-icon><View /></el-icon>
                </el-button>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="location" label="办公地点" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="location-cell">
                <span>{{ scope.row.location }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="description" label="部门介绍" min-width="150" show-overflow-tooltip>
            <template #default="scope">
              <div class="description-cell">
                <span>{{ scope.row.description }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- 操作列 -->
          <el-table-column label="操作" fixed="right" width="180">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                @click.stop="openEditDialog(scope.row)"
                class="action-button"
              >
                <el-icon><Edit /></el-icon>
                修改
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click.stop="confirmDelete(scope.row)"
                class="action-button"
              >
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      <!-- 弹窗添加部门-->
      <el-dialog
        v-model="dialogFormVisible"
        title="添加部门管理员信息"
        @closed="handleDialogClose"
        width="60%"
        destroy-on-close
      >
        <el-form
          :model="depart"
          :rules="rules"
          ref="depForm"
          label-width="120px"
          class="department-form"
          status-icon
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="部门" prop="department">
                <el-tree-select
                  v-model="depart.department"
                  :data="organization"
                  :props="treeProps"
                  :render-after-expand="false"
                  placeholder="请选择部门"
                  class="tree-select"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人姓名" prop="d_name">
                <el-input
                  v-model="depart.d_name"
                  placeholder="请输入负责人姓名"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="管理员账号" prop="d_username">
                <el-input
                  v-model="depart.d_username"
                  placeholder="请输入管理员账号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员密码" prop="d_password">
                <el-input
                  v-model="depart.d_password"
                  placeholder="请输入管理员密码"
                  show-password
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="办公地点" prop="location">
                <el-input
                  v-model="depart.location"
                  placeholder="请输入办公地点"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属公司" prop="com_name">
                <el-input
                  v-model="depart.com_name"
                  disabled
                  class="company-input"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="部门介绍" prop="description">
            <el-input
              v-model="depart.description"
              type="textarea"
              :rows="4"
              placeholder="请输入部门介绍"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="dialog-footer">
            <el-button @click="handleDialogClose">取消</el-button>
            <el-button
              type="primary"
              @click="insertDep"
              :loading="submitLoading"
            >
              <el-icon><Plus /></el-icon>
              添加
            </el-button>
          </div>
        </template>
      </el-dialog>

      <!-- 修改对话框 -->
      <el-dialog
        v-model="editDialogVisible"
        title="修改部门信息"
        width="60%"
        destroy-on-close
      >
        <el-form
          :model="editRecord"
          :rules="rules"
          ref="editForm"
          label-width="120px"
          class="department-form"
          status-icon
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="部门" prop="department">
                <el-input
                  v-model="editRecord.department"
                  disabled
                  class="disabled-input"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人姓名" prop="d_name">
                <el-input
                  v-model="editRecord.d_name"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="管理员账号" prop="d_username">
                <el-input
                  v-model="editRecord.d_username"
                  placeholder="请输入管理员账号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员密码" prop="d_password">
                <el-input
                  v-model="editRecord.d_password"
                  placeholder="请输入管理员密码"
                  show-password
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="办公地点" prop="location">
                <el-input
                  v-model="editRecord.location"
                  placeholder="请输入办公地点"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属公司" prop="com_name">
                <el-input
                  v-model="editRecord.com_name"
                  disabled
                  class="company-input"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="部门介绍" prop="description">
            <el-input
              v-model="editRecord.description"
              type="textarea"
              :rows="4"
              placeholder="请输入部门介绍"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="updateRow"
              :loading="submitLoading"
            >
              <el-icon><Check /></el-icon>
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
        <!-- 分页组件 -->
        <div class="pagination-container">
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="total"
            :current-page="page"
            :page-size="pageSize"
            @current-change="currentchange"
            :hide-on-single-page="false"
          />
        </div>
      </el-card>
    </div>

    <!-- 密码查看弹窗 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="管理员密码"
      width="30%"
      destroy-on-close
    >
      <div class="password-display">
        <p>{{ selectedDepartment.d_password }}</p>
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
  OfficeBuilding, Folder, User, Avatar, View, Edit, Delete, Location, Document,
  Search, Plus, Check, InfoFilled
} from '@element-plus/icons-vue';
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessageBox} from "element-plus";
import axios from 'axios';
export default{
  components: {
    ElFormItem, ElForm, ElInput, ElDialog, ElButton,
    OfficeBuilding, Folder, User, Avatar, View, Edit, Delete, Location, Document,
    Search, Plus, Check, InfoFilled
  },
  setup(){
    const {proxy} = getCurrentInstance()
    //请求数据
    onMounted(()=>{
      orgTree();
      depList();

    })
    // 状态变量
    const dialogFormVisible = ref(false);
    const passwordDialogVisible = ref(false);
    const tableLoading = ref(false);
    const submitLoading = ref(false);
    const searchKeyword = ref('');
    const selectedDepartment = ref({});
    const value = ref();
    const organization = ref([]);
    const depart = reactive({
      id:'',
      department: '',
      d_username: '',
      d_password: '',
      com_id:'',
      com_name:'',
      d_name:'',
      location:'',
      description:'',
    })
    const treeProps = {
      value: 'label',      // 使用您数据中的 'id' 字段作为值
      label: 'label',   // 使用 'label' 字段作为显示文本
      children: 'children' // 子节点字段名
    };
    const resetForm = () => {
      // 保留公司相关信息，重置其他字段
      Object.assign(depart, {
        id: '',
        department: '',
        d_username: '',
        d_password: '',
        // 保留公司信息
        com_id: depart.com_id || '',
        com_name: depart.com_name || '',
        d_name: '',
        location: '',
        description: ''
      });
    };
// 修改对话框相关
    const editDialogVisible = ref(false);
    const editRecord = reactive({
      id:'',
      department: '',
      d_username: '',
      d_password: '',
      com_id:'',
      com_name:'',
      d_name:'',
      location:'',
      description:'',
    });
    // 打开修改对话框
    const openEditDialog = (row) => {
      editDialogVisible.value = true;
      Object.assign(editRecord, row);
    };

// 修改记录
    const updateRow = async () => {
      try {
        const valid = await proxy.$refs.editForm.validate();
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }

        submitLoading.value = true;
        await axios.post('api/depart/updateDep', editRecord);
        new proxy.$tips('修改成功', 'success').message_();
        editDialogVisible.value = false;
        await depList(); // 刷新数据
      } catch (error) {
        console.error('修改记录失败', error);
        new proxy.$tips('提交过程中发生错误', 'error').message_();
      } finally {
        submitLoading.value = false;
      }
    };
// 在弹窗关闭时调用
    const handleDialogClose = () => {
      dialogFormVisible.value = false;

      // 直接检查表单引用
      if (proxy.$refs.depForm) {
        proxy.$refs.depForm.resetFields();  // 重置表单值
        proxy.$refs.depForm.clearValidate(); // 清除验证状态
      }
      resetForm();  // 重置数据
    };
// 确保在打开对话框时也重置表单
    const openAddDialog = () => {
      resetForm();
      dialogFormVisible.value = true;
    };
    async function orgTree() {
      try {
        const c_username = localStorage.getItem('c_username');
        const res = await new proxy.$request(
            proxy.$urls.m().loadCompany + '?c_username=' + c_username
        ).modeget();

        if (res.data.c_org) {
          console.log('原始数据:', res.data);

          // 处理 c_org 数据
          let rawData = res.data.c_org;

          // 如果 c_org 是字符串，先解析为对象
          if (typeof rawData === 'string') {
            try {
              rawData = JSON.parse(rawData);
            } catch (e) {
              console.error('解析 c_org 失败:', e);
              rawData = null;
            }
          }

          // 处理成树形数据
          organization.value = processTreeData(rawData);

          console.log('处理后的 organization:', organization.value);
        } else {
          new proxy.$tips('公司组织结构还未保存', 'error').message_();
        }
      } catch (error) {
        console.error('加载组织结构失败:', error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }

    function processTreeData(data) {
      // 处理空值情况
      if (!data) {
        return [];
      }

      // 如果数据是数组，直接处理
      if (Array.isArray(data)) {
        return data.map(node => ({
          ...node,
          children: node.children ? node.children.map(child => ({
            ...child,
            children: undefined // 移除二级节点的子节点
          })) : undefined
        }));
      }

      // 如果数据是对象且有 children，处理其子节点
      if (data.children && Array.isArray(data.children)) {
        return [{
          ...data,
          children: data.children.map(child => ({
            ...child,
            children: undefined // 移除二级节点的子节点
          }))
        }];
      }

      // 其他情况返回空数组
      return [];
    }
    const rules = {
      department: [{ required: true, message: '请选择部门', trigger: 'change' }],
      d_username: [{ required: true, message: '部门管理员账号不能为空', trigger: 'blur' }],
      d_password: [{ required: true, message: '部门管理员密码不能为空', trigger: 'blur' }],
      d_name: [{ required: true, message: '负责人姓名不能为空', trigger: 'blur' }],
    }
    const depart_data = reactive({
      depart_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })
    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (depart_data.page - 1) * depart_data.pageSize;
      const end = start + depart_data.pageSize;
      return depart_data.depart_array.slice(start, end);
    });

    // 搜索过滤后的数据
    const filteredData = computed(() => {
      if (!searchKeyword.value) {
        return paginatedData.value;
      }
      return paginatedData.value.filter(item =>
        item.department.toLowerCase().includes(searchKeyword.value.toLowerCase())
      );
    });

    // 清除搜索
    const handleSearchClear = () => {
      searchKeyword.value = '';
    };

    // 显示密码
    const showPassword = (row) => {
      selectedDepartment.value = row;
      passwordDialogVisible.value = true;
    };

    // 确认删除
    const confirmDelete = (row) => {
      ElMessageBox.confirm(
        '确定要删除这条记录吗？（包括删除该部门下的员工！！）',
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
    //加载部门列表
    async function depList(){
      tableLoading.value = true;
      try {
        const c_username = localStorage.getItem('c_username');

        const res1 = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        const com_id = res1.data.id;
        depart.com_id = res1.data.id;
        depart.com_name = res1.data.name;

        // 正确传递com_id参数
        const res = await new proxy.$request(proxy.$urls.m().departmentList + '?com_id=' + com_id).modeget();

        // 处理返回数据
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          depart_data.depart_array = res.data;
          depart_data.total = res.data.length || 0; // 更新总条数
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误','error').message_();
      } finally {
        tableLoading.value = false;
      }
    }

    //添加新数据
    const insertDep = async () => {
      try {
        const valid = await proxy.$refs.depForm.validate();
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }

        submitLoading.value = true;
        const res = await new proxy.$request(proxy.$urls.m().addDepartment, depart).modepost();

        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
          // 更新组织结构中的部门信息
          const updateNode = (nodes) => {
            return nodes.map(node => {
              if (node.label === depart.department) {
                return {
                  ...node,
                  d_name: depart.d_name,
                  location: depart.location,
                  description: depart.description
                };
              }
              if (node.children) {
                return {
                  ...node,
                  children: updateNode(node.children)
                };
              }
              return node;
            });
          };

          organization.value = updateNode(organization.value);
          handleDialogClose(); // 关闭弹窗
          await depList(); // 刷新页面内容
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
// 删除记录
    const deleteRow = async (id) => {
      tableLoading.value = true;
      try {
        await axios.delete(`api/depart/delete/${id}`);
        new proxy.$tips('删除成功', 'success').message_();
        await depList();
      } catch (error) {
        console.error('删除记录失败', error);
        new proxy.$tips('删除失败', 'error').message_();
      } finally {
        tableLoading.value = false;
      }
    };
    // 分页触发事件
    function currentchange(e) {
      depart_data.page = e; // 更新页码
    }
    return {
      ...toRefs(depart_data),
      paginatedData,
      filteredData,
      currentchange,
      dialogFormVisible,
      depart,
      rules,
      insertDep,
      deleteRow,
      confirmDelete,
      editDialogVisible,
      editRecord,
      openEditDialog,
      updateRow,
      organization,
      orgTree,
      treeProps,
      handleDialogClose,
      tableLoading,
      submitLoading,
      searchKeyword,
      handleSearchClear,
      passwordDialogVisible,
      selectedDepartment,
      showPassword,
      value
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
.search-input {
  width: 250px;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.add-button:hover {
  transform: translateY(-2px);
}

/* 表格样式 */
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 20px;
}

.box-card {
  border: none !important;
}

:deep(.el-card__body) {
  padding: 0;
}

:deep(.el-table) {
  font-size: 14px;
}

th {
  background-color: #f8f9fa!important;
  color: #606266;
  font-weight: 600;
}

td {
  color: #606266;
}

.department-cell,
.name-cell,
.username-cell,
.location-cell,
.description-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.department-cell .el-icon,
.name-cell .el-icon,
.username-cell .el-icon,
.location-cell .el-icon,
.description-cell .el-icon {
  color: #909399;
}

.password-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-button {
  margin: 0 5px;
  transition: all 0.3s;
}

.action-button:hover {
  transform: translateY(-2px);
}

/* 可滚动单元格优化 */
.scrollable-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  line-height: 1.6;
}

/* 分页优化 */
.pagination-container {
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  background: white;
  border-top: 1px solid #ebeef5;
}

/* 表单样式 */
.department-form {
  margin-top: 10px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
}

.tree-select {
  width: 100%;
}

.disabled-input,
.company-input {
  background-color: #f5f7fa;
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