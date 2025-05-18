<template>
  <div class="container">
    <!-- 页面标题和操作区 -->
    <div class="page-header">
      <div class="heading">
        <el-icon><Box /></el-icon>
        <span>设备管理</span>
      </div>
      <div class="operation-area">
        <el-button
            @click="dialogFormVisible = true"
            type="primary"
            class="add-button"
        >
          <el-icon><Plus /></el-icon>
          新增设备
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
          <el-table-column prop="number" label="编号" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="number-cell">
                <span>{{ scope.row.number }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="name-cell">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="type" label="类型" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="type-cell">
                <span>{{ scope.row.type }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="group_name" label="所属车间/小组" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="group_name-cell">
                <span>{{ scope.row.group_name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="设备描述" min-width="120" show-overflow-tooltip>
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

        <!-- 添加对话框-->
        <el-dialog
            v-model="dialogFormVisible"
            title="添加设备信息"
            @closed="handleDialogClose"
            width="60%"
            destroy-on-close
        >
          <el-form
              :model="equipment"
              :rules="rules"
              ref="equipmentForm"
              label-width="120px"
              class="name-form"
              status-icon
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="编号" prop="number">
                  <el-input
                      v-model="equipment.number"
                      placeholder="请输入设备编号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input
                      v-model="equipment.name"
                      placeholder="请输入设备名称"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="类型" prop="type">
                  <el-select v-model="equipment.type" placeholder="请选择设备类型" style="width: 100%">
                    <el-option label="自动设备" value="自动设备" />
                    <el-option label="半自动设备" value="半自动设备" />
                    <el-option label="手工设备" value="手工设备" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="购买日期" prop="buy_date">
                  <el-date-picker
                      v-model="equipment.buy_date"
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
                <el-form-item label="保修期" prop="warranty_period">
                  <el-input
                      v-model="equipment.warranty_period"
                      placeholder="请输入保修期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="使用年限" prop="use_life">
                  <el-input
                      v-model="equipment.use_life"
                      placeholder="请输入使用年限"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属车间/小组" prop="group_id">
                  <el-select
                      v-model="equipment.group_id"
                      placeholder="请选择所属车间/小组"
                      style="width: 100%"
                      @change="handleGroupChange"
                  >
                    <el-option
                        v-for="group in groupOptions"
                        :key="group.id"
                        :label="group.name"
                        :value="group.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="设备描述" prop="description">
              <el-input
                  v-model="equipment.description"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入车间（小组）描述"
              />
            </el-form-item>
          </el-form>

          <template #footer>
            <div class="dialog-footer">
              <el-button @click="handleDialogClose">取消</el-button>
              <el-button
                  type="primary"
                  @click="insertEquipment"
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
                <el-form-item label="设备编号" prop="number">
                  <el-input
                      v-model="editRecord.number"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备名称" prop="name">
                  <el-input
                      v-model="editRecord.name"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="设备类型" prop="type">
                  <el-select v-model="editRecord.type" placeholder="请选择设备类型" style="width: 100%">
                    <el-option label="自动设备" value="自动设备" />
                    <el-option label="半自动设备" value="半自动设备" />
                    <el-option label="手工设备" value="手工设备" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="购买日期" prop="buy_date">
                  <el-date-picker
                      v-model="editRecord.buy_date"
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
                <el-form-item label="保修期" prop="warranty_period">
                  <el-input
                      v-model="editRecord.warranty_period"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="使用年限" prop="use_life">
                  <el-input
                      v-model="editRecord.use_life"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属车间/小组" prop="group_id">
                  <el-select
                      v-model="editRecord.group_id"
                      placeholder="请选择所属车间/小组"
                      style="width: 100%"
                      @change="handleGroupChange"
                  >
                    <el-option
                        v-for="group in groupOptions"
                        :key="group.id"
                        :label="group.name"
                        :value="group.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="设备描述" prop="description">
              <el-input
                  v-model="editRecord.description"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入设备描述"
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
  Search, Plus, Check, InfoFilled,Box
} from '@element-plus/icons-vue';
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessageBox} from "element-plus";
import axios from 'axios';
export default{
  components: {
    ElFormItem, ElForm, ElInput, ElDialog, ElButton,
    OfficeBuilding, Folder, User, Avatar, View, Edit, Delete, Location, Document,Box,
    Search, Plus, Check, InfoFilled
  },
  setup(){
    const {proxy} = getCurrentInstance()
    const groupOptions = ref([]); // 存储小组选项
    //请求数据
    onMounted(()=>{
      depEquipmentList();
      fetchGroups(); // 加载小组选项

    })
    // 获取小组选项
    const fetchGroups = async () => {
      try {
        const d_username = localStorage.getItem('d_username');
        const res = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        const dep_id = res.data.id;

        //根据部门ID获取小组列表
        const groupsRes = await new proxy.$request(proxy.$urls.m().group1List + '?dep_id=' + dep_id).modeget();

        if (groupsRes?.data) {
          groupOptions.value = groupsRes.data;
        }
      } catch (error) {
        console.error('获取小组列表失败:', error);
        new proxy.$tips('获取小组列表失败', 'error').message_();
      }
    };

    // 处理小组选择变化
    const handleGroupChange = (groupId) => {
      const selectedGroup = groupOptions.value.find(g => g.id === groupId);
      if (selectedGroup) {
        equipment.group_name = selectedGroup.name;
      }
    };
    // 状态变量
    const dialogFormVisible = ref(false);
    const tableLoading = ref(false);
    const submitLoading = ref(false);
    const selectedDepartment = ref({});
    const equipment = reactive({
      id:'',
      name: '',
      type: '',
      number:'',
      buy_date:'',
      description: '',
      warranty_period: '',
      use_life:'',
      group_id: '',
      group_name:'',
      dep_id: '',
      dep_name:'',
      com_id:'',
      com_name:'',
    })
    const resetForm = () => {
      // 保留公司相关信息，重置其他字段
      Object.assign(equipment, {
        id:'',
        name: '',
        type: '',
        number:'',
        buy_date:'',
        description: '',
        warranty_period: '',
        use_life:'',
        group_id: '',
        group_name:'',
        //保留信息
        dep_id: equipment.dep_id || '',
        dep_name:equipment.dep_name || '',
        com_id: equipment.com_id || '',
        com_name: equipment.com_name || '',
      });
    };
// 修改对话框相关
    const editDialogVisible = ref(false);
    const editRecord = reactive({
      id:'',
      name: '',
      type: '',
      number:'',
      buy_date:'',
      description: '',
      warranty_period: '',
      use_life:'',
      group_id: '',
      group_name:'',
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
        await axios.post('api/equipment/update', editRecord);
        editDialogVisible.value = false;
        await depEquipmentList(); // 刷新数据
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
      if (proxy.$refs.equipmentForm) {
        proxy.$refs.equipmentForm.resetFields();  // 重置表单值
        proxy.$refs.equipmentForm.clearValidate(); // 清除验证状态
      }
      resetForm();  // 重置数据
    };
// 确保在打开对话框时也重置表单
    const openAddDialog = () => {
      resetForm();
      dialogFormVisible.value = true;
    };

    const rules = {
      number: [{ required: true, message: '设备编号不能为空', trigger: 'blur' }],
      name: [{ required: true, message: '设备名称名称不能为空', trigger: 'blur' }],
      type: [{ required: true, message: '设备类型不能为空', trigger: 'change' }],
      buy_date: [{ required: true, message: '购买日期不能为空', trigger: 'change' }],
      warranty_period: [{ required: true, message: '保修期不能为空', trigger: 'blur' }],
      use_life: [{ required: true, message: '使用寿命不能为空', trigger: 'blur' }],
      group_id: [{ required: true, message: '请选择所属小组', trigger: 'change' }],
      description: [{ required: true, message: '设备描述不能为空', trigger: 'blur' }],

    }
    const equipment_data = reactive({
      equipment_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })
    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (equipment_data.page - 1) * equipment_data.pageSize;
      const end = start + equipment_data.pageSize;
      return equipment_data.equipment_array.slice(start, end);
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
    async function depEquipmentList(){
      tableLoading.value = true;
      try {
        const d_username = localStorage.getItem('d_username');

        const res1 = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        const dep_id = res1.data.id;
        equipment.dep_id = res1.data.id;
        equipment.dep_name = res1.data.department;
        equipment.com_id = res1.data.com_id;
        equipment.com_name = res1.data.com_name;
        const res = await new proxy.$request(proxy.$urls.m().equipmentByDepId + '?dep_id=' + dep_id).modeget();
        // 处理返回数据
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          equipment_data.equipment_array = res.data;
          equipment_data.total = res.data.length || 0; // 更新总条数
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
    const insertEquipment = async () => {
      try {
        const valid = await proxy.$refs.equipmentForm.validate();
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }

        submitLoading.value = true;
        const res = await new proxy.$request(proxy.$urls.m().addEquipment, equipment).modepost();

        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
          handleDialogClose(); // 关闭弹窗
          await depEquipmentList(); // 刷新页面内容
        } else {
          new proxy.$tips('添加失败', 'error').message_();
        }
      } catch (e) {
        new proxy.$tips('提交过程中发生错误', 'error').message_();
      } finally {
        submitLoading.value = false;
      }
    }
// 删除记录
    const deleteRow = async (id) => {
      tableLoading.value = true;
      try {
        await axios.delete(`api/equipment/delete/${id}`);
        await depEquipmentList();
        new proxy.$tips('删除成功', 'success').message_();
      } catch (error) {
        new proxy.$tips('删除失败', 'error').message_();
      } finally {
        tableLoading.value = false;
      }
    };
    // 分页触发事件
    function currentChange(e) {
      equipment_data.page = e; // 更新页码
    }
    return {
      ...toRefs(equipment_data),
      equipment,
      paginatedData,
      currentChange,
      dialogFormVisible,
      rules,
      insertEquipment,
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
      groupOptions,
      handleGroupChange
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
.number-cell,
.type-cell,
.group_name-cell,
.description-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-cell .el-icon,
.number-cell .el-icon,
.type-cell .el-icon,
.group_name-cell .el-icon,
.description-cell .el-icon {
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