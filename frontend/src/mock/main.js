export var main = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.flowable.org/processdef">
<collaboration id="Collaboration_13nb0rv">
<participant id="Participant_1hc9ud5" name="交互定制" processRef="process_swnf6qrh"/>
<participant id="Participant_1odq7ez" name="研发创新" processRef="Process_1qtboit"/>
<participant id="Participant_0sfxnnv" name="精准营销" processRef="Process_0yns2tu"/>
<participant id="Participant_0ed1cbh" name="协同采购" processRef="Process_194spc2"/>
<participant id="Participant_1t5ctr2" name="智能生产" processRef="Process_0qrhn67"/>
<participant id="Participant_1n0lwnh" name="智慧物流" processRef="Process_1idkf4g"/>
<participant id="Participant_0h1s4om" name="智慧服务" processRef="Process_08617so"/>
<messageFlow id="Flow_0qe9987" name="作品" sourceRef="Activity_14hit1f" targetRef="Activity_1qv91ee"/>
<messageFlow id="Flow_0iq46bs" name="需求推送&状态返回" sourceRef="Activity_1qv91ee" targetRef="Activity_0lpvnkj"/>
<messageFlow id="Flow_0dbxvz1" name="需求方案通过启动上市" sourceRef="Activity_14hit1f" targetRef="Activity_0998lze"/>
<messageFlow id="Flow_10cvf22" name="HR认证通过" sourceRef="Activity_1bqy2k6" targetRef="Activity_174dprx"/>
<messageFlow id="Flow_11aybs6" sourceRef="Activity_1u4ourz" targetRef="Activity_0fiqppv"/>
<messageFlow id="Flow_0i1yh89" name="生产信息同步" sourceRef="Activity_022guon" targetRef="Activity_1hnwmvi"/>
<messageFlow id="Flow_0if5k4t" name="出厂" sourceRef="Activity_1xj0wdc" targetRef="Activity_1hnwmvi"/>
<messageFlow id="Flow_1xvelj1" name="排斥信息同步" sourceRef="Activity_0pxuek6" targetRef="Activity_1hnwmvi"/>
<messageFlow id="Flow_146arge" name="寻源类需求" sourceRef="Activity_0ufvxj4" targetRef="Activity_0hmf7sh"/>
<messageFlow id="Flow_02vqny1" name="采购需求" sourceRef="Activity_1bqy2k6" targetRef="Activity_0hmf7sh"/>
<messageFlow id="Flow_0kyqluh" name="入厂" sourceRef="Activity_0myeh9c" targetRef="Activity_1xj0wdc"/>
<messageFlow id="Flow_0yp8v5q" name="迭代" sourceRef="Activity_10e03wy" targetRef="Activity_1e6s3dx"/>
<messageFlow id="Flow_0p0a1av" name="订单信息同步" sourceRef="Activity_02ta7u2" targetRef="Activity_0zuu0l9"/>
<messageFlow id="Flow_09sjnq4" name="用户订单" sourceRef="Activity_02ta7u2" targetRef="Activity_0pxuek6"/>
</collaboration>
<process id="process_swnf6qrh" name="name_3tzuye1r">
<task id="Activity_1e6s3dx" name="创意中心">
<outgoing>Flow_1bdicfq</outgoing>
</task>
<task id="Activity_0lpvnkj" name="设计中心">
<incoming>Flow_1bdicfq</incoming>
<incoming>Flow_0vbnfor</incoming>
</task>
<task id="Activity_14hit1f" name="任务中心">
<outgoing>Flow_0vbnfor</outgoing>
</task>
<sequenceFlow id="Flow_1bdicfq" name="创意" sourceRef="Activity_1e6s3dx" targetRef="Activity_0lpvnkj"/>
<sequenceFlow id="Flow_0vbnfor" name="交互类需求" sourceRef="Activity_14hit1f" targetRef="Activity_0lpvnkj"/>
</process>
<process id="Process_1qtboit">
<task id="Activity_1qv91ee" name="研发项目管理系统"/>
<task id="Activity_0ufvxj4" name="开放式创新平台">
<incoming>Flow_0k4peha</incoming>
</task>
<task id="Activity_080vz81" name="外观设计">
<outgoing>Flow_0k4peha</outgoing>
</task>
<task id="Activity_1bqy2k6" name="全面客户体验">
<incoming>Flow_1icabn3</incoming>
</task>
<task id="Activity_0998lze" name="流程协同配置">
<outgoing>Flow_18920cb</outgoing>
</task>
<task id="Activity_036tlls" name="产品立项">
<incoming>Flow_18920cb</incoming>
<outgoing>Flow_1icabn3</outgoing>
</task>
<sequenceFlow id="Flow_18920cb" name="企划立项" sourceRef="Activity_0998lze" targetRef="Activity_036tlls"/>
<sequenceFlow id="Flow_1icabn3" name="研发立项" sourceRef="Activity_036tlls" targetRef="Activity_1bqy2k6"/>
<sequenceFlow id="Flow_0k4peha" name="招标" sourceRef="Activity_080vz81" targetRef="Activity_0ufvxj4"/>
</process>
<process id="Process_0yns2tu">
<task id="Activity_174dprx" name="营销中心">
<outgoing>Flow_08bi4x1</outgoing>
</task>
<task id="Activity_0uk5kc6" name="交易中心">
<incoming>Flow_08bi4x1</incoming>
<outgoing>Flow_1bnmhfc</outgoing>
<outgoing>Flow_05s8x5m</outgoing>
</task>
<task id="Activity_0hj35vo" name="财务系统">
<incoming>Flow_1bnmhfc</incoming>
</task>
<task id="Activity_0msrf0e" name="OMS/GVS-SD">
<incoming>Flow_05s8x5m</incoming>
<outgoing>Flow_14bdqoj</outgoing>
</task>
<task id="Activity_02ta7u2" name="原装配件供应商/制造商">
<incoming>Flow_14bdqoj</incoming>
</task>
<sequenceFlow id="Flow_08bi4x1" name="预约预售" sourceRef="Activity_174dprx" targetRef="Activity_0uk5kc6"/>
<sequenceFlow id="Flow_1bnmhfc" name="生态店铺代收代付" sourceRef="Activity_0uk5kc6" targetRef="Activity_0hj35vo"/>
<sequenceFlow id="Flow_05s8x5m" sourceRef="Activity_0uk5kc6" targetRef="Activity_0msrf0e"/>
<sequenceFlow id="Flow_14bdqoj" sourceRef="Activity_0msrf0e" targetRef="Activity_02ta7u2"/>
</process>
<process id="Process_194spc2">
<task id="Activity_0hmf7sh" name="采购系统">
<outgoing>Flow_0oe7ae7</outgoing>
</task>
<task id="Activity_0zuu0l9" name="制造模块">
<incoming>Flow_0oe7ae7</incoming>
<outgoing>Flow_0nmflh3</outgoing>
</task>
<task id="Activity_0myeh9c" name="供应商管理系统">
<incoming>Flow_0nmflh3</incoming>
</task>
<sequenceFlow id="Flow_0oe7ae7" sourceRef="Activity_0hmf7sh" targetRef="Activity_0zuu0l9"/>
<sequenceFlow id="Flow_0nmflh3" name="采购订单" sourceRef="Activity_0zuu0l9" targetRef="Activity_0myeh9c"/>
</process>
<process id="Process_0qrhn67">
<task id="Activity_022guon" name="智能生产管理系统平台">
<incoming>Flow_17296d0</incoming>
<outgoing>Flow_15f9g5c</outgoing>
</task>
<sequenceFlow id="Flow_17296d0" sourceRef="Activity_0pxuek6" targetRef="Activity_022guon"/>
<sequenceFlow id="Flow_15f9g5c" sourceRef="Activity_022guon" targetRef="Activity_1xj0wdc"/>
<task id="Activity_0pxuek6" name="高级计划与排程">
<outgoing>Flow_17296d0</outgoing>
</task>
<task id="Activity_1xj0wdc" name="智能仓储管理系统">
<incoming>Flow_15f9g5c</incoming>
</task>
</process>
<process id="Process_1idkf4g">
<task id="Activity_1hnwmvi" name="运输管理系统">
<outgoing>Flow_0xmop0h</outgoing>
</task>
<task id="Activity_1ot73l6" name="物流订单系统">
<incoming>Flow_0xmop0h</incoming>
<outgoing>Flow_19xyi01</outgoing>
<outgoing>Flow_01pgv47</outgoing>
</task>
<task id="Activity_1u4ourz" name="仓储管理系统">
<incoming>Flow_19xyi01</incoming>
</task>
<task id="Activity_050xatr" name="快递快运">
<incoming>Flow_01pgv47</incoming>
</task>
<sequenceFlow id="Flow_0xmop0h" sourceRef="Activity_1hnwmvi" targetRef="Activity_1ot73l6"/>
<sequenceFlow id="Flow_19xyi01" sourceRef="Activity_1ot73l6" targetRef="Activity_1u4ourz"/>
<sequenceFlow id="Flow_01pgv47" sourceRef="Activity_1ot73l6" targetRef="Activity_050xatr"/>
</process>
<process id="Process_08617so">
<task id="Activity_0fiqppv" name="售后管理系统">
<outgoing>Flow_0dizrng</outgoing>
<outgoing>Flow_0185r8y</outgoing>
</task>
<sequenceFlow id="Flow_0dizrng" name="服务" sourceRef="Activity_0fiqppv" targetRef="Activity_1l745fi"/>
<task id="Activity_1l745fi" name="客服中心">
<incoming>Flow_0dizrng</incoming>
</task>
<sequenceFlow id="Flow_0185r8y" sourceRef="Activity_0fiqppv" targetRef="Activity_10e03wy"/>
<task id="Activity_10e03wy" name="智慧服务平台">
<incoming>Flow_0185r8y</incoming>
</task>
</process>
<bpmndi:BPMNDiagram id="BPMNDiagram_flow">
<bpmndi:BPMNPlane id="BPMNPlane_flow" bpmnElement="Collaboration_13nb0rv">
<bpmndi:BPMNShape id="Participant_1hc9ud5_di" bpmnElement="Participant_1hc9ud5" isHorizontal="true">
<omgdc:Bounds x="-430" y="-90" width="1930" height="250"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0vbnfor_di" bpmnElement="Flow_0vbnfor">
<di:waypoint x="260" y="80"/>
<di:waypoint x="260" y="140"/>
<di:waypoint x="-10" y="140"/>
<di:waypoint x="-10" y="80"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="97" y="122" width="56" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1bdicfq_di" bpmnElement="Flow_1bdicfq">
<di:waypoint x="-220" y="40"/>
<di:waypoint x="-60" y="40"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="-151" y="22" width="23" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Activity_1e6s3dx_di" bpmnElement="Activity_1e6s3dx">
<omgdc:Bounds x="-320" y="0" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0lpvnkj_di" bpmnElement="Activity_0lpvnkj">
<omgdc:Bounds x="-60" y="0" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_14hit1f_di" bpmnElement="Activity_14hit1f">
<omgdc:Bounds x="210" y="0" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_1odq7ez_di" bpmnElement="Participant_1odq7ez" isHorizontal="true">
<omgdc:Bounds x="-430" y="160" width="1930" height="250"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0k4peha_di" bpmnElement="Flow_0k4peha">
<di:waypoint x="200" y="290"/>
<di:waypoint x="30" y="290"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="104" y="272" width="23" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1icabn3_di" bpmnElement="Flow_1icabn3">
<di:waypoint x="750" y="290"/>
<di:waypoint x="580" y="290"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="643" y="272" width="45" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_18920cb_di" bpmnElement="Flow_18920cb">
<di:waypoint x="1060" y="290"/>
<di:waypoint x="850" y="290"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="933" y="272" width="45" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Activity_1qv91ee_di" bpmnElement="Activity_1qv91ee">
<omgdc:Bounds x="-320" y="250" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0ufvxj4_di" bpmnElement="Activity_0ufvxj4">
<omgdc:Bounds x="-70" y="250" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_080vz81_di" bpmnElement="Activity_080vz81">
<omgdc:Bounds x="200" y="250" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1bqy2k6_di" bpmnElement="Activity_1bqy2k6">
<omgdc:Bounds x="480" y="250" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0998lze_di" bpmnElement="Activity_0998lze">
<omgdc:Bounds x="1060" y="250" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_036tlls_di" bpmnElement="Activity_036tlls">
<omgdc:Bounds x="750" y="250" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_0sfxnnv_di" bpmnElement="Participant_0sfxnnv" isHorizontal="true">
<omgdc:Bounds x="-430" y="410" width="1930" height="250"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_14bdqoj_di" bpmnElement="Flow_14bdqoj">
<di:waypoint x="570" y="540"/>
<di:waypoint x="740" y="540"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_05s8x5m_di" bpmnElement="Flow_05s8x5m">
<di:waypoint x="0" y="500"/>
<di:waypoint x="0" y="440"/>
<di:waypoint x="520" y="440"/>
<di:waypoint x="520" y="500"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1bnmhfc_di" bpmnElement="Flow_1bnmhfc">
<di:waypoint x="50" y="540"/>
<di:waypoint x="200" y="540"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="81" y="522" width="88" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_08bi4x1_di" bpmnElement="Flow_08bi4x1">
<di:waypoint x="-210" y="540"/>
<di:waypoint x="-50" y="540"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="-152" y="522" width="45" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Activity_174dprx_di" bpmnElement="Activity_174dprx">
<omgdc:Bounds x="-310" y="500" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0uk5kc6_di" bpmnElement="Activity_0uk5kc6">
<omgdc:Bounds x="-50" y="500" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0hj35vo_di" bpmnElement="Activity_0hj35vo">
<omgdc:Bounds x="200" y="500" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0msrf0e_di" bpmnElement="Activity_0msrf0e">
<omgdc:Bounds x="470" y="500" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_02ta7u2_di" bpmnElement="Activity_02ta7u2">
<omgdc:Bounds x="740" y="500" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_0ed1cbh_di" bpmnElement="Participant_0ed1cbh" isHorizontal="true">
<omgdc:Bounds x="-430" y="660" width="1930" height="250"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0nmflh3_di" bpmnElement="Flow_0nmflh3">
<di:waypoint x="50" y="790"/>
<di:waypoint x="210" y="790"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="113" y="778" width="45" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0oe7ae7_di" bpmnElement="Flow_0oe7ae7">
<di:waypoint x="-210" y="790"/>
<di:waypoint x="-50" y="790"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Activity_0hmf7sh_di" bpmnElement="Activity_0hmf7sh">
<omgdc:Bounds x="-310" y="750" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0zuu0l9_di" bpmnElement="Activity_0zuu0l9">
<omgdc:Bounds x="-50" y="750" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0myeh9c_di" bpmnElement="Activity_0myeh9c">
<omgdc:Bounds x="210" y="750" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_1t5ctr2_di" bpmnElement="Participant_1t5ctr2" isHorizontal="true">
<omgdc:Bounds x="-430" y="910" width="1930" height="250"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_15f9g5c_di" bpmnElement="Flow_15f9g5c">
<di:waypoint x="40" y="1040"/>
<di:waypoint x="210" y="1040"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_17296d0_di" bpmnElement="Flow_17296d0">
<di:waypoint x="-210" y="1040"/>
<di:waypoint x="-60" y="1040"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Activity_022guon_di" bpmnElement="Activity_022guon">
<omgdc:Bounds x="-60" y="1000" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0pxuek6_di" bpmnElement="Activity_0pxuek6">
<omgdc:Bounds x="-310" y="1000" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1xj0wdc_di" bpmnElement="Activity_1xj0wdc">
<omgdc:Bounds x="210" y="1000" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_1n0lwnh_di" bpmnElement="Participant_1n0lwnh" isHorizontal="true">
<omgdc:Bounds x="-430" y="1160" width="1930" height="250"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_01pgv47_di" bpmnElement="Flow_01pgv47">
<di:waypoint x="20" y="1260"/>
<di:waypoint x="20" y="1210"/>
<di:waypoint x="620" y="1210"/>
<di:waypoint x="620" y="1260"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_19xyi01_di" bpmnElement="Flow_19xyi01">
<di:waypoint x="70" y="1300"/>
<di:waypoint x="260" y="1300"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0xmop0h_di" bpmnElement="Flow_0xmop0h">
<di:waypoint x="-210" y="1300"/>
<di:waypoint x="-30" y="1300"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Activity_1hnwmvi_di" bpmnElement="Activity_1hnwmvi">
<omgdc:Bounds x="-310" y="1260" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1ot73l6_di" bpmnElement="Activity_1ot73l6">
<omgdc:Bounds x="-30" y="1260" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1u4ourz_di" bpmnElement="Activity_1u4ourz">
<omgdc:Bounds x="260" y="1260" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_050xatr_di" bpmnElement="Activity_050xatr">
<omgdc:Bounds x="570" y="1260" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_0h1s4om_di" bpmnElement="Participant_0h1s4om" isHorizontal="true">
<omgdc:Bounds x="-430" y="1410" width="1930" height="250"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0185r8y_di" bpmnElement="Flow_0185r8y">
<di:waypoint x="-210" y="1540"/>
<di:waypoint x="-110" y="1540"/>
<di:waypoint x="-110" y="1590"/>
<di:waypoint x="-20" y="1590"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0dizrng_di" bpmnElement="Flow_0dizrng">
<di:waypoint x="-210" y="1540"/>
<di:waypoint x="-110" y="1540"/>
<di:waypoint x="-110" y="1470"/>
<di:waypoint x="-20" y="1470"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="-106" y="1502" width="23" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Activity_0fiqppv_di" bpmnElement="Activity_0fiqppv">
<omgdc:Bounds x="-310" y="1500" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1l745fi_di" bpmnElement="Activity_1l745fi">
<omgdc:Bounds x="-20" y="1430" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_10e03wy_di" bpmnElement="Activity_10e03wy">
<omgdc:Bounds x="-20" y="1550" width="100" height="80"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0qe9987_di" bpmnElement="Flow_0qe9987">
<di:waypoint x="260" y="80"/>
<di:waypoint x="260" y="190"/>
<di:waypoint x="-270" y="190"/>
<di:waypoint x="-270" y="250"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="-15" y="172" width="22" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0iq46bs_di" bpmnElement="Flow_0iq46bs">
<di:waypoint x="-270" y="250"/>
<di:waypoint x="-270" y="165"/>
<di:waypoint x="-30" y="165"/>
<di:waypoint x="-30" y="80"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="-187" y="151" width="75" height="27"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0dbxvz1_di" bpmnElement="Flow_0dbxvz1">
<di:waypoint x="310" y="40"/>
<di:waypoint x="1110" y="40"/>
<di:waypoint x="1110" y="250"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="671" y="22" width="78" height="27"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_10cvf22_di" bpmnElement="Flow_10cvf22">
<di:waypoint x="530" y="330"/>
<di:waypoint x="530" y="415"/>
<di:waypoint x="-260" y="415"/>
<di:waypoint x="-260" y="500"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="105" y="397" width="61" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_11aybs6_di" bpmnElement="Flow_11aybs6">
<di:waypoint x="310" y="1340"/>
<di:waypoint x="310" y="1420"/>
<di:waypoint x="-260" y="1420"/>
<di:waypoint x="-260" y="1500"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0i1yh89_di" bpmnElement="Flow_0i1yh89">
<di:waypoint x="-10" y="1080"/>
<di:waypoint x="-10" y="1170"/>
<di:waypoint x="-260" y="1170"/>
<di:waypoint x="-260" y="1260"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="-43" y="1123" width="66" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0if5k4t_di" bpmnElement="Flow_0if5k4t">
<di:waypoint x="260" y="1080"/>
<di:waypoint x="260" y="1170"/>
<di:waypoint x="-260" y="1170"/>
<di:waypoint x="-260" y="1260"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="248" y="1123" width="23" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1xvelj1_di" bpmnElement="Flow_1xvelj1">
<di:waypoint x="-260" y="1080"/>
<di:waypoint x="-260" y="1260"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="-293" y="1123" width="66" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_146arge_di" bpmnElement="Flow_146arge">
<di:waypoint x="-20" y="330"/>
<di:waypoint x="-20" y="390"/>
<di:waypoint x="-360" y="390"/>
<di:waypoint x="-360" y="790"/>
<di:waypoint x="-310" y="790"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="-218" y="372" width="56" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_02vqny1_di" bpmnElement="Flow_02vqny1">
<di:waypoint x="530" y="330"/>
<di:waypoint x="530" y="390"/>
<di:waypoint x="-360" y="390"/>
<di:waypoint x="-360" y="790"/>
<di:waypoint x="-310" y="790"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="127" y="372" width="45" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0kyqluh_di" bpmnElement="Flow_0kyqluh">
<di:waypoint x="260" y="830"/>
<di:waypoint x="260" y="1000"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="264" y="912" width="22" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0yp8v5q_di" bpmnElement="Flow_0yp8v5q">
<di:waypoint x="80" y="1590"/>
<di:waypoint x="1430" y="1590"/>
<di:waypoint x="1430" y="-50"/>
<di:waypoint x="-280" y="-50"/>
<di:waypoint x="-276" y="0"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="1434" y="767" width="23" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0p0a1av_di" bpmnElement="Flow_0p0a1av">
<di:waypoint x="790" y="580"/>
<di:waypoint x="790" y="665"/>
<di:waypoint x="0" y="665"/>
<di:waypoint x="0" y="750"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="362" y="647" width="66" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_09sjnq4_di" bpmnElement="Flow_09sjnq4">
<di:waypoint x="790" y="580"/>
<di:waypoint x="790" y="940"/>
<di:waypoint x="-250" y="940"/>
<di:waypoint x="-250" y="1000"/>
<bpmndi:BPMNLabel>
<omgdc:Bounds x="417" y="922" width="45" height="14"/>
</bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</definitions>`;
