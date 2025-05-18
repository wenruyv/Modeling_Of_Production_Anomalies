<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><Document /></el-icon>
      <span>部门信息</span>
    </div>
  </div>
  <div>
    <el-card class="box-card" style="width: 100%;" :body-style="{ padding: '20px' }">
      <el-form :model="dep" label-width="120px" style="padding-right: 10px">
        <el-row style="padding-top: 10px">
          <el-col :span="12">
            <el-form-item label="部门名称">
              <el-input v-model="dep.department" readonly size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人姓名">
              <el-input v-model="dep.d_name" readonly size="large"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="管理员账号">
              <el-input v-model="dep.d_username" readonly size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员密码">
              <el-input v-model="dep.d_password" readonly size="large"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="办公地点">
              <el-input v-model="dep.location" readonly size="large"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属公司" prop="com_name">
              <el-input v-model="dep.com_name" readonly size="large" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="部门介绍" prop="introduction">
          <el-input v-model="dep.description" type="textarea" readonly/>
        </el-form-item>
        <div style="text-align: center;" >
          <!--          type="info"-->
          <el-button
              type="primary"
              @click="openDialog"
              size="large" style="width: 150px;"
              round>修改信息</el-button>
        </div>
      </el-form>
      <el-dialog v-model="dialogFormVisible" title="修改部门信息">
        <el-form :model="tempDep" :rules="rules" ref="depForm" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门名称" prop="department">
                <el-input v-model="tempDep.department" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人姓名" prop="d_name">
                <el-input v-model="tempDep.d_name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="管理员账号" prop="d_username">
                <el-input v-model="tempDep.d_username" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员密码" prop="d_password">
                <el-input v-model="tempDep.d_password" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="办公地点" prop="location">
                <el-input v-model="tempDep.location" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属公司" prop="com_name">
                <el-input v-model="tempDep.com_name" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="部门介绍" prop="introduction">
            <el-input v-model="tempDep.description" type="textarea"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false" >取消</el-button>
            <el-button type="primary" @click="updateDep" >
              修改
            </el-button>
          </span>
        </template>
      </el-dialog>

    </el-card>
  </div>

</template>

<script>
import { getCurrentInstance, reactive, ref, onMounted } from 'vue';
import { Document} from '@element-plus/icons-vue';
export default {
  components:{Document},
  setup() {
    const { proxy } = getCurrentInstance();

    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';

    const dep = reactive({
      department: '',
      d_username: '',
      d_password: '',
      d_name:'',
      location: '',
      description: '',
      com_id:'',
      com_name:'',
    });
    const tempDep = reactive({
      department: '',
      d_username: '',
      d_password: '',
      d_name:'',
      location: '',
      description: '',
      com_id:'',
      com_name:'',
    });


    // 校验规则
    const rules = {
      d_username: [{ required: true, message: '部门管理员账号不能为空', trigger: 'blur' }],
      d_password: [{ required: true, message: '部门管理员密码不能为空', trigger: 'blur' }],
    }

    const openDialog = () => {
      // 手动赋值将 company 的数据复制到 tempCompany 中
      Object.assign(tempDep, dep); // 深拷贝的简化版，直接赋值
      dialogFormVisible.value = true;
    };

    const updateDep = async () => {
      try {
        // 表单验证
        const valid = await proxy.$refs.depForm.validate();
        if (!valid) {
          return; // 如果验证失败，直接返回
        }

        // 发送修改请求
        const res = await new proxy.$request(proxy.$urls.m().updateDep, tempDep).modepost();
        console.log(res);
        if (res.data == 1) {
          new proxy.$tips('修改成功', 'success').message_();
          dialogFormVisible.value = false; // 关闭弹窗
          // 将临时变量的值赋给主界面数据
          Object.assign(dep, tempDep);
          await loadDepInfo();
        } else {
          new proxy.$tips('修改失败', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    };

    // 加载部门名称
    const loadDepInfo = async () => {
      try {
        const d_username = localStorage.getItem('d_username');
        if (!d_username) {
          new proxy.$tips('未找到账户信息', 'error').message_();
          return;
        }
        const res = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        console.log(res);
        if (res && res.data) {
          Object.assign(dep, res.data); // 将后端数据赋值给 company
        } else {
          new proxy.$tips('获取公司信息失败', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    };


    // 页面加载时获取公司信息
    onMounted(() => {
      loadDepInfo();
    });

    return {
      dep,
      tempDep,
      dialogFormVisible,
      formLabelWidth,
      rules,
      openDialog,
      updateDep,
    };
  },
};
</script>

<style>
/* 只读输入框样式 */

</style>