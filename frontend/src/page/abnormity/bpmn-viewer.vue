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
          @contextmenu.prevent="onContextMenu"
      ></div>
    </div>
    <!-- 在 template 部分添加弹窗 -->
    <!-- 自定义上下文菜单 -->
    <div
        class="custom-context-menu"
        v-show="contextMenuVisible"
        :style="{ left: contextMenuX + 'px', top: contextMenuY + 'px' }"
    >
      <el-menu class="context-menu">
        <el-menu-item index="1" @click="handleAbnormalityCalibration">
          <el-icon><Warning /></el-icon>异常标定
        </el-menu-item>
        <el-menu-item index="2" @click="handleProductionFactorCalibration">
          <el-icon><Warning /></el-icon>生产要素标定
        </el-menu-item>
      </el-menu>
    </div>
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
    <!-- 生产要素标定弹窗 -->
    <el-dialog
        v-model="productionFactorDialogVisible"
        width="60%"
        custom-class="beautified-dialog"
        :close-on-click-modal="false"
    >
      <template #header>
        <div class="dialog-title">
          当前该项目的生产要素是：
        </div>
      </template>
      <div class="form-container">
        <el-form label-width="120px">
          <el-form-item label="车间">
            <el-select
                v-model="selectedWorkshop"
                placeholder="请选择车间"
                @change="onWorkshopChange"
            >
              <el-option
                  v-for="workshop in workshops"
                  :key="workshop.id"
                  :label="workshop.name"
                  :value="workshop.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备">
            <el-select
                v-model="selectedEquipment"
                placeholder="请选择设备"
                :disabled="!selectedWorkshop"
            >
              <el-option
                  v-for="equipment in equipments"
                  :key="equipment.id"
                  :label="equipment.name"
                  :value="equipment.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原材料">
            <el-select
                v-model="selectedRawMaterial"
                placeholder="请选择原材料"
                :disabled="!selectedWorkshop"
            >
              <el-option
                  v-for="rawMaterial in rawMaterials"
                  :key="rawMaterial.id"
                  :label="rawMaterial.name"
                  :value="rawMaterial.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工">
            <el-select
                v-model="selectedEmployee"
                placeholder="请选择员工"
                :disabled="!selectedWorkshop"
            >
              <el-option
                  v-for="employee in employees"
                  :key="employee.id"
                  :label="employee.name"
                  :value="employee.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="productionFactorDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveProductionFactor">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 可隐藏的工具窗口 -->
    <div v-if="toolWindowVisible" class="tool-window">
      <div class="tool-window-header">
        <span>子流程视图</span>
        <el-icon class="close-icon" @click="closeToolWindow"><Close /></el-icon>
      </div>
      <div class="tool-window-canvas" ref="toolWindowCanvas"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import ContextPadModule from 'bpmn-js/lib/features/context-pad';
import ModelingModule from 'bpmn-js/lib/features/modeling';
import TokenSimulationModule from 'bpmn-js-token-simulation';
import { TRACE_EVENT } from 'bpmn-js-token-simulation/lib/util/EventHelper';
import { ArrowLeft, Search, Close } from '@element-plus/icons-vue';
// 修改引入语句，添加BpmnViewer
import BpmnViewer from 'bpmn-js/lib/Viewer';
import { Warning, Factory } from '@element-plus/icons-vue';

// 定义响应式数据
const bpmnViewer = ref(null);
const canvas = ref(null);
const xmlStrRef = ref('');
const xmlName = ref('main');
const userName = ref(null);
const eleID = ref();
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

// 工具窗口相关状态
const toolWindowVisible = ref(false);
const toolWindowBpmnViewer = ref(null);
const toolWindowCanvas = ref(null);

// 新增上下文菜单相关状态
const contextMenuVisible = ref(false);
const contextMenuX = ref(0);
const contextMenuY = ref(0);
const currentRightClickElement = ref(null); // 保存右键点击的元素信息

// 定义栈
const stack = ref([]);

// 生产要素标定弹窗相关状态
const productionFactorDialogVisible = ref(false);
const selectedWorkshop = ref(null);
const selectedEquipment = ref(null);
const selectedRawMaterial = ref(null);
const selectedEmployee = ref(null);
const workshops = ref([]);
const equipments = ref([]);
const rawMaterials = ref([]);
const employees = ref([]);

