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
        <el-button
          type="primary"
          @click="dialogFormVisible = true"
          class="add-button"
        >
          <el-icon><Plus /></el-icon>
          添加员工
        </el-button>
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

          <el-table-column prop="department" label="所属部门" min-width="120" show-overflow-tooltip>
            <template #default="scope">
              <div class="department-cell">
                <span>{{ scope.row.department }}</span>
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
    <!-- 弹窗添加员工-->
    <el-dialog v-model="dialogFormVisible" title="添加员工信息" @close="resetForm">
      <el-form :model="staff" :rules="rules" ref="staffForm" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="staff.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="staff.gender" placeholder="请选择">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birth_date">
              <el-date-picker
                  v-model="staff.birth_date"
                  type="date"
                  placeholder="请选择日期"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证" prop="id_number">
              <el-input v-model="staff.id_number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="staff.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系邮箱" prop="email">
              <el-input v-model="staff.email" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="department">
              <el-input v-model="staff.department" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属公司" prop="com_name">
              <el-input v-model="staff.com_name" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职位" prop="position">
              <el-tree-select
                  v-model="staff.position"
                  :data="dep"
                  :props="treeProps"
                  :render-after-expand="false"
                  placeholder="请选择职位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期" prop="hire_date">
              <el-date-picker
                  v-model="staff.hire_date"
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
            <el-form-item label="所属车间/小组" prop="group_id">
              <el-select
                  v-model="staff.group_id"
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
            <!-- 隐藏字段用于存储小组名称和负责人 -->
            <el-input v-model="staff.group_name" type="hidden" />
            <el-input v-model="staff.group_leader" type="hidden" />
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="insertStaff" >
              添加
            </el-button>
          </span>
      </template>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog v-model="editDialogVisible" title="修改记录" >
      <el-form :model="editRecord" label-width="120px" ref="editForm" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editRecord.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="editRecord.gender" placeholder="请选择">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birth_date">
              <el-date-picker
                  v-model="editRecord.birth_date"
                  type="date"
                  placeholder="请选择日期"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证" prop="id_number">
              <el-input v-model="editRecord.id_number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="editRecord.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系邮箱" prop="email">
              <el-input v-model="editRecord.email" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="department">
              <el-input v-model="editRecord.department" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属公司" prop="com_name">
              <el-input v-model="editRecord.com_name" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职位" prop="position">
              <el-tree-select
                  v-model="editRecord.position"
                  :data="dep"
                  :props="treeProps"
                  :render-after-expand="false"
                  placeholder="请选择职位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期" prop="hire_date">
              <el-date-picker
                  v-model="editRecord.hire_date"
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
            <!-- 隐藏字段用于存储小组名称和负责人 -->
            <el-input v-model="editRecord.group_name" type="hidden" />
            <el-input v-model="editRecord.group_leader" type="hidden" />
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

