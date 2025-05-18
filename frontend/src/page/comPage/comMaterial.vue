<template>
  <div class="container">
    <!-- 页面标题和操作区 -->
    <div class="page-header">
      <div class="heading">
        <el-icon><Box /></el-icon>
        <span>原材料管理</span>
      </div>
      <div class="operation-area">
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

          <el-table-column prop="unit" label="单位" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="unit-cell">
                <span>{{ scope.row.unit }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="unit_price" label="单位成本(元)" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="unit_price-cell">
                <span>{{ scope.row.unit_price }}元</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="supplier" label="供应商" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="supplier-cell">
                <span>{{ scope.row.supplier }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="supplier" label="所属部门" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="supplier-cell">
                <span>{{ scope.row.dep_name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="group_name" label="所属小组" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="group_name-cell">
                <span>{{ scope.row.group_name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="原材料描述" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="description-cell">

                <span>{{ scope.row.description }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>

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
    //请求数据
    onMounted(()=>{
      depMaterialList();

    })

    // 状态变量
    const dialogFormVisible = ref(false);
    const tableLoading = ref(false);
    const material = reactive({
      id:'',
      name: '',
      number:'',
      unit:'',
      unit_price:'',
      supplier:'',
      description: '',
      group_id: '',
      group_name:'',
      dep_id: '',
      dep_name:'',
      com_id:'',
      com_name:'',
    })
    const material_data = reactive({
      material_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })
    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (material_data.page - 1) * material_data.pageSize;
      const end = start + material_data.pageSize;
      return material_data.material_array.slice(start, end);
    });

    //加载列表
    async function depMaterialList(){
      tableLoading.value = true;
      try {
        const c_username = localStorage.getItem('c_username');

        const res1 = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        const com_id = res1.data.id;
        const res = await new proxy.$request(proxy.$urls.m().materialList + '?com_id=' + com_id).modeget();
        // 处理返回数据
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          material_data.material_array = res.data;
          material_data.total = res.data.length || 0; // 更新总条数
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
    // 分页触发事件
    function currentChange(e) {
      material_data.page = e; // 更新页码
    }
    return {
      ...toRefs(material_data),
      material,
      paginatedData,
      currentChange,
      dialogFormVisible,
      tableLoading,

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
.unit-cell,
.unit_price-cell,
.supplier-cell,
.group_name-cell,
.description-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-cell .el-icon,
.number-cell .el-icon,
.type-cell .el-icon,
.unit-cell .el-icon,
.unit_price-cell .el-icon,
.supplier-cell .el-icon,
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