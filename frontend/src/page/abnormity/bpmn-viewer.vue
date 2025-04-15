<template>
  <div class="ordering">
    <div class="containers">
      <!-- 返回主页按钮 -->
      <el-button
          class="back-home-button"
          @click="goBackHome"
          title="返回主页"
      >
        <el-icon class="arrow-icon"><ArrowLeft /></el-icon>
      </el-button>

      <!-- 给画布添加鼠标事件监听 -->
      <div
          class="canvas"
          ref="canvas"
          @wheel="handleZoom"
      ></div>
    </div>
    <!-- 在 template 部分添加弹窗 -->
    <el-dialog
        v-model="taskDialogVisible"
        width="60%"
        :before-close="handleClose"
        custom-class="beautified-dialog"
        :close-on-click-modal="false"
    >
      <!-- 使用header插槽替代废弃的title插槽 -->
      <template #header>
        <div class="dialog-title">
          发生的异常: <span class="title-error">{{ dialogTitle }}</span>
        </div>
      </template>

      <div class="search-container">
        <el-row :gutter="20" class="search-row">
          <!-- 左侧输入框 -->
          <el-col :span="8">
            <el-input
                v-model="searchKeyword"
                placeholder="请输入异常名称进行查询"
                @keyup.enter="handleSearch"
                class="search-input"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>

          <!-- 右侧按钮组 -->
          <el-col :span="12" class="button-group">
            <el-button
                type="primary"
                @click="handleSearch"
                :loading="searching"
                class="search-button"
            >
              查询
            </el-button>
            <el-button
                type="success"
                @click="handleSave"
                :loading="saving"
                class="save-button"
            >
              保存
            </el-button>
            <el-button
                type="danger"
                @click="handleDelete"
                :loading="deleting"
                class="delete-button"
            >
              解决异常
            </el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 查询结果展示 -->
      <div v-if="taskData" class="result-panel">
        <div class="result-item">
          <span class="label">异常名称：</span>
          <span class="value">{{ taskData.ab_level2 }}</span>
        </div>
        <div class="result-item">
          <span class="label">异常定义：</span>
          <span class="value">{{ taskData.ab_def }}</span>
        </div>
        <div class="result-item">
          <span class="label">异常等级：</span>
          <span class="value">{{ taskData.ab_important }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ArrowLeft, Search} from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import ContextPadModule from 'bpmn-js/lib/features/context-pad';
import ModelingModule from 'bpmn-js/lib/features/modeling';
import TokenSimulationModule from 'bpmn-js-token-simulation';
import { TRACE_EVENT} from 'bpmn-js-token-simulation/lib/util/EventHelper';

// 定义响应式数据
const bpmnViewer = ref(null);
const canvas = ref(null);
const xmlStrRef = ref('');
const xmlId = ref(2);
// 弹窗相关状态
const taskDialogVisible = ref(false);
const searching = ref(false);
const searchKeyword = ref('');
const taskData = ref(null);
const dialogTitle = ref('原材料供应延迟');
const saving = ref(false);
const deleting = ref(false);
const currentElement = ref(null);
const resultName = ref();
const resultSimilarity = ref();

const init = async () => {
  canvas.value = document.querySelector('.canvas');
  bpmnViewer.value = new BpmnModeler({
    container: canvas.value,
    additionalModules: [
      TokenSimulationModule,
      ContextPadModule,
      ModelingModule,
    ],
  });

  await fetchXmlData(xmlId.value);
  await createNewDiagram();

  // 正确获取 eventBus
  const eventBus = bpmnViewer.value.get('eventBus');

  // 监听 TRACE_EVENT 事件
  eventBus.on(TRACE_EVENT, async (event) => {
    const { element, action } = event;

    if (element.type === 'bpmn:Task' && action === 'enter') {
      try {
        const response1 = await axios.get(`/api/abnormality-calibrations/search/${element.id}`);
        const abName = response1.data.name;
        const response2 = await axios.get(`/api/abnormal/selectByLevel2/${abName}`);
        const important = response2.data[0].ab_important;

        const modeling = bpmnViewer.value.get('modeling');

        if (important) {
          if (important === '二级') {
            ElMessage.warning(element.businessObject.name + '存在' + abName);
            // 半透明黄色背景和边框
            modeling.setColor([element], {
              fill: '#FFFFE0',  // 浅黄色
              stroke: '#FFD700' // 金色边框
            });
          } else if (important === '一级') {
            editorActions.trigger('togglePauseTokenSimulation');
            ElMessage.error(element.businessObject.name + '存在' + abName);
            // 浅红色背景和纯红色边框
            modeling.setColor([element], {
              fill: '#FFB6C1',  // 浅红色
              stroke: '#FF0000' // 纯红边框
            });
          }
        }
      } catch (error) {
        console.error('获取异常信息时出错:', error);
      }
    }
  });

  // 触发模拟开启
  const editorActions = bpmnViewer.value.get('editorActions');
  if (editorActions) {
    editorActions.trigger('toggleTokenSimulation');
  }
};

