<template>
  <div class="container">
    <!-- 操作按钮 -->
    <div style="margin-bottom: 10px;">
      <el-button @click="openAddDialog">新增</el-button>
    </div>
    <div class="table-container">
      <el-card class="box-card">
        <!-- 表格组件 -->
        <el-table :data="paginatedData" stripe style="width: 100%">
          <!-- 异常分类列 -->
          <el-table-column prop="ab_class" label="异常分类" min-width="75">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_class">{{ scope.row.ab_class }}</div>
            </template>
          </el-table-column>
          <!-- 一级分类列 -->
          <el-table-column prop="ab_level1" label="一级分类" min-width="75">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_level1">{{ scope.row.ab_level1 }}</div>
            </template>
          </el-table-column>
          <!-- 二级分类列 -->
          <el-table-column prop="ab_level2" label="二级分类" min-width="135">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_level2">{{ scope.row.ab_level2 }}</div>
            </template>
          </el-table-column>
          <!-- 定义列 -->
          <el-table-column prop="ab_def" label="定义" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_def">{{ scope.row.ab_def }}</div>
            </template>
          </el-table-column>
          <!-- 出现场景列 -->
          <el-table-column prop="ab_scene" label="出现场景" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_scene">{{ scope.row.ab_scene }}</div>
            </template>
          </el-table-column>
          <!-- 影响列 -->
          <el-table-column prop="ab_effect" label="影响" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_effect">{{ scope.row.ab_effect }}</div>
            </template>
          </el-table-column>
          <!-- 解决方式列 -->
          <el-table-column prop="ab_solve" label="解决方式" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_solve">{{ scope.row.ab_solve }}</div>
            </template>
          </el-table-column>
          <!-- 负责单位列 -->
          <el-table-column prop="ab_unit" label="负责单位" min-width="100">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_unit">{{ scope.row.ab_unit }}</div>
            </template>
          </el-table-column>
          <!-- 严重等级列 -->
          <el-table-column prop="ab_important" label="严重等级" min-width="75">
            <template #default="scope">
              <div class="scrollable-cell" :title="scope.row.ab_important">{{ scope.row.ab_important }}</div>
            </template>
          </el-table-column>
          <!-- 操作列 -->
          <el-table-column label="操作" min-width="120">
            <template #default="scope">
              <el-button size="small" @click="openEditDialog(scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="deleteRow(scope.row.ab_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total="ab_data.total"
            :current-page="ab_data.page"
            :page-size="ab_data.pageSize"
            @current-change="currentchange"
            :hide-on-single-page="true"
        />
      </el-card>
    </div>

    <!-- 新增对话框 -->
    <el-dialog v-model="addDialogVisible" title="新增记录">
      <template #default>
        <el-form :model="newRecord">
          <el-form-item label="异常分类">
            <el-input v-model="newRecord.ab_class"></el-input>
          </el-form-item>
          <el-form-item label="一级分类">
            <el-input v-model="newRecord.ab_level1"></el-input>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-input v-model="newRecord.ab_level2"></el-input>
          </el-form-item>
          <el-form-item label="定义">
            <el-input v-model="newRecord.ab_def"></el-input>
          </el-form-item>
          <el-form-item label="出现场景">
            <el-input v-model="newRecord.ab_scene"></el-input>
          </el-form-item>
          <el-form-item label="影响">
            <el-input v-model="newRecord.ab_effect"></el-input>
          </el-form-item>
          <el-form-item label="解决方式">
            <el-input v-model="newRecord.ab_solve"></el-input>
          </el-form-item>
          <el-form-item label="负责单位">
            <el-input v-model="newRecord.ab_unit"></el-input>
          </el-form-item>
          <el-form-item label="严重等级">
            <el-input v-model="newRecord.ab_important"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="addDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addRow">确定</el-button>
    </span>
      </template>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog v-model="editDialogVisible" title="修改记录">
      <template #default>
        <el-form :model="editRecord">
          <el-form-item label="异常分类">
            <el-input v-model="editRecord.ab_class"></el-input>
          </el-form-item>
          <el-form-item label="一级分类">
            <el-input v-model="editRecord.ab_level1"></el-input>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-input v-model="editRecord.ab_level2"></el-input>
          </el-form-item>
          <el-form-item label="定义">
            <el-input v-model="editRecord.ab_def"></el-input>
          </el-form-item>
          <el-form-item label="出现场景">
            <el-input v-model="editRecord.ab_scene"></el-input>
          </el-form-item>
          <el-form-item label="影响">
            <el-input v-model="editRecord.ab_effect"></el-input>
          </el-form-item>
          <el-form-item label="解决方式">
            <el-input v-model="editRecord.ab_solve"></el-input>
          </el-form-item>
          <el-form-item label="负责单位">
            <el-input v-model="editRecord.ab_unit"></el-input>
          </el-form-item>
          <el-form-item label="严重等级">
            <el-input v-model="editRecord.ab_important"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="updateRow">确定</el-button>
    </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, onMounted, computed, ref } from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import axios from 'axios';

