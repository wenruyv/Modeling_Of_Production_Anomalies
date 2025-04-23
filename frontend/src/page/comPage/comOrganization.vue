<template>
  <div className="heading">组织结构</div>
  <div>
    <el-tabs
        v-model="activeTabName"
        editable
        @edit="handleTabsEdit"
        type="border-card"
    >
      <el-tab-pane
          v-for="tab in tempOrganization"
          :key="tab.name"
          :label="tab.label || `Tab ${tab.name}`"
          :name="tab.name"
          style="height: 410px; width: 100%;"
      >
        <vue3-tree-org ref="treeOrg"
                       :data="tab"
                       center
                       default-expand-level="10"
                       :horizontal="false"
                       :collapsable="true"
                       label-style="background: #fff; color: #5e6d82"
                       :node-draggable="false"
                       @on-contextmenu="onMenus"
                       @on-expand="onExpand"
                       @on-node-focus="onNodeFocus"
                       @on-node-dblclick="onNodeDblclick"
        >
        </vue3-tree-org>
        <el-button type="primary" :icon="Edit" style="float: right;margin-right: 10px;padding: 8px" @click="updateOrg"/>
      </el-tab-pane>
    </el-tabs>

    <!-- 部门详情弹窗 -->
    <el-dialog v-model="detailDialogVisible" title="部门详情" width="30%">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="部门名称">{{ currentNode.label }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ currentNode.d_name || '无' }}</el-descriptions-item>
        <el-descriptions-item label="办公地点">{{ currentNode.location || '无' }}</el-descriptions-item>
        <el-descriptions-item label="部门描述">{{ currentNode.description || '无' }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive, ref, watch} from 'vue';
