<template>
  <div class="heading">部门结构图</div>
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

export default {
  name: "baseTree",
  components: {
    ElSwitch,
    ElColorPicker,

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
        const res1 = await new proxy.$request(proxy.$urls.m().loadDep + '?d_username=' + d_username).modeget();
        const com_id = res1.data.com_id;
        const targetDepName = res1.data.department;

        const res = await new proxy.$request(proxy.$urls.m().orgById + '?id=' + com_id).modeget();

        if (res?.data?.length) {
          // 新方法：查找目标部门节点
          const findTargetDepartment = (nodes) => {
            for (const node of nodes) {
              if (node.label === targetDepName) return node;
              if (node.children) {
                const found = findTargetDepartment(node.children);
                if (found) return found;
              }
            }
            return null;
          };

          // 在所有部门树中搜索目标部门
          let targetDep = null;
          for (const dept of res.data) {
            targetDep = findTargetDepartment([dept]);
            if (targetDep) break;
          }

          // 如果找到目标部门，构造符合组件要求的单根树结构
          if (targetDep) {
            dep.value = {
              label: targetDep.label,
              children: targetDep.children || [],
              // 保留其他必要属性
              ...targetDep
            };
          } else {
            console.warn(`未找到匹配的部门: ${targetDepName}`);
          }
        }
      } catch (error) {
        console.error('获取数据出错:', error);
        new proxy.$tips('服务器发生错误', 'error').message_();
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