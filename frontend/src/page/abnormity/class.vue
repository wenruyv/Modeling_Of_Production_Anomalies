<template>

    <div class="heading">异常分类</div>
    <div>
      <el-card class="box-card"  style="width: 100%" >
        <el-table :data="paginatedData" stripe style="width: 100%;heigh:200px" >
          <el-table-column prop="ab_class" label="异常分类" min-width="50">
            <template v-slot="scope">
              <div class="scrollable-cell">{{ scope.row.ab_class}}</div>
            </template>
          </el-table-column>

          <el-table-column prop="ab_level1" label="一级分类" min-width="50">
            <template v-slot="scope">
              <div class="scrollable-cell">{{ scope.row.ab_level1 }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="ab_level2" label="二级分类" min-width="50">
            <template v-slot="scope">
              <div class="scrollable-cell">{{ scope.row.ab_level2 }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="ab_def" label="定义" min-width="100">
            <template v-slot="scope">
              <div class="scrollable-cell">{{ scope.row.ab_def }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="ab_scene" label="出现场景" min-width="100">
            <template v-slot="scope">
              <div class="scrollable-cell">{{ scope.row.ab_scene }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="ab_effect" label="影响" min-width="100">
            <template v-slot="scope">
              <div class="scrollable-cell">{{ scope.row.ab_effect }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="ab_solve" label="解决方式" min-width="100">
            <template v-slot="scope">
              <div class="scrollable-cell">{{ scope.row.ab_solve }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="ab_unit" label="负责单位" min-width="100">
            <template v-slot="scope">
              <div class="scrollable-cell">{{ scope.row.ab_unit }}</div>
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

</template>

<script>
import { reactive, onMounted, getCurrentInstance, toRefs, computed } from 'vue';

export default {
  setup() {
    const { proxy } = getCurrentInstance();

    const ab_data = reactive({
      ab_classify: [], // 全部数据
      total: 0, // 总条数
      page: 1, // 当前页码
      pageSize: 10, // 每页条数
    });

    // 计算当前页的数据
    const paginatedData = computed(() => {
      const start = (ab_data.page - 1) * ab_data.pageSize;
      const end = start + ab_data.pageSize;
      return ab_data.ab_classify.slice(start, end);
    });

    // 请求数据
    onMounted(() => {
      ablist();
    });

    async function ablist() {
      try {
        const res = await new proxy.$request(proxy.$urls.m().ab_class).modeget();
        console.log(res);
        if (res && res.data && Array.isArray(res.data)) {
          // 更新全部数据
          ab_data.ab_classify = res.data;
          ab_data.total = res.data.length; // 更新总条数
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.log(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }

    // 分页触发事件
    function currentchange(e) {
      ab_data.page = e; // 更新页码
    }

    return {
      ...toRefs(ab_data),
      paginatedData,
      currentchange,
    };
  },
};
</script>

<style>
.scrollable-cell {
  max-height: 200px; /* 控制每行内容的最大高度 */
  overflow-y: auto; /* 超出时显示垂直滚动条 */
  display: block; /* 将内容设置为块级元素 */
}
</style>