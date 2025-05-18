<template>
  <div class="ordering">
    <div class="containers">
      <el-button
          class="back-home-button"
          @click="goBackHome"
          title="返回上一级"
      >
        <el-icon class="arrow-icon"><ArrowLeft /></el-icon>
      </el-button>
      <div class="canvas" ref="canvas" @wheel="handleZoom" @contextmenu.prevent="onContextMenu"></div>
      <div class="controls">
        <el-button @click="saveChange" title="保存修改" type="success">保存</el-button>
        <el-button @click="saveSVG" title="保存为图片" type="primary">保存为图片</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import BpmnModeler from "bpmn-js/lib/Modeler";
import axios from "axios";
import { ElMessage } from "element-plus";
import { ArrowLeft} from '@element-plus/icons-vue';

// 定义 ref
const bpmnModeler = ref();
const canvas = ref(null);
const lastName = ref();
const xmlName = ref('main');
const userName = ref(null);
const xmlStrRef = ref();
const selectedOption = ref('');
const currentElement = ref();
const existFlag = ref(1);  //0新建，1修改
// 定义栈
const stack = ref([]);

const goBackHome = () => {
  if (stack.value.length > 0) {
    // 出栈操作
    xmlName.value = stack.value.pop();
    console.log(xmlName.value)
  }
  changeXML('bpmn:Task', xmlName.value);
};

const saveChange = async () => {
  try {
    // console.log(selectedOption.value);

    // 获取最新的 XML 代码
    const result = await bpmnModeler.value.saveXML({ format: true });
    const { xml } = result;
    // 更新 xmlStrRef 的值为最新的 XML 代码
    xmlStrRef.value = xml;
    // console.log("selectedOption.value:"+selectedOption.value);
    if(existFlag.value === 1) {
      const response = await axios.put(`api/bpmn-xml/updateDataByNameAndUserName/${xmlName.value}/${userName.value}`, {
        data: xmlStrRef.value // 假设 xmlStrRef 存储了修改后的 XML 代码
      });
    }else if(existFlag.value === 0){
      const response = await axios.post(`api/bpmn-xml/insertByNameAndUserName`, {
        name:xmlName.value,
        data: xmlStrRef.value ,// 假设 xmlStrRef 存储了修改后的 XML 代码
        userName:userName.value
      });
    }
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
};

// 初始化方法
const init = async () => {
  canvas.value = document.querySelector('.canvas');
  bpmnModeler.value = new BpmnModeler({
    container: canvas.value
  });

  userName.value = sessionStorage.getItem("username");

  // 调用获取XML数据的方法
  await fetchXmlData();
  await createNewDiagram();
};

// 获取后端XML数据的方法
const fetchXmlData = async () => {
  try {
    const url = `/api/bpmn-xml/findByNameAndUserName/${xmlName.value}/${userName.value}`;
    const response = await axios.get(url);
    // 假设后端返回的XML数据在响应的data字段中
    xmlStrRef.value = response.data.data;
  } catch (error) {
    const url = `/api/bpmn-xml/findByNameAndUserName/default/default`;
    const response = await axios.get(url);
    // 假设后端返回的XML数据在响应的data字段中
    xmlStrRef.value = response.data.data;
    existFlag.value = 0;
    console.error('获取XML数据时出错:', error);
  }
};

// 创建新图表方法
const createNewDiagram = async () => {
  try {
    const result = await bpmnModeler.value.importXML(xmlStrRef.value);

    // 屏幕自适应
    const canvasInstance = bpmnModeler.value.get('canvas');
    canvasInstance.zoom('fit-viewport', true);

    addElementClickListener();

  } catch (err) {
    // console.log(err.message, err.warnings);
  }
};


// 处理鼠标滚轮事件，实现放大缩小
const handleZoom = (event) => {
  event.preventDefault();
  const canvasInstance = bpmnModeler.value.get('canvas');
  const currentScale = canvasInstance.zoom();
  const delta = event.deltaY > 0 ? -0.1 : 0.1; // 滚轮向下为缩小，向上为放大
  const newScale = Math.max(0.1, Math.min(2.0, currentScale + delta)); // 限制缩放范围
  canvasInstance.zoom(newScale, { x: event.offsetX, y: event.offsetY });
};

// 保存为 SVG 文件方法
const saveSVG = async () => {
  try {
    const result = await bpmnModeler.value.saveSVG();
    const { svg } = result;

    const svgBlob = new Blob([svg], {
      type: "image/svg+xml"
    });

    const downloadLink = document.createElement("a");
    downloadLink.download = "ops-coffee-bpmn.svg";
    downloadLink.innerHTML = "Get BPMN SVG";
    downloadLink.href = window.URL.createObjectURL(svgBlob);
    downloadLink.onclick = (event) => {
      document.body.removeChild(event.target);
    };
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  } catch (err) {
    console.log(err);
  }
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

  if (eventType === 'contextmenu' ) {
    // 入栈操作
    if(elementInfo.elementType === 'bpmn:Task' || elementInfo.elementType === 'bpmn:Participant') {
      stack.value.push(xmlName.value);
      handleElementClick(elementInfo);
    }
  }
};

// 处理元素点击后的操作
const handleElementClick = (elementInfo) => {
  changeXML(elementInfo.elementType, elementInfo.elementId);
};

const changeXML = async (elementType, elementId) => {
  if (elementType === 'bpmn:Participant' || elementType === 'bpmn:Task') {
    bpmnModeler.value.clear();
    //获取当前点击元素的xmlName
    xmlName.value = elementId;
    try {
      await fetchXmlData();
      const result = await bpmnModeler.value.importXML(xmlStrRef.value);
      const { warnings } = result;

      // console.log(xmlName.value);

      const canvasInstance = bpmnModeler.value.get('canvas');
      canvasInstance.zoom('fit-viewport', true);
    } catch (err) {
      console.log(err.message, err.warnings);
    }
  }
};

// 添加元素点击事件监听
const addElementClickListener = () => {
  const eventBus = bpmnModeler.value.get('eventBus');
  eventBus.on('element.dblclick', (event) => handleElementEvents(event, 'dblclick'));
  eventBus.on('element.click', (event) => handleElementEvents(event, 'click'));
  eventBus.on('element.contextmenu', (event) => handleElementEvents(event, 'contextmenu'));
};

// 挂载完成后初始化
onMounted(() => {
  init();
});
</script>

<style scoped>
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

.back-home-button:hover .arrow-icon {
  color: #f0faff;
}
.containers {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}
.canvas {
  flex: 1;
  width: 100%;
  height: 100%;
}
.controls {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #f4f4f4;
}
.buttons li {
  display: inline-block;
  margin: 5px;
}
.buttons li a {
  color: #333;
  background: #fff;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.buttons li a:hover {
  background-color: #f0f0f0;
}
</style>