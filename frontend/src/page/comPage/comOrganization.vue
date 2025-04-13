<template>
  <div class="heading">企业组织结构图</div>
  <div>
    <!--    <div>{{org}}</div>-->
    <!--<div>{{tabs}}</div>-->
    <el-tabs type="border-card">
      <el-tab-pane
          v-for="(tab, index) in tabs"
          :key="index"
          :label="tab.label"
          style="height: 450px; width: 100%;"
      >
        <vue3-tree-org
            :data="tab.data"
            center
            default-expand-level="10"
            :horizontal="false"
            :collapsable="true"
            :only-one-node="false"
            label-style="background: #fff; color: #5e6d82"
            :clone-node-drag="cloneNodeDrag"
            :before-drag-end="beforeDragEnd"
            @on-node-drag="nodeDragMove"
            @on-node-drag-end="nodeDragEnd"
            @on-contextmenu="onMenus"
            @on-expand="onExpand"
            @on-node-dblclick="onNodeDblclick"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { ElSwitch, ElColorPicker } from 'element-plus'
import {getCurrentInstance, onMounted, ref} from 'vue'

export default {
  name: "baseTree",
  components: {
    ElSwitch,
    ElColorPicker,

  },
  setup() {
    const { proxy } = getCurrentInstance();
    const orgYan = ref([]); // 初始值为空数组
    const orgChan = ref([]);
    const orgGong = ref([]);
    const orgXiao = ref([]);
    const orgFu = ref([]);
    const cloneNodeDrag = ref(true);

    const tabs = ref([
      { label: '研发', data: orgYan },
      { label: '生产', data: orgChan },
      { label: '供应', data: orgGong },
      { label: '销售', data: orgXiao },
      { label: '服务', data: orgFu },
    ]);
    // 请求数据
    onMounted(() => {
      orgTree();
    });
    const data= { "id": 1, "label": "研发", "parent_id": null, "children": [ { "id": 2, "label": "项目管理部", "parent_id": 1, "children": [ { "id": 3, "label": "项目经理", "parent_id": 2, "children": null }, { "id": 4, "label": "项目助理", "parent_id": 2, "children": null }, { "id": 5, "label": "风险控制组", "parent_id": 2, "children": null } ] }, { "id": 6, "label": "市场部门", "parent_id": 1, "children": [ { "id": 7, "label": "市场分析师", "parent_id": 6, "children": null } ] }, { "id": 8, "label": "研发部门", "parent_id": 1, "children": [ { "id": 9, "label": "产品设计组", "parent_id": 8, "children": [ { "id": 10, "label": "设计工程师", "parent_id": 9, "children": null }, { "id": 11, "label": "交互设计师", "parent_id": 9, "children": null } ] }, { "id": 12, "label": "技术研发组", "parent_id": 8, "children": [ { "id": 13, "label": "软件工程师", "parent_id": 12, "children": null }, { "id": 14, "label": "硬件工程师", "parent_id": 12, "children": null }, { "id": 15, "label": "嵌入式工程师", "parent_id": 12, "children": null } ] }, { "id": 16, "label": "测试与验证组", "parent_id": 8, "children": [ { "id": 17, "label": "测试工程师", "parent_id": 16, "children": null } ] } ] } ] }
    async function orgTree() {
      try {
        const res = await new proxy.$request(proxy.$urls.m().orgTree).modeget();
        console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          // 直接赋值
          orgYan.value = res.data[0];
          orgChan.value = res.data[1];
          orgGong.value = res.data[2];
          orgXiao.value = res.data[3];
          orgFu.value = res.data[4];
          console.log('后端传来的数据');
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.log(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }
    return {
      cloneNodeDrag,
      orgYan,orgChan,orgGong,orgXiao,orgFu,
      orgTree,data,tabs
    };
  },
  created() {
    // this.toggleExpand(this.data, this.expandAll);
  },
  methods: {
    onMenus({ node, command }) {//右键菜单事件
      console.log(node, command);
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    onExpandAll(b) {
      console.log(b)
    },
    //节点拖拽事件，先不做
    nodeDragMove(data) {
      console.log(data);
    },
    beforeDragEnd(node, targetNode) {
      return new Promise((resolve, reject) => {
        if (!targetNode) reject()
        if (node.id === targetNode.id) {
          reject()
        } else {
          resolve()
        }
      })
    },
    nodeDragEnd(data, isSelf) {
      console.log(data, isSelf);
    },
    //节点双击事件
    onNodeDblclick() {
      console.log('onNodeDblclick')
    },

    expandChange() {
      // this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          item.expand = val
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        data.expand = val
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>
<style>

</style>