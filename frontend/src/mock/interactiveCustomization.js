export var interactiveCustomizationXML = `<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_05feq4u" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.1.1">
<bpmn:collaboration id="Collaboration_0500iho">
<bpmn:participant id="Participant_0sztagb" name="用户中心" processRef="Process_0a4u6zj"/>
<bpmn:participant id="Participant_1jqevyp" name="创建中心" processRef="Process_1dlw3n8"/>
<bpmn:participant id="Participant_1dg9zo6" name="设计中心" processRef="Process_0ujm5zo"/>
<bpmn:participant id="Participant_15yjk7f" name="任务中心" processRef="Process_074vf46"/>
<bpmn:messageFlow id="Flow_0h5t33f" sourceRef="Activity_02tp0s2" targetRef="Activity_0kzz82x"/>
<bpmn:messageFlow id="Flow_17p85uz" sourceRef="Activity_0kzz82x" targetRef="Activity_1mdaaqw"/>
<bpmn:messageFlow id="Flow_1wx4tdl" sourceRef="Activity_1mdaaqw" targetRef="Activity_1kmokz8"/>
<bpmn:messageFlow id="Flow_0ec3086" sourceRef="Activity_1kmokz8" targetRef="Activity_10qorsf"/>
<bpmn:messageFlow id="Flow_1ysvp06" sourceRef="Activity_10qorsf" targetRef="Activity_08a5e7c"/>
<bpmn:messageFlow id="Flow_1flou3l" sourceRef="Activity_08a5e7c" targetRef="Activity_1bamadk"/>
<bpmn:messageFlow id="Flow_0kdoogq" sourceRef="Activity_08a5e7c" targetRef="Activity_1rpt4je"/>
<bpmn:messageFlow id="Flow_0u8dtrv" sourceRef="Activity_1rpt4je" targetRef="Activity_1jotadp"/>
</bpmn:collaboration>
<bpmn:process id="Process_0a4u6zj" isExecutable="false">
<bpmn:task id="Activity_02tp0s2" name="用户需求提出"/>
<bpmn:task id="Activity_1mdaaqw" name="用户需求确认"/>
<bpmn:task id="Activity_08a5e7c" name="设计方案确认"/>
</bpmn:process>
<bpmn:process id="Process_1dlw3n8">
<bpmn:task id="Activity_0kzz82x" name="分析用户需求"/>
<bpmn:task id="Activity_1kmokz8" name="定制框架与规则"/>
</bpmn:process>
<bpmn:process id="Process_0ujm5zo">
<bpmn:task id="Activity_1bamadk" name="设计方案修改">
<bpmn:outgoing>Flow_1p3xh7b</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_1rpt4je" name="原型制作与验证"/>
<bpmn:task id="Activity_10qorsf" name="设计方案生成">
<bpmn:incoming>Flow_1p3xh7b</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_1p3xh7b" sourceRef="Activity_1bamadk" targetRef="Activity_10qorsf"/>
</bpmn:process>
<bpmn:process id="Process_074vf46">
<bpmn:task id="Activity_1jotadp" name="任务分配与进度管理">
<bpmn:outgoing>Flow_15giqe7</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_0zh2kuj" name="任务分配与进度管理">
<bpmn:incoming>Flow_15giqe7</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_15giqe7" sourceRef="Activity_1jotadp" targetRef="Activity_0zh2kuj"/>
</bpmn:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0500iho">
<bpmndi:BPMNShape id="Participant_0sztagb_di" bpmnElement="Participant_0sztagb" isHorizontal="true">
<dc:Bounds x="130" y="80" width="1390" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_02tp0s2_di" bpmnElement="Activity_02tp0s2">
<dc:Bounds x="200" y="170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1mdaaqw_di" bpmnElement="Activity_1mdaaqw">
<dc:Bounds x="410" y="170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_08a5e7c_di" bpmnElement="Activity_08a5e7c">
<dc:Bounds x="830" y="170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_1jqevyp_di" bpmnElement="Participant_1jqevyp" isHorizontal="true">
<dc:Bounds x="130" y="330" width="1390" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0kzz82x_di" bpmnElement="Activity_0kzz82x">
<dc:Bounds x="200" y="410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1kmokz8_di" bpmnElement="Activity_1kmokz8">
<dc:Bounds x="410" y="410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_1dg9zo6_di" bpmnElement="Participant_1dg9zo6" isHorizontal="true">
<dc:Bounds x="130" y="580" width="1390" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1bamadk_di" bpmnElement="Activity_1bamadk">
<dc:Bounds x="830" y="670" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1rpt4je_di" bpmnElement="Activity_1rpt4je">
<dc:Bounds x="1050" y="670" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_10qorsf_di" bpmnElement="Activity_10qorsf">
<dc:Bounds x="600" y="670" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1p3xh7b_di" bpmnElement="Flow_1p3xh7b">
<di:waypoint x="830" y="710"/>
<di:waypoint x="700" y="710"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_15yjk7f_di" bpmnElement="Participant_15yjk7f" isHorizontal="true">
<dc:Bounds x="130" y="830" width="1390" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1jotadp_di" bpmnElement="Activity_1jotadp">
<dc:Bounds x="1050" y="930" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0zh2kuj_di" bpmnElement="Activity_0zh2kuj">
<dc:Bounds x="1300" y="930" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_15giqe7_di" bpmnElement="Flow_15giqe7">
<di:waypoint x="1150" y="970"/>
<di:waypoint x="1300" y="970"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0h5t33f_di" bpmnElement="Flow_0h5t33f">
<di:waypoint x="250" y="250"/>
<di:waypoint x="250" y="410"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_17p85uz_di" bpmnElement="Flow_17p85uz">
<di:waypoint x="300" y="450"/>
<di:waypoint x="350" y="450"/>
<di:waypoint x="350" y="210"/>
<di:waypoint x="410" y="210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1wx4tdl_di" bpmnElement="Flow_1wx4tdl">
<di:waypoint x="460" y="250"/>
<di:waypoint x="460" y="410"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1ysvp06_di" bpmnElement="Flow_1ysvp06">
<di:waypoint x="650" y="670"/>
<di:waypoint x="650" y="205"/>
<di:waypoint x="830" y="205"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1flou3l_di" bpmnElement="Flow_1flou3l">
<di:waypoint x="880" y="250"/>
<di:waypoint x="880" y="670"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0kdoogq_di" bpmnElement="Flow_0kdoogq">
<di:waypoint x="930" y="210"/>
<di:waypoint x="1100" y="210"/>
<di:waypoint x="1100" y="670"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0ec3086_di" bpmnElement="Flow_0ec3086">
<di:waypoint x="510" y="450"/>
<di:waypoint x="560" y="450"/>
<di:waypoint x="560" y="710"/>
<di:waypoint x="600" y="710"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0u8dtrv_di" bpmnElement="Flow_0u8dtrv">
<di:waypoint x="1100" y="750"/>
<di:waypoint x="1100" y="930"/>
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn:definitions>`;
