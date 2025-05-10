// src/main/java/com/example/modeling_of_production_anomalies/controller/BpmnXmlController.java
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
     * 根据name和userName查找BpmnXml
     *
     * @param name 名称
     * @param userName 用户名称
     * @return BpmnXml实体
     */
    @GetMapping("/findByNameAndUserName/{name}/{userName}")
    public ResponseEntity<BpmnXml> findByNameAndUserName(@PathVariable String name, @PathVariable String userName) {
        try {
            BpmnXml bpmnXml = bpmnXmlService.findByNameAndUserName(name, userName);
            return getBpmnXmlResponse(bpmnXml);
        } catch (Exception e) {
            logger.error("查找BpmnXml时发生错误，名称: {}, 用户名称: {}", name, userName, e);
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
     * 更新BpmnXml的data根据name和userName
     *
     * @param name 名称
     * @param userName 用户名称
     * @param bpmnXml 包含新data的实体
     * @return 更新结果
     */
    @PutMapping("/updateDataByNameAndUserName/{name}/{userName}")
    public ResponseEntity<String> updateDataByNameAndUserName(@PathVariable String name, @PathVariable String userName, @RequestBody BpmnXml bpmnXml) {
        try {
            bpmnXml.setName(name);
            bpmnXml.setUserName(userName);
            boolean success = bpmnXmlService.updateDataByNameAndUserName(bpmnXml);
            return success ? ResponseEntity.ok("更新成功") : ResponseEntity.badRequest().body("更新失败");
        } catch (Exception e) {
            logger.error("更新BpmnXml时发生错误，名称: {}, 用户名称: {}", name, userName, e);
            return ResponseEntity.internalServerError().body("更新时发生内部错误");
        }
    }

    /**
     * 根据name和userName新建BpmnXml
     *
     * @param bpmnXml 包含name、userName和data的实体
     * @return 插入结果
     */
    @PostMapping("/insertByNameAndUserName")
    public ResponseEntity<String> insertByNameAndUserName(@RequestBody BpmnXml bpmnXml) {
        try {
            boolean success = bpmnXmlService.insertBpmnXml(bpmnXml);
            return success ? ResponseEntity.ok("插入成功") : ResponseEntity.badRequest().body("插入失败");
        } catch (Exception e) {
            logger.error("插入BpmnXml时发生错误，名称: {}, 用户名称: {}", bpmnXml.getName(), bpmnXml.getUserName(), e);
            return ResponseEntity.internalServerError().body("插入时发生内部错误");
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

    /**
     * 根据name和userName删除BpmnXml
     *
     * @param name 名称
     * @param userName 用户名称
     * @return 删除结果
     */
    @DeleteMapping("/deleteByNameAndUserName/{name}/{userName}")
    public ResponseEntity<String> deleteByNameAndUserName(@PathVariable String name, @PathVariable String userName) {
        try {
            boolean success = bpmnXmlService.deleteByNameAndUserName(name, userName);
            return success ? ResponseEntity.ok("删除成功") : ResponseEntity.badRequest().body("删除失败");
        } catch (Exception e) {
            logger.error("删除BpmnXml时发生错误，名称: {}, 用户名称: {}", name, userName, e);
            return ResponseEntity.internalServerError().body("删除时发生内部错误");
        }
    }
}