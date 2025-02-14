export var intelligentLogisticsXML = '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.1.1">\n' +
    '<collaboration id="Collaboration_0icfazu">\n' +
    '<participant id="Participant_07he0zp" name="仓储管理系统" processRef="Process_1"/>\n' +
    '<participant id="Participant_1r9xg5i" name="物流订单系统" processRef="Process_0pb2ed1"/>\n' +
    '<participant id="Participant_01m4ma8" name="运输管理系统" processRef="Process_1qr2ass"/>\n' +
    '<participant id="Participant_03ljeeq" name="快递快运" processRef="Process_0m2meyz"/>\n' +
    '<messageFlow id="Flow_0fc4vli" sourceRef="Activity_0aolfbb" targetRef="Activity_137b5tn"/>\n' +
    '<messageFlow id="Flow_027w5z2" sourceRef="Activity_137b5tn" targetRef="Activity_10v3hy2"/>\n' +
    '<messageFlow id="Flow_0mtvhvc" sourceRef="Activity_10v3hy2" targetRef="Activity_1g07oen"/>\n' +
    '<messageFlow id="Flow_1qtbcw5" sourceRef="Activity_1g07oen" targetRef="Activity_0cg92nl"/>\n' +
    '<messageFlow id="Flow_1mri1i4" sourceRef="Activity_0cg92nl" targetRef="Activity_1oo6c01"/>\n' +
    '<messageFlow id="Flow_1gga8lw" sourceRef="Activity_1532izv" targetRef="Activity_05y7sf5"/>\n' +
    '<messageFlow id="Flow_0nehiiy" sourceRef="Activity_05y7sf5" targetRef="Activity_1jqfb1x"/>\n' +
    '<messageFlow id="Flow_0ee3q8b" sourceRef="Activity_1jqfb1x" targetRef="Activity_12cgu06"/>\n' +
    '<messageFlow id="Flow_01i80n9" sourceRef="Activity_12cgu06" targetRef="Activity_0fo9lh9"/>\n' +
    '<messageFlow id="Flow_00pkm4n" name="交付确认" sourceRef="Activity_0fo9lh9" targetRef="Activity_15os08o"/>\n' +
    '</collaboration>\n' +
    '<process id="Process_1" isExecutable="false">\n' +
    '<task id="Activity_137b5tn" name="库存查询"/>\n' +
    '<task id="Activity_1g07oen" name="出库"/>\n' +
    '</process>\n' +
    '<process id="Process_0pb2ed1">\n' +
    '<task id="Activity_0aolfbb" name="订单接收"/>\n' +
    '<task id="Activity_10v3hy2" name="订单处理"/>\n' +
    '<task id="Activity_0cg92nl" name="配车调度"/>\n' +
    '<task id="Activity_12cgu06" name="订单监控"/>\n' +
    '<task id="Activity_15os08o" name="订单完成通知"/>\n' +
    '</process>\n' +
    '<process id="Process_1qr2ass">\n' +
    '<task id="Activity_1oo6c01" name="车辆安排">\n' +
    '<outgoing>Flow_1f6d9z3</outgoing>\n' +
    '</task>\n' +
    '<task id="Activity_1532izv" name="发货安排">\n' +
    '<incoming>Flow_1f6d9z3</incoming>\n' +
    '</task>\n' +
    '<task id="Activity_1jqfb1x" name="运输监控"/>\n' +
    '<sequenceFlow id="Flow_1f6d9z3" sourceRef="Activity_1oo6c01" targetRef="Activity_1532izv"/>\n' +
    '</process>\n' +
    '<process id="Process_0m2meyz">\n' +
    '<task id="Activity_05y7sf5" name="取货"/>\n' +
    '<task id="Activity_0fo9lh9" name="配送"/>\n' +
    '</process>\n' +
    '<bpmndi:BPMNDiagram id="BpmnDiagram_1">\n' +
    '<bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Collaboration_0icfazu">\n' +
    '<bpmndi:BPMNShape id="Participant_07he0zp_di" bpmnElement="Participant_07he0zp" isHorizontal="true">\n' +
    '<omgdc:Bounds x="150" y="80" width="1340" height="250"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_137b5tn_di" bpmnElement="Activity_137b5tn">\n' +
    '<omgdc:Bounds x="210" y="160" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_1g07oen_di" bpmnElement="Activity_1g07oen">\n' +
    '<omgdc:Bounds x="420" y="160" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Participant_1r9xg5i_di" bpmnElement="Participant_1r9xg5i" isHorizontal="true">\n' +
    '<omgdc:Bounds x="150" y="330" width="1340" height="250"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_0aolfbb_di" bpmnElement="Activity_0aolfbb">\n' +
    '<omgdc:Bounds x="210" y="410" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_10v3hy2_di" bpmnElement="Activity_10v3hy2">\n' +
    '<omgdc:Bounds x="420" y="410" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_0cg92nl_di" bpmnElement="Activity_0cg92nl">\n' +
    '<omgdc:Bounds x="620" y="410" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_12cgu06_di" bpmnElement="Activity_12cgu06">\n' +
    '<omgdc:Bounds x="1040" y="410" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_15os08o_di" bpmnElement="Activity_15os08o">\n' +
    '<omgdc:Bounds x="1370" y="410" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Participant_01m4ma8_di" bpmnElement="Participant_01m4ma8" isHorizontal="true">\n' +
    '<omgdc:Bounds x="150" y="580" width="1340" height="250"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_1oo6c01_di" bpmnElement="Activity_1oo6c01">\n' +
    '<omgdc:Bounds x="620" y="680" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_1532izv_di" bpmnElement="Activity_1532izv">\n' +
    '<omgdc:Bounds x="820" y="680" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_1jqfb1x_di" bpmnElement="Activity_1jqfb1x">\n' +
    '<omgdc:Bounds x="1040" y="680" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNEdge id="Flow_1f6d9z3_di" bpmnElement="Flow_1f6d9z3">\n' +
    '<omgdi:waypoint x="720" y="720"/>\n' +
    '<omgdi:waypoint x="820" y="720"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNShape id="Participant_03ljeeq_di" bpmnElement="Participant_03ljeeq" isHorizontal="true">\n' +
    '<omgdc:Bounds x="150" y="830" width="1340" height="250"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_05y7sf5_di" bpmnElement="Activity_05y7sf5">\n' +
    '<omgdc:Bounds x="820" y="920" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNShape id="Activity_0fo9lh9_di" bpmnElement="Activity_0fo9lh9">\n' +
    '<omgdc:Bounds x="1210" y="920" width="100" height="80"/>\n' +
    '<bpmndi:BPMNLabel/>\n' +
    '</bpmndi:BPMNShape>\n' +
    '<bpmndi:BPMNEdge id="Flow_0fc4vli_di" bpmnElement="Flow_0fc4vli">\n' +
    '<omgdi:waypoint x="260" y="410"/>\n' +
    '<omgdi:waypoint x="260" y="240"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_027w5z2_di" bpmnElement="Flow_027w5z2">\n' +
    '<omgdi:waypoint x="310" y="200"/>\n' +
    '<omgdi:waypoint x="360" y="200"/>\n' +
    '<omgdi:waypoint x="360" y="450"/>\n' +
    '<omgdi:waypoint x="420" y="450"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_0mtvhvc_di" bpmnElement="Flow_0mtvhvc">\n' +
    '<omgdi:waypoint x="470" y="410"/>\n' +
    '<omgdi:waypoint x="470" y="240"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_1qtbcw5_di" bpmnElement="Flow_1qtbcw5">\n' +
    '<omgdi:waypoint x="520" y="200"/>\n' +
    '<omgdi:waypoint x="670" y="200"/>\n' +
    '<omgdi:waypoint x="670" y="410"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_1mri1i4_di" bpmnElement="Flow_1mri1i4">\n' +
    '<omgdi:waypoint x="670" y="490"/>\n' +
    '<omgdi:waypoint x="670" y="680"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_1gga8lw_di" bpmnElement="Flow_1gga8lw">\n' +
    '<omgdi:waypoint x="870" y="760"/>\n' +
    '<omgdi:waypoint x="870" y="920"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_0nehiiy_di" bpmnElement="Flow_0nehiiy">\n' +
    '<omgdi:waypoint x="920" y="960"/>\n' +
    '<omgdi:waypoint x="1090" y="960"/>\n' +
    '<omgdi:waypoint x="1090" y="760"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_0ee3q8b_di" bpmnElement="Flow_0ee3q8b">\n' +
    '<omgdi:waypoint x="1090" y="680"/>\n' +
    '<omgdi:waypoint x="1090" y="490"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_01i80n9_di" bpmnElement="Flow_01i80n9">\n' +
    '<omgdi:waypoint x="1140" y="450"/>\n' +
    '<omgdi:waypoint x="1260" y="450"/>\n' +
    '<omgdi:waypoint x="1260" y="920"/>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '<bpmndi:BPMNEdge id="Flow_00pkm4n_di" bpmnElement="Flow_00pkm4n">\n' +
    '<omgdi:waypoint x="1310" y="960"/>\n' +
    '<omgdi:waypoint x="1420" y="960"/>\n' +
    '<omgdi:waypoint x="1420" y="490"/>\n' +
    '<bpmndi:BPMNLabel>\n' +
    '<omgdc:Bounds x="1397" y="703" width="45" height="14"/>\n' +
    '</bpmndi:BPMNLabel>\n' +
    '</bpmndi:BPMNEdge>\n' +
    '</bpmndi:BPMNPlane>\n' +
    '</bpmndi:BPMNDiagram>\n' +
    '</definitions>';
