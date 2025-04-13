export var intelligentProductionXML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.flowable.org/processdef">
<collaboration id="Collaboration_0gtjgc7">
<participant id="Participant_1ucofm3" name="供应商" processRef="Process_02sgrgn"/>
<participant id="Participant_0obrl7n" name="物流" processRef="Process_19xyp00"/>
<participant id="Participant_1poqhlq" name="仓储" processRef="Process_0hd9ddu"/>
<participant id="Participant_048z7hi" name="总包企业" processRef="Process_1a5i7ad"/>
<participant id="Participant_1uzl7nj" name="生产车间1" processRef="Process_1ju7dhj"/>
<participant id="Participant_07kxl66" name="生产车间2" processRef="Process_0eiwry1"/>
<participant id="Participant_1d9i6e3" name="总装车间" processRef="Process_0tsvjfp"/>
<participant id="Participant_0fsna3p" name="质量控制" processRef="Process_04r4jaj"/>
<participant id="Participant_1b1u3c4" name="设备维护" processRef="Process_0xmupm8"/>
<participant id="Participant_0iqrbor" name="销售与客户服务" processRef="Process_1cius7t"/>
<messageFlow id="Flow_03r4zr0" sourceRef="Activity_14nbi7z" targetRef="Activity_09rtvcv"/>
<messageFlow id="Flow_1jupg11" sourceRef="Activity_1xufxzj" targetRef="Activity_15qe52r"/>
<messageFlow id="Flow_0z6w55w" sourceRef="Activity_1b8g6j3" targetRef="Activity_1tkf534"/>
<messageFlow id="Flow_0by2x6u" sourceRef="Activity_1tkf534" targetRef="Activity_1y0m7d4"/>
<messageFlow id="Flow_0vx64u2" sourceRef="Activity_1y0m7d4" targetRef="Activity_0e5vio3"/>
<messageFlow id="Flow_1byg49v" sourceRef="Activity_0hwoh4t" targetRef="Activity_0eakc40"/>
<messageFlow id="Flow_0z8ubhr" sourceRef="Activity_0eakc40" targetRef="Activity_03x5zz9"/>
<messageFlow id="Flow_18y2743" sourceRef="Activity_0eakc40" targetRef="Activity_0a1xp68"/>
<messageFlow id="Flow_1496j6a" sourceRef="Activity_0eakc40" targetRef="Activity_1iq25fq"/>
<messageFlow id="Flow_1jx2afr" sourceRef="Activity_0clsx69" targetRef="Activity_1689lor"/>
<messageFlow id="Flow_171agx2" sourceRef="Activity_1689lor" targetRef="Activity_0u9acpr"/>
<messageFlow id="Flow_0h93cbn" sourceRef="Activity_12zt39t" targetRef="Activity_1s0a1iu"/>
<messageFlow id="Flow_0zkny7i" sourceRef="Activity_1s0a1iu" targetRef="Activity_1dab79n"/>
<messageFlow id="Flow_193708u" sourceRef="Activity_1dab79n" targetRef="Activity_1g7u0vh"/>
<messageFlow id="Flow_1hgsg1e" sourceRef="Activity_0508ogu" targetRef="Activity_1h9hpgd"/>
<messageFlow id="Flow_0sidir8" sourceRef="Activity_1g7u0vh" targetRef="Activity_0508ogu"/>
<messageFlow id="Flow_1ahr4ny" sourceRef="Activity_0508ogu" targetRef="Activity_167r8p5"/>
<messageFlow id="Flow_0nwey4i" sourceRef="Activity_1oyxhc6" targetRef="Activity_0k10d3q"/>
<messageFlow id="Flow_0g2nuoa" sourceRef="Activity_1oyxhc6" targetRef="Activity_17ir7y8"/>
<messageFlow id="Flow_00q0hdg" sourceRef="Activity_1oyxhc6" targetRef="Activity_1kqn0tj"/>
<messageFlow id="Flow_15r2419" sourceRef="Activity_1oyxhc6" targetRef="Activity_0elox33"/>
<messageFlow id="Flow_1vpisex" sourceRef="Activity_1oyxhc6" targetRef="Activity_0pmu5jn"/>
<messageFlow id="Flow_0czyiuk" sourceRef="Activity_17ir7y8" targetRef="Activity_1kxmkzv"/>
<messageFlow id="Flow_08du804" sourceRef="Activity_1689lor" targetRef="Activity_1cmq06f"/>
<messageFlow id="Flow_03l79ir" sourceRef="Activity_1689lor" targetRef="Activity_1iwabgg"/>
<messageFlow id="Flow_0ichwq5" sourceRef="Activity_1hd019k" targetRef="Activity_1xufxzj"/>
<messageFlow id="Flow_0spz7j6" sourceRef="Activity_074r5vf" targetRef="Activity_10j9wxq"/>
</collaboration>
<process id="Process_02sgrgn">
<task id="Activity_15qe52r" name="接收采购订单">
<outgoing>Flow_0ku7p0k</outgoing>
</task>
<task id="Activity_1b8g6j3" name="原材料发货">
<incoming>Flow_0ku7p0k</incoming>
</task>
<task id="Activity_0pmu5jn" name="原材料分析"/>
<sequenceFlow id="Flow_0ku7p0k" sourceRef="Activity_15qe52r" targetRef="Activity_1b8g6j3"/>
</process>
<process id="Process_19xyp00">
<task id="Activity_1tkf534" name="提供物流单号"/>
<task id="Activity_1h9hpgd" name="跟踪物流"/>
<task id="Activity_0elox33" name="物流分析"/>
</process>
<process id="Process_0hd9ddu">
<task id="Activity_1y0m7d4" name="清点收货"/>
<task id="Activity_0eakc40" name="领料出库"/>
<task id="Activity_1dab79n" name="成品入库"/>
<task id="Activity_0508ogu" name="发货"/>
</process>
<process id="Process_1a5i7ad">
<task id="Activity_074r5vf" name="订单评审">
<incoming>Flow_0nb9ozw</incoming>
</task>
<task id="Activity_09rtvcv" name="接收订单详情">
<outgoing>Flow_0nb9ozw</outgoing>
</task>
<task id="Activity_1xufxzj" name="制定采购订单"/>
<task id="Activity_0hwoh4t" name="制定生产工单"/>
<sequenceFlow id="Flow_0nb9ozw" sourceRef="Activity_09rtvcv" targetRef="Activity_074r5vf"/>
</process>
<process id="Process_1ju7dhj">
<task id="Activity_03x5zz9" name="通知设备调试">
<outgoing>Flow_0p32hsv</outgoing>
</task>
<task id="Activity_11wjx9q" name="零部件加工">
<incoming>Flow_0p32hsv</incoming>
</task>
<task id="Activity_1iwabgg" name="调整加工过程">
<outgoing>Flow_15niunb</outgoing>
</task>
<task id="Activity_03jjwry" name="工序间转运">
<incoming>Flow_15niunb</incoming>
</task>
<task id="Activity_1kqn0tj" name="生产流程分析"/>
<sequenceFlow id="Flow_0p32hsv" sourceRef="Activity_03x5zz9" targetRef="Activity_11wjx9q"/>
<sequenceFlow id="Flow_15niunb" sourceRef="Activity_1iwabgg" targetRef="Activity_03jjwry"/>
</process>
<process id="Process_0eiwry1">
<task id="Activity_0a1xp68" name="通知设备调试">
<outgoing>Flow_1r4q79x</outgoing>
</task>
<task id="Activity_1hs0wq9" name="零部件加工">
<incoming>Flow_1r4q79x</incoming>
</task>
<task id="Activity_1cmq06f" name="调整加工过程">
<outgoing>Flow_1jfakah</outgoing>
</task>
<task id="Activity_1cvzm1z" name="工序间转运">
<incoming>Flow_1jfakah</incoming>
</task>
<sequenceFlow id="Flow_1r4q79x" sourceRef="Activity_0a1xp68" targetRef="Activity_1hs0wq9"/>
<sequenceFlow id="Flow_1jfakah" sourceRef="Activity_1cmq06f" targetRef="Activity_1cvzm1z"/>
</process>
<process id="Process_0tsvjfp">
<task id="Activity_1iq25fq" name="通知设备调试">
<outgoing>Flow_04syzr0</outgoing>
</task>
<task id="Activity_0clsx69" name="产品组装">
<incoming>Flow_04syzr0</incoming>
</task>
<task id="Activity_0u9acpr" name="调整加工过程">
<outgoing>Flow_0km76uv</outgoing>
</task>
<task id="Activity_0116jwj" name="工序间转运">
<incoming>Flow_0km76uv</incoming>
<outgoing>Flow_0tc1qyv</outgoing>
</task>
<task id="Activity_02l5gvn" name="成品装配，核对BOOM清单">
<incoming>Flow_0tc1qyv</incoming>
<outgoing>Flow_0r3ti4f</outgoing>
</task>
<task id="Activity_12zt39t" name="检验成品外观，功能">
<incoming>Flow_0r3ti4f</incoming>
</task>
<sequenceFlow id="Flow_04syzr0" sourceRef="Activity_1iq25fq" targetRef="Activity_0clsx69"/>
<sequenceFlow id="Flow_0km76uv" sourceRef="Activity_0u9acpr" targetRef="Activity_0116jwj"/>
<sequenceFlow id="Flow_0tc1qyv" sourceRef="Activity_0116jwj" targetRef="Activity_02l5gvn"/>
<sequenceFlow id="Flow_0r3ti4f" sourceRef="Activity_02l5gvn" targetRef="Activity_12zt39t"/>
</process>
<process id="Process_04r4jaj">
<task id="Activity_0e5vio3" name="原材料检验"/>
<task id="Activity_1689lor" name="首件检验"/>
<task id="Activity_1s0a1iu" name="成品抽检，深度测试"/>
<task id="Activity_17ir7y8" name="调整质量体系评估"/>
</process>
<process id="Process_0xmupm8">
<task id="Activity_1ifgrv2" name="巡检调试设备">
<outgoing>Flow_1qeqnaz</outgoing>
</task>
<task id="Activity_040f8xw" name="实时监控设备运行">
<incoming>Flow_1qeqnaz</incoming>
</task>
<task id="Activity_0k10d3q" name="检查设备稳定性"/>
<sequenceFlow id="Flow_1qeqnaz" sourceRef="Activity_1ifgrv2" targetRef="Activity_040f8xw"/>
</process>
<process id="Process_1cius7t">
<task id="Activity_14nbi7z" name="接收客户订单"/>
<task id="Activity_10j9wxq" name="接收评审结果">
<outgoing>Flow_0oaszrw</outgoing>
</task>
<task id="Activity_1g7u0vh" name="顾客确认"/>
<task id="Activity_167r8p5" name="客户收货">
<outgoing>Flow_0lu3yjl</outgoing>
</task>
<task id="Activity_1oyxhc6" name="接收客户售后问题">
<incoming>Flow_0lu3yjl</incoming>
</task>
<task id="Activity_1kxmkzv" name="反馈处理进度，回访满意度"/>
<task id="Activity_1hd019k" name="与客户沟通并确认订单">
<incoming>Flow_0oaszrw</incoming>
</task>
<sequenceFlow id="Flow_0oaszrw" sourceRef="Activity_10j9wxq" targetRef="Activity_1hd019k"/>
<sequenceFlow id="Flow_0lu3yjl" sourceRef="Activity_167r8p5" targetRef="Activity_1oyxhc6"/>
</process>
<bpmndi:BPMNDiagram id="BpmnDiagram_1">
<bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Collaboration_0gtjgc7">
<bpmndi:BPMNShape id="Participant_1ucofm3_di" bpmnElement="Participant_1ucofm3" isHorizontal="true">
<omgdc:Bounds x="160" y="80" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_15qe52r_di" bpmnElement="Activity_15qe52r">
<omgdc:Bounds x="560" y="160" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1b8g6j3_di" bpmnElement="Activity_1b8g6j3">
<omgdc:Bounds x="710" y="160" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0pmu5jn_di" bpmnElement="Activity_0pmu5jn">
<omgdc:Bounds x="2710" y="160" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0ku7p0k_di" bpmnElement="Flow_0ku7p0k">
<di:waypoint x="660" y="200"/>
<di:waypoint x="710" y="200"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0obrl7n_di" bpmnElement="Participant_0obrl7n" isHorizontal="true">
<omgdc:Bounds x="160" y="330" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1tkf534_di" bpmnElement="Activity_1tkf534">
<omgdc:Bounds x="710" y="410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1h9hpgd_di" bpmnElement="Activity_1h9hpgd">
<omgdc:Bounds x="2270" y="410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0elox33_di" bpmnElement="Activity_0elox33">
<omgdc:Bounds x="2710" y="410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_1poqhlq_di" bpmnElement="Participant_1poqhlq" isHorizontal="true">
<omgdc:Bounds x="160" y="580" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1y0m7d4_di" bpmnElement="Activity_1y0m7d4">
<omgdc:Bounds x="710" y="660" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0eakc40_di" bpmnElement="Activity_0eakc40">
<omgdc:Bounds x="850" y="660" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1dab79n_di" bpmnElement="Activity_1dab79n">
<omgdc:Bounds x="2030" y="660" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0508ogu_di" bpmnElement="Activity_0508ogu">
<omgdc:Bounds x="2270" y="660" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_048z7hi_di" bpmnElement="Participant_048z7hi" isHorizontal="true">
<omgdc:Bounds x="160" y="830" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_074r5vf_di" bpmnElement="Activity_074r5vf">
<omgdc:Bounds x="400" y="910" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_09rtvcv_di" bpmnElement="Activity_09rtvcv">
<omgdc:Bounds x="230" y="910" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1xufxzj_di" bpmnElement="Activity_1xufxzj">
<omgdc:Bounds x="560" y="910" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0hwoh4t_di" bpmnElement="Activity_0hwoh4t">
<omgdc:Bounds x="850" y="910" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0nb9ozw_di" bpmnElement="Flow_0nb9ozw">
<di:waypoint x="330" y="950"/>
<di:waypoint x="400" y="950"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_1uzl7nj_di" bpmnElement="Participant_1uzl7nj" isHorizontal="true">
<omgdc:Bounds x="160" y="1080" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_03x5zz9_di" bpmnElement="Activity_03x5zz9">
<omgdc:Bounds x="1010" y="1170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_11wjx9q_di" bpmnElement="Activity_11wjx9q">
<omgdc:Bounds x="1210" y="1170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1iwabgg_di" bpmnElement="Activity_1iwabgg">
<omgdc:Bounds x="1420" y="1170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_03jjwry_di" bpmnElement="Activity_03jjwry">
<omgdc:Bounds x="1590" y="1170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1kqn0tj_di" bpmnElement="Activity_1kqn0tj">
<omgdc:Bounds x="2720" y="1170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0p32hsv_di" bpmnElement="Flow_0p32hsv">
<di:waypoint x="1110" y="1210"/>
<di:waypoint x="1210" y="1210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_15niunb_di" bpmnElement="Flow_15niunb">
<di:waypoint x="1520" y="1210"/>
<di:waypoint x="1590" y="1210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_07kxl66_di" bpmnElement="Participant_07kxl66" isHorizontal="true">
<omgdc:Bounds x="160" y="1330" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0a1xp68_di" bpmnElement="Activity_0a1xp68">
<omgdc:Bounds x="1010" y="1410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1hs0wq9_di" bpmnElement="Activity_1hs0wq9">
<omgdc:Bounds x="1210" y="1410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1cmq06f_di" bpmnElement="Activity_1cmq06f">
<omgdc:Bounds x="1420" y="1410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1cvzm1z_di" bpmnElement="Activity_1cvzm1z">
<omgdc:Bounds x="1590" y="1410" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1r4q79x_di" bpmnElement="Flow_1r4q79x">
<di:waypoint x="1110" y="1450"/>
<di:waypoint x="1210" y="1450"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1jfakah_di" bpmnElement="Flow_1jfakah">
<di:waypoint x="1520" y="1450"/>
<di:waypoint x="1590" y="1450"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_1d9i6e3_di" bpmnElement="Participant_1d9i6e3" isHorizontal="true">
<omgdc:Bounds x="160" y="1580" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1iq25fq_di" bpmnElement="Activity_1iq25fq">
<omgdc:Bounds x="1010" y="1680" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0clsx69_di" bpmnElement="Activity_0clsx69">
<omgdc:Bounds x="1220" y="1680" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0u9acpr_di" bpmnElement="Activity_0u9acpr">
<omgdc:Bounds x="1420" y="1680" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0116jwj_di" bpmnElement="Activity_0116jwj">
<omgdc:Bounds x="1600" y="1680" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_02l5gvn_di" bpmnElement="Activity_02l5gvn">
<omgdc:Bounds x="1770" y="1680" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_12zt39t_di" bpmnElement="Activity_12zt39t">
<omgdc:Bounds x="1950" y="1680" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0km76uv_di" bpmnElement="Flow_0km76uv">
<di:waypoint x="1520" y="1720"/>
<di:waypoint x="1600" y="1720"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0tc1qyv_di" bpmnElement="Flow_0tc1qyv">
<di:waypoint x="1700" y="1720"/>
<di:waypoint x="1770" y="1720"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0r3ti4f_di" bpmnElement="Flow_0r3ti4f">
<di:waypoint x="1870" y="1720"/>
<di:waypoint x="1950" y="1720"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_04syzr0_di" bpmnElement="Flow_04syzr0">
<di:waypoint x="1110" y="1720"/>
<di:waypoint x="1220" y="1720"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0fsna3p_di" bpmnElement="Participant_0fsna3p" isHorizontal="true">
<omgdc:Bounds x="160" y="1830" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0e5vio3_di" bpmnElement="Activity_0e5vio3">
<omgdc:Bounds x="710" y="1920" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1689lor_di" bpmnElement="Activity_1689lor">
<omgdc:Bounds x="1220" y="1920" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1s0a1iu_di" bpmnElement="Activity_1s0a1iu">
<omgdc:Bounds x="1950" y="1920" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_17ir7y8_di" bpmnElement="Activity_17ir7y8">
<omgdc:Bounds x="2720" y="1920" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Participant_1b1u3c4_di" bpmnElement="Participant_1b1u3c4" isHorizontal="true">
<omgdc:Bounds x="160" y="2080" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1ifgrv2_di" bpmnElement="Activity_1ifgrv2">
<omgdc:Bounds x="1170" y="2170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_040f8xw_di" bpmnElement="Activity_040f8xw">
<omgdc:Bounds x="1360" y="2170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0k10d3q_di" bpmnElement="Activity_0k10d3q">
<omgdc:Bounds x="2720" y="2170" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1qeqnaz_di" bpmnElement="Flow_1qeqnaz">
<di:waypoint x="1270" y="2210"/>
<di:waypoint x="1360" y="2210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0iqrbor_di" bpmnElement="Participant_0iqrbor" isHorizontal="true">
<omgdc:Bounds x="160" y="2330" width="2830" height="250"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_14nbi7z_di" bpmnElement="Activity_14nbi7z">
<omgdc:Bounds x="230" y="2420" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_10j9wxq_di" bpmnElement="Activity_10j9wxq">
<omgdc:Bounds x="370" y="2420" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1g7u0vh_di" bpmnElement="Activity_1g7u0vh">
<omgdc:Bounds x="2130" y="2420" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_167r8p5_di" bpmnElement="Activity_167r8p5">
<omgdc:Bounds x="2410" y="2420" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1oyxhc6_di" bpmnElement="Activity_1oyxhc6">
<omgdc:Bounds x="2560" y="2420" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1kxmkzv_di" bpmnElement="Activity_1kxmkzv">
<omgdc:Bounds x="2870" y="2420" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_1hd019k_di" bpmnElement="Activity_1hd019k">
<omgdc:Bounds x="560" y="2420" width="100" height="80"/>
<bpmndi:BPMNLabel/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0lu3yjl_di" bpmnElement="Flow_0lu3yjl">
<di:waypoint x="2510" y="2460"/>
<di:waypoint x="2560" y="2460"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0oaszrw_di" bpmnElement="Flow_0oaszrw">
<di:waypoint x="470" y="2460"/>
<di:waypoint x="560" y="2460"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_03r4zr0_di" bpmnElement="Flow_03r4zr0">
<di:waypoint x="280" y="2420"/>
<di:waypoint x="280" y="990"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1jupg11_di" bpmnElement="Flow_1jupg11">
<di:waypoint x="610" y="910"/>
<di:waypoint x="610" y="240"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0z6w55w_di" bpmnElement="Flow_0z6w55w">
<di:waypoint x="760" y="240"/>
<di:waypoint x="760" y="410"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0by2x6u_di" bpmnElement="Flow_0by2x6u">
<di:waypoint x="760" y="490"/>
<di:waypoint x="760" y="660"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0vx64u2_di" bpmnElement="Flow_0vx64u2">
<di:waypoint x="760" y="740"/>
<di:waypoint x="760" y="1920"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1byg49v_di" bpmnElement="Flow_1byg49v">
<di:waypoint x="900" y="910"/>
<di:waypoint x="900" y="740"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0z8ubhr_di" bpmnElement="Flow_0z8ubhr">
<di:waypoint x="950" y="700"/>
<di:waypoint x="960" y="700"/>
<di:waypoint x="960" y="1210"/>
<di:waypoint x="1010" y="1210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_18y2743_di" bpmnElement="Flow_18y2743">
<di:waypoint x="950" y="700"/>
<di:waypoint x="960" y="700"/>
<di:waypoint x="960" y="1450"/>
<di:waypoint x="1010" y="1450"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1496j6a_di" bpmnElement="Flow_1496j6a">
<di:waypoint x="950" y="700"/>
<di:waypoint x="960" y="700"/>
<di:waypoint x="960" y="1720"/>
<di:waypoint x="1010" y="1720"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1jx2afr_di" bpmnElement="Flow_1jx2afr">
<di:waypoint x="1270" y="1760"/>
<di:waypoint x="1270" y="1920"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_171agx2_di" bpmnElement="Flow_171agx2">
<di:waypoint x="1320" y="1960"/>
<di:waypoint x="1370" y="1960"/>
<di:waypoint x="1370" y="1720"/>
<di:waypoint x="1420" y="1720"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0h93cbn_di" bpmnElement="Flow_0h93cbn">
<di:waypoint x="2000" y="1760"/>
<di:waypoint x="2000" y="1920"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0zkny7i_di" bpmnElement="Flow_0zkny7i">
<di:waypoint x="2050" y="1960"/>
<di:waypoint x="2080" y="1960"/>
<di:waypoint x="2080" y="740"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_193708u_di" bpmnElement="Flow_193708u">
<di:waypoint x="2130" y="700"/>
<di:waypoint x="2180" y="700"/>
<di:waypoint x="2180" y="2420"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1hgsg1e_di" bpmnElement="Flow_1hgsg1e">
<di:waypoint x="2320" y="660"/>
<di:waypoint x="2320" y="490"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0sidir8_di" bpmnElement="Flow_0sidir8">
<di:waypoint x="2230" y="2460"/>
<di:waypoint x="2320" y="2460"/>
<di:waypoint x="2320" y="740"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1ahr4ny_di" bpmnElement="Flow_1ahr4ny">
<di:waypoint x="2370" y="700"/>
<di:waypoint x="2460" y="700"/>
<di:waypoint x="2460" y="2420"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0nwey4i_di" bpmnElement="Flow_0nwey4i">
<di:waypoint x="2610" y="2420"/>
<di:waypoint x="2610" y="2210"/>
<di:waypoint x="2720" y="2210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0g2nuoa_di" bpmnElement="Flow_0g2nuoa">
<di:waypoint x="2610" y="2420"/>
<di:waypoint x="2610" y="1960"/>
<di:waypoint x="2720" y="1960"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_00q0hdg_di" bpmnElement="Flow_00q0hdg">
<di:waypoint x="2610" y="2420"/>
<di:waypoint x="2610" y="1210"/>
<di:waypoint x="2720" y="1210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_15r2419_di" bpmnElement="Flow_15r2419">
<di:waypoint x="2610" y="2420"/>
<di:waypoint x="2610" y="450"/>
<di:waypoint x="2710" y="450"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1vpisex_di" bpmnElement="Flow_1vpisex">
<di:waypoint x="2610" y="2420"/>
<di:waypoint x="2610" y="200"/>
<di:waypoint x="2710" y="200"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0czyiuk_di" bpmnElement="Flow_0czyiuk">
<di:waypoint x="2820" y="1960"/>
<di:waypoint x="2920" y="1960"/>
<di:waypoint x="2920" y="2420"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_08du804_di" bpmnElement="Flow_08du804">
<di:waypoint x="1320" y="1960"/>
<di:waypoint x="1370" y="1960"/>
<di:waypoint x="1370" y="1450"/>
<di:waypoint x="1420" y="1450"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_03l79ir_di" bpmnElement="Flow_03l79ir">
<di:waypoint x="1320" y="1960"/>
<di:waypoint x="1370" y="1960"/>
<di:waypoint x="1370" y="1210"/>
<di:waypoint x="1420" y="1210"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0ichwq5_di" bpmnElement="Flow_0ichwq5">
<di:waypoint x="610" y="2420"/>
<di:waypoint x="610" y="990"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_0spz7j6_di" bpmnElement="Flow_0spz7j6">
<di:waypoint x="450" y="990"/>
<di:waypoint x="450" y="2420"/>
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</definitions>`
