<template>
  <div className="heading">组织结构</div>
  <div>{{organization}}</div>
  <div>
    <el-tabs
        v-model="activeTabName"
        editable
        @edit="handleTabsEdit"
        type="border-card"
    >
      <el-tab-pane
          v-for="tab in organization"
          :key="tab.name"
          :label="tab.label || `Tab ${tab.name}`"
          :name="tab.name"
          style="height: 410px; width: 100%;"
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
        >
        </vue3-tree-org>
        <el-button type="primary" :icon="Edit" style="float: right;margin-right: 10px;padding: 8px" @click="updateOrg"/>
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
    const organization = ref([]);
    const activeTabName = ref('');
    // 从localStorage初始化tabCounter，如果没有则设为0
    let tabCounter = ref(parseInt(localStorage.getItem('tabCounter')) || 0);

    async function organizationTree() {
      try {
        const c_username = localStorage.getItem('c_username');
        const res1 = await new proxy.$request(proxy.$urls.m().isEmptyOrg  + '?c_username=' + c_username).modeget();
        console.log(res1);
        if(res1.data == "" || res1.data == null){
          console.log("res1是空的");
          const res = await new proxy.$request(proxy.$urls.m().orgTree).modeget();
          if (res?.data && Array.isArray(res.data)) {
            // 计算现有标签中的最大编号
            const maxTabNumber = res.data.reduce((max, item) => {
              const num = parseInt(item.name);
              return isNaN(num) ? max : Math.max(max, num);
            }, 0);

            // 更新tabCounter为最大编号
            tabCounter.value = maxTabNumber;
            localStorage.setItem('tabCounter', maxTabNumber.toString());

            organization.value = res.data.map(item => ({
              ...item,
              name: item.name || `${++tabCounter.value}`, // 保留原有名称或生成新编号
              expand: true
            }));

            activeTabName.value = organization.value[0]?.name || '';
          }
        }else{
          // 对于已有数据，同样计算最大编号
          const maxTabNumber = res1.data.reduce((max, item) => {
            const num = parseInt(item.name);
            return isNaN(num) ? max : Math.max(max, num);
          }, 0);

          tabCounter.value = maxTabNumber;
          localStorage.setItem('tabCounter', maxTabNumber.toString());

          organization.value = res1.data;
          activeTabName.value = organization.value[0]?.name || '';

        }

      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }

    // 处理标签页的添加/删除
    const handleTabsEdit = (targetName, action) => {
      if (action === 'add') {
        // 增加标签时更新计数器并存储
        tabCounter.value += 1;  // 使用.value访问ref的值
        localStorage.setItem('tabCounter', tabCounter.value.toString());
        const newTabName = `${tabCounter.value}`;
        organization.value.push({
          name: newTabName,
          label: `New Tab ${newTabName}`,
          expand: true

        });
        activeTabName.value = newTabName;
      } else if (action === 'remove') {
        if (organization.value.length <= 1) {
          new proxy.$tips('至少保留一个标签页', 'warning').message_();
          return;
        }

        const tabs = organization.value;
        let newActiveName = activeTabName.value;

        if (newActiveName === targetName) {
          const targetIndex = tabs.findIndex(tab => tab.name === targetName);
          const nextTab = tabs[targetIndex + 1] || tabs[targetIndex - 1];
          if (nextTab) {
            newActiveName = nextTab.name;
          }
        }

        organization.value = tabs.filter(tab => tab.name !== targetName);
        activeTabName.value = newActiveName;
      }
    };
    //修改组织结构
    const updateOrg = async () => {
      try {
        // 发送修改请求
        const c_username = localStorage.getItem('c_username');
        // 方法2：作为表单数据发送（推荐）
        const formData = new FormData();
        formData.append('c_username', c_username);
        formData.append('c_org', JSON.stringify(organization.value));
        const res = await new proxy.$request(proxy.$urls.m().updateC_org, formData).modepost();
        console.log(res);
        if (res.data == 1) {
          new proxy.$tips('修改成功', 'success').message_();
          await organizationTree();

        } else {
          new proxy.$tips('修改失败', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    };
    // 初始化或获取数据
    onMounted(() => {
      organizationTree();
    });
    return {
      organization,
      activeTabName,
      handleTabsEdit,
      Edit,
      updateOrg
    };
  },
  methods: {
    onMenus({node, command}) {
      console.log(node, command);

    },
    onExpand(e, data) {
      console.log(e, data);
    },
    onNodeDblclick() {
      console.log('onNodeDblclick');
    },
  }
};
</script>

<style>
.el-tabs__new-tab {
  margin-right: 10px;
}
</style>