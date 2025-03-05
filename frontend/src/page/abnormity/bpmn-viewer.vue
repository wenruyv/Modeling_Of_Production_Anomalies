<template>
  <div class="containers">
    <!-- 返回主页按钮 -->
    <el-button type="primary" round class="back-home-button" @click="goBackHome">
      返回主页
    </el-button>
    <!-- 给画布添加鼠标事件监听 -->
    <div
        class="canvas"
        ref="canvas"
        @wheel="handleZoom"
        @mousedown="handleMouseDown"
    ></div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import { main } from '@/mock/main';
import { collaborativePurchasingXML } from '@/mock/collaborativePurchasing';
import { developmentInnovationXML } from '@/mock/developmentInnovation';
import { intelligentLogisticsXML } from '@/mock/intelligentLogistics';
import { intelligentProductionXML } from '@/mock/intelligentProduction';
import { intelligentServiceXML } from '@/mock/intelligentService';
import { interactiveCustomizationXML } from '@/mock/interactiveCustomization';
import { precisionMarketingXML } from '@/mock/precisionMarketing';
import { xmlStr } from '@/mock/xmlStr';

// 定义响应式数据
const bpmnViewer = ref(null);
const container = ref(null);
const canvas = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const xmlStrRef = ref(main);

// 初始化方法
const init = () => {
  canvas.value = document.querySelector('.canvas');
  bpmnViewer.value = new BpmnViewer({
    container: canvas.value
  });

  createNewDiagram();
};

// 创建新图表方法
const createNewDiagram = async () => {
  try {
    const result = await bpmnViewer.value.importXML(xmlStrRef.value);
    const { warnings } = result;
    console.log(warnings);

    // 屏幕自适应
    const canvasInstance = bpmnViewer.value.get('canvas');
    canvasInstance.zoom('fit-viewport', true);

    // 添加元素点击事件监听
    addElementClickListener();
  } catch (err) {
    console.log(err.message, err.warnings);
  }
};

// 执行返回主页操作
const goBackHome = () => {
  changeXML('bpmn:Participant', '主页');
};

// 处理鼠标滚轮事件，实现放大缩小
const handleZoom = (event) => {
  event.preventDefault();
  const canvasInstance = bpmnViewer.value.get('canvas');
  const currentScale = canvasInstance.zoom();
  const delta = event.deltaY > 0 ? -0.1 : 0.1; // 滚轮向下为缩小，向上为放大
  const newScale = Math.max(0.1, Math.min(2.0, currentScale + delta)); // 限制缩放范围
  canvasInstance.zoom(newScale, { x: event.offsetX, y: event.offsetY });
};

// 处理鼠标按下事件，开始拖动
const handleMouseDown = (event) => {
  isDragging.value = true;
  startX.value = event.clientX;
  startY.value = event.clientY;
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

// 处理鼠标移动事件，实现移动
const handleMouseMove = (event) => {
  if (isDragging.value) {
    const dx = event.clientX - startX.value;
    const dy = event.clientY - startY.value;
    const canvasInstance = bpmnViewer.value.get('canvas');
    canvasInstance.scroll({ dx, dy });
    startX.value = event.clientX;
    startY.value = event.clientY;
  }
};

// 处理鼠标松开事件，结束拖动
const handleMouseUp = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
};

// 添加元素点击事件监听
const addElementClickListener = () => {
  const eventBus = bpmnViewer.value.get('eventBus');
  eventBus.on('element.dblclick', async (event) => {
    const element = event.element;
    const elementName = element.businessObject.name;
    const elementType = element.type;
    const elementId = element.id;
    console.log(
        '点击的元素名称，类型，ID：',
        elementName,
        elementType,
        elementId
    );
    await changeXML(elementType, elementName);
  });
};

// 切换XML页面
const changeXML = async (elementType, elementName) => {
  if (elementType === 'bpmn:Participant') {
    // 清空当前视图
    bpmnViewer.value.clear();
    // 导入新的 XML 数据
    try {
      xmlStrComp(elementName);
      const result = await bpmnViewer.value.importXML(xmlStrRef.value);
      const { warnings } = result;
      console.log(warnings);

      // 屏幕自适应
      const canvasInstance = bpmnViewer.value.get('canvas');
      canvasInstance.zoom('fit-viewport', true);
    } catch (err) {
      console.log(err.message, err.warnings);
    }
  }
};

// xmlStr的相关匹配
const xmlStrComp = (elementName) => {
  if (elementName === '交互定制') xmlStrRef.value = interactiveCustomizationXML;
  else if (elementName === '研发创新')
    xmlStrRef.value = developmentInnovationXML;
  else if (elementName === '精准营销') xmlStrRef.value = precisionMarketingXML;
  else if (elementName === '协同采购')
    xmlStrRef.value = collaborativePurchasingXML;
  else if (elementName === '智能生产')
    xmlStrRef.value = intelligentProductionXML;
  else if (elementName === '智慧物流') xmlStrRef.value = intelligentLogisticsXML;
  else if (elementName === '智慧服务') xmlStrRef.value = intelligentServiceXML;
  else if (elementName === '主页') xmlStrRef.value = main;
};

// 挂载时调用初始化方法
onMounted(init);
</script>

<style scoped>
.containers {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
}
.canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
}
.canvas:active {
  cursor: grabbing;
}
.back-home-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}
</style>