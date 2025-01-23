<template>
  <div class="ordering">
    <ElMenu mode="horizontal" :theme="theme" :active-index="active">
      <router-link :to="{ path: '/relation/bpmn-viewer' }">
        <ElMenuItem index="bpmn-viewer">
          <ElIcon>
            <Box />
          </ElIcon>
          流程演示器
        </ElMenuItem>
      </router-link>
      <router-link :to="{ path: '/relation/bpmn-modeler' }">
        <ElMenuItem index="bpmn-modeler">
          <ElIcon>
            <Film />
          </ElIcon>
          流程绘制器
        </ElMenuItem>
      </router-link>
    </ElMenu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus';
import { Box, Film } from '@element-plus/icons-vue';

const theme = ref('light');
const active = ref('bpmn-modeler');

const route = useRoute();

watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/relation/')) {
    active.value = newPath.replace('/relation/', '');
  } else {
    active.value = '';
  }
});
</script>

<style scoped>
/* 可添加样式 */
</style>