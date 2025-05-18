<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><OfficeBuilding /></el-icon>
      <span>部门结构图</span>
    </div>
  </div>
  <div style="height: 520px; width: 100%;">
    <el-tabs type="border-card">
      <el-tab-pane
          :label="dep.label"
          style="height: 450px; width: 100%;"
      >
        <vue3-tree-org
            :data="dep"
            center
            :default-expand-level= 10
            :horizontal="false"
            :collapsable="true"
            :only-one-node="false"
            label-style="background: #fff; color: #5e6d82"
            :clone-node-drag="cloneNodeDrag"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ElSwitch, ElColorPicker } from 'element-plus'
import {getCurrentInstance, onMounted, ref} from 'vue'
import {OfficeBuilding} from "@element-plus/icons-vue";
export default {
  name: "baseTree",
  components: {
    ElSwitch,
    ElColorPicker,
    OfficeBuilding,

  },
  setup() {
    const { proxy } = getCurrentInstance();
    const dep = ref([]); // 初始值为空数组

    const cloneNodeDrag = ref(true);
    // 请求数据
    onMounted(() => {
      resTree();
    });
    //搜索部门结构
    async function resTree() {
      try {
        const d_username = localStorage.getItem('d_username');
        const res1 = await new proxy.$request(
            proxy.$urls.m().loadDep + '?d_username=' + d_username
        ).modeget();

        const com_id = res1.data.com_id;
        const targetDepName = res1.data.department;

        const res = await new proxy.$request(
            proxy.$urls.m().orgById + '?id=' + com_id
        ).modeget();

        if (res?.data) {
          const orgData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

          // 查找目标部门
          const findTargetDepartment = (node) => {
            if (node.label === targetDepName) return node;
            if (node.children) {
              for (const child of node.children) {
                const found = findTargetDepartment(child);
                if (found) return found;
              }
            }
            return null;
          };

          const targetDep = findTargetDepartment(orgData);

          if (targetDep) {
            // 标准化数据结构
            const normalizeNode = (node) => ({
              ...node,
              expand: true,
              children: node.children ? node.children.map(normalizeNode) : []
            });

            dep.value = normalizeNode(targetDep);
            console.log('最终树形数据:', dep.value);
          } else {
            console.warn('未找到部门:', targetDepName);
            dep.value = { label: '无部门数据', children: [] }; // 空状态处理
          }
        }
      } catch (error) {
        console.error('加载失败:', error);
        dep.value = { label: '数据加载失败', children: [] };
      }
    }
    return {
      cloneNodeDrag,
      dep,
      resTree,
    };
  },

};
</script>

<style>
</style>