import { Edit } from '@element-plus/icons-vue';
export default {
  name: "BaseTree",
  setup() {
    const { proxy } = getCurrentInstance();
    const organization = ref([]);
    const tempOrganization = ref([]);
    const activeTabName = ref('');
    let tabCounter = ref(parseInt(localStorage.getItem('tabCounter')) || 0 );

    // 公司信息
    const company = reactive({
      name: '',
      location: '',
      type: '',
      established_date: '',
      phone: '',
      email: '',
      ceo_name: '',
      web: '',
      c_username: '',
      c_password: '',
      introduction: '',
    });

    // 详情弹窗相关
    const detailDialogVisible = ref(false);
    const currentNode = ref({});

    // 创建公司根节点结构
    const createCompanyRoot = () => {
      return {
        name: 'company_root',
        label: company.name || '公司根节点',
        expand: true,
        children: organization
      };
    };

    // 合并公司信息和组织结构
    const mergeOrganization = () => {
      if (company.name) {
        const companyRoot = createCompanyRoot();
        tempOrganization.value = [companyRoot, ...organization.value];
        activeTabName.value = tempOrganization.value[0]?.name || '';
      } else {
        tempOrganization.value = [...organization.value];
      }
    };

    // 监听company和organization的变化
    watch([() => company.name, organization], () => {
      mergeOrganization();
    }, { deep: true });

    // 加载公司信息
    const loadCompanyInfo = async () => {
      try {
        const c_username = localStorage.getItem('c_username');
        if (!c_username) {
          new proxy.$tips('未找到账户信息', 'error').message_();
          return;
        }
        const res = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        console.log(res);
        if (res && res.data) {
          Object.assign(company, res.data);
        } else {
          new proxy.$tips('获取公司信息失败', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    };

    async function organizationTree() {
      try {
        const c_username = localStorage.getItem('c_username');
        const res1 = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        const com_id = res1.data.id;

        const [orgRes, depRes] = await Promise.all([
          new proxy.$request(proxy.$urls.m().isEmptyOrg + '?c_username=' + c_username).modeget(),
          new proxy.$request(proxy.$urls.m().departmentList + '?com_id=' + com_id).modeget()
        ]);

        // 处理组织树数据，将顶级节点作为独立标签页
        const processOrgData = (data) => {
          if (!Array.isArray(data)) return [data];

          // 合并部门信息
          const mergeDepartmentInfo = (nodes, departments) => {
            return nodes.map(node => {
              const depInfo = departments.find(dep => dep.department === node.label);
              const newNode = {
                ...node,
                id: node.id, // 使用原有ID
                name: node.label, // 使用label作为标签页名称
                d_name: depInfo?.d_name,
                location: depInfo?.location,
                description: depInfo?.description,
                expand: true
              };
              if (node.children) {
                newNode.children = mergeDepartmentInfo(node.children, departments);
              }
              return newNode;
            });
          };

          const departments = depRes.data || [];
          return mergeDepartmentInfo(data, departments);
        };

        if (orgRes.data && Array.isArray(orgRes.data)) {
          organization.value = processOrgData(orgRes.data);
        } else {
          const res = await new proxy.$request(proxy.$urls.m().orgTree).modeget();
          organization.value = processOrgData(res.data);
        }

        // 设置第一个标签页为活动状态
        if (organization.value.length > 0) {
          activeTabName.value = organization.value[0].id;
        }

        mergeOrganization();
      } catch (error) {
        console.error(error);
        new proxy.$tips('服务器发生错误', 'error').message_();
      }
    }
// 修改 handleTabsEdit 函数
    const handleTabsEdit = (targetName, action) => {
      if (action === 'add') {
        tabCounter.value += 1;
        localStorage.setItem('tabCounter', tabCounter.value.toString());
        const newTabName = `${tabCounter.value}`;
        organization.value.push({
          name: newTabName,
          label: `New Tab ${newTabName}`,
          expand: true
        });
        mergeOrganization();
        activeTabName.value = newTabName;
      } else if (action === 'remove') {
        if (tempOrganization.value.length <= 1) {
          new proxy.$tips('至少保留一个标签页', 'warning').message_();
          return;
        }

        if (targetName === 'company_root') {
          new proxy.$tips('不能删除公司根节点', 'warning').message_();
          return;
        }

        const tabs = tempOrganization.value;
        let newActiveName = activeTabName.value;

        if (newActiveName === targetName) {
          const targetIndex = tabs.findIndex(tab => tab.name === targetName);
          const nextTab = tabs[targetIndex + 1] || tabs[targetIndex - 1];
          if (nextTab) {
            newActiveName = nextTab.name;
          }
        }

        // 修改这里：同时从 organization 和 tempOrganization 中删除
        organization.value = organization.value.filter(tab => tab.name !== targetName);
        tempOrganization.value = tempOrganization.value.filter(tab => tab.name !== targetName);

        activeTabName.value = newActiveName;
      }
    };
    //修改组织结构
    const updateOrg = async () => {
      try {
        const c_username = localStorage.getItem('c_username');
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
      loadCompanyInfo();
    });

    return {
      organization,
      tempOrganization,
      activeTabName,
      handleTabsEdit,
      Edit,
      updateOrg,
      company,
      detailDialogVisible,
      currentNode
    };
  },
  methods: {
    onMenus({command, node}) {
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    onNodeFocus(e,data){
      console.log("焦点");
      console.log(data);
      data.expand = true;
      console.log(data);
    },
    onNodeDblclick(e, data) {
      // 检查是否是公司根节点的直接子节点（一级部门）
      const isFirstLevelNode = this.tempOrganization.some(tab =>
          tab.children && tab.children.some(child => child === data)
      );

      if (isFirstLevelNode) {
        this.currentNode = data;
        this.detailDialogVisible = true;
        console.log("双击");
      } else {
        // 非一级节点，可以添加其他处理或什么都不做
        console.log('双击的不是一级部门节点');
      }
    },
  }
};
</script>

<style>
.el-tabs__new-tab {
  margin-right: 10px;
}
.node-label {
  display: flex;
  align-items: center;
}

.manager-name {
  margin-left: 5px;
  color: #67C23A;
  font-size: 0.9em;
}
</style>