<template>
  <div class="ordering">
    <div class="containers">
      <div class="canvas"
           ref="canvas"
           @wheel="handleZoom">
      </div>

      <ul class="buttons">
        <li>
          <el-select v-model="selectedOption" @change="openXml" placeholder="请选择" style="width: 100px">
            <el-option label="交互定制" value="interactiveCustomizationXML"></el-option>
            <el-option label="研发创新" value="developmentInnovationXML"></el-option>
            <el-option label="精准营销" value="precisionMarketingXML"></el-option>
            <el-option label="协同采购" value="collaborativePurchasingXML"></el-option>
            <el-option label="智能生产" value="intelligentProductionXML"></el-option>
            <el-option label="智慧物流" value="intelligentLogisticsXML"></el-option>
            <el-option label="智慧服务" value="intelligentServiceXML"></el-option>
          </el-select>
        </li>
        <li>
          <el-button @click="saveChange" title="保存修改">保存</el-button>
        </li>
        <li>
          <el-button @click="saveSVG" title="保存为图片">保存为图片</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import BpmnModeler from "bpmn-js/lib/Modeler";
import axios from "axios";
import {ElMessage} from "element-plus";

// 定义 ref
const canvas = ref(null);
const xmlName = ref('empty');
const xmlStrRef = ref();
const xmlId = ref(9);
const selectedOption = ref('');

// 定义响应式数据
const state = reactive({
  bpmnModeler: null,
  xmlStr: '',
  scale: 1.0
});

const saveChange = async () => {
  try {
    // console.log(selectedOption.value);

    // 获取最新的 XML 代码
    const result = await state.bpmnModeler.saveXML({ format: true });
    const { xml } = result;
    // 更新 xmlStrRef 的值为最新的 XML 代码
    xmlStrRef.value = xml;
    // console.log("selectedOption.value:"+selectedOption.value);
    const response = await axios.put(`api/bpmn-xml/updateByName/${selectedOption.value}`, {
      data: xmlStrRef.value // 假设 xmlStrRef 存储了修改后的 XML 代码
    });
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
};

const openXml = async (value) => {
  // 这里你可以根据不同的选择值设置不同的 xmlStrRef 值
  // 假设每个选项对应不同的 XML 字符串，你可以根据实际情况修改
  switch (value) {
    case 'interactiveCustomizationXML':
      xmlName.value = 'interactiveCustomizationXML'
      xmlId.value = 7;
      break;
    case 'developmentInnovationXML':
      xmlName.value = 'developmentInnovationXML'
      xmlId.value = 3;
      break;
    case 'precisionMarketingXML':
      xmlName.value = 'precisionMarketingXML'
      xmlId.value = 8;
      break;
    case 'collaborativePurchasingXML':
      xmlName.value = 'collaborativePurchasingXML'
      xmlId.value = 1;
      break;
    case 'intelligentProductionXML':
      xmlName.value = 'intelligentProductionXML'
      xmlId.value = 5;
      break;
    case 'intelligentLogisticsXML':
      xmlName.value = 'intelligentLogisticsXML'
      xmlId.value = 4;
      break;
    case 'intelligentServiceXML':
      xmlName.value = 'intelligentServiceXML'
      xmlId.value = 6;
      break;
    default:
      xmlName.value = 'empty';
  }
  // 清空当前视图
  state.bpmnModeler.clear();
  // 导入新的 XML 数据
  try {
    await fetchXmlData(xmlId.value);
    const result = await state.bpmnModeler.importXML(xmlStrRef.value);
    const {warnings} = result;
    console.log(warnings);

    // 屏幕自适应
    const canvasInstance = state.bpmnModeler.get('canvas');
    canvasInstance.zoom('fit-viewport', true);
  } catch (err) {
    console.log(err.message, err.warnings);
  }
};



// 初始化方法
const init = async () => {
  canvas.value = document.querySelector('.canvas');
  state.bpmnModeler = new BpmnModeler({
    container: canvas.value
  });

  // 调用获取XML数据的方法
  await fetchXmlData(xmlId.value);

  await createNewDiagram();
};

// 获取后端XML数据的方法
const fetchXmlData = async (xmlId) => {
  try {
    const url = `api/bpmn-xml/findById/${xmlId}`;
    const response = await axios.get(url);
    // 假设后端返回的XML数据在响应的data字段中
    xmlStrRef.value = response.data.data;
    // console.log(xmlStrRef.value);
  } catch (error) {
    console.error('获取XML数据时出错:', error);
  }
};

// 创建新图表方法
const createNewDiagram = async () => {
  try {
    const result = await state.bpmnModeler.importXML(xmlStrRef.value);
    const { warnings } = result;
    console.log(warnings);

    // 屏幕自适应
    const canvasInstance = state.bpmnModeler.get('canvas');
    canvasInstance.zoom('fit-viewport');

    // 将内容居中显示
    canvasInstance.center();

    success();
  } catch (err) {
    // console.log(err.message, err.warnings);
  }
};

// 成功回调方法
const success = () => {
  addModelerListener();
  addEventBusListener();
};

// 处理鼠标滚轮事件，实现放大缩小
const handleZoom = (event) => {
  event.preventDefault();
  const canvasInstance = state.bpmnModeler.get('canvas');
  const currentScale = canvasInstance.zoom();
  const delta = event.deltaY > 0 ? -0.1 : 0.1; // 滚轮向下为缩小，向上为放大
  const newScale = Math.max(0.1, Math.min(2.0, currentScale + delta)); // 限制缩放范围
  canvasInstance.zoom(newScale, { x: event.offsetX, y: event.offsetY });
};

// 保存为 SVG 文件方法
const saveSVG = async () => {
  try {
    const result = await state.bpmnModeler.saveSVG();
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

// 添加模型监听器方法
const addModelerListener = () => {
  state.bpmnModeler.on("element.click", (e) => {
    console.log("modelerListener", e);
  });
};

// 添加事件总线监听器方法
const addEventBusListener = () => {
  const eventBus = state.bpmnModeler.get("eventBus");
  eventBus.on("element.click", (e) => {
    elementClick(e);
  });
};

// 元素点击事件处理方法
const elementClick = (e) => {
  const modeling = state.bpmnModeler.get("modeling");

  if (e.element.businessObject.$type === "bpmn:StartEvent") {
    console.log(
        "这是一个开始节点",
        e.element.businessObject.id,
        e.element.businessObject.$type,
        e.element.businessObject.name
    );

    modeling.updateProperties(e.element, {
      id: "StartEvent_ops_coffee"
    });
  }

  if (e.element.businessObject.$type === "bpmn:UserTask") {
    console.log(
        "这是一个用户节点",
        e.element.businessObject.id,
        e.element.businessObject.$type,
        e.element.businessObject.name
    );

    modeling.updateProperties(e.element, {
      name: "ops-coffee.cn"
    });
  }
};

// 挂载完成后初始化
onMounted(() => {
  init();
});
</script>

<style scoped>
.containers {
  width: 100%;
  height: calc(100vh - 60px);
}
.canvas {
  width: 100%;
  height: 100%;
}
.buttons {
  position: absolute;
  left: 5px;
  bottom: 5px;
}
.buttons li {
  display: inline-block;
  margin: 2px;
}
.buttons li a {
  color: #333;
  background: #fff;
  cursor: pointer;
  padding: 2px;
  border: 1px solid #ccc;
  text-decoration: none;
}
</style>