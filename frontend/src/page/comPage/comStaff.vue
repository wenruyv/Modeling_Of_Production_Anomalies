<template>
  <div class="container">
    <div class="heading">员工信息
<!--      <el-button type="primary"-->
<!--                 @click="dialogFormVisible = true"-->
<!--                 size="large"-->
<!--                 style="width: 100px;float: right;" >添加员工</el-button>-->
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
          <el-table-column label="操作" min-width="100">
            <template #default="scope">
              <el-button size="small" @click="openDetailDialog(scope.row)">详情</el-button>
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
    <!-- 员工详情弹窗 -->
    <el-dialog v-model="detailDialogVisible" title="员工详情" width="60%">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="姓名">{{ currentStaff.name }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ currentStaff.gender }}</el-descriptions-item>
        <el-descriptions-item label="出生日期">{{ currentStaff.birth_date }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ currentStaff.id_number }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ currentStaff.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ currentStaff.email }}</el-descriptions-item>
        <el-descriptions-item label="职位">{{ currentStaff.position }}</el-descriptions-item>
        <el-descriptions-item label="所属部门">{{ currentStaff.department }}</el-descriptions-item>
        <el-descriptions-item label="所属小组">{{ currentStaff.group }}</el-descriptions-item>
        <el-descriptions-item label="组长">{{ currentStaff.group_leader }}</el-descriptions-item>
        <el-descriptions-item label="入职日期">{{ currentStaff.hire_date }}</el-descriptions-item>
        <el-descriptions-item label="所属公司">{{ currentStaff.com_name }}</el-descriptions-item>
      </el-descriptions>
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
export default{
  setup(){
    const {proxy} = getCurrentInstance()
    //请求数据
    onMounted(()=>{
      orgTree();  // 加载部门数据
      staffList()
    })
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
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
    // 添加在setup()函数顶部
    const detailDialogVisible = ref(false);
    const currentStaff = ref({});

// 打开详情对话框
    const openDetailDialog = (row) => {
      currentStaff.value = { ...row };
      detailDialogVisible.value = true;
    };
    //organization树形选择器数据
    async function orgTree() {
      try {
        const c_username = localStorage.getItem('c_username');
        const res = await new proxy.$request(proxy.$urls.m().isEmptyOrg  + '?c_username=' + c_username).modeget();
        console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          organization1.value = res.data;
          organization.value = processTreeData(res.data);
          console.log("organization");
          console.log(organization);
        } else {
          new proxy.$tips('公司组织结构还未保存', 'error').message_();
        }
      } catch (error) {
        console.log(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }
    function processTreeData(nodes) {
      return nodes.map(node => {
        // 如果是根节点，只保留其直接子节点
        return {
          ...node,
          children: node.children ? node.children.map(child => ({
            ...child,
            // 移除二级节点的子节点
            children: undefined
          })) : undefined
        };
      });
    }
    async function staffList(){
      try {
        const c_username = localStorage.getItem('c_username');

        const res1 = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        const com_id = res1.data.id;
        // 正确传递com_id参数
        const res = await new proxy.$request(proxy.$urls.m().staffList + '?com_id=' + com_id).modeget()
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
    /*const insertStaff = async () => {
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
    }*/
    // 分页触发事件
    function currentchange(e) {
      staff_data.page = e; // 更新页码
    }
    return {...toRefs(staff_data),paginatedData,currentchange,
      dialogFormVisible,formLabelWidth,staff,rules,/*insertStaff,*/
      treeProps,organization,orgTree,organization1,
      detailDialogVisible,  // 新增
      currentStaff,        // 新增
      openDetailDialog     // 新增
    }
  }

}
</script>

<style>

</style>