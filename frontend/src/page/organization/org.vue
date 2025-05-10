<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><OfficeBuilding /></el-icon>
      <span>生产组织结构图</span>
    </div>
    <div class="operation-area">
    </div>
  </div>

  <div>
    <el-tabs type="border-card">
      <el-tab-pane
          v-for="(tab, index) in tabs"
          :key="index"
          :label="tab.label"
          style="height: 450px; width: 100%;"
      >
        <vue3-tree-org
            :data="tab"
            center
            default-expand-level="10"
            :horizontal="false"
            :collapsable="true"
            label-style="background: #fff; color: #5e6d82"
            :node-draggable="false"
            @on-contextmenu="onMenus"
            @on-expand="onExpand"
            @on-node-dblclick="onNodeDblclick"
        />
      </el-tab-pane>
    </el-tabs>
  </div>

  <!-- 编辑节点弹窗 -->
  <el-dialog v-model="editDialogVisible" title="编辑节点">
    <el-form :model="editForm">
      <el-form-item label="节点名称">
        <el-input v-model="editForm.label" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="onNodeUpdate">确定</el-button>
    </template>
  </el-dialog>
  <!-- 新增节点弹窗 -->
  <el-dialog v-model="addDialogVisible" title="新增节点" >
    <el-form :model="addForm" label-width="100px" style="margin-right: 20px">
      <el-form-item label="节点名称">
        <el-input v-model="addForm.label" />
      </el-form-item>
<!--      <el-form-item label="父节点  ">-->
<!--        <el-input v-model="addForm.pid" readonly/>-->
<!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <el-button @click="addDialogVisible = false" >取消</el-button>
      <el-button type="primary" @click="onNodeAdd" style="margin-right: 20px">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ElSwitch, ElColorPicker } from 'element-plus'
import {getCurrentInstance, onMounted, ref} from 'vue'
import { Edit,OfficeBuilding } from '@element-plus/icons-vue';
import shortid from 'shortid';

export default {

  name: "baseTree",
  components: {ElSwitch, ElColorPicker, Edit,OfficeBuilding},
  setup() {
    const { proxy } = getCurrentInstance();
    const cloneNodeDrag = ref(true);
    const currentNode = ref(null);
    const tabs = ref([]);
    const editDialogVisible = ref(false);
    const editForm = ref({ label: '' });
    const addDialogVisible = ref(false);
    const addForm = ref({ id:'',label: '',pid:''});


    onMounted(() => {
      orgTree();
    });

    const data= { "id": 1, "label": "研发", "pid": null, "children":[]}

    async function orgTree() {
      try {
        const res = await new proxy.$request(proxy.$urls.m().orgTree).modeget();
        console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          tabs.value = res.data;
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.log(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }

    function onMenus({ node, command }) {
      console.log('节点数据:', node); // 打印节点数据
      console.log('节点id:', node.id); // 打印节点数据
      switch (command) {
        case 'add':
          addForm.value.id = shortid.generate(); // 生成唯一 ID
          addForm.value.pid = node.id;
          addDialogVisible.value = true;
          break;
        case 'edit':
          currentNode.value = node;
          console.log(currentNode.value)
          editForm.value.label = node.label;
          editDialogVisible.value = true;
          break;
        case 'delete':
          if (!node.id) {
            new proxy.$tips('节点 ID 为空，无法删除', 'error').message_();
            return;
          }
          onNodeDelete(node) // 调用删除节点的逻辑
          break;
        default:
          break;
      }
    }
    //修改节点
    async function onNodeUpdate() {
      try {
        if (editForm.value.label.trim() === '') {
          new proxy.$tips('节点名称不能为空', 'error').message_();
          return;
        }
        currentNode.value.label = editForm.value.label;
        editDialogVisible.value = false;

        const res = await new proxy.$request(proxy.$urls.m().updateTree,currentNode.value).modepost();

        console.log("Response:", res);

        if (res.data == 1) {
          new proxy.$tips('节点更新成功', 'success').message_();
        } else {
          new proxy.$tips('节点更新失败', 'error').message_();
        }
      } catch (error) {
        console.log(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }
    //添加节点
    async function onNodeAdd() {
      try {
        if (addForm.value.label.trim() === '') {
          new proxy.$tips('节点名称不能为空', 'error').message_();
          return;
        }

        const newNode = {
          id:addForm.value.id,
          label: addForm.value.label,
          pid: addForm.value.pid
        };

        const res = await new proxy.$request(proxy.$urls.m().addTree, newNode).modepost();

        if (res.data==1) {
          await orgTree();
          addDialogVisible.value = false;
          new proxy.$tips('节点添加成功', 'success').message_();
        } else {
          new proxy.$tips('节点添加失败', 'error').message_();
        }
      } catch (error) {
        console.log(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }
    //删除节点
    async function onNodeDelete(node) {
      try {
        // const decodedId = atob(node.id); // 解码 Base64//随机id导致的？
        const id = node.id
        const res = await new proxy.$request(proxy.$urls.m().deleteTree , {id}).modepost()
        console.log(res)
        if (res.data == 1) {
          // await orgTree();
          new proxy.$tips('节点删除成功', 'success').message_()
        } else {
          new proxy.$tips('节点删除失败', 'error').message_()
        }
      } catch (error) {
        console.log(error)
        new proxy.$tips('服务器发生错误', 'error').message_()
      }
    }

    return {
      editDialogVisible, editForm,addDialogVisible,addForm,onNodeAdd,
      Edit,
      currentNode,
      onNodeUpdate,
      onMenus,
      cloneNodeDrag,
      orgTree,
      data,
      tabs
    };
  },

  methods: {
    onExpand(e, data) {
      console.log(e, data);
    },
    onExpandAll(b) {
      console.log(b)
    },
    onNodeDblclick(e,data) {
      console.log(data);
      console.log('onNodeDblclick')
    },
  },
};
</script>

<style>
</style>