// 获取后端XML数据的方法
const fetchXmlData = async (id) => {
  try {
    const url = `/api/bpmn-xml/findById/${id}`;
    const response = await axios.get(url);
    xmlStrRef.value = response.data.data;
  } catch (error) {
    console.error('获取XML数据时出错:', error);
  }
};

// bpmn-viewer.vue 的 createNewDiagram 方法
const createNewDiagram = async () => {
  try {
    const result = await bpmnViewer.value.importXML(xmlStrRef.value);
    const { warnings } = result;

    // 优化日志：仅在存在警告时输出
    if (warnings.length > 0) {
      console.warn('BPMN 导入警告:', warnings);
    }

    const canvasInstance = bpmnViewer.value.get('canvas');
    canvasInstance.zoom('fit-viewport', true);
    addElementClickListener();
  } catch (err) {
    console.error('BPMN 导入失败:', err.message);
    if (err.warnings) {
      console.warn('附加警告:', err.warnings);
    }
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
  const delta = event.deltaY > 0 ? -0.1 : 0.1;
  const newScale = Math.max(0.1, Math.min(2.0, currentScale + delta));
  canvasInstance.zoom(newScale, { x: event.offsetX, y: event.offsetY });
};

// 获取元素信息的函数
const getElementInformation = (event) => {
  const element = event.element;
  const elementName = element.businessObject.name;
  const elementType = element.type;
  const elementId = element.id;

  currentElement.value = { element, elementName, elementType, elementId };
  console.log('点击的元素名称，类型，ID：', elementName, elementType, elementId);
  return currentElement.value;
};

// 处理元素点击后的操作
const handleElementClick = (elementInfo) => {
  changeXML(elementInfo.elementType, elementInfo.elementName);
  showTaskDialog(elementInfo.elementType, elementInfo.elementId);
};

// 处理元素点击事件
const handleElementEvents = (event, eventType) => {
  const elementInfo = getElementInformation(event);

  if (eventType === 'dblclick') {
    handleElementClick(elementInfo);
  }
};

// 添加元素点击事件监听
const addElementClickListener = () => {
  const eventBus = bpmnViewer.value.get('eventBus');
  eventBus.on('element.dblclick', (event) => handleElementEvents(event, 'dblclick'));
  eventBus.on('element.click', (event) => handleElementEvents(event, 'click'));
  eventBus.on('element.contextmenu', (event) => handleElementEvents(event, 'contextmenu'));
};

// 获取当前的异常种类
const fetchTaskData = async (taskId) => {
  try {
    const response = await axios.get(`/api/abnormality-calibrations/search/${taskId}`);
    taskData.value = response.data;
    if (!taskData.value) {
      dialogTitle.value = '尚未定义';
    } else {
      dialogTitle.value = taskData.value.name;
      const response = await axios.get(`/api/abnormal/selectByLevel2/${taskData.value.name}`);
      taskData.value = response.data[0];
    }
  } catch (error) {
    console.error('获取任务数据失败:', error);
  }
};

// 删除当前存在的异常
const handleDelete = async () => {
  try {
    if (!currentElement.value?.elementId) {
      ElMessage.warning('无异常无需解决');
      return;
    }

    const elementId = currentElement.value.elementId;
    const element = currentElement.value.element;

    // 获取原始元素引用
    const elementRegistry = bpmnViewer.value.get('elementRegistry');
    const originalElement = elementRegistry.get(element.id);  // 关键修改

    const response = await axios.delete(`/api/abnormality-calibrations/delete/${elementId}`);

    if (response.data) {
      const modeling = bpmnViewer.value.get('modeling');

      // 使用原始元素引用并明确重置颜色
      modeling.setColor([originalElement], {
        fill: null,    // 使用null代替undefined
        stroke: null   // 使用null代替undefined
      });

      ElMessage.success('异常解决成功');
    }
  } catch (error) {
    // 增强错误处理
    const errorMsg = error.response?.data?.message ||
        error.message ||
        '请求失败，请检查网络连接';
    ElMessage.error("解决失败");
    console.log(`解决失败: ${errorMsg}`);
  } finally {
    taskDialogVisible.value = false;
    // 可选：清空当前元素引用
    currentElement.value = null;
  }
};

//保存某种异常
const handleSave = async () => {
  if (!taskData.value?.ab_level2) {
    ElMessage.warning('该异常不存在，请正确输入异常名称');
    return;
  }

  if (taskData.value.ab_level2 !== searchKeyword.value) {
    ElMessage.warning('输入的异常名称与搜索关键词不匹配，请检查后重新输入');
    return;
  }

  try {
    saving.value = true;
    let response;
    const data = {
      id: currentElement.value?.elementId,
      name: searchKeyword.value
    };
    if (dialogTitle.value === '尚未定义') {
      response = await axios.post('/api/abnormality-calibrations/save', data);
    } else {
      response = await axios.put('/api/abnormality-calibrations/update', data);
    }

    if (response && response.status === 200) {
      ElMessage.success('保存成功');
    } else {
      ElMessage.error('保存失败，服务器返回异常状态码');
      console.error('保存失败，服务器返回状态码:', response ? response.status : '无响应');
    }
  } catch (error) {
    let errorMessage = '保存失败，请稍后重试';
    if (error.response) {
      errorMessage += ` (服务器返回状态码: ${error.response.status})`;
      console.error('保存失败，服务器返回错误响应:', error.response.data);
    } else if (error.request) {
      errorMessage += ' (无服务器响应)';
      console.error('保存失败，无服务器响应:', error.request);
    } else {
      console.error('保存失败，发生未知错误:', error.message);
    }
    ElMessage.error(errorMessage);
  } finally {
    saving.value = false;
    dialogTitle.value = searchKeyword.value;
  }
};

// 查询某种异常
const handleSearch = async () => {
  const keyword = searchKeyword.value.trim();
  if (!keyword) {
    ElMessage.warning('请输入查询关键词');
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/api/standardize', {
      user_input: keyword
    });

    if (response.data.status === 'success') {
      // return response.data.data.standardized;
      resultName.value = response.data.data.standardized;
      resultSimilarity.value = response.data.data.similarity;
      console.log("标准化："+resultName.value+" "+resultSimilarity.value)
    } else {
      ElMessage.error('标准化失败: ' + response.data.message);
    }
  } catch (error) {
    ElMessage.error('请求失败: ' + error.message);
  }
  if(resultSimilarity.value < 0.7){
    ElMessage.warning('无法标准化异常，请自行输入或添加: ');
    return;
  }


  try {
    searching.value = true;
    // console.log('搜索内容：', keyword);
    const url = `/api/abnormal/selectByLevel2/${resultName.value}`;
    const response = await axios.get(url);
    taskData.value = response.data[0];
    if (taskData.value) {
      searchKeyword.value = resultName.value;

      ElMessage.success('查询成功');
    } else {
      ElMessage.warning('结果不存在');
    }
  } catch (error) {
    ElMessage.error('查询失败，请稍后重试');
    console.error('查询异常信息失败:', error);
  } finally {
    searching.value = false;
  }
};


