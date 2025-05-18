<template>
  <div class="container">
    <!-- 页面标题和操作区 -->
    <div class="page-header">
      <div class="heading">
        <el-icon><OfficeBuilding /></el-icon>
        <span>车间/小组 管理</span>
      </div>
      <div class="operation-area">
        <el-button
            @click="dialogFormVisible = true"
            type="primary"
            class="add-button"
        >
          <el-icon><Plus /></el-icon>
          新增车间/小组
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
          <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="name-cell">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="leader" label="负责人姓名" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="leader-cell">
                <el-icon><Avatar /></el-icon>
                <span>{{ scope.row.leader }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="function" label="功能" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="function-cell">

                <span>{{ scope.row.group_function }}</span>
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
              :model="group1"
              :rules="rules"
              ref="group1Form"
              label-width="120px"
              class="name-form"
              status-icon
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input
                      v-model="group1.name"
                      placeholder="请输入车间（小组）名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人姓名" prop="leader">
                  <el-input
                      v-model="group1.leader"
                      placeholder="请输入负责人姓名"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属部门" prop="dep_name">
                  <el-input
                      v-model="group1.dep_name"
                      disabled
                      class="disabled-input"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属公司" prop="com_name">
                  <el-input
                      v-model="group1.com_name"
                      disabled
                      class="disabled-input"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="功能" prop="function">
              <el-input
                  v-model="group1.group_function"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入车间（小组）功能"
              />
            </el-form-item>
          </el-form>

          <template #footer>
            <div class="dialog-footer">
              <el-button @click="handleDialogClose">取消</el-button>
              <el-button
                  type="primary"
                  @click="insertGroup1"
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
              class="name-form"
              status-icon
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input
                      v-model="editRecord.name"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人姓名" prop="leader">
                  <el-input
                      v-model="editRecord.leader"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属部门" prop="dep_name">
                  <el-input
                      v-model="editRecord.dep_name"
                      disabled
                      class="disabled-input"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属公司" prop="com_name">
                  <el-input
                      v-model="editRecord.com_name"
                      disabled
                      class="disabled-input"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="功能" prop="function">
              <el-input
                  v-model="editRecord.group_function"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入车间（小组）功能"
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
              @current-change="currentChange"
              :hide-on-single-page="false"
          />
        </div>
      </el-card>
    </div>

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
      group1List();

    })
    // 状态变量
    const dialogFormVisible = ref(false);
    const tableLoading = ref(false);
    const submitLoading = ref(false);
    const selectedDepartment = ref({});
    const value = ref();
    const group1 = reactive({
      id:'',
      name: '',
      leader: '',
      group_function:'',
      dep_id: '',
      dep_name:'',
      com_id:'',
      com_name:'',
    })
    const resetForm = () => {
      // 保留公司相关信息，重置其他字段
      Object.assign(group1, {
        id:'',
        name: '',
        leader: '',
        group_function:'',
        //保留信息
        dep_id: group1.dep_id || '',
        dep_name:group1.dep_name || '',
        com_id: group1.com_id || '',
        com_name: group1.com_name || '',
      });
    };
// 修改对话框相关
    const editDialogVisible = ref(false);
    const editRecord = reactive({
      id:'',
      name: '',
      leader: '',
      group_function:'',
      dep_id: '',
      dep_name:'',
      com_id:'',
      com_name:'',
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
        await axios.post('api/group1/update', editRecord);
        editDialogVisible.value = false;
        await group1List(); // 刷新数据
        new proxy.$tips('修改成功', 'success').message_();
      } catch (error) {
        new proxy.$tips('提交过程中发生错误', 'error').message_();
      } finally {
        submitLoading.value = false;
      }
    };
// 在弹窗关闭时调用
    const handleDialogClose = () => {
      dialogFormVisible.value = false;

      // 直接检查表单引用
      if (proxy.$refs.group1Form) {
        proxy.$refs.group1Form.resetFields();  // 重置表单值
        proxy.$refs.group1Form.clearValidate(); // 清除验证状态
      }
      resetForm();  // 重置数据
    };
// 确保在打开对话框时也重置表单
    const openAddDialog = () => {
      resetForm();
      dialogFormVisible.value = true;
    };

    const rules = {
      name: [{ required: true, message: '车间（小组）名称不能为空', trigger: 'blur' }],
      leader: [{ required: true, message: '负责人姓名不能为空', trigger: 'blur' }],
    }
    const group_data = reactive({
      group1_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })
    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (group_data.page - 1) * group_data.pageSize;
      const end = start + group_data.pageSize;
      return group_data.group1_array.slice(start, end);
    });

    // 确认删除
    const confirmDelete = (row) => {
      ElMessageBox.confirm(
          '确定要删除这条记录吗？',
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
    async function group1List(){
      tableLoading.value = true;
      try {
        const d_username = localStorage.getItem('d_username');

        const res1 = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        const dep_id = res1.data.id;
        group1.dep_id = res1.data.id;
        group1.dep_name = res1.data.department;
        group1.com_id = res1.data.com_id;
        group1.com_name = res1.data.com_name;
        const res = await new proxy.$request(proxy.$urls.m().group1List + '?dep_id=' + dep_id).modeget();
        // 处理返回数据
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          group_data.group1_array = res.data;
          group_data.total = res.data.length || 0; // 更新总条数
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
    const insertGroup1 = async () => {
      try {
        const valid = await proxy.$refs.group1Form.validate();
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }

        submitLoading.value = true;
        const res = await new proxy.$request(proxy.$urls.m().addGroup1, group1).modepost();

        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
          handleDialogClose(); // 关闭弹窗
          await group1List(); // 刷新页面内容
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
        await axios.delete(`api/group1/delete/${id}`);
        await group1List();
        new proxy.$tips('删除成功', 'success').message_();
      } catch (error) {
        new proxy.$tips('删除失败', 'error').message_();
      } finally {
        tableLoading.value = false;
      }
    };
    // 分页触发事件
    function currentChange(e) {
      group_data.page = e; // 更新页码
    }
    return {
      ...toRefs(group_data),
      group1,
      paginatedData,
      currentChange,
      dialogFormVisible,
      rules,
      insertGroup1,
      deleteRow,
      confirmDelete,
      editDialogVisible,
      editRecord,
      openEditDialog,
      updateRow,
      handleDialogClose,
      tableLoading,
      submitLoading,
      selectedDepartment,
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

.name-cell,
.leader-cell,
.function-cell{
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-cell .el-icon,
.leader-cell .el-icon,
.function-cell .el-icon {
  color: #909399;
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