// 定义响应式数据
const ab_data = reactive({
  ab_classify: [], // 全部数据
  total: 0, // 总条数
  page: 1, // 当前页码
  pageSize: 10, // 每页条数
});

// 新增对话框相关
const addDialogVisible = ref(false);
const newRecord = reactive({
  ab_class: '',
  ab_level1: '',
  ab_level2: '',
  ab_def: '',
  ab_scene: '',
  ab_effect: '',
  ab_solve: '',
  ab_unit: '',
  ab_important: ''
});

// 修改对话框相关
const editDialogVisible = ref(false);
const editRecord = reactive({
  ab_id: null,
  ab_class: '',
  ab_level1: '',
  ab_level2: '',
  ab_def: '',
  ab_scene: '',
  ab_effect: '',
  ab_solve: '',
  ab_unit: '',
  ab_important: ''
});

// 计算当前页的数据
const paginatedData = computed(() => {
  const start = (ab_data.page - 1) * ab_data.pageSize;
  const end = start + ab_data.pageSize;
  return ab_data.ab_classify.slice(start, end);
});

// 请求数据
const ablist = async () => {
  try {
    const res = await axios.get('api/abnormal/list');
    console.log(res);
    if (res && Array.isArray(res.data)) {
      // 更新全部数据
      ab_data.ab_classify = res.data;
      ab_data.total = res.data.length; // 更新总条数
    } else {
      console.error('数据格式不正确');
    }
  } catch (error) {
    console.log(error);
    console.error('服务器发生错误');
  }
};

// 分页触发事件
const currentchange = (e) => {
  ab_data.page = e; // 更新页码
};

// 打开新增对话框
const openAddDialog = () => {
  addDialogVisible.value = true;
};

// 新增记录
const addRow = async () => {
  try {
    await axios.post('api/abnormal/add', newRecord);
    addDialogVisible.value = false;
    ablist(); // 刷新数据
    // 清空新增表单
    Object.keys(newRecord).forEach(key => {
      newRecord[key] = '';
    });
  } catch (error) {
    console.error('新增记录失败', error);
  }
};

// 打开修改对话框
const openEditDialog = (row) => {
  editDialogVisible.value = true;
  Object.assign(editRecord, row);
};

// 修改记录
const updateRow = async () => {
  try {
    await axios.put('api/abnormal/update', editRecord);
    editDialogVisible.value = false;
    ablist(); // 刷新数据
  } catch (error) {
    console.error('修改记录失败', error);
  }
};

// 删除记录
const deleteRow = async (ab_id) => {
  try {
    if (confirm('确定要删除这条记录吗？')) {
      await axios.delete(`api/abnormal/delete/${ab_id}`);
      ablist(); // 刷新数据
    }
  } catch (error) {
    console.error('删除记录失败', error);
  }
};

// 组件挂载时请求数据
onMounted(() => {
  ablist();
});
</script>

<style scoped>
/* 容器样式优化 */
.container {
  max-width: 1400px;
  margin: 20px auto;
  padding: 24px;
  background: #f5f7fa;
  min-height: calc(100vh - 40px);
}

/* 操作按钮区域优化 */
.operation-area {
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
}

/* 表格容器优化 */
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  overflow: hidden;
}

/* 表格样式优化 */
:deep(.el-table) {
  font-size: 14px;
}
th {
  background-color: #f8f9fa!important;
  color: #606266;
  font-weight: 600;
}

td {
  color: #606266;
}

.cell {
  padding: 8px 12px;
  line-height: 1.6;
}

/* 可滚动单元格优化 */
.scrollable-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  padding: 8px 12px;
  line-height: 1.6;
}

/* 分页优化 */
.el-pagination {
  padding: 16px 0;
  background: white;
  margin-top: 0!important;
  border-top: 1px solid #ebeef5;
}

/* 对话框表单优化 */
.el-dialog {
  border-radius: 8px;
}
.el-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 0 20px;
}

.el-form-item {
  margin-bottom: 0;
}
:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
}

/* 按钮样式优化 */
.el-button {
  transition: all 0.3s;
}
&--small {
   padding: 7px 12px;
 }

/* 卡片样式优化 */
.box-card {
  border: none !important;
}
:deep(.el-card__body) {
  padding: 0;
  }

/* 响应式调整 */
@media (max-width: 1200px) {
  .container {
    padding: 16px;
  }

  .el-dialog .el-form {
    grid-template-columns: 1fr;
  }
}
</style>
