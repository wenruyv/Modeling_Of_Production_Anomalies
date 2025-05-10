package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.BpmnXml;

import java.util.List;

public interface BpmnXmlService {

    /**
     * 根据name查找BpmnXml
     *
     * @param name 名称
     * @return BpmnXml实体
     */
    BpmnXml findByName(String name);

    /**
     * 根据id查找BpmnXml
     *
     * @param id 主键
     * @return BpmnXml实体
     */
    BpmnXml findById(Long id);

    /**
     * 根据name和userName查找BpmnXml
     *
     * @param name 名称
     * @param userName 用户名称
     * @return BpmnXml实体
     */
    BpmnXml findByNameAndUserName(String name, String userName);

    /**
     * 更新BpmnXml的data根据name和userName
     *
     * @param bpmnXml 包含新data、name和userName的实体
     * @return 更新是否成功
     */
    boolean updateDataByNameAndUserName(BpmnXml bpmnXml);

    /**
     * 插入新的BpmnXml
     *
     * @param bpmnXml 实体
     * @return 是否插入成功
     */
    boolean insertBpmnXml(BpmnXml bpmnXml);

    /**
     * 获取所有BpmnXml
     *
     * @return BpmnXml列表
     */
    List<BpmnXml> findAll();

    /**
     * 根据name和userName删除BpmnXml
     *
     * @param name 名称
     * @param userName 用户名称
     * @return 删除是否成功
     */
    boolean deleteByNameAndUserName(String name, String userName);
}
