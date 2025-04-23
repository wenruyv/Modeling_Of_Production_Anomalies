<template>
  <div class="heading">生产信息</div>
  <div>
    <el-tabs
        v-model="activeTabName"
        editable
        @edit="handleTabsEdit"
        type="border-card"
    >
      <el-tab-pane
          v-for="tab in information"
          :key="tab.id"
          :label="tab.name || `未命名 ${tab.id}`"
          :name="tab.id"
          style="height: 410px; width: 100%;"
      >
        <vue3-tree-org
            ref="treeOrg"
            :data="tab.info"
            center
            default-expand-level="10"
            :horizontal="false"
            :collapsable="true"
            label-style="background: #fff; color: #5e6d82"
            :node-draggable="false"
            @on-node-focus="onNodeFocus"
            @on-contextmenu="onMenus"
            @on-node-blur="onNodeBlur"
        >
        </vue3-tree-org>
        <el-button
            type="primary"
            :icon="Edit"
            style="float: right; margin-right: 10px; padding: 8px"
            @click="saveCurrentTab"
        >
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { Edit } from '@element-plus/icons-vue';

export default {
  name: "ProductionInfoTree",
  setup() {
    const { proxy } = getCurrentInstance();
    const information = ref([]);
    const activeTabName = ref('');
    const treeOrg = ref(null);

// 创建新的空白信息项
    const createNewInfoItem = () => {
      const tempId = 'new-' + Date.now(); // 使用临时ID
      return {
        id: tempId, // 使用临时ID，保存后会替换为真实ID
        name: '新产品',
        info: {
          id: 'root',
          label: '新产品',
          children: []
        }
      };
    };
    // 获取数据
    const fetchProductionInfo = async () => {
      try {
        const c_username = localStorage.getItem('c_username');
        // 1. 先获取公司名称
        const res1 = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        const c_id = res1.data.id;
        const c_name = res1.data.name;
        // 2. 根据公司名称获取生产信息
        const res = await new proxy.$request(proxy.$urls.m().proInfo + '?c_id=' + c_id).modeget();

        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          information.value = res.data.map(item => ({
            ...item,
            c_name: c_name,
            info: typeof item.info === 'string' ? JSON.parse(item.info) : item.info
          }));
          activeTabName.value = information.value[0].id;
        } else {
          // 如果获取信息为空，创建一个新的空白标签页
          const newTab = createNewInfoItem();
          newTab.c_id = c_id;
          newTab.c_name = c_name;
          information.value = [newTab];
          activeTabName.value = 'new-' + Date.now(); // 临时标识
          // 默认聚焦第一个标签页
          activeTabName.value = information.value[0].id;
          new proxy.$tips('没有找到生产信息，已创建新模板', 'info').message_();

        }
      } catch (error) {
        console.error('获取生产信息失败:', error);
        new proxy.$tips('获取生产信息失败', 'error').message_();
      }
    };

// 处理标签页的添加/删除
    const handleTabsEdit = (targetName, action) => {
      if (action === 'add') {
        const c_username = localStorage.getItem('c_username');
        const newTab = createNewInfoItem();

        // 立即添加并激活新标签页
        information.value.push(newTab);
        activeTabName.value = newTab.id;

        // 设置公司信息
        new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username)
            .modeget()
            .then(res1 => {
              newTab.c_id = res1.data.id;
              newTab.c_name = res1.data.name;
            })
            .catch(error => {
              proxy.$tips('加载公司信息失败', 'error').message_();
            });

      } else if (action === 'remove') {
        if (information.value.length <= 1) {
          new proxy.$tips('至少保留一个标签页', 'warning').message_();
          return;
        }

        const tabs = information.value;
        let newActiveName = activeTabName.value;

        if (newActiveName === targetName) {
          const targetIndex = tabs.findIndex(tab => tab.id === targetName);
          const nextTab = tabs[targetIndex + 1] || tabs[targetIndex - 1];
          if (nextTab) {
            newActiveName = nextTab.id;
          }
        }

        information.value = information.value.filter(tab => tab.id !== targetName);
        activeTabName.value = newActiveName;
      }
    };
    // 保存当前标签页
    const saveCurrentTab = async () => {
      try {
        // 使用严格相等比较，不再转换为字符串
        const currentTab = information.value.find(tab => tab.id === activeTabName.value);

        if (!currentTab) {
          new proxy.$tips('未找到当前标签页', 'error').message_();
          return;
        }

        // 准备要保存的数据
        const saveData = {
          ...currentTab,
          info: JSON.stringify(currentTab.info)  // 确保info是字符串
        };
        // 根据是否是临时ID决定是新增还是更新
        // 确保id是字符串（处理null/undefined/数字等情况）
        const currentId = String(currentTab.id || '');
        const isNewTab = currentId.startsWith('new-'); // 现在安全了

        let res;
        if (!isNewTab ) {
          // 更新已有数据
          res = await new proxy.$request(proxy.$urls.m().updateProInfo, saveData).modepost();
        } else {
          // 插入新数据
          // 插入新数据 - 移除临时ID，让后端生成新ID
          const { id: tempId, ...dataToSave } = saveData;
          res = await new proxy.$request(proxy.$urls.m().addProInfo, dataToSave).modepost();
        }

        if (res.data == 1) {
          new proxy.$tips('保存成功', 'success').message_();
          // 更新本地数据
          const index = information.value.findIndex(tab => tab.id === activeTabName.value);

          if (index !== -1) {
            // 如果是新插入的数据，更新ID
            if (isNewTab && res.data?.id) {
              information.value[index] = {
                ...currentTab,
                id: res.data.id, // 使用后端返回的真实ID
                info: currentTab.info // 保持info为对象
              };
              activeTabName.value = res.data.id; // 更新活动标签页ID
            } else {
              // 更新已有数据
              information.value[index] = {
                ...saveData,
                info: currentTab.info
              };
            }
          }
        } else {
          new proxy.$tips('保存失败: ' + (res?.msg || ''), 'error').message_();
        }
      } catch (error) {
        console.error('保存失败:', error);
        new proxy.$tips('保存失败', 'error').message_();
      }
    };
    const onNodeBlur = (e, data) => {
      // 只有当节点是根节点时才更新标签页名称
      const currentTab = information.value.find(tab =>
          tab.id == activeTabName.value
      );
      if (data.id == 'root') {
        // 找到当前活动的标签页
        if (currentTab) {
          currentTab.name = data.label;
        }
      }
    };
    const onMenus = ({command, node}) => {

    };
    const onNodeFocus = (e, data) => {
      data.expand = true;
    };

    onMounted(() => {
      fetchProductionInfo();
    });

    return {
      information,
      handleTabsEdit,
      activeTabName,
      Edit,
      saveCurrentTab,
      onNodeFocus,onMenus,onNodeBlur,
      treeOrg
    };
  }
};
</script>

<style>
.heading {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}
.el-tabs__new-tab {
  margin-right: 10px;
}
</style>