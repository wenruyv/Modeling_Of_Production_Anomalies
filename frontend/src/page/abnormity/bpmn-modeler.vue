<template>
  <div class="ordering">
  <div class="containers">
    <div class="canvas" ref="canvas"></div>

    <ul class="buttons">
      <li>
        <a href="javascript:" @click="$refs.refFile.click()">加载本地XML文件</a>
        <input
          type="file"
          id="files"
          ref="refFile"
          style="display: none"
          @change="loadXML"
        />
      </li>
      <li>
        <a href="javascript:" @click="saveXML" title="保存为bpmn"
          >保存为XML文件</a
        >
      </li>
      <li>
        <a href="javascript:" @click="saveSVG" title="保存为svg"
          >保存为SVG图片</a
        >
      </li>
      <li>
        <a href="javascript:" @click="handlerUndo" title="撤销操作">撤销</a>
      </li>
      <li>
        <a href="javascript:" @click="handlerRedo" title="恢复操作">恢复</a>
      </li>
      <li>
        <a href="javascript:" @click="handlerZoom(0.1)" title="放大">放大</a>
      </li>
      <li>
        <a href="javascript:" @click="handlerZoom(-0.1)" title="缩小">缩小</a>
      </li>
      <li>
        <a href="javascript:" @click="handlerZoom(0)" title="还原">还原</a>
      </li>
    </ul>
  </div>
    </div >
</template>

<script>
import BpmnModeler from "bpmn-js/lib/Modeler";
import { xmlStr } from "@/mock/xmlStr";
import is from "bpmn-js/lib/util/ModelUtil";

export default {
  mounted() {
    this.init();
    console.log("bpmnModeler");
  },
  data() {
    return {
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: xmlStr
    };
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas;
      this.bpmnModeler = new BpmnModeler({
        container: canvas
      });

      this.createNewDiagram();
    },
    async createNewDiagram() {
      try {
        const result = await this.bpmnModeler.importXML(this.xmlStr);
        const { warnings } = result;
        console.log(warnings);

        this.success();
      } catch (err) {
        console.log(err.message, err.warnings);
      }
    },
    success() {
      this.addModelerListener();
      this.addEventBusListener();
    },
    async loadXML() {
      const that = this;
      const file = this.$refs.refFile.files[0];

      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        that.xmlStr = this.result;
        that.createNewDiagram();
      };
    },
    async saveXML() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;

        // 创建一个Blob对象，用于存储XML数据
        var xmlBlob = new Blob([xml], {
          type: "application/xml;charset=UTF-8"
        });

        // 创建一个<a>元素用于下载
        var downloadLink = document.createElement("a");
        // 修改下载文件的名称为XML文件
        downloadLink.download = "ops-coffee.xml";
        downloadLink.innerHTML = "Get XML";
        // 创建一个URL对象，指向Blob数据
        downloadLink.href = window.URL.createObjectURL(xmlBlob);
        // 点击下载链接后，从文档中移除该链接
        downloadLink.onclick = function(event) {
          document.body.removeChild(event.target);
        };
        // 隐藏下载链接
        downloadLink.style.visibility = "hidden";
        // 将下载链接添加到文档中
        document.body.appendChild(downloadLink);
        // 触发点击事件，开始下载
        downloadLink.click();
      } catch (err) {
        console.log(err);
      }
    },
    async saveSVG() {
      try {
        const result = await this.bpmnModeler.saveSVG();
        const { svg } = result;

        const svgBlob = new Blob([svg], {
          type: "image/svg+xml"
        });

        var downloadLink = document.createElement("a");
        downloadLink.download = "ops-coffee-bpmn.svg";
        downloadLink.innerHTML = "Get BPMN SVG";
        downloadLink.href = window.URL.createObjectURL(svgBlob);
        downloadLink.onclick = function(event) {
          document.body.removeChild(event.target);
        };
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
      } catch (err) {
        console.log(err);
      }
    },
    handlerRedo() {
      this.bpmnModeler.get("commandStack").redo();
    },
    handlerUndo() {
      this.bpmnModeler.get("commandStack").undo();
    },
    handlerZoom(radio) {
      const newScale = !radio ? 1.0 : this.scale + radio;
      this.bpmnModeler.get("canvas").zoom(newScale);

      this.scale = newScale;
    },
    addModelerListener() {
      const that = this;

      that.bpmnModeler.on("element.click", e => {
        console.log("modelerListener", e);
      });
    },
    addEventBusListener() {
      const that = this;
      const eventBus = this.bpmnModeler.get("eventBus");

      eventBus.on("element.click", function(e) {
        that.elementClick(e);
      });
    },
    elementClick(e) {
      const that = this;
      const modeling = this.bpmnModeler.get("modeling");

      if (e.element.businessObject.$type === "bpmn:StartEvent") {
        console.log(
          "这是一个开始节点",
          e.element.businessObject.id,
          e.element.businessObject.$type,
          e.element.businessObject.name
        );

        // 修改节点ID
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

        // 修改节点名称
        modeling.updateProperties(e.element, {
          name: "ops-coffee.cn"
        });
      }
    }
  }
};
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
  left: 20px;
  bottom: 20px;
}
.buttons li {
  display: inline-block;
  margin: 5px;
}
.buttons li a {
  color: #333;
  background: #fff;
  cursor: pointer;
  padding: 8px;
  border: 1px solid #ccc;
  text-decoration: none;
}
</style>
