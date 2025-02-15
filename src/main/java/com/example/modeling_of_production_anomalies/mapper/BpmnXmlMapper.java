// src/main/java/com/example/modeling_of_production_anomalies/mapper/BpmnXmlMapper.java

package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.BpmnXml;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BpmnXmlMapper {

    /**
     * 根据name查找BpmnXml
     *
     * @param name 名称
     * @return BpmnXml实体
     */
    @Select("SELECT * FROM bpmn_xml WHERE name = #{name}")
    BpmnXml findByName(@Param("name") String name);

    /**
     * 根据id查找BpmnXml
     *
     * @param id 主键
     * @return BpmnXml实体
     */
    @Select("SELECT * FROM bpmn_xml WHERE id = #{id}")
    BpmnXml findById(@Param("id") Long id);

    /**
     * 更新BpmnXml的xmlData根据name
     *
     * @param bpmnXml 包含新xmlData和name的实体
     * @return 更新影响的行数
     */
    @Update("UPDATE bpmn_xml SET data = #{data} WHERE name = #{name}")
    int updateXmlDataByName(BpmnXml bpmnXml);

    /**
     * 插入新的BpmnXml
     *
     * @param bpmnXml 实体
     * @return 插入影响的行数
     */
    @Insert("INSERT INTO bpmn_xml(name, xmlData) VALUES(#{name}, #{xmlData})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertBpmnXml(BpmnXml bpmnXml);

    /**
     * 获取所有BpmnXml
     *
     * @return BpmnXml列表
     */
    @Select("SELECT * FROM bpmn_xml")
    List<BpmnXml> findAll();
}