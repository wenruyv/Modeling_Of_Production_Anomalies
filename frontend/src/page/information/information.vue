<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><Document /></el-icon>
      <span>生产信息</span>
    </div>
    <div class="operation-area">
    </div>
  </div>
  <div>
    <el-tabs
        v-model="activeTabName"
        type="border-card">
      <el-tab-pane
          v-for="tab in groupedInformation"
          :key="tab.c_name"
          :label="tab.c_name"
          :name="tab.c_name"
      >
        <el-carousel
            :autoplay="false"
            height="430px"
            indicator-position="outside"
            arrow="always">
          <el-carousel-item v-for="(item, index) in tab.items" :key="index">
            <div class="carousel-item">
<!--              <div class="company-name">{{ item.c_name }}</div>-->
              <vue3-tree-org
                  :data="item.info"
                  center
                  default-expand-level="10"
                  :horizontal="false"
                  :collapsable="true"
                  label-style="background: #fff; color: #5e6d82"
                  :node-draggable="false"
                  @on-node-focus="onNodeFocus"
                  @on-contextmenu="onMenus"
              >
              </vue3-tree-org>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref, computed } from 'vue';
import {Edit, Document, OfficeBuilding} from '@element-plus/icons-vue';


export default {
  components: {Edit,Document,OfficeBuilding},
  name: "ProductionInfoTree",
  setup() {
    const { proxy } = getCurrentInstance();
    const information = ref([]);
    const activeTabName = ref('');
    const treeOrg = ref(null);

    // 计算属性：按名称分组数据
    const groupedInformation = computed(() => {
      const groups = {};
      information.value.forEach(item => {
        if (!groups[item.c_name]) {
          groups[item.c_name] = {
            c_name: item.c_name,
            items: []
          };
        }
        groups[item.c_name].items.push(item);
      });
      return Object.values(groups);
    });

    // 获取数据
    const fetchProductionInfo = async () => {
      try {
        const c_username = localStorage.getItem('c_username');
        // 1. 先获取公司名称
        const res1 = await new proxy.$request(proxy.$urls.m().loadCompany + '?c_username=' + c_username).modeget();
        const c_id = res1.data.id;
        const c_name = res1.data.name;
        // 2. 根据公司名称获取生产信息
        const res = await new proxy.$request(proxy.$urls.m().proList).modeget();

        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          information.value = res.data.map(item => ({
            ...item,
            c_name: item.c_name, // 使用后端返回的公司名称
            info: typeof item.info === 'string' ? JSON.parse(item.info) : item.info
          }));
          // 设置第一个标签页为第一个分组的名称
          if (groupedInformation.value.length > 0) {
            activeTabName.value = groupedInformation.value[0].c_name;
          }
        }
      } catch (error) {
        console.error('获取生产信息失败:', error);
        new proxy.$tips('获取生产信息失败', 'error').message_();
      }
    };

    const onMenus = ({command, node}) => {
      // 菜单处理逻辑
    };

    const onNodeFocus = (e, data) => {
      data.expand = true;
    };

    onMounted(() => {
      fetchProductionInfo();
    });

    return {
      information,
      groupedInformation,
      activeTabName,
      Edit,
      onNodeFocus,
      onMenus,
      treeOrg
    };
  }
};
</script>

<style>
.carousel-item {
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.company-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  color: #333;
}

.el-carousel__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 调整树形图大小以适应轮播项 */
.vue3-tree-org {

}
</style>