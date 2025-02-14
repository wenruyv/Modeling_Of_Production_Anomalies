export var intelligentServiceXML = '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1w8tfa6" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.1.1">\n' +
    '<bpmn:collaboration id="Collaboration_028a3az">\n' +
    '<bpmn:participant id="Participant_0omm2s8" name="智慧服务平台" processRef="Process_0qoh3uv"/>\n' +
    '<bpmn:participant id="Participant_11fxx2t" name="售后管理系统" processRef="Process_0ysp9a9"/>\n' +
    '<bpmn:participant id="Participant_147yoqf" name="客服中心" processRef="Process_1ehb9bl"/>\n' +
    '<bpmn:messageFlow id="Flow_0mj3tsk" name="售后类" sourceRef="Activity_1cewllo" targetRef="Activity_0wk0rd8"/>\n' +
    '<bpmn:messageFlow id="Flow_1r3mid7" name="非售后类" sourceRef="Activity_1cewllo" targetRef="Activity_0f328uy"/>\n' +
    '<bpmn:messageFlow id="Flow_1r1xw3y" name="反馈" sourceRef="Activity_00ltve2" targetRef="Activity_1mz3xpu"/>\n' +
    '<bpmn:messageFlow id="Flow_1dcfurf" sourceRef="Activity_0f328uy" targetRef="Activity_00ltve2"/>\n' +
    '</bpmn:collaboration>\n' +
    '<bpmn:process id="Process_0qoh3uv" isExecutable="false">\n' +
    '<bpmn:task id="Activity_1uapp34" name="接收用户服务请求">\n' +
    '<bpmn:outgoing>Flow_11e4xyq</bpmn:outgoing>\n' +
    '</bpmn:task>\n' +
    '<bpmn:task id="Activity_1cewllo" name="匹配服务资源">\n' +
    '<bpmn:incoming>Flow_11e4xyq</bpmn:incoming>\n' +
    '</bpmn:task>\n' +
    '<bpmn:sequenceFlow id="Flow_11e4xyq" sourceRef="Activity_1uapp34" targetRef="Activity_1cewllo"/>\n' +
    '<bpmn:task id="Activity_1mz3xpu" name="接收售后服务报告"/>\n' +
    '</bpmn:process>\n' +
    '<bpmn:process id="Process_0ysp9a9">\n' +
    '<bpmn:task id="Activity_0wk0rd8" name="核实用户信息与设备情况">\n' +
    '<bpmn:outgoing>Flow_1s0oigc</bpmn:outgoing>\n' +
    '</bpmn:task>\n' +
    '<bpmn:task id="Activity_1cko4eg" name="核实用户信息与设备情况">\n' +
    '<bpmn:incoming>Flow_1s0oigc</bpmn:incoming>\n' +
    '<bpmn:outgoing>Flow_1ebklev</bpmn:outgoing>\n' +
    '</bpmn:task>\n' +
    '<bpmn:task id="Activity_0a9fmap" name="售后人员维护">\n' +
    '<bpmn:incoming>Flow_1ebklev</bpmn:incoming>\n' +
    '<bpmn:outgoing>Flow_06lqvsn</bpmn:outgoing>\n' +
    '</bpmn:task>\n' +
    '<bpmn:task id="Activity_00ltve2" name="填写服务报告">\n' +
    '<bpmn:incoming>Flow_06lqvsn</bpmn:incoming>\n' +
    '</bpmn:task>\n' +
    '<bpmn:sequenceFlow id="Flow_1s0oigc" sourceRef="Activity_0wk0rd8" targetRef="Activity_1cko4eg"/>\n' +
    '<bpmn:sequenceFlow id="Flow_1ebklev" sourceRef="Activity_1cko4eg" targetRef="Activity_0a9fmap"/>\n' +
    '<bpmn:sequenceFlow id="Flow_06lqvsn" sourceRef="Activity_0a9fmap" targetRef="Activity_00ltve2"/>\n' +
    '</bpmn:process>\n' +
    '<bpmn:process id="Process_1ehb9bl">\n' +
    '<bpmn:task id="Activity_0f328uy" name="与用户沟通解答"/>\n' +
    '</bpmn:process>\n' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_028a3az">\n' +
    '<bpmndi:BPMNShape id="Participant_0omm2s8_di" bpmnElement="Participant_0omm2s8" isHorizontal="true">\n' +
    '<dc:Bounds x="180" y="50" width="1540" height="250"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_1uapp34_di" bpmnElement="Activity_1uapp34">\n' +
    '<dc:Bounds x="280" y="130" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_1cewllo_di" bpmnElement="Activity_1cewllo">\n' +
    '<dc:Bounds x="490" y="130" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_1mz3xpu_di" bpmnElement="Activity_1mz3xpu">\n' +
    '<dc:Bounds x="1360" y="130" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNEdge id="Flow_11e4xyq_di" bpmnElement="Flow_11e4xyq">\n' +
    '<di:waypoint x="380" y="170"/>\n' +
    '<di:waypoint x="490" y="170"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNShape id="Participant_11fxx2t_di" bpmnElement="Participant_11fxx2t" isHorizontal="true">\n' +
    '<dc:Bounds x="180" y="300" width="1540" height="250"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_0wk0rd8_di" bpmnElement="Activity_0wk0rd8">\n' +
    '<dc:Bounds x="700" y="390" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_1cko4eg_di" bpmnElement="Activity_1cko4eg">\n' +
    '<dc:Bounds x="930" y="390" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_0a9fmap_di" bpmnElement="Activity_0a9fmap">\n' +
    '<dc:Bounds x="1150" y="390" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_00ltve2_di" bpmnElement="Activity_00ltve2">\n' +
    '<dc:Bounds x="1360" y="390" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNEdge id="Flow_1s0oigc_di" bpmnElement="Flow_1s0oigc">\n' +
    '<di:waypoint x="800" y="430"/>\n' +
    '<di:waypoint x="930" y="430"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_1ebklev_di" bpmnElement="Flow_1ebklev">\n' +
    '<di:waypoint x="1030" y="430"/>\n' +
    '<di:waypoint x="1150" y="430"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_06lqvsn_di" bpmnElement="Flow_06lqvsn">\n' +
    '<di:waypoint x="1250" y="430"/>\n' +
    '<di:waypoint x="1360" y="430"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNShape id="Participant_147yoqf_di" bpmnElement="Participant_147yoqf" isHorizontal="true">\n' +
    '<dc:Bounds x="180" y="550" width="1540" height="250"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_0f328uy_di" bpmnElement="Activity_0f328uy">\n' +
    '<dc:Bounds x="700" y="640" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNEdge id="Flow_0mj3tsk_di" bpmnElement="Flow_0mj3tsk">\n' +
    '<di:waypoint x="540" y="210"/>\n' +
    '<di:waypoint x="540" y="430"/>\n' +
    '<di:waypoint x="700" y="430"/>\n' +
    '<bpmndi:BPMNLabel>\n' +
    '<dc:Bounds x="593" y="418" width="34" height="14"/>\n' +
    '</bpmndi:BPMNLabel>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_1r3mid7_di" bpmnElement="Flow_1r3mid7">\n' +
    '<di:waypoint x="540" y="210"/>\n' +
    '<di:waypoint x="540" y="680"/>\n' +
    '<di:waypoint x="700" y="680"/>\n' +
    '<bpmndi:BPMNLabel>\n' +
    '<dc:Bounds x="587" y="663" width="45" height="14"/>\n' +
    '</bpmndi:BPMNLabel>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_1r1xw3y_di" bpmnElement="Flow_1r1xw3y">\n' +
    '<di:waypoint x="1410" y="390"/>\n' +
    '<di:waypoint x="1410" y="210"/>\n' +
    '<bpmndi:BPMNLabel>\n' +
    '<dc:Bounds x="1414" y="297" width="23" height="14"/>\n' +
    '</bpmndi:BPMNLabel>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_1dcfurf_di" bpmnElement="Flow_1dcfurf">\n' +
    '<di:waypoint x="800" y="680"/>\n' +
    '<di:waypoint x="1410" y="680"/>\n' +
    '<di:waypoint x="1410" y="470"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '</bpmndi:BPMNPlane>\n' +
    '</bpmndi:BPMNDiagram>\n' +
    '</bpmn:definitions>';
