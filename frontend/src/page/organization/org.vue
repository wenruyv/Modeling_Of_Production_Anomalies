<template>
    <div class="heading">生产组织结构图</div>
    <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"><!--:default-expand-all="true"-->
      <!-- 自定义节点内容 -->
      <template #default="{ node }">
        <span :style="{ color: getNodeColor(node.level) }">{{ node.label }}</span>
      </template>
    </el-tree>
</template>

<script>
export default {
  setup() {
    // 点击节点事件
    const handleNodeClick = (data) => {
    };

    // 树形结构数据
    const data = [
      {
        label: '研发公司',
        children: [
          {
            label: '项目管理部门',
            children: [{label: '项目经理',},{label: '项目助理',}, {label: '风险控制组',}]
          },
          {
            label: '市场部门',
            children: [{label: '市场分析师'}]
          },
          {
            label: '研发部门',
            children: [
                {
                label: '产品设计组',
                children: [{label: '设计工程师',}, {label: '交互设计师',}]
              },
              {
                label: '技术研发组',
                children: [{label: '软件工程师',}, {label: '硬件工程师',}, {label: '嵌入式工程师',}]
              },
              {
                label: '测试与验证组',
                children: [{label: '测试工程师',}]
              }
            ],
          }
        ],
      },
      {
        label: '生产公司',
        children: [
          {
            label: '生产部门',
            children: [
              {
                label: '生产车间',
                children: [{label: '生产线主管',}, {label: '技术员',}, {label: '操作工人',}]
              }
            ],
          },
          {
            label: '质量控制部门',
            children: [{label: '质量经理'},{label: '质检员'}]
          },
          {
            label: '设备维护部门',
            children: [{label: '设备工程师'},{label: '维修工'}]
          }
        ],
      },
      {
        label: '供应公司',
        children: [
          {
            label: '采购部门',
            children: [
              {
                label: '采购经理',children: [{label: '采购团队', children: [{label: '采购员'}]}]
              },
              {
                label: '供应商管理组',
                children: [{label: '供应商协调员'}]
              }
            ],
          },
          {
            label: '仓储和物流部门',
            children: [
              {
                label: '仓库管理组',
                children: [{label: '库存经理'},{label: '库存管理员'}]
              },
              {
                label: '物流协调组',
                children: [{label: '物流经理'},{label: '物流团队'}]
              },
            ],
          },
        ],
      },
      {
        label: '销售公司',
        children: [
          {
            label: '销售部门',
            children: [
              {
                label: '销售经理',
              },
              {
                label: '销售团队',
                children: [{label: '销售人员'}]
              }
            ],
          },
          {
            label: '市场部门',
            children: [{label: '市场经理',},{label: '市场调研团队'}],
          },
        ],
      },
      {
        label: '服务公司',
        children: [
          {
            label: '客服部门',
            children: [{label: '客服经理',},{label: '客服人员'}]
          },
          {
            label: '技术支持部门',
            children: [{label: '技术经理',},{label: '技术工程师'}]
          },
          {
            label: '售后物流部们',
            children: [{label: '物流经理',},{label: '物流协调员'}]
          },
        ],
      },
    ];

    // 树形结构配置
    const defaultProps = {
      children: 'children',
      label: 'label',
    };
    // 根据节点层级获取颜色
    const getNodeColor = (level) => {
      return `hsl(0, 0%, ${15 * level}%)`;
    };
    return {
      data,
      defaultProps,
      handleNodeClick,
      getNodeColor,
    };
  },
};
</script>

<style>
/* 调整 el-tree-node__content 的大小 */
.el-tree-node__content {
  height: 30px; /* 增加高度 */
  padding: 4px;
  font-size: 20px; /* 增加字体大小 */
}
</style>