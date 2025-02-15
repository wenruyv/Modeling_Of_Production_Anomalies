<template>
  <div class="ordering">
    <div class="heading">生产资源结构图</div>
    <el-tree
        :data="data"
        :props="defaultProps"

        style="font-size: 16px;"
        @node-click="handleNodeClick" /><!--:default-expand-all="true"-->

  </div>
</template>

<script>
export default {
  setup() {
    // 点击节点事件
    const handleNodeClick = (data) => {
      console.log(data);
    };

    // 树形结构数据
    const data = [
      {
        label: '生产设备',
        children: [
          {label: '名称'},
          {
            label: '设备类型',
            children: [{label: '自动化设备'},{label: '半自动化设备'}, {label: '手动设备'}]
          },
          {
            label: '设备规格',
            children: [{label: '尺寸（长宽高）'},{label: '重量'},{label: '功率要求'}]
          },
          {
            label: '成本',
            children: [
              {label: '购买成本'},
              {
                label: '维护成本-设备折旧',
                children: [{label: '直线法'}, {label: '双倍余额递减法'}, {label: '年数总和法'}, {label: '单位产出法'}]
              }
            ]
          },
          {
            label: '功能',
            children: [{label: '功能'},{label: '生产速度'},{label: '工作效率'}]
          },
          {
            label: '维护与保养',
            children: [{label: '维护周期'},{label: '维修难度'},{label: '保修期'},{label: '使用年限'}]
          },
          {
            label: '安全性',
            children: [{label: '安全等级'}]
          },
          {label: '供应来源'},
          {label: '所属组织（生产组织-供应公司）'},
        ],
      },
      {
        label: '原材料',
        children: [{label: '名称'},{label: '尺寸'},{label: '功能'},{label: '单位成本'},
                    {label: '供应来源'},{label: '库存量'},],
      },
    ];

    // 树形结构配置
    const defaultProps = {
      children: 'children',
      label: 'label',
    };

    return {
      data,
      defaultProps,
      handleNodeClick,
    };
  },
};
</script>

<style>
/* 样式省略 */
</style>