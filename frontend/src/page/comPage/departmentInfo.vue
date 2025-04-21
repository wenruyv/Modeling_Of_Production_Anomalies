<template>
    <div class="heading">部门信息
      <el-button type="primary"
                 @click="dialogFormVisible = true"
                 size="large"
                 style="width: 140px;float: right;">添加部门管理员</el-button>
    </div>
    <div>

      <el-card class="box-card" style="width: 100%">
      <el-table :data="paginatedData" stripe style="width: 100%">
        <!--        <el-table-column prop="id" label="id" min-width="100" />-->
        <el-table-column prop="department" label="部门" min-width="100" />
        <el-table-column prop="d_name" label="负责人姓名" min-width="100" />
        <el-table-column prop="d_username" label="管理员账号" min-width="100"/>
        <el-table-column prop="d_password" label="管理员密码" min-width="100"/>
        <el-table-column prop="location" label="办公地点" min-width="100"/>
      </el-table>

      <!-- 弹窗添加部门-->
      <el-dialog v-model="dialogFormVisible" title="添加部门管理员信息">
        <el-form :model="depart" :rules="rules" ref="depForm" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="department">
                <el-tree-select
                    v-model="depart.department"
                    :data="organization"
                    :props="treeProps"
                    :render-after-expand="false"
                    placeholder="请选择部门"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人姓名" prop="d_name">
                <el-input v-model="depart.d_name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="管理员账号" prop="d_username">
                <el-input v-model="depart.d_username" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员密码" prop="d_password">
                <el-input v-model="depart.d_password" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="办公地点" prop="location">
                <el-input v-model="depart.location" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属公司" prop="com_name">
                <el-input v-model="depart.com_name" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="部门介绍" prop="description">
            <el-input v-model="depart.description" type="textarea" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleDialogClose" >取消</el-button>
            <el-button type="primary" @click="insertDep" >
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
      orgTree();
      depList();

    })
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const value = ref()
    const organization = ref([]);
    const depart = reactive({
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
      depart.department = '';
      depart.d_username = '';
      depart.d_password = '';
      depart.com_id = '';
      depart.com_name = '';
      depart.d_name = '';
      depart.location = '';
      depart.description = '';
    };

// 在弹窗关闭时调用
    const handleDialogClose = () => {
      dialogFormVisible.value = false;
      proxy.$refs.depForm?.resetFields();  // 重置表单及验证状态
      resetForm();
    };
    //organization树形选择器数据
    async function orgTree() {
      try {
        const c_username = localStorage.getItem('c_username');
        const res = await new proxy.$request(proxy.$urls.m().isEmptyOrg  + '?c_username=' + c_username).modeget();
        if (res && res.data && Array.isArray(res.data)) {
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
    const rules = {
      department: [{ required: true, message: '请选择部门', trigger: 'change' }],
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
    //加载部门列表
    async function depList(){
      try {
        const c_username = localStorage.getItem('c_username');

        const res1 = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        const com_id = res1.data.id;
        depart.com_id = res1.data.id;
        depart.com_name = res1.data.name;
        console.log(depart.com_name );
        // 正确传递com_id参数
        const res = await new proxy.$request(proxy.$urls.m().departmentList + '?com_id=' + com_id).modeget();
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

    //添加新数据
    const insertDep = async () => {
      try {
        const res = await new proxy.$request(proxy.$urls.m().addDepartment, depart).modepost();
        console.log(res);
        if (res.data == 1) {
          new proxy.$tips('添加成功', 'success').message_();
          handleDialogClose(); // 关闭弹窗
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
    return {...toRefs(depart_data),
      paginatedData,
      currentchange,
      dialogFormVisible,
      formLabelWidth,
      depart,
      rules,
      insertDep,
      value,
      organization,
      orgTree,
      treeProps,
      handleDialogClose
    }
  }

}
</script>

<style>
</style>