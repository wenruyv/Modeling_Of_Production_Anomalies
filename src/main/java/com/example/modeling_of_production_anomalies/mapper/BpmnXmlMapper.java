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
     * 根据name和userName查找BpmnXml
     *
     * @param name 名称
     * @param userName 用户名称
     * @return BpmnXml实体
     */
    @Select("SELECT * FROM bpmn_xml WHERE name = #{name} AND user_name = #{userName}")
    BpmnXml findByNameAndUserName(@Param("name") String name, @Param("userName") String userName);

    /**
     * 更新BpmnXml的data根据name和userName
     *
     * @param bpmnXml 包含新data、name和userName的实体
     * @return 更新影响的行数
     */
    @Update("UPDATE bpmn_xml SET data = #{data} WHERE name = #{name} AND user_name = #{userName}")
    int updateDataByNameAndUserName(BpmnXml bpmnXml);

    /**
     * 插入新的BpmnXml
     *
     * @param bpmnXml 实体
     * @return 插入影响的行数
     */
    @Insert("INSERT INTO bpmn_xml(name, data, user_name) VALUES(#{name}, #{data}, #{userName})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertBpmnXml(BpmnXml bpmnXml);

    /**
     * 获取所有BpmnXml
     *
     * @return BpmnXml列表
     */
    @Select("SELECT * FROM bpmn_xml")
    List<BpmnXml> findAll();

    /**
     * 根据name和userName删除BpmnXml
     *
     * @param name 名称
     * @param userName 用户名称
     * @return 删除影响的行数
     */
    @Delete("DELETE FROM bpmn_xml WHERE name = #{name} AND user_name = #{userName}")
    int deleteByNameAndUserName(@Param("name") String name, @Param("userName") String userName);
}