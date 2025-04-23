<template>
  <div class="container">
  <div style="margin-bottom: 10px;">
    <div class="heading">员工信息
      <el-button type="primary"
                 @click="dialogFormVisible = true"
                 style="width: 100px;float: right;" >添加员工</el-button>
    </div>
    <div class="table-container">
      <el-card class="box-card">
        <el-table :data="paginatedData" stripe style="width: 100%">
          <el-table-column prop="name" label="姓名" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.name">{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别" min-width="100" />
          <el-table-column prop="phone" label="联系电话" min-width="100" />
          <el-table-column prop="email" label="邮箱" min-width="100" />
          <el-table-column prop="position" label="职位" min-width="100" />
          <el-table-column prop="department" label="所属部门" min-width="100" />
          <el-table-column prop="group" label="所属小组" min-width="100" />
          <el-table-column prop="group_leader" label="组长" min-width="100" />
          <!-- 操作列 -->
          <el-table-column label="操作" min-width="120">
            <template #default="scope">
              <el-button size="small" @click="openEditDialog(scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="page"
            :page-size="pageSize"
            @current-change="currentchange"
            :hide-on-single-page="true"
        />
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
            <el-form-item label="所属小组" prop="group1">
              <el-input v-model="staff.group1" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组长" prop="group_leader">
              <el-input v-model="staff.group_leader" />
            </el-form-item>
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
    <el-dialog v-model="editDialogVisible" title="修改记录">
      <el-form :model="editRecord" label-width="120px">
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
            <el-form-item label="所属小组" prop="group1">
              <el-input v-model="editRecord.group1" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组长" prop="group_leader">
              <el-input v-model="editRecord.group_leader" />
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
  </div>
</template>

<script>
import {reactive, onMounted, getCurrentInstance, toRefs, computed, ref} from 'vue';
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput} from "element-plus";
import axios from 'axios';
export default{
  components: {ElFormItem, ElInput, ElDialog, ElForm, ElButton},
  setup(){
    const {proxy} = getCurrentInstance()
    //请求数据
    onMounted(()=>{
      staffList();
      resTree();//加载部门数据
    })
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
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
      group1:'',
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
      group1:'',
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
        group1: '',
        group_leader: '',
        com_id: staff.com_id, // 保留公司ID
        com_name: staff.com_name // 保留公司名称
      });
    };
    const rules = {
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
      gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
      brith_date: [{ required: true, message: '出生日期不能为空', trigger: 'change' }],
      id_number: [{ required: true, message: '身份证不能为空', trigger: 'blur' }],
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
    //搜索部门结构
    async function resTree() {
      try {
        const d_username = localStorage.getItem('d_username');
        const res1 = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        const com_id = res1.data.com_id;
        const targetDepName = res1.data.department;

        const res = await new proxy.$request(proxy.$urls.m().orgById + '?id=' + com_id).modeget();

        if (res?.data?.length) {
          // 新方法：查找目标部门节点
          const findTargetDepartment = (nodes) => {
            for (const node of nodes) {
              if (node.label === targetDepName) return node;
              if (node.children) {
                const found = findTargetDepartment(node.children);
                if (found) return found;
              }
            }
            return null;
          };

          // 在所有部门树中搜索目标部门
          let targetDep = null;
          for (const dept of res.data) {
            targetDep = findTargetDepartment([dept]);
            if (targetDep) break;
          }

          // 确保children始终是数组
          const normalizeChildren = (node) => {
            if (!node.children) {
              node.children = [];
            } else {
              node.children = node.children.map(child => normalizeChildren(child));
            }
            return node;
          };

          // 如果找到目标部门，构造符合组件要求的单根树结构
          if (targetDep) {
            dep.value = [normalizeChildren({
              ...targetDep,
              children: targetDep.children || []
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
      try {
        const d_username = localStorage.getItem('d_username');
        const res0 = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        const dep_id = res0.data.id;
        staff.dep_id = res0.data.id;
        staff.department = res0.data.department;
        staff.com_id = res0.data.com_id;
        staff.com_name = res0.data.com_name;
        const res = await new proxy.$request(proxy.$urls.m().depStaffList + '?dep_id=' + dep_id).modeget();
        console.log(res)
        // 假设返回的res包含数据对象data和总条数total
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          staff_data.user_array = res.data;
          staff_data.total = res.data.length || 0; // 更新总条数
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.log(error)
        new proxy.$tips('服务器发生错误','error').message_()
      }
    }
    //添加员工
    const insertStaff = async () => {
      try {
        const valid = await proxy.$refs.staffForm.validate();
        console.log("表单验证结果" + valid);
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }
        const res = await new proxy.$request(proxy.$urls.m().addStaff, staff).modepost();
        console.log(res);
        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
          dialogFormVisible.value = false; // 关闭弹窗
          await staffList(); // 刷新页面内容
        } else {
          new proxy.$tips('添加失败', 'error').message_();
        }
      } catch (e) {
        console.error(e);
      }
    }
    // 打开修改对话框
    const openEditDialog = (row) => {
      editDialogVisible.value = true;
      Object.assign(editRecord, row);
    };

    // 修改记录
    const updateRow = async () => {
      try {
        await axios.post('api/staff/update', editRecord);
        editDialogVisible.value = false;
        new proxy.$tips('修改成功', 'success').message_();
        await staffList(); // 刷新数据
      } catch (error) {
        new proxy.$tips('修改失败', 'error').message_();
      }
    };
    // 删除记录
    const deleteRow = async (id) => {
      try {
        if (confirm('确定要删除这条记录吗？')) {
          await axios.delete(`api/staff/delete/${id}`);
          new proxy.$tips('删除成功', 'success').message_();
          await staffList();
        }

      } catch (error) {
        new proxy.$tips('删除失败', 'error').message_();
      }
    };
    // 分页触发事件
    function currentchange(e) {
      staff_data.page = e; // 更新页码
    }
    return {...toRefs(staff_data),paginatedData,currentchange,  resetForm,
      dialogFormVisible,formLabelWidth,staff,rules,insertStaff,
      treeProps,dep,resTree,openEditDialog,updateRow,editDialogVisible,editRecord,deleteRow
    }
  }

}
</script>

<style>

</style>