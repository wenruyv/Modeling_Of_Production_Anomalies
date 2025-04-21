package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.BpmnXml;
import com.example.modeling_of_production_anomalies.service.BpmnXmlService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bpmn-xml")
public class BpmnXmlController {

    private static final Logger logger = LoggerFactory.getLogger(BpmnXmlController.class);

    private final BpmnXmlService bpmnXmlService;

    public BpmnXmlController(BpmnXmlService bpmnXmlService) {
        this.bpmnXmlService = bpmnXmlService;
    }

    /**
     * 根据name查找BpmnXml
     *
     * @param name 名称
     * @return BpmnXml实体
     */
    @GetMapping("/findByName/{name}")
    public ResponseEntity<BpmnXml> findByName(@PathVariable String name) {
        try {
            BpmnXml bpmnXml = bpmnXmlService.findByName(name);
            return getBpmnXmlResponse(bpmnXml);
        } catch (Exception e) {
            logger.error("查找BpmnXml时发生错误，名称: {}", name, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * 根据id查找BpmnXml
     *
     * @param id 主键
     * @return BpmnXml实体
     */
    @GetMapping("/findById/{id}")
    public ResponseEntity<BpmnXml> findById(@PathVariable Long id) {
        try {
            BpmnXml bpmnXml = bpmnXmlService.findById(id);
            return getBpmnXmlResponse(bpmnXml);
        } catch (Exception e) {
            logger.error("查找BpmnXml时发生错误，ID: {}", id, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * 更新BpmnXml的xmlData根据name
     *
     * @param name    名称
     * @param bpmnXml 包含新xmlData和name的实体
     * @return 更新结果
     */
    @PutMapping("/updateByName/{name}")
    public ResponseEntity<String> updateByName(@PathVariable String name, @RequestBody BpmnXml bpmnXml) {
        try {
            bpmnXml.setName(name);
            boolean success = bpmnXmlService.updateXmlDataByName(bpmnXml);
            return success ? ResponseEntity.ok("更新成功") : ResponseEntity.badRequest().body("更新失败");
        } catch (Exception e) {
            logger.error("更新BpmnXml时发生错误，名称: {}", name, e);
            return ResponseEntity.internalServerError().body("更新时发生内部错误");
        }
    }

    /**
     * 获取所有BpmnXml
     *
     * @return BpmnXml列表
     */
    @GetMapping("/findAll")
    public ResponseEntity<List<BpmnXml>> findAll() {
        try {
            List<BpmnXml> bpmnXmlList = bpmnXmlService.findAll();
            return ResponseEntity.ok(bpmnXmlList);
        } catch (Exception e) {
            logger.error("获取所有BpmnXml时发生错误", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * 复用获取BpmnXml响应的逻辑
     *
     * @param bpmnXml BpmnXml实体
     * @return 响应实体
     */
    private ResponseEntity<BpmnXml> getBpmnXmlResponse(BpmnXml bpmnXml) {
        return bpmnXml != null ? ResponseEntity.ok(bpmnXml) : ResponseEntity.notFound().build();
    }
}