export var developmentInnovationXML = `<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0lkvvf4" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.1.1">
<bpmn:collaboration id="Collaboration_0nyudgo">
<bpmn:participant id="Participant_1ttjmea" name="立项管理" processRef="Process_0u5g7gr"/>
<bpmn:participant id="Participant_0asq3ld" name="项目管理" processRef="Process_142qvyz"/>
<bpmn:participant id="Participant_0y65cs5" name="设计与开发" processRef="Process_1ld2hx6"/>
<bpmn:participant id="Participant_0s51a1f" name="客户体验与决策" processRef="Process_1ewafva"/>
<bpmn:participant id="Participant_1oz4tso" name="调度与状态管理" processRef="Process_0qen4tx"/>
<bpmn:messageFlow id="Flow_1i2xm6w" name="接收立项需求" sourceRef="Activity_1vkg9ki" targetRef="Activity_0fnwx1v"/>
<bpmn:messageFlow id="Flow_0pngi37" name="接收项目任务" sourceRef="Activity_0wtjnoc" targetRef="Activity_1bjs2bh"/>
<bpmn:messageFlow id="Flow_0syp1p0" sourceRef="Activity_1bjs2bh" targetRef="Activity_1mzxyxa"/>
<bpmn:messageFlow id="Flow_10akyh0" name="数据分析与优化建议" sourceRef="Activity_0vymjbo" targetRef="Activity_1bjs2bh"/>
<bpmn:messageFlow id="Flow_0ke2h8o" sourceRef="Activity_0wtjnoc" targetRef="Activity_021va3m"/>
<bpmn:messageFlow id="Flow_01mj6b3" sourceRef="Activity_1vkg9ki" targetRef="Activity_0i16d6n"/>
</bpmn:collaboration>
<bpmn:process id="Process_0u5g7gr" isExecutable="false">
<bpmn:task id="Activity_10o2m1p" name="企划立项">
<bpmn:outgoing>Flow_0jpdf5m</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_0uuswgs" name="产品立项">
<bpmn:incoming>Flow_0jpdf5m</bpmn:incoming>
<bpmn:outgoing>Flow_1k0fxpb</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_1vkg9ki" name="研发立项">
<bpmn:incoming>Flow_1k0fxpb</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_0jpdf5m" sourceRef="Activity_10o2m1p" targetRef="Activity_0uuswgs"/>
<bpmn:sequenceFlow id="Flow_1k0fxpb" sourceRef="Activity_0uuswgs" targetRef="Activity_1vkg9ki"/>
</bpmn:process>
<bpmn:process id="Process_142qvyz">
<bpmn:task id="Activity_0fnwx1v" name="研发项目管理">
<bpmn:outgoing>Flow_1rqkr5y</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_0wtjnoc" name="流程协同配置">
<bpmn:incoming>Flow_1rqkr5y</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_1rqkr5y" sourceRef="Activity_0fnwx1v" targetRef="Activity_0wtjnoc"/>
</bpmn:process>
<bpmn:process id="Process_1ld2hx6">
<bpmn:task id="Activity_1bjs2bh" name="开放式创新（外部合作/技术整合）"/>
</bpmn:process>
<bpmn:process id="Process_1ewafva">
<bpmn:task id="Activity_1mzxyxa" name="全面用户体验">
<bpmn:outgoing>Flow_0fcbkok</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_0vymjbo" name="决策支持">
<bpmn:incoming>Flow_0fcbkok</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_0fcbkok" name="用户测试/反馈" sourceRef="Activity_1mzxyxa" targetRef="Activity_0vymjbo"/>
</bpmn:process>
<bpmn:process id="Process_0qen4tx">
<bpmn:task id="Activity_0i16d6n" name="项目状态跟踪"/>
<bpmn:task id="Activity_021va3m" name="资源调度"/>
</bpmn:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0nyudgo">
<bpmndi:BPMNShape id="Participant_1ttjmea_di" bpmnElement="Participant_1ttjmea" isHorizontal="true">
<dc:Bounds x="180" y="80" width="1380" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_10o2m1p_di" bpmnElement="Activity_10o2m1p">
<dc:Bounds x="260" y="150" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0uuswgs_di" bpmnElement="Activity_0uuswgs">
<dc:Bounds x="450" y="150" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1vkg9ki_di" bpmnElement="Activity_1vkg9ki">
<dc:Bounds x="640" y="150" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0jpdf5m_di" bpmnElement="Flow_0jpdf5m">
<di:waypoint x="360" y="190"/>
<di:waypoint x="450" y="190"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1k0fxpb_di" bpmnElement="Flow_1k0fxpb">
<di:waypoint x="550" y="190"/>
<di:waypoint x="640" y="190"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0asq3ld_di" bpmnElement="Participant_0asq3ld" isHorizontal="true">
<dc:Bounds x="180" y="330" width="1380" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0fnwx1v_di" bpmnElement="Activity_0fnwx1v">
<dc:Bounds x="640" y="430" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0wtjnoc_di" bpmnElement="Activity_0wtjnoc">
<dc:Bounds x="820" y="430" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1rqkr5y_di" bpmnElement="Flow_1rqkr5y">
<di:waypoint x="740" y="470"/>
<di:waypoint x="820" y="470"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0y65cs5_di" bpmnElement="Participant_0y65cs5" isHorizontal="true">
<dc:Bounds x="180" y="580" width="1380" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1bjs2bh_di" bpmnElement="Activity_1bjs2bh">
<dc:Bounds x="820" y="680" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_0s51a1f_di" bpmnElement="Participant_0s51a1f" isHorizontal="true">
<dc:Bounds x="180" y="830" width="1380" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1mzxyxa_di" bpmnElement="Activity_1mzxyxa">
<dc:Bounds x="820" y="920" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0vymjbo_di" bpmnElement="Activity_0vymjbo">
<dc:Bounds x="1060" y="920" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0fcbkok_di" bpmnElement="Flow_0fcbkok">
<di:waypoint x="920" y="960"/>
<di:waypoint x="1060" y="960"/>
<bpmndi:BPMNLabel>
<dc:Bounds x="955" y="942" width="71" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_1oz4tso_di" bpmnElement="Participant_1oz4tso" isHorizontal="true">
<dc:Bounds x="180" y="1080" width="1380" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0i16d6n_di" bpmnElement="Activity_0i16d6n">
<dc:Bounds x="1420" y="1180" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_021va3m_di" bpmnElement="Activity_021va3m">
<dc:Bounds x="1240" y="1180" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1i2xm6w_di" bpmnElement="Flow_1i2xm6w">
<di:waypoint x="690" y="230"/>
<di:waypoint x="690" y="430"/>
<bpmndi:BPMNLabel>
<dc:Bounds x="672" y="327" width="67" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0pngi37_di" bpmnElement="Flow_0pngi37">
<di:waypoint x="870" y="510"/>
<di:waypoint x="870" y="680"/>
<bpmndi:BPMNLabel>
<dc:Bounds x="852" y="592" width="67" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0syp1p0_di" bpmnElement="Flow_0syp1p0">
<di:waypoint x="870" y="760"/>
<di:waypoint x="870" y="920"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_10akyh0_di" bpmnElement="Flow_10akyh0">
<di:waypoint x="1110" y="920"/>
<di:waypoint x="1110" y="720"/>
<di:waypoint x="920" y="720"/>
<bpmndi:BPMNLabel>
<dc:Bounds x="1086" y="817" width="78" height="27"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0ke2h8o_di" bpmnElement="Flow_0ke2h8o">
<di:waypoint x="920" y="470"/>
<di:waypoint x="1290" y="470"/>
<di:waypoint x="1290" y="1180"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_01mj6b3_di" bpmnElement="Flow_01mj6b3">
<di:waypoint x="740" y="190"/>
<di:waypoint x="1470" y="190"/>
<di:waypoint x="1470" y="1180"/>
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn:definitions>`;