// 弹窗关闭前处理
const handleClose = (done) => {
  if (searching.value) {
    ElMessage.info('正在查询中，请稍候...');
    return;
  }
  done();
  searchKeyword.value = '';
  taskData.value = null;
};

// 显示异常弹窗方法
const showTaskDialog = async (elementType, elementId) => {
  if (elementType === 'bpmn:Task') {
    taskDialogVisible.value = true;
    await fetchTaskData(elementId);
  }
};

// 切换XML页面
const changeXML = async (elementType, elementName) => {
  if (elementType === 'bpmn:Participant') {
    bpmnViewer.value.clear();
    try {
      xmlStrComp(elementName);
      await fetchXmlData(xmlId.value);
      const result = await bpmnViewer.value.importXML(xmlStrRef.value);
      const { warnings } = result;
      console.log(warnings);

      const canvasInstance = bpmnViewer.value.get('canvas');
      canvasInstance.zoom('fit-viewport', true);
    } catch (err) {
      console.log(err.message, err.warnings);
    }
  }
};

// xmlStr的相关匹配
const xmlStrComp = (elementName) => {
  const xmlIdMap = {
    '交互定制': 7,
    '研发创新': 3,
    '精准营销': 8,
    '协同采购': 1,
    '智能生产': 5,
    '智慧物流': 4,
    '智慧服务': 6,
    '主页': 2
  };
  xmlId.value = xmlIdMap[elementName] || xmlId.value;
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
  top: 2px;
  left: 2px;
  z-index: 10;
  padding: 0;
  border: none;
  background: none;
  transition: transform 0.3s ease; /* 添加按钮悬停动画 */
}

