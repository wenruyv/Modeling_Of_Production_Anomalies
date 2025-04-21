<template>
  <div >
    <div class="heading">账户管理</div>
    <div>
      <el-card class="box-card" style="width: 100%">
        <el-table :data="paginatedData" stripe style="width: 100%">
          <el-table-column prop="user_id" label="id" min-width="100" />
          <el-table-column prop="username" label="用户名" min-width="100" />
          <el-table-column prop="password" label="密码" min-width="100" />
          <el-table-column prop="user_type" label="用户类型" min-width="100" :formatter="formatUserType" />
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

  </div>
</template>

<script>
import {reactive, onMounted, getCurrentInstance, toRefs, computed} from 'vue';
export default{
  setup(){
    const {proxy} = getCurrentInstance()
    //请求数据
    onMounted(()=>{
      userlist()
    })

    const user_data = reactive({
      user_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })
    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (user_data.page - 1) * user_data.pageSize;
      const end = start + user_data.pageSize;
      return user_data.user_array.slice(start, end);
    });
    async function userlist(){
      try {
        const res = await new proxy.$request(proxy.$urls.m().user).modeget()
        console.log(res)
        // 假设返回的res包含数据对象data和总条数total
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          user_data.user_array = res.data;
          user_data.total = res.data.length || 0; // 更新总条数
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.log(error)
        new proxy.$tips('服务器发生错误','error').message_()
      }
    }
    function formatUserType(row, column, cellValue, index) {
      switch (cellValue) {
        case 1:
          return "系统管理员";
        case 2:
          return "企业管理员";
        case 3:
          return "部门管理员";
        default:
          return "未知";
      }
    }

    // 分页触发事件
    function currentchange(e) {
      user_data.page = e; // 更新页码
    }
    return {...toRefs(user_data),paginatedData,currentchange,formatUserType}
  }

}
</script>

<style>

</style>