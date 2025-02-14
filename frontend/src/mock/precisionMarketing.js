export var precisionMarketingXML = `<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1jg4oeu" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.1.1">
<bpmn:collaboration id="Collaboration_1isyct2">
<bpmn:participant id="Participant_1j1i7fo" name="营销中心" processRef="Process_0e61j2f"/>
<bpmn:participant id="Participant_0qkko7u" name="交易中心" processRef="Process_1idq3gv"/>
<bpmn:participant id="Participant_1ormwva" name="财务系统" processRef="Process_0p4lajv"/>
<bpmn:participant id="Participant_0ibkm08" name="用户订单" processRef="Process_0vp73pe"/>
<bpmn:messageFlow id="Flow_1dhvczt" name="预购预售" sourceRef="Activity_1i5s0h8" targetRef="Activity_0djsq46"/>
<bpmn:messageFlow id="Flow_0esdxqx" name="接收用户订单" sourceRef="Activity_0djsq46" targetRef="Activity_022clij"/>
<bpmn:messageFlow id="Flow_0oxhg1t" name="同步支付数据至财务系统" sourceRef="Activity_0403mq1" targetRef="Activity_02cwb7q"/>
<bpmn:messageFlow id="Flow_1hvsep2" name="交易中心同步订单信息" sourceRef="Activity_1q0j1im" targetRef="Activity_00s8fw7"/>
<bpmn:messageFlow id="Flow_1g0w6d9" sourceRef="Activity_0jfm3sb" targetRef="Activity_11f8rw9"/>
</bpmn:collaboration>
<bpmn:process id="Process_0e61j2f" isExecutable="false">
<bpmn:task id="Activity_1i5s0h8" name="多渠道推广"/>
<bpmn:task id="Activity_11f8rw9" name="优化营销策略"/>
</bpmn:process>
<bpmn:process id="Process_1idq3gv">
<bpmn:task id="Activity_0403mq1" name="代收代付">
<bpmn:incoming>Flow_01tgqu8</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_01tgqu8" sourceRef="Activity_022clij" targetRef="Activity_0403mq1"/>
<bpmn:task id="Activity_022clij" name="订单生成与管理">
<bpmn:outgoing>Flow_01tgqu8</bpmn:outgoing>
</bpmn:task>
</bpmn:process>
<bpmn:process id="Process_0p4lajv">
<bpmn:task id="Activity_02cwb7q" name="资金代收代付对账">
<bpmn:outgoing>Flow_1ed7yyg</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_1q0j1im" name="结算与分账管理">
<bpmn:incoming>Flow_1ed7yyg</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_1ed7yyg" sourceRef="Activity_02cwb7q" targetRef="Activity_1q0j1im"/>
</bpmn:process>
<bpmn:process id="Process_0vp73pe">
<bpmn:task id="Activity_0djsq46" name="用户下单"/>
<bpmn:task id="Activity_00s8fw7" name="订单状态实时跟踪">
<bpmn:outgoing>Flow_0nlhydb</bpmn:outgoing>
</bpmn:task>
<bpmn:task id="Activity_0jfm3sb" name="用户反馈">
<bpmn:incoming>Flow_0nlhydb</bpmn:incoming>
</bpmn:task>
<bpmn:sequenceFlow id="Flow_0nlhydb" sourceRef="Activity_00s8fw7" targetRef="Activity_0jfm3sb"/>
</bpmn:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1isyct2">
<bpmndi:BPMNShape id="Participant_1j1i7fo_di" bpmnElement="Participant_1j1i7fo" isHorizontal="true">
<dc:Bounds x="150" y="40" width="1190" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1i5s0h8_di" bpmnElement="Activity_1i5s0h8">
<dc:Bounds x="250" y="130" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_11f8rw9_di" bpmnElement="Activity_11f8rw9">
<dc:Bounds x="1040" y="130" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_0qkko7u_di" bpmnElement="Participant_0qkko7u" isHorizontal="true">
<dc:Bounds x="150" y="290" width="1190" height="310"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0403mq1_di" bpmnElement="Activity_0403mq1">
<dc:Bounds x="620" y="380" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_022clij_di" bpmnElement="Activity_022clij">
<dc:Bounds x="400" y="380" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_01tgqu8_di" bpmnElement="Flow_01tgqu8">
<di:waypoint x="500" y="420"/>
<di:waypoint x="620" y="420"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_1ormwva_di" bpmnElement="Participant_1ormwva" isHorizontal="true">
<dc:Bounds x="150" y="540" width="1190" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_02cwb7q_di" bpmnElement="Activity_02cwb7q">
<dc:Bounds x="620" y="630" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1q0j1im_di" bpmnElement="Activity_1q0j1im">
<dc:Bounds x="800" y="630" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1ed7yyg_di" bpmnElement="Flow_1ed7yyg">
<di:waypoint x="720" y="670"/>
<di:waypoint x="800" y="670"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0ibkm08_di" bpmnElement="Participant_0ibkm08" isHorizontal="true">
<dc:Bounds x="150" y="790" width="1190" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0djsq46_di" bpmnElement="Activity_0djsq46">
<dc:Bounds x="250" y="890" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_00s8fw7_di" bpmnElement="Activity_00s8fw7">
<dc:Bounds x="800" y="890" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0jfm3sb_di" bpmnElement="Activity_0jfm3sb">
<dc:Bounds x="1040" y="890" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0nlhydb_di" bpmnElement="Flow_0nlhydb">
<di:waypoint x="900" y="930"/>
<di:waypoint x="1040" y="930"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1dhvczt_di" bpmnElement="Flow_1dhvczt">
<di:waypoint x="300" y="210"/>
<di:waypoint x="300" y="890"/>
<bpmndi:BPMNLabel>
<dc:Bounds x="277" y="547" width="45" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0esdxqx_di" bpmnElement="Flow_0esdxqx">
<di:waypoint x="350" y="930"/>
<di:waypoint x="450" y="930"/>
<di:waypoint x="450" y="460"/>
<bpmndi:BPMNLabel>
<dc:Bounds x="416" y="683" width="67" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0oxhg1t_di" bpmnElement="Flow_0oxhg1t">
<di:waypoint x="670" y="460"/>
<di:waypoint x="670" y="630"/>
<bpmndi:BPMNLabel>
<dc:Bounds x="646" y="542" width="78" height="27"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1hvsep2_di" bpmnElement="Flow_1hvsep2">
<di:waypoint x="850" y="710"/>
<di:waypoint x="850" y="890"/>
<bpmndi:BPMNLabel>
<dc:Bounds x="826" y="797" width="78" height="27"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1g0w6d9_di" bpmnElement="Flow_1g0w6d9">
<di:waypoint x="1090" y="890"/>
<di:waypoint x="1090" y="210"/>
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn:definitions>`;
