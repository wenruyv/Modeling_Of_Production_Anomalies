<template>
  <div className="heading">生产信息</div>
  <div>
    <el-tabs
        v-model="activeTabName"
        editable
        @edit="handleTabsEdit"
        type="border-card"
    >
      <el-tab-pane
          v-for="tab in information"
          :key="tab.name"
          :label="tab.label || `Tab ${tab.name}`"
          :name="tab.name"
          style="height: 410px; width: 100%;"
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
        >
        </vue3-tree-org>
        <el-button type="primary" :icon="Edit" style="float: right;margin-right: 10px;padding: 8px" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { Edit } from '@element-plus/icons-vue';
export default {

  name: "BaseTree",
  setup() {
    const { proxy } = getCurrentInstance();
    const information = ref([]);
    const activeTabName = ref('');
    let tabCounter = 0;

    // 初始化或获取数据
    onMounted(() => {
      informationTree();
    });

    async function informationTree() {
      try {
        const res = await new proxy.$request(proxy.$urls.m().informationTree).modeget();
        if (res?.data && Array.isArray(res.data)) {
          information.value = res.data.map((item, index) => ({
            ...item,
            name: `${index + 1}` // 确保每个标签页有唯一的 name
          }));
          activeTabName.value = information.value[0]?.name || '';
          tabCounter = information.value.length;
        } else {
          new proxy.$tips('数据格式不正确', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }

    // 处理标签页的添加/删除
    const handleTabsEdit = (targetName, action) => {
      if (action === 'add') {
        const newTabName = `${++tabCounter}`;
        information.value.push({
          name: newTabName,
          label: `New Tab ${newTabName}`,
          // 其他默认数据...
        });
        activeTabName.value = newTabName;
      } else if (action === 'remove') {
        if (information.value.length <= 1) {
          new proxy.$tips('至少保留一个标签页', 'warning').message_();
          return;
        }

        const tabs = information.value;
        let newActiveName = activeTabName.value;

        if (newActiveName === targetName) {
          const targetIndex = tabs.findIndex(tab => tab.name === targetName);
          const nextTab = tabs[targetIndex + 1] || tabs[targetIndex - 1];
          if (nextTab) {
            newActiveName = nextTab.name;
          }
        }

        information.value = tabs.filter(tab => tab.name !== targetName);
        activeTabName.value = newActiveName;
      }
    };

    return {
      information,
      activeTabName,
      handleTabsEdit,
      Edit,
    };
  },
  methods: {
    onMenus({ node, command }) {
      console.log(node, command);
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    onNodeDblclick() {
      console.log('onNodeDblclick');
    },
  },
};
</script>

<style>
.el-tabs__new-tab {
  margin-right: 10px;
}
</style>