<template>
  <div class="heading">生产资源结构图</div>
  <div style="height: 520px; width: 100%;">
    <vue3-tree-org
        :data="resource"
        center
        default-expand-level="1"
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
    const resource = ref([]); // 初始值为空数组

    const cloneNodeDrag = ref(true);
    // 请求数据
    onMounted(() => {
      resTree();
    });

    async function resTree() {
      try {
        const res = await new proxy.$request(proxy.$urls.m().resourceTree).modeget();
        console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          // 直接赋值
          resource.value = res.data[0];
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
      resource,
      resTree,
    };
  },
  created() {
    // this.toggleExpand(this.data, this.expandAll);
  },
  methods: {
    onMenus({ node, command }) {
      console.log(node, command);
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    onExpandAll(b) {
      console.log(b)
    },
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