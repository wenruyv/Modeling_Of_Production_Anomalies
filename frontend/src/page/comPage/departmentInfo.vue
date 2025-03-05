<template>
    <div class="heading">部门信息
      <el-button type="primary"
                 @click="dialogFormVisible = true"
                 size="large"
                 style="width: 100px;float: right;">添加部门</el-button>
    </div>
    <div>

      <el-card class="box-card" style="width: 100%">
      <el-table :data="paginatedData" style="width: 100%">
        <!--        <el-table-column prop="id" label="id" min-width="100" />-->
        <el-table-column prop="department" label="部门" min-width="100" />
        <el-table-column prop="d_username" label="管理员账号" min-width="100"/>
        <el-table-column prop="d_password" label="管理员密码" min-width="100"/>
      </el-table>

      <!-- 弹窗添加部门-->
      <el-dialog v-model="dialogFormVisible" title="添加部门信息">
        <el-form :model="depart" :rules="rules" ref="companyForm" label-width="120px">
          <el-form-item label="部门" prop="department">
            <el-input v-model="depart.department" size="large"/>
          </el-form-item>
          <el-form-item label="管理员账号" prop="d_username">
            <el-input v-model="depart.d_username" size="large"/>
          </el-form-item>
          <el-form-item label="管理员密码" prop="d_password">
            <el-input v-model="depart.d_password" size="large"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false" >取消</el-button>
            <el-button type="primary" @click="insertCom" >
              添加
            </el-button>
          </span>
        </template>
      </el-dialog>
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

</template>

<script>
import {reactive, onMounted, getCurrentInstance, toRefs, computed, ref} from 'vue';
export default{
  setup(){
    const {proxy} = getCurrentInstance()
    //请求数据
    onMounted(()=>{
      depList()
    })
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const depart = reactive({
      department: '',
      d_username: '',
      d_password: '',
    })
    const rules = {
      department: [{ required: true, message: '部门不能为空', trigger: 'blur' }],
      d_username: [{ required: true, message: '部门管理员账号不能为空', trigger: 'blur' }],
      d_password: [{ required: true, message: '部门管理员密码不能为空', trigger: 'blur' }],
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
    //加载公司列表
    async function depList(){
      try {
        const res = await new proxy.$request(proxy.$urls.m().departmentList).modeget()
        console.log(res)
        // 假设返回的res包含数据对象data和总条数total
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          depart_data.depart_array = res.data;
          depart_data.total = res.data.length || 0; // 更新总条数
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.log(error)
        new proxy.$tips('服务器发生错误','error').message_()
      }
    }
    const insertCom = async () => {
      try {
        const valid = await proxy.$refs.companyForm.validate();
        console.log("表单验证结果" + valid);
        if (!valid) {
          return;  // 如果验证失败，直接返回
        }
        const res = await new proxy.$request(proxy.$urls.m().addDepartment, depart).modepost();
        console.log(res);
        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
          dialogFormVisible.value = false; // 关闭弹窗
          await depList(); // 刷新页面内容
        } else {
          new proxy.$tips('添加失败', 'error').message_();
        }
      } catch (e) {
        console.error(e);
      }
    }

    // 分页触发事件
    function currentchange(e) {
      depart_data.page = e; // 更新页码
    }
    return {...toRefs(depart_data),paginatedData,currentchange,dialogFormVisible,formLabelWidth,depart,rules,insertCom}
  }

}
</script>

<style>

</style>