.back-home-button:hover {
  transform: scale(1.1); /* 悬停时按钮放大 */
}

.arrow-icon {
  font-size: 16px;
  color: rgba(0, 0, 139, 1);
}

.random-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  padding: 4px 8px;
  font-size: 12px;
}

/* 优化后的 el-dialog 样式 */
.beautified-dialog {
  border-radius: 15px; /* 增加圆角 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* 增强阴影效果 */
  animation: fadeIn 0.3s ease; /* 添加淡入动画 */
  overflow: hidden; /* 避免内容溢出圆角 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 对话框标题样式 */
.dialog-title {
  font-size: 1.8em; /* 增大标题字体大小 */
  color: #2c3e50; /* 调整标题颜色 */
  margin-bottom: 25px; /* 增加底部间距 */
  font-weight: 700; /* 增强字体粗细 */
  text-align: center; /* 标题居中显示 */
}

.title-error {
  color: #e74c3c; /* 调整错误标题颜色 */
  font-weight: bold;
  text-decoration: underline; /* 添加下划线 */
}

/* 搜索容器样式 */
.search-container {
  padding: 25px; /* 增加内边距 */
  background-color: #ecf0f1; /* 调整背景颜色 */
  border-bottom: 2px solid #bdc3c7; /* 增强底部边框 */
}

.search-row {
  align-items: center;
}

/* 搜索输入框样式 */
.search-input {
  border-radius: 8px; /* 增加输入框圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 增强输入框阴影 */
  transition: box-shadow 0.3s ease; /* 添加阴影过渡效果 */
}

.search-input:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* 悬停时增强阴影 */
}

/* 按钮组样式 */
.button-group {
  display: flex;
  justify-content: flex-end;
}

/* 搜索和保存按钮样式 */
.search-button,
.save-button {
  border-radius: 8px; /* 增加按钮圆角 */
  padding: 10px 25px; /* 调整按钮内边距 */
  transition: background-color 0.3s ease, transform 0.3s ease; /* 添加背景颜色和缩放过渡效果 */
}

.search-button:hover,
.save-button:hover {
  transform: scale(1.05); /* 悬停时按钮放大 */
}

.search-button {
  background-color: #3498db; /* 调整搜索按钮背景颜色 */
  border-color: #3498db;
}

.search-button:hover {
  background-color: #2980b9; /* 悬停时搜索按钮背景颜色加深 */
  border-color: #2980b9;
}

.save-button {
  background-color: #2ecc71; /* 调整保存按钮背景颜色 */
  border-color: #2ecc71;
}

.save-button:hover {
  background-color: #27ae60; /* 悬停时保存按钮背景颜色加深 */
  border-color: #27ae60;
}

/* 查询结果展示面板样式 */
.result-panel {
  padding: 25px; /* 增加内边距 */
}

.result-item {
  margin-bottom: 20px; /* 增加底部间距 */
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
}

.label {
  font-weight: bold;
  color: #7f8c8d; /* 调整标签颜色 */
  margin-right: 15px; /* 增加右侧间距 */
  min-width: 100px; /* 设置最小宽度 */
}

.value {
  color: #2c3e50; /* 调整值的颜色 */
  font-size: 1.1em; /* 增大值的字体大小 */
}

.simulation-controls {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
</style>