<script>
import {reactive, onMounted, getCurrentInstance, toRefs, computed, ref} from 'vue';
import {
  User, Avatar, Phone, Message, Briefcase, OfficeBuilding, Folder, UserFilled,
  InfoFilled, Search, Plus, Edit, Delete, Check
} from '@element-plus/icons-vue';
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessageBox} from "element-plus";
import axios from 'axios';
export default{
  components: {
    ElFormItem, ElInput, ElDialog, ElForm, ElButton,
    User, Avatar, Phone, Message, Briefcase, OfficeBuilding, Folder, UserFilled,
    InfoFilled, Search, Plus, Edit, Delete, Check
  },
  setup(){
    const {proxy} = getCurrentInstance()

    // 状态变量
    const dialogFormVisible = ref(false);
    const tableLoading = ref(false);
    const submitLoading = ref(false);
    const searchKeyword = ref('');
    const formLabelWidth = '140px';

    //请求数据
    onMounted(()=>{
      staffList();
      resTree();//加载部门数据
      fetchGroups();
    })
    const groupOptions = ref([]); // 存储小组选项
    // 获取小组选项
    const fetchGroups = async () => {
      try {
        const d_username = localStorage.getItem('d_username');
        const res = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        const dep_id = res.data.id;

        // 根据部门ID获取小组列表
        const groupsRes = await new proxy.$request(proxy.$urls.m().group1List + '?dep_id=' + dep_id).modeget();

        if (groupsRes?.data) {
          groupOptions.value = groupsRes.data.map(group => ({
            id: group.id,
            name: group.name,
            group_leader: group.leader // 确保后端返回负责人信息
          }));
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
        // 更新staff对象
        staff.group_id = selectedGroup.id;
        staff.group_name = selectedGroup.name;
        staff.group_leader = selectedGroup.group_leader || ''; // 假设数据中有leader_name字段

        // 如果是编辑表单，也更新editRecord
        if (editDialogVisible.value) {
          editRecord.group_id = selectedGroup.id;
          editRecord.group_name = selectedGroup.name;
          editRecord.group_leader = selectedGroup.group_leader || '';
        }
      }
    };
    const dep = ref([]);
    const treeProps = {
      value: 'label',      // 使用您数据中的 'id' 字段作为值
      label: 'label',   // 使用 'label' 字段作为显示文本
      children: 'children' // 子节点字段名
    };
    // 修改对话框相关
    const editDialogVisible = ref(false);
    const editRecord = reactive({
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
      group_id:'',
      group_name:'',
      group_leader: '',
      com_id:'',
      com_name:'',
    });
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
      group_id:'',
      group_name:'',
      group_leader: '',
      com_id:'',
      com_name:'',
    })
    // 添加resetForm方法
    const resetForm = () => {
      proxy.$refs.staffForm?.resetFields(); // 重置表单验证和字段
      // 重置staff对象
      Object.assign(staff, {
        name: '',
        gender: '',
        birth_date: '',
        id_number: '',
        phone: '',
        email: '',
        position: '',
        dep_id: staff.dep_id, // 保留部门ID
        department: staff.department, // 保留部门名称
        hire_date: '',
        group_id:'',
        group_name:'',
        group_leader: '',
        com_id: staff.com_id, // 保留公司ID
        com_name: staff.com_name // 保留公司名称
      });
    };
    const rules = {
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
      gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
      birth_date: [{ required: true, message: '出生日期不能为空', trigger: 'change' }],
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
    //搜索部门结构
    async function resTree() {
      try {
        const d_username = localStorage.getItem('d_username');
        // 1. 获取部门用户信息
        const res1 = await new proxy.$request(
            proxy.$urls.m().loadDep + '?d_username=' + d_username
        ).modeget();

        const com_id = res1.data.com_id;
        const targetDepName = res1.data.department;

        // 2. 获取公司完整组织结构
        const res = await new proxy.$request(
            proxy.$urls.m().orgById + '?id=' + com_id
        ).modeget();

        if (res?.data) {
          // 处理可能存在的JSON字符串情况
          const orgData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

          // 3. 查找目标部门的递归函数
          const findTargetDepartment = (node) => {
            if (node.label === targetDepName) return node;

            if (node.children && node.children.length) {
              for (const child of node.children) {
                const found = findTargetDepartment(child);
                if (found) return found;
              }
            }
            return null;
          };

          // 4. 在整个组织结构中查找目标部门
          const targetDep = findTargetDepartment(orgData);

          // 5. 构造符合组件要求的树形结构
          if (targetDep) {
            // 标准化children为数组
            const normalizeChildren = (node) => {
              return {
                ...node,
                children: Array.isArray(node.children)
                    ? node.children.map(normalizeChildren)
                    : []
              };
            };

            dep.value = [normalizeChildren({
              ...targetDep,
              // 保留原始ID和属性
              id: targetDep.id || `dep_${Date.now()}`,
              expand: true // 确保节点默认展开
            })];
          } else {
            console.warn(`未找到匹配的部门: ${targetDepName}`);
            dep.value = []; // 设置为空数组避免报错
          }
        }
      } catch (error) {
        console.error('获取数据出错:', error);
        new proxy.$tips('服务器发生错误', 'error').message_();
        dep.value = []; // 出错时设置为空数组
      }
    }

    async function staffList(){
      tableLoading.value = true;
      try {
        const d_username = localStorage.getItem('d_username');
        const res0 = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        const dep_id = res0.data.id;
        staff.dep_id = res0.data.id;
        staff.department = res0.data.department;
        staff.com_id = res0.data.com_id;
        staff.com_name = res0.data.com_name;
        const res = await new proxy.$request(proxy.$urls.m().depStaffList + '?dep_id=' + dep_id).modeget();

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
    //添加员工
    const insertStaff = async () => {
      try {
        const valid = await proxy.$refs.staffForm.validate();
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }

        submitLoading.value = true;
        // 准备提交数据
        const submitData = {
          ...staff,
          group_id: staff.group_id,
          group_name: staff.group_name,
          group_leader: staff.group_leader
        };
        const res = await new proxy.$request(proxy.$urls.m().addStaff, submitData).modepost();

        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
          dialogFormVisible.value = false; // 关闭弹窗
          await staffList(); // 刷新页面内容
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
    // 打开修改对话框
    const openEditDialog = (row) => {
      editDialogVisible.value = true;
      Object.assign(editRecord, row);

      // 初始化小组选择
      if (row.group_id) {
        const selectedGroup = groupOptions.value.find(g => g.id === row.group_id);
        if (selectedGroup) {
          editRecord.group_name = selectedGroup.name;
          editRecord.group_leader = selectedGroup.group_leader || '';
        }
      }
    };

    // 修改记录
    const updateRow = async () => {
      try {
        const valid = await proxy.$refs.editForm.validate();
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }

        submitLoading.value = true;
        await axios.post('api/staff/update', editRecord);
        new proxy.$tips('修改成功', 'success').message_();
        editDialogVisible.value = false;
        await staffList(); // 刷新数据
      } catch (error) {
        console.error(error);
        new proxy.$tips('修改失败', 'error').message_();
      } finally {
        submitLoading.value = false;
      }
    };
    // 删除记录
    const deleteRow = async (id) => {
      tableLoading.value = true;
      try {
        await axios.delete(`api/staff/delete/${id}`);
        new proxy.$tips('删除成功', 'success').message_();
        await staffList();
      } catch (error) {
        console.error(error);
        new proxy.$tips('删除失败', 'error').message_();
      } finally {
        tableLoading.value = false;
      }
    };
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
      // 可以实现点击行显示详情等功能
    };

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

    // 分页触发事件
    function currentchange(e) {
      staff_data.page = e; // 更新页码
    }

    return {
      ...toRefs(staff_data),
      paginatedData,
      filteredData,
      currentchange,
      resetForm,
      dialogFormVisible,
      formLabelWidth,
      staff,
      rules,
      insertStaff,
      treeProps,
      dep,
      resTree,
      openEditDialog,
      updateRow,
      editDialogVisible,
      editRecord,
      deleteRow,
      tableLoading,
      submitLoading,
      searchKeyword,
      handleSearchClear,
      handleRowClick,
      confirmDelete,
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

/* 页面标题 */
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
  margin-right: 10px;
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

.action-button {
  margin: 0 5px;
  transition: all 0.3s;
}

.action-button:hover {
  transform: translateY(-2px);
}

.pagination-container {
  padding: 15px 0;
  display: flex;
  justify-content: flex-end;
}

/* 表单样式 */
.staff-form {
  margin-top: 10px;
}

.form-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #409EFF;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

.section-title .el-icon {
  margin-right: 8px;
  font-size: 18px;
}

.disabled-input {
  background-color: #f5f7fa;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
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