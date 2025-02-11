export var collaborativePurchasingXML = `<?xml version="1.0" encoding="UTF-8"?>
 <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1lrx096" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.1.1">
<bpmn:collaboration id="Collaboration_0lvjzgx">
<bpmn:participant id="Participant_09buxpj" name="采购部门" processRef="Process_1qabdke"/>
<bpmn:participant id="Participant_0n5lzlb" name="供应商管理部门" processRef="Process_1d8hqom"/>
<bpmn:participant id="Participant_1fnm6p4" name="制造部门" processRef="Process_1bog2j7"/>
<bpmn:participant id="Participant_1trss9q" name="财务部门" processRef="Process_0zxtbdi"/>
<bpmn:participant id="Participant_0k657ca" name="供应商" processRef="Process_0zxlqr0"/>
<bpmn:messageFlow id="Flow_0hq61ir" sourceRef="Activity_1hjt9kx" targetRef="Activity_1w93dns"/>
<bpmn:messageFlow id="Flow_0w9ljef" sourceRef="Activity_1w93dns" targetRef="Activity_00m9jho"/>
<bpmn:messageFlow id="Flow_0y7i1b4" sourceRef="Activity_00m9jho" targetRef="Activity_0j7yj5e"/>
<bpmn:messageFlow id="Flow_0j9keg9" sourceRef="Activity_05lzi2m" targetRef="Activity_1gdmptc"/>
<bpmn:messageFlow id="Flow_14hhqny" sourceRef="Activity_1um8tsg" targetRef="Activity_1oxwbct"/>
<bpmn:messageFlow id="Flow_11n7z0q" sourceRef="Activity_0tpfbn7" targetRef="Activity_04q5mjk"/>
</bpmn:collaboration>
<bpmn:process id="Process_1qabdke" isExecutable="false">
<bpmn:task id="Activity_12dayb0" name="收集采购需求">
<bpmn:outgoing>Flow_05vw5yi</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_1p2jnjt" name="分析需求">
<bpmn:incoming>Flow_05vw5yi</bpmn:incoming>
<bpmn:outgoing>Flow_0vhc3sm</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_1hjt9kx" name="制定采购计划">
<bpmn:incoming>Flow_0vhc3sm</bpmn:incoming>
</bpmn:task>
<bpmn:task id="Activity_00m9jho" name="生成采购订单"/>
<bpmn:sequenceFlow id="Flow_05vw5yi" sourceRef="Activity_12dayb0" targetRef="Activity_1p2jnjt"/>
<bpmn:sequenceFlow id="Flow_0vhc3sm" sourceRef="Activity_1p2jnjt" targetRef="Activity_1hjt9kx"/>
</bpmn:process>
<bpmn:process id="Process_1d8hqom">
<bpmn:task id="Activity_1w93dns" name="筛选供应商"/>
</bpmn:process>
<bpmn:process id="Process_1bog2j7">
<bpmn:task id="Activity_1gdmptc" name="收货">
<bpmn:outgoing>Flow_10t9yf6</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_0jwn3os" name="质量检验">
<bpmn:incoming>Flow_10t9yf6</bpmn:incoming>
<bpmn:outgoing>Flow_17bv3z8</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_1um8tsg" name="入库">
<bpmn:incoming>Flow_17bv3z8</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_10t9yf6" sourceRef="Activity_1gdmptc" targetRef="Activity_0jwn3os"/>
<bpmn:sequenceFlow id="Flow_17bv3z8" sourceRef="Activity_0jwn3os" targetRef="Activity_1um8tsg"/>
</bpmn:process>
<bpmn:process id="Process_0zxtbdi">
<bpmn:task id="Activity_1oxwbct" name="核对发票与订单">
<bpmn:outgoing>Flow_1ab1m14</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_0tpfbn7" name="付款审批">
<bpmn:incoming>Flow_1ab1m14</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_1ab1m14" sourceRef="Activity_1oxwbct" targetRef="Activity_0tpfbn7"/>
</bpmn:process>
<bpmn:process id="Process_0zxlqr0">
<bpmn:task id="Activity_0j7yj5e" name="接受采购订单">
<bpmn:outgoing>Flow_009j4dd</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_0sikzl5" name="安排备货生产">
<bpmn:incoming>Flow_009j4dd</bpmn:incoming>
<bpmn:outgoing>Flow_18ukazw</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_05lzi2m" name="发货">
<bpmn:incoming>Flow_18ukazw</bpmn:incoming>
</bpmn:task>
<bpmn:task id="Activity_04q5mjk" name="接收款项"/>
<bpmn:sequenceFlow id="Flow_009j4dd" sourceRef="Activity_0j7yj5e" targetRef="Activity_0sikzl5"/>
<bpmn:sequenceFlow id="Flow_18ukazw" sourceRef="Activity_0sikzl5" targetRef="Activity_05lzi2m"/>
</bpmn:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0lvjzgx">
<bpmndi:BPMNShape id="Participant_09buxpj_di" bpmnElement="Participant_09buxpj" isHorizontal="true">
<dc:Bounds x="160" y="60" width="1990" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_12dayb0_di" bpmnElement="Activity_12dayb0">
<dc:Bounds x="240" y="140" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1p2jnjt_di" bpmnElement="Activity_1p2jnjt">
<dc:Bounds x="420" y="140" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1hjt9kx_di" bpmnElement="Activity_1hjt9kx">
<dc:Bounds x="600" y="140" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_00m9jho_di" bpmnElement="Activity_00m9jho">
<dc:Bounds x="820" y="140" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_05vw5yi_di" bpmnElement="Flow_05vw5yi">
<di:waypoint x="340" y="180"/>
<di:waypoint x="420" y="180"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0vhc3sm_di" bpmnElement="Flow_0vhc3sm">
<di:waypoint x="520" y="180"/>
<di:waypoint x="600" y="180"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0n5lzlb_di" bpmnElement="Participant_0n5lzlb" isHorizontal="true">
<dc:Bounds x="160" y="310" width="1990" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1w93dns_di" bpmnElement="Activity_1w93dns">
<dc:Bounds x="600" y="390" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_1fnm6p4_di" bpmnElement="Participant_1fnm6p4" isHorizontal="true">
<dc:Bounds x="160" y="560" width="1990" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1gdmptc_di" bpmnElement="Activity_1gdmptc">
<dc:Bounds x="1260" y="660" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0jwn3os_di" bpmnElement="Activity_0jwn3os">
<dc:Bounds x="1440" y="660" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1um8tsg_di" bpmnElement="Activity_1um8tsg">
<dc:Bounds x="1620" y="660" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_10t9yf6_di" bpmnElement="Flow_10t9yf6">
<di:waypoint x="1360" y="700"/>
<di:waypoint x="1440" y="700"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_17bv3z8_di" bpmnElement="Flow_17bv3z8">
<di:waypoint x="1540" y="700"/>
<di:waypoint x="1620" y="700"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_1trss9q_di" bpmnElement="Participant_1trss9q" isHorizontal="true">
<dc:Bounds x="160" y="810" width="1990" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1oxwbct_di" bpmnElement="Activity_1oxwbct">
<dc:Bounds x="1620" y="900" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0tpfbn7_di" bpmnElement="Activity_0tpfbn7">
<dc:Bounds x="1860" y="900" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1ab1m14_di" bpmnElement="Flow_1ab1m14">
<di:waypoint x="1720" y="940"/>
<di:waypoint x="1860" y="940"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0k657ca_di" bpmnElement="Participant_0k657ca" isHorizontal="true">
<dc:Bounds x="160" y="1060" width="1990" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0j7yj5e_di" bpmnElement="Activity_0j7yj5e">
<dc:Bounds x="930" y="1170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0sikzl5_di" bpmnElement="Activity_0sikzl5">
<dc:Bounds x="1100" y="1170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_05lzi2m_di" bpmnElement="Activity_05lzi2m">
<dc:Bounds x="1260" y="1170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_04q5mjk_di" bpmnElement="Activity_04q5mjk">
<dc:Bounds x="1860" y="1160" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_009j4dd_di" bpmnElement="Flow_009j4dd">
<di:waypoint x="1030" y="1210"/>
<di:waypoint x="1100" y="1210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_18ukazw_di" bpmnElement="Flow_18ukazw">
<di:waypoint x="1200" y="1210"/>
<di:waypoint x="1260" y="1210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0hq61ir_di" bpmnElement="Flow_0hq61ir">
<di:waypoint x="650" y="220"/>
<di:waypoint x="650" y="390"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0w9ljef_di" bpmnElement="Flow_0w9ljef">
<di:waypoint x="700" y="430"/>
<di:waypoint x="870" y="430"/>
<di:waypoint x="870" y="220"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0y7i1b4_di" bpmnElement="Flow_0y7i1b4">
<di:waypoint x="920" y="180"/>
<di:waypoint x="980" y="180"/>
<di:waypoint x="980" y="1170"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0j9keg9_di" bpmnElement="Flow_0j9keg9">
<di:waypoint x="1310" y="1170"/>
<di:waypoint x="1310" y="740"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_14hhqny_di" bpmnElement="Flow_14hhqny">
<di:waypoint x="1670" y="740"/>
<di:waypoint x="1670" y="900"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_11n7z0q_di" bpmnElement="Flow_11n7z0q">
<di:waypoint x="1910" y="980"/>
<di:waypoint x="1910" y="1160"/>
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn:definitions>`