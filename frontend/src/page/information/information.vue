<template>
  <div className="heading">生产信息</div>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane
          v-for="(tab, index) in information"
          :key="index"
          :label="tab.label"
          style="height: 450px; width: 100%;"
      >
        <vue3-tree-org
            :data="tab"
            center
            default-expand-level="1"
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
</template>

<script>
import {ElSwitch, ElColorPicker} from 'element-plus'
import {getCurrentInstance, onMounted, ref} from 'vue'

export default {
  name: "baseTree",
  components: {
    ElSwitch,
    ElColorPicker,

  },
  setup() {
    const {proxy} = getCurrentInstance();
    const information = ref([]); // 初始值为空数组
    const cloneNodeDrag = ref(true);
    // 请求数据
    onMounted(() => {
      informationTree();
    });

    async function informationTree() {
      try {
        const res = await new proxy.$request(proxy.$urls.m().informationTree).modeget();
        console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          // 直接赋值
          information.value = res.data;
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
      information,
    };
  },
  created() {
    // this.toggleExpand(this.data, this.expandAll);
  },
  methods: {
    onMenus({node, command}) {
      console.log(node, command);
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    onExpandAll(b) {
      console.log(b)
    },

    onNodeDblclick() {
      console.log('onNodeDblclick')
    },

  },
};
</script>

<style>
</style>