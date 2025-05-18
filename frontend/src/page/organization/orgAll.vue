<template>
  <div class="page-header">
    <div class="heading">
      <el-icon><Document /></el-icon>
      <span>生产组织结构图</span>
    </div>
    <div class="operation-area">
      <!-- 添加标签按钮单独放在外面 -->
      <el-button type="primary" @click="showAddDialog">
        + 添加新类型
      </el-button>
    </div>
  </div>
  <div>
    <el-tabs
        v-model="activeTabName"
        type="border-card">
      <el-tab-pane
          v-for="tab in groupedInformation"
          :key="tab.com_type"
          :label="tab.com_type"
          :name="tab.com_type"
      >
        <el-carousel
            :ref="el => { if (el) carousels[tab.com_type] = el }"
            :autoplay="false"
            height="430px"
            indicator-position="outside"
            arrow="always"
            trigger="click"
        @change="handleCarouselChange"
        >
        <el-carousel-item v-for="(item, index) in tab.items" :key="index">
          <div class="carousel-item">
            <div class="company-name">{{ item.size }}</div>
            <vue3-tree-org
                ref="treeOrg"
                :data="item.info"
                @on-change-data="(data) => item.info = data"
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
          <el-button
              type="primary"
              :icon="Edit"
              style="float: right; margin-right: 20px; margin-top: 10px"
              @click="updateOrg(tab.com_type)"
          >
            <span>保存</span>
          </el-button>
        </el-carousel>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 添加标签页对话框 -->
  <el-dialog v-model="addDialogVisible" title="添加新类型" width="30%">
    <el-form>
      <el-form-item label="类型名称">
        <el-input v-model="newTypeName" placeholder="请输入新类型名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="addDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addNewTab">确认</el-button>
    </template>
  </el-dialog>
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
    const carousel = ref(null);
    const currentCarouselIndex = ref(0); // 当前轮播索引
// 使用数组存储多个轮播实例
    const carousels = ref([]);
    // 计算属性：按com_type分组数据
    const groupedInformation = computed(() => {
      const groups = {};
      information.value.forEach(item => {
        if (!groups[item.com_type]) {
          groups[item.com_type] = {
            com_type: item.com_type,
            items: []
          };
        }
        groups[item.com_type].items.push(item);
      });
      return Object.values(groups);
    });

    // 获取数据
    const fetchProductionInfo = async () => {
      try {
        const res = await new proxy.$request(proxy.$urls.m().orgAll).modeget();

        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          information.value = res.data.map(item => ({
            ...item,
            size: item.size,
            info: typeof item.info === 'string' ? JSON.parse(item.info) : item.info
          }));
          if (groupedInformation.value.length > 0) {
            activeTabName.value = groupedInformation.value[0].com_type;
          }
        }
      } catch (error) {
        new proxy.$tips('获取组织结构失败', 'error').message_();
      }
    };

    // 保存当前组织结构
    const updateOrg = async (comType) => {
      try {
        const currentTab = groupedInformation.value.find(tab => tab.com_type === comType);
        if (!currentTab) return;

        // 获取当前标签页对应的轮播实例
        const currentCarousel = carousels.value[comType];
        if (!currentCarousel) return;

        // 获取当前显示的轮播项索引
        const currentIndex = currentCarousel.activeIndex || 0;
        const currentItem = currentTab.items[currentIndex];

        if (!currentItem) return;

        // 获取当前树形数据
        const treeData = currentItem.info;

        // 准备保存数据
        const saveData = {
          id: currentItem.id,
          com_type: currentItem.com_type,
          size: currentItem.size,
          info: JSON.stringify(treeData)
        };

        // 调用API
        const res = await new proxy.$request(proxy.$urls.m().orgUpdate, saveData).modepost();
        if (res.data == 1) {
          new proxy.$tips('保存成功', 'success').message_();
        } else {
          new proxy.$tips('保存失败', 'error').message_();
        }
      } catch (error) {
        console.error('保存失败:', error);
        new proxy.$tips('保存失败', 'error').message_();
      }
    };
    const addDialogVisible = ref(false);
    const newTypeName = ref('');

    // 显示添加对话框
    const showAddDialog = () => {
      newTypeName.value = '';
      addDialogVisible.value = true;
    };

    // 添加新标签页
    const addNewTab = async () => {
      if (!newTypeName.value.trim()) {
        new proxy.$tips('请输入类型名称', 'warning').message_();
        return;
      }

      try {
        // 准备要插入的3条数据
        const newData = [
          {
            com_type: newTypeName.value,
            size: '大型企业',
            info: JSON.stringify({
              id: 'root',
              label: '新组织',
              children: []
            })
          },
          {
            com_type: newTypeName.value,
            size: '中型企业',
            info: JSON.stringify({
              id: 'root',
              label: '新组织',
              children: []
            })
          },
          {
            com_type: newTypeName.value,
            size: '小型企业',
            info: JSON.stringify({
              id: 'root',
              label: '新组织',
              children: []
            })
          }
        ];
        console.log("运行到这一步");
        // 调用API批量插入
        const res = await new proxy.$request(proxy.$urls.m().addOrgAll, newData).modepost();

        if (res.data) {
          new proxy.$tips('添加成功', 'success').message_();
          addDialogVisible.value = false;
          // 重新加载数据
          await  fetchProductionInfo();
        } else {
          new proxy.$tips('添加失败', 'error').message_();
        }
      } catch (error) {
        new proxy.$tips('网络错误', 'error').message_();
      }
    };
    // 轮播变化时更新当前索引
    const handleCarouselChange = (index) => {
      currentCarouselIndex.value = index;
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
      carousels,
      information,
      groupedInformation,
      activeTabName,
      Edit,
      onNodeFocus,
      onMenus,
      treeOrg,
      carousel,
      updateOrg,
      handleCarouselChange,
      addDialogVisible,
      newTypeName,
      showAddDialog,
      addNewTab,
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
  width: 100%;
  height: 100%;
}
</style>