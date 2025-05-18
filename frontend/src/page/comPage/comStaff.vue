<template>
  <div class="container">
    <!-- 页面标题和操作区 -->
    <div class="page-header">
      <div class="heading">
        <el-icon><User /></el-icon>
        <span>员工信息</span>
      </div>
      <div class="operation-area">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索员工姓名"
          clearable
          class="search-input"
          @clear="handleSearchClear"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="main-content">
      <el-card class="table-card" shadow="hover">
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
          <el-table-column prop="name" label="姓名" min-width="100" show-overflow-tooltip>
            <template #default="scope">
              <div class="name-cell">
                <el-icon><Avatar /></el-icon>
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="gender" label="性别" min-width="80">
            <template #default="scope">
              <el-tag :type="scope.row.gender === '男' ? 'primary' : 'danger'" size="small">
                {{ scope.row.gender }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="phone" label="联系电话" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="phone-cell">
                <el-icon><Phone /></el-icon>
                <span>{{ scope.row.phone }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="email" label="邮箱" min-width="150" show-overflow-tooltip>
            <template #default="scope">
              <div class="email-cell">
                <el-icon><Message /></el-icon>
                <span>{{ scope.row.email }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="position" label="职位" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="position-cell">
                <span>{{ scope.row.position }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="department" label="所属部门" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="department-cell">
                <span>{{ scope.row.department }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="group1" label="所属小组" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="group-cell">
                <span>{{ scope.row.group1 }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="group_leader" label="组长" min-width="100" show-overflow-tooltip>
            <template #default="scope">
              <div class="leader-cell">
                <span>{{ scope.row.group_leader }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- 操作列 -->
          <el-table-column label="操作" fixed="right" width="100">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                @click.stop="openDetailDialog(scope.row)"
                class="detail-button"
              >
                <el-icon><InfoFilled /></el-icon>
                详情
              </el-button>
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
            @current-change="currentchange"
            :hide-on-single-page="false"
          />
        </div>
      </el-card>
    </div>

    <!-- 员工详情弹窗 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="员工详情"
      width="65%"
      destroy-on-close
    >
      <div class="staff-detail-container">
        <div class="staff-header">
          <div class="staff-avatar">
            <el-avatar :size="80" :icon="UserFilled" />
          </div>
          <div class="staff-basic-info">
            <h2>{{ currentStaff.name }}</h2>
            <div class="staff-position">
              <el-tag type="primary">{{ currentStaff.position }}</el-tag>
              <el-tag type="success">{{ currentStaff.department }}</el-tag>
            </div>
          </div>
        </div>

        <el-divider content-position="center">基本信息</el-divider>

        <el-descriptions :column="2" border direction="vertical" class="staff-descriptions">
          <el-descriptions-item label="姓名">
            <div class="desc-item-content">
              <el-icon><User /></el-icon>
              <span>{{ currentStaff.name }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="性别">
            <div class="desc-item-content">
              <el-icon><Male v-if="currentStaff.gender === '男'" /><Female v-else /></el-icon>
              <span>{{ currentStaff.gender }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="出生日期">
            <div class="desc-item-content">
              <el-icon><Calendar /></el-icon>
              <span>{{ currentStaff.birth_date || '暂无' }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="身份证号">
            <div class="desc-item-content">
              <el-icon><Document /></el-icon>
              <span>{{ currentStaff.id_number || '暂无' }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="联系电话">
            <div class="desc-item-content">
              <el-icon><Phone /></el-icon>
              <span>{{ currentStaff.phone || '暂无' }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="邮箱">
            <div class="desc-item-content">
              <el-icon><Message /></el-icon>
              <span>{{ currentStaff.email || '暂无' }}</span>
            </div>
          </el-descriptions-item>
        </el-descriptions>

        <el-divider content-position="center">工作信息</el-divider>

        <el-descriptions :column="2" border direction="vertical" class="staff-descriptions">
          <el-descriptions-item label="职位">
            <div class="desc-item-content">
              <el-icon><Briefcase /></el-icon>
              <span>{{ currentStaff.position || '暂无' }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="所属部门">
            <div class="desc-item-content">
              <el-icon><OfficeBuilding /></el-icon>
              <span>{{ currentStaff.department || '暂无' }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="所属小组">
            <div class="desc-item-content">
              <el-icon><Folder /></el-icon>
              <span>{{ currentStaff.group || '暂无' }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="组长">
            <div class="desc-item-content">
              <el-icon><UserFilled /></el-icon>
              <span>{{ currentStaff.group_leader || '暂无' }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="入职日期">
            <div class="desc-item-content">
              <el-icon><Calendar /></el-icon>
              <span>{{ currentStaff.hire_date || '暂无' }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="所属公司">
            <div class="desc-item-content">
              <el-icon><OfficeBuilding /></el-icon>
              <span>{{ currentStaff.com_name || '暂无' }}</span>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
<!--    &lt;!&ndash; 弹窗添加员工&ndash;&gt;-->
<!--    <el-dialog v-model="dialogFormVisible" title="添加员工信息">-->
<!--      <el-form :model="staff" :rules="rules" ref="staffForm" label-width="120px">-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="姓名" prop="name">-->
<!--              <el-input v-model="staff.name" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="性别" prop="gender">-->
<!--              <el-select v-model="staff.gender" placeholder="请选择">-->
<!--                <el-option label="男" value="男" />-->
<!--                <el-option label="女" value="女" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="出生日期" prop="birth_date">-->
<!--              <el-date-picker-->
<!--                  v-model="staff.birth_date"-->
<!--                  type="date"-->
<!--                  placeholder="请选择日期"-->
<!--                  format="YYYY/MM/DD"-->
<!--                  value-format="YYYY-MM-DD"-->
<!--                  style="width: 100%"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="身份证" prop="id_number">-->
<!--              <el-input v-model="staff.id_number" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="联系电话" prop="phone">-->
<!--              <el-input v-model="staff.phone" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="联系邮箱" prop="email">-->
<!--              <el-input v-model="staff.email" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="所属部门" prop="department">-->
<!--              <el-tree-select-->
<!--                  v-model="staff.department"-->
<!--                  :data="organization"-->
<!--                  :props="treeProps"-->
<!--                  :render-after-expand="false"-->
<!--                  placeholder="请选择部门"-->
<!--                  @node-click="handleDepartmentSelect"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="所属公司" prop="com_name">-->
<!--              <el-input v-model="staff.com_name" disabled/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="职位" prop="position">-->
<!--              <el-tree-select-->
<!--                  v-model="staff.position"-->
<!--                  :data="organization1"-->
<!--                  :props="treeProps"-->
<!--                  :render-after-expand="false"-->
<!--                  placeholder="请选择职位"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="入职日期" prop="hire_date">-->
<!--              <el-date-picker-->
<!--                  v-model="staff.hire_date"-->
<!--                  type="date"-->
<!--                  placeholder="请选择日期"-->
<!--                  format="YYYY/MM/DD"-->
<!--                  value-format="YYYY-MM-DD"-->
<!--                  style="width: 100%"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="所属小组" prop="group1">-->
<!--              <el-input v-model="staff.group1" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="组长" prop="group_leader">-->
<!--              <el-input v-model="staff.group_leader" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-form>-->
<!--      <template #footer>-->
<!--          <span class="dialog-footer">-->
<!--            <el-button @click="dialogFormVisible = false">取消</el-button>-->
<!--            <el-button type="primary" @click="insertStaff" >-->
<!--              添加-->
<!--            </el-button>-->
<!--          </span>-->
<!--      </template>-->
<!--    </el-dialog>-->

  </div>
</template>

<script>
import {reactive, onMounted, getCurrentInstance, toRefs, computed, ref} from 'vue';
import {
  User, Avatar, Phone, Message, Briefcase, OfficeBuilding, Folder, UserFilled,
  InfoFilled, Search, Calendar, Document, Male, Female
} from '@element-plus/icons-vue';

export default{
  components: {
    User, Avatar, Phone, Message, Briefcase, OfficeBuilding, Folder, UserFilled,
    InfoFilled, Search, Calendar, Document, Male, Female
  },
  setup(){
    const {proxy} = getCurrentInstance()

    // 状态变量
    const dialogFormVisible = ref(false);
    const detailDialogVisible = ref(false);
    const tableLoading = ref(false);
    const searchKeyword = ref('');
    const currentStaff = ref({});
    const formLabelWidth = '140px';

    //请求数据
    onMounted(()=>{
      staffList();
    })
    const organization = ref([]);
    const organization1 = ref([]);
    const treeProps = {
      value: 'label',      // 使用您数据中的 'id' 字段作为值
      label: 'label',   // 使用 'label' 字段作为显示文本
      children: 'children' // 子节点字段名
    };
    const staff = reactive({
      name: '',
      gender: '',
      birth_date: '',
      id_number:'',
      phone:'',
      email:'',
      position:'',
      dep_id:'',
      department:'',
      hire_date:'',
      group1:'',
      group_leader: '',
      com_id:'',
      com_name:'',
    })
    const rules = {
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
      gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
      brith_date: [{ required: true, message: '出生日期不能为空', trigger: 'change' }],
      // id_number: [{ required: true, message: '身份证不能为空', trigger: 'blur' }],
      phone: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
      email: [{ required: true, message: '联系邮箱不能为空', trigger: 'blur' }],
      position: [{ required: true, message: '职位不能为空', trigger: 'blur' }],
      department: [{ required: true, message: '所属部门不能为空', trigger: 'blur' }],
      hire_date: [{ required: true, message: '入职日期不能为空', trigger: 'change' }],
    }
    const staff_data = reactive({
      user_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })
    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (staff_data.page - 1) * staff_data.pageSize;
      const end = start + staff_data.pageSize;
      return staff_data.user_array.slice(start, end);
    });

    // 搜索过滤后的数据
    const filteredData = computed(() => {
      if (!searchKeyword.value) {
        return paginatedData.value;
      }
      return paginatedData.value.filter(item =>
        item.name && item.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
      );
    });

    // 清除搜索
    const handleSearchClear = () => {
      searchKeyword.value = '';
    };

    // 行点击事件
    const handleRowClick = (row) => {
      openDetailDialog(row);
    };

// 打开详情对话框
    const openDetailDialog = (row) => {
      currentStaff.value = { ...row };
      detailDialogVisible.value = true;
    };
    async function staffList(){
      tableLoading.value = true;
      try {
        const c_username = localStorage.getItem('c_username');

        const res1 = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        const com_id = res1.data.id;
        // 正确传递com_id参数
        const res = await new proxy.$request(proxy.$urls.m().staffList + '?com_id=' + com_id).modeget();

        // 处理返回数据
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          staff_data.user_array = res.data;
          staff_data.total = res.data.length || 0; // 更新总条数
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
    function currentchange(e) {
      staff_data.page = e; // 更新页码
    }
    return {
      ...toRefs(staff_data),
      paginatedData,
      filteredData,
      currentchange,
      dialogFormVisible,
      formLabelWidth,
      staff,
      rules,
      treeProps,
      organization,

      organization1,
      detailDialogVisible,
      currentStaff,
      openDetailDialog,
      tableLoading,
      searchKeyword,
      handleSearchClear,
      handleRowClick,
      UserFilled
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

/* 表格样式 */
.main-content {
  margin-bottom: 20px;
}

.table-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.table-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.name-cell,
.phone-cell,
.email-cell,
.position-cell,
.department-cell,
.group-cell,
.leader-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-cell .el-icon,
.phone-cell .el-icon,
.email-cell .el-icon,
.position-cell .el-icon,
.department-cell .el-icon,
.group-cell .el-icon,
.leader-cell .el-icon {
  color: #909399;
}

.detail-button {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.detail-button:hover {
  transform: translateY(-2px);
}

.pagination-container {
  padding: 15px 0;
  display: flex;
  justify-content: flex-end;
}

/* 员工详情样式 */
.staff-detail-container {
  padding: 10px;
}

.staff-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.staff-avatar {
  flex-shrink: 0;
}

.staff-basic-info {
  flex-grow: 1;
}

.staff-basic-info h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #303133;
}

.staff-position {
  display: flex;
  gap: 10px;
}

.staff-descriptions {
  margin-bottom: 20px;
}

.desc-item-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.desc-item-content .el-icon {
  color: #909399;
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
  }

  .search-input {
    width: 100%;
  }

  .staff-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>