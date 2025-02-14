// src/main/java/com/example/modeling_of_production_anomalies/service/BpmnXmlService.java

package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.BpmnXml;
import com.example.modeling_of_production_anomalies.mapper.BpmnXmlMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BpmnXmlService {

    private final BpmnXmlMapper bpmnXmlMapper;

    public BpmnXmlService(BpmnXmlMapper bpmnXmlMapper) {
        this.bpmnXmlMapper = bpmnXmlMapper;
    }

    /**
     * 根据name查找BpmnXml
     *
     * @param name 名称
     * @return BpmnXml实体
     */
    public BpmnXml findByName(String name) {
        return bpmnXmlMapper.findByName(name);
    }

    /**
     * 根据id查找BpmnXml
     *
     * @param id 主键
     * @return BpmnXml实体
     */
    public BpmnXml findById(Long id) {
        return bpmnXmlMapper.findById(id);
    }

    /**
     * 更新BpmnXml的xmlData根据name
     *
     * @param bpmnXml 包含新xmlData和name的实体
     * @return 更新是否成功
     */
    @Transactional
    public boolean updateXmlDataByName(BpmnXml bpmnXml) {
        int result = bpmnXmlMapper.updateXmlDataByName(bpmnXml);
        return result > 0;
    }

    /**
     * 插入新的BpmnXml
     *
     * @param bpmnXml 实体
     * @return 是否插入成功
     */
    @Transactional
    public boolean insertBpmnXml(BpmnXml bpmnXml) {
        int result = bpmnXmlMapper.insertBpmnXml(bpmnXml);
        return result > 0;
    }

    /**
     * 获取所有BpmnXml
     *
     * @return BpmnXml列表
     */
    public List<BpmnXml> findAll() {
        return bpmnXmlMapper.findAll();
    }
}