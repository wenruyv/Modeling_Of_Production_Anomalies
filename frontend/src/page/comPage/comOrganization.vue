<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><OfficeBuilding /></el-icon>
      <span>组织结构</span>
    </div>
  </div>

  <div>
    <el-tabs type="border-card">
      <el-tab-pane
          :label="organization.label"
          style="height: 430px; width: 100%;"
      >
        <vue3-tree-org
            ref="treeOrg"
            :data="organization"
            center
            default-expand-level="10"
            :horizontal="false"
            :collapsable="true"
            label-style="background: #fff; color: #5e6d82"
            :node-draggable="false"
            @on-node-dblclick="onNodeDblclick"
        ></vue3-tree-org>
        <el-button
            type="primary"
            :icon="Edit"
            style="float: right; margin-right: 10px; ;padding: 8px"
            @click="saveOrganization"
        >
        </el-button>
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
import { getCurrentInstance, onMounted, ref } from 'vue';
import { Edit, OfficeBuilding } from '@element-plus/icons-vue';

export default {
  components: { Edit, OfficeBuilding },
  name: "OrganizationTree",
  setup() {
    const { proxy } = getCurrentInstance();
    const organization = ref({});
    const treeOrg = ref(null);
    const detailDialogVisible = ref(false);
    const currentNode = ref({});

    const loadOrganization = async () => {
      try {
        const c_username = localStorage.getItem('c_username');
        if (!c_username) {
          new proxy.$tips('未找到账户信息', 'error').message_();
          return;
        }

        // 1. 获取公司信息
        const companyRes = await new proxy.$request(
            proxy.$urls.m().loadCompany + '?c_username=' + c_username
        ).modeget();

        // 2. 获取部门列表
        const depRes = await new proxy.$request(
            proxy.$urls.m().departmentList + '?com_id=' + companyRes.data.id
        ).modeget();

        let orgData = {};

        if (companyRes.data?.c_org) {
          // 解析 JSON 字符串
          orgData = JSON.parse(companyRes.data.c_org);

          // 确保数据结构符合要求
          if (!orgData.id) {
            // 如果数据没有根节点，创建一个
            orgData = {
              id: 'root',
              label: companyRes.data.name || '公司名称',
              children: Array.isArray(orgData) ? orgData : [orgData],
              expand: true
            };
          } else {
            // 如果已有根节点，强制更新label
            orgData = {
              ...orgData,
              label: companyRes.data.name || '公司名称',
              expand: true
            };
          }
        } else {
          // 如果没有c_org数据，从org_all表获取
          const orgAllRes = await new proxy.$request(
              proxy.$urls.m().findInfo +
              `?com_type=${companyRes.data.type}&size=${companyRes.data.size}`
          ).modeget();

          orgData = orgAllRes.data && orgAllRes.data.info
              ? (typeof orgAllRes.data.info === 'string'
                  ? JSON.parse(orgAllRes.data.info)
                  : orgAllRes.data.info)
              : {
                id: 'root',
                label: companyRes.data.name || '公司名称',
                children: [],
                expand: true
              };

          // 确保是单根结构
          if (Array.isArray(orgData)) {
            orgData = {
              id: 'root',
              label: companyRes.data.name || '公司名称',
              children: orgData,
              expand: true
            };
          }
        }

        // 合并部门信息
        const mergeDepartmentInfo = (node, departments) => {
          const depInfo = departments.find(dep => dep.department === node.label);
          if (depInfo) {
            node.d_name = depInfo.d_name;
            node.location = depInfo.location;
            node.description = depInfo.description;
          }

          if (node.children) {
            node.children.forEach(child => mergeDepartmentInfo(child, departments));
          }
          return node;
        };

        // 最终处理
        organization.value = mergeDepartmentInfo(orgData, depRes.data || []);

        // 再次确保根节点label正确
        if (organization.value) {
          organization.value.label = companyRes.data.name || '公司名称';
        }

        console.log('最终组织结构:', organization.value);
        new proxy.$tips('加载组织结构成功', 'success').message_();
      } catch (error) {
        console.error('加载失败:', error);
        new proxy.$tips('加载组织结构失败', 'error').message_();
      }
    };


    // 保存组织结构到公司表
    const saveOrganization = async () => {
      try {
        const c_username = localStorage.getItem('c_username');
        if (!c_username) {
          new proxy.$tips('未找到账户信息', 'error').message_();
          return;
        }

        const formData = new FormData();
        formData.append('c_username', c_username);
        formData.append('c_org', JSON.stringify(organization.value));

        const res = await new proxy.$request(
            proxy.$urls.m().updateC_org,
            formData
        ).modepost();

        if (res.data == 1) {
          new proxy.$tips('保存成功', 'success').message_();
        } else {
          new proxy.$tips('保存失败', 'error').message_();
        }
      } catch (error) {
        console.error(error);
        new proxy.$tips('保存失败', 'error').message_();
      }
    };

    // 双击节点显示详情
    const onNodeDblclick = (e, data) => {
      if (data.id !== 'root') { // 排除根节点
        currentNode.value = data;
        detailDialogVisible.value = true;
      }
    };

    onMounted(() => {
      loadOrganization();
    });

    return {
      organization,
      treeOrg,
      Edit,
      saveOrganization,
      onNodeDblclick,
      detailDialogVisible,
      currentNode
    };
  }
};
</script>

<style>
</style>