<template>
  <div class="ordering">
    <div class="heading">生产组织结构图</div>
    <div>
      <el-table :data="paginatedData" style="width: 100%">
        <el-table-column prop="company" label="公司" min-width="100" />
        <el-table-column prop="department" label="部门" min-width="100" />
        <el-table-column prop="group" label="小组" min-width="100"/>
        <el-table-column prop="position" label="职位" min-width="100" />
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="pageSize"
          @current-change="currentChange"
          :hide-on-single-page="true"
      />
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
      orgList()
    })

    const org_data = reactive({
      org_array: [],//数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    })
    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (org_data.page - 1) * org_data.pageSize;
      const end = start + org_data.pageSize;
      return org_data.org_array.slice(start, end);
    });
    async function orgList(){
      try {
        const res = await new proxy.$request(proxy.$urls.m().organization).modeget()
        console.log(res)
        // 假设返回的res包含数据对象data和总条数total
        if (res && res.data && Array.isArray(res.data)) {
          // 更新组织数据
          org_data.org_array = res.data;
          org_data.total = res.data.length || 0; // 更新总条数
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.log(error)
        new proxy.$tips('服务器发生错误','error').message_()
      }
    }
    // 分页触发事件
    function currentChange(e) {
      org_data.page = e; // 更新页码
    }
    return {...toRefs(org_data),paginatedData,currentChange}
  }

}
</script>

<style>
</style>