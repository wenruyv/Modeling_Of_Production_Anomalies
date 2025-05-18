<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><Document /></el-icon>
      <span>生产信息</span>
    </div>
    <div class="operation-area">
      <!-- 添加标签按钮单独放在外面 -->
      <el-button
          class="add-tab-btn"
          type="primary"
          @click="addNewTab"
      >
        + 添加新产品
      </el-button>
    </div>
  </div>
  <div>
    <el-tabs
        v-model="activeTabName"
        type="border-card"
    >
      <el-tab-pane
          v-for="tab in information"
          :key="tab.id"
          :label="tab.name || `未命名 ${tab.id}`"
          :name="tab.id"
          :closable="false"
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
      <div>
        <el-button
            type="danger"
            :icon="Delete"
            style="float: right; margin-right: 10px; padding: 8px"
            @click="deleteCurrentTab"
        >
        </el-button>
        <el-button
            type="primary"
            :icon="Edit"
            style="float: right; margin-right: 10px; padding: 8px"
            @click="saveCurrentTab"
        >
        </el-button>
      </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue';
import {
  Edit,
  Delete,
  Document,
} from '@element-plus/icons-vue';
import axios from "axios";

export default {
  components: {
    Document,Edit, Delete,
  },
  name: "ProductionInfoTree",
  setup() {
    const { proxy } = getCurrentInstance();
    const information = ref([]);
    const activeTabName = ref('');
    const treeOrg = ref(null);

    // 创建新的空白信息项
    const createNewInfoItem = () => {
      const tempId = 'new-' + Date.now();
      return {
        id: tempId,
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
    // 添加新标签页
    const addNewTab = () => {
      const c_username = localStorage.getItem('c_username');
      const newTab = createNewInfoItem();

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
    };
//删除标签页
    const deleteCurrentTab = async () => {
      if (information.value.length <= 1) {
        new proxy.$tips('至少保留一个标签页', 'warning').message_();
        return;
      }

      // 获取当前激活的标签页
      const currentTab = information.value.find(tab => tab.id === activeTabName.value);
      if (!currentTab) return;

      if (confirm(`确定要删除产品【${currentTab.name}】吗？`)) {
        try {
          // 调用后端删除接口（使用数据中的id字段）
          await new proxy.$request(proxy.$urls.m().deleteProInfo + `/${currentTab.id}`).modedelete();

          // 更新前端数据
          information.value = information.value.filter(tab => tab.id !== currentTab.id);

          // 修改这里：总是切换到第一个标签页
          if (information.value.length > 0) {
            activeTabName.value = information.value[0].id;
          }

          new proxy.$tips('删除成功', 'success').message_();
        } catch (error) {
          console.error('删除失败:', error);
          new proxy.$tips('删除失败', 'error').message_();
        }
      }
    }
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

        // 检查是否是临时ID（新创建的标签页）
        const isNewTab = String(currentTab.id).startsWith('new-');

        let res;
        if (!isNewTab) {
          try {
            // 先尝试获取该ID是否存在
            const checkRes = await new proxy.$request(proxy.$urls.m().getProInfoById + `/${currentTab.id}`).modeget();

            if (checkRes.data) {
              // 如果存在，执行更新
              res = await new proxy.$request(proxy.$urls.m().updateProInfo, saveData).modepost();
            } else {
              // 如果不存在，执行新增
              const { id: tempId, ...dataToSave } = saveData;
              res = await new proxy.$request(proxy.$urls.m().addProInfo, dataToSave).modepost();
            }
          } catch (error) {
            console.error('检查数据存在性失败:', error);
            // 检查失败时默认执行新增
            const { id: tempId, ...dataToSave } = saveData;
            res = await new proxy.$request(proxy.$urls.m().addProInfo, dataToSave).modepost();
          }
        } else {
          // 新标签页直接执行新增
          const { id: tempId, ...dataToSave } = saveData;
          res = await new proxy.$request(proxy.$urls.m().addProInfo, dataToSave).modepost();
        }

        if (res.data == 1 || res.data?.id) {


          // 更新本地数据
          const index = information.value.findIndex(tab => tab.id === activeTabName.value);
          if (index !== -1) {
            // 如果是新增操作且返回了新ID，更新本地ID
            if ((isNewTab || !currentTab.id) && res.data?.id) {
              information.value[index] = {
                ...currentTab,
                id: res.data.id, // 使用后端返回的真实ID
                info: currentTab.info // 保持info为对象
              };
              activeTabName.value = res.data.id; // 更新活动标签页ID
            } else {
              // 更新操作
              information.value[index] = {
                ...saveData,
                info: currentTab.info
              };
            }
          }
          //在更新完本地数据后再显示保存成功
          new proxy.$tips('保存成功', 'success').message_();
          await fetchProductionInfo();
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
      Edit,Delete,Document,
      saveCurrentTab,
      onNodeFocus,onMenus,onNodeBlur,
      treeOrg,addNewTab,deleteCurrentTab
    };
  }
};
</script>

<style>
.heading {
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #303133;
}

.heading .el-icon {
  margin-right: 8px;
  font-size: 24px;
  color: #409EFF;
}
.el-tabs__new-tab {
  margin-right: 10px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operation-area {
  display: flex;
  gap: 15px;
}
</style>