const init = async () => {
  try {
    canvas.value = document.querySelector('.canvas');
    bpmnViewer.value = new BpmnModeler({
      container: canvas.value,
      additionalModules: [
        TokenSimulationModule,
        ContextPadModule,
        ModelingModule,
      ],
    });

    userName.value = sessionStorage.getItem("username");

    await fetchXmlData(xmlName.value);
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
            if (important === '中等') {
              ElMessage.warning(element.businessObject.name + '存在' + abName);
              // 半透明黄色背景和边框
              modeling.setColor([element], {
                fill: '#FFFFE0',  // 浅黄色
                stroke: '#FFD700' // 金色边框
              });
            } else if (important === '严重') {
              const editorActions = bpmnViewer.value.get('editorActions');
              editorActions.trigger('togglePauseTokenSimulation');
              ElMessage.error(element.businessObject.name + '存在' + abName);
              // 浅红色背景和纯红色边框
              modeling.setColor([element], {
                fill: '#FFB6C1',  // 浅红色
                stroke: '#FF0000' // 纯红边框
              });
            }else if (important === '轻度') {
              // 浅红色背景和纯红色边框
              modeling.setColor([element], {
                fill: '#ADD8E6',  // 浅蓝色
                stroke: '#0000FF' // 纯蓝边框

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
  } catch (error) {
    console.error('初始化出错:', error);
  }
};

// 获取后端XML数据的方法
const fetchXmlData = async () => {
  try {
    const url = `/api/bpmn-xml/findByNameAndUserName/${xmlName.value}/${userName.value}`;
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
  if (stack.value.length > 0) {
    // 出栈操作
    xmlName.value = stack.value.pop();
    console.log(xmlName.value);
  }
  changeXML('bpmn:Task', xmlName.value);
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

// 处理元素点击事件
const handleElementEvents = (event, eventType) => {
  const elementInfo = getElementInformation(event);

  if (eventType === 'contextmenu') {
    handleElementContextmenu(elementInfo);
  } else if (eventType === 'click') {
    if (elementInfo.elementType === 'bpmn:Task') {
      handleElementClick(elementInfo);
    }
  } else if (eventType === 'dblclick') {
    // 入栈操作
    if (elementInfo.elementType === 'bpmn:Task' || elementInfo.elementType === 'bpmn:Participant') {
      stack.value.push(xmlName.value);
      handleElementDblclick(elementInfo);
    }
  }
};

// 处理元素右键菜单事件（修改原handleElementContextmenu）
const handleElementContextmenu = (elementInfo) => {
  // 保存当前右键点击的元素信息
  currentRightClickElement.value = elementInfo;
  const eventBus = bpmnViewer.value.get('eventBus');

  // 阻止默认上下文菜单（模板中已通过@contextmenu.prevent处理）
  // 记录鼠标位置（需要从事件对象中获取坐标，需修改事件监听）
  // 注意：需要从eventBus的contextmenu事件中获取原始鼠标事件
  eventBus.on('element.contextmenu', (event) => {
    const nativeEvent = event.originalEvent; // 获取原生鼠标事件
    contextMenuX.value = nativeEvent.clientX;
    contextMenuY.value = nativeEvent.clientY;
    contextMenuVisible.value = true;
  });
};

// 异常标定处理（原showTaskDialog逻辑）
const handleAbnormalityCalibration = async () => {
  contextMenuVisible.value = false; // 关闭菜单
  if (currentRightClickElement.value?.elementType === 'bpmn:Task') {
    await showTaskDialog(
        currentRightClickElement.value.elementType,
        currentRightClickElement.value.elementId
    );
  }
};

// 生产要素标定处理
// 初始化数据
const initProductionFactorData = async () => {
  try {
    // 获取车间数据
    const workshopResponse = await axios.get('http://localhost:8081/group1/allList');
    workshops.value = workshopResponse.data;

    // 初始化设备、原材料和员工数据为空
    equipments.value = [];
    rawMaterials.value = [];
    employees.value = [];
  } catch (error) {
    console.error('获取生产要素数据时出错:', error);
  }
};

// 处理车间选择变化
const onWorkshopChange = async () => {
  try {
    console.log(selectedWorkshop.value);
    // 根据选择的车间获取设备、原材料和员工数据
    // 获取设备数据
    const equipmentResponse = await axios.get(`http://localhost:8081/equipment/getByGroupName?group_name=${selectedWorkshop.value}`);
    equipments.value = equipmentResponse.data;

    // 获取原材料数据
    const rawMaterialResponse = await axios.get(`http://localhost:8081/material/getByGroupName?group_name=${selectedWorkshop.value}`);
    rawMaterials.value = rawMaterialResponse.data;

    // 获取员工数据
    const employeeResponse = await axios.get(`http://localhost:8081/staff/getByGroupName?group_name=${selectedWorkshop.value}`);
    employees.value = employeeResponse.data;
  } catch (error) {
    console.error('获取生产要素数据时出错:', error);
  }
};

// 处理生产要素标定
const handleProductionFactorCalibration = () => {
  contextMenuVisible.value = false; // 关闭菜单
  ElMessage.info(`开始生产要素标定：${currentRightClickElement.value.elementName}`);
  // 打开生产要素弹窗
  productionFactorDialogVisible.value = true;
  // 重置选择
  selectedWorkshop.value = null;
  selectedEquipment.value = null;
  selectedRawMaterial.value = null;
  selectedEmployee.value = null;
  // 初始化数据
  initProductionFactorData();
};

// 保存生产要素标定结果
const handleSaveProductionFactor = () => {
  // 这里添加保存数据的逻辑
  console.log('保存的数据：', {
    workshop: selectedWorkshop.value,
    equipment: selectedEquipment.value,
    rawMaterial: selectedRawMaterial.value,
    employee: selectedEmployee.value
  });
  productionFactorDialogVisible.value = false;
  ElMessage.success('生产要素标定保存成功');
};

const handleElementClick = (elementInfo) => {
  eleID.value = elementInfo.elementId; // 先更新 eleID
  showToolWindow();
};

const handleElementDblclick = (elementInfo) => {
  changeXML(elementInfo.elementType, elementInfo.elementId);
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
      resultName.value = response.data.data.standardized;
      resultSimilarity.value = response.data.data.similarity;
      console.log("标准化：" + resultName.value + " " + resultSimilarity.value);
    } else {
      ElMessage.error('标准化失败: ' + response.data.message);
    }
  } catch (error) {
    ElMessage.error('请求失败: ' + error.message);
  }

  if (resultSimilarity.value < 0.7) {
    ElMessage.warning('无法标准化异常，请自行输入或添加: ');
    return;
  }

  try {
    searching.value = true;
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
  if (elementType === 'bpmn:Participant' || elementType === 'bpmn:Task') {
    bpmnViewer.value.clear();
    closeToolWindow();
    xmlName.value = elementName;
    try {
      await fetchXmlData();
      const result = await bpmnViewer.value.importXML(xmlStrRef.value);

      const canvasInstance = bpmnViewer.value.get('canvas');
      canvasInstance.zoom('fit-viewport', true);
    } catch (err) {
      console.log(err.message, err.warnings);
    }
  }
};

// 显示工具窗口
const showToolWindow = async () => {
  if (toolWindowVisible.value) {
    closeToolWindow();
  }
  toolWindowVisible.value = true;
  await initToolWindowBpmnViewer();
};

// 修改工具窗口初始化方法
const initToolWindowBpmnViewer = async () => {
  try {
    // 销毁旧实例
    if (toolWindowBpmnViewer.value) {
      toolWindowBpmnViewer.value.destroy();
      toolWindowBpmnViewer.value = null;
    }
    toolWindowCanvas.value = document.querySelector('.tool-window-canvas');
    toolWindowBpmnViewer.value = new BpmnViewer({
      container: toolWindowCanvas.value,
    });

    //获取组件的侵入下层视图
    try {
      const url = `/api/bpmn-xml/findByNameAndUserName/${eleID.value}/${userName.value}`;
      const response = await axios.get(url);
      // 假设后端返回的XML数据在响应的data字段中
      xmlStrRef.value = response.data.data;
    } catch (error) {
      const url = `/api/bpmn-xml/findByNameAndUserName/default/default`;
      const response = await axios.get(url);
      // 假设后端返回的XML数据在响应的data字段中
      xmlStrRef.value = response.data.data;
      console.error('获取XML数据时出错:', error);
    }

    // 获取当前流程的XML
    const result = await toolWindowBpmnViewer.value.importXML(xmlStrRef.value);

    const canvasInstance = toolWindowBpmnViewer.value.get('canvas');
    canvasInstance.zoom('fit-viewport', true);
  } catch (error) {
    console.error('初始化工具窗口出错:', error);
  }
};

// 添加关闭工具窗口方法
const closeToolWindow = () => {
  toolWindowVisible.value = false;
  // 销毁实例
  if (toolWindowBpmnViewer.value) {
    toolWindowBpmnViewer.value.destroy();
    toolWindowBpmnViewer.value = null;
  }
};

// 挂载时调用初始化方法
// 挂载时调用初始化方法
onMounted(init);
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-context-menu')) {
      contextMenuVisible.value = false;
    }
  });
});

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
  position: fixed;
  top: 70px; /* 调整顶部距离 */
  left: 210px; /* 调整右侧距离，这里使用 right 表示从右侧开始计算偏移 */
  z-index: 1000;
  padding: 12px;
  background: #409eff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 0.3);
  transition: all 0.3s ease;
}

.back-home-button:hover {
  background: #79bbff;
  transform: scale(1.1);
  box-shadow: 0 4px 16px 0 rgba(64, 158, 255, 0.5);
}

.arrow-icon {
  color: white;
  font-size: 24px;
  transition: color 0.3s ease;
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

/* 修改工具窗口样式 */
.tool-window {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: white;
  border-top: 2px solid #ebeef5;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.tool-window-header {
  padding: 8px 16px;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-icon {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s;
}

.close-icon:hover {
  background: #f56c6c;
  color: white;
}

.tool-window-canvas {
  flex: 1;
  height: calc(100% - 40px);
}
/* 上下文菜单样式 */
.custom-context-menu {
  position: fixed;
  z-index: 10000;
  background: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  padding: 8px 0;
}

.context-menu {
  border: none;
  min-width: 120px;
}

.context-menu .el-menu-item {
  padding: 0 20px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}

.context-menu .el-menu-item:hover {
  background-color: #f5f7fa;
}

.form-container {
  padding: 25px;
}
</style>