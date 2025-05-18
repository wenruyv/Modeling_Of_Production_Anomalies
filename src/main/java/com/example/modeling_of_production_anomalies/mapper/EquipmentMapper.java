package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.Equipment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface EquipmentMapper {
    List<Equipment> equipmentList(int com_id);
    List<Equipment> equipmentByDepId(int dep_id);
    int addEquipment(Equipment equipment);
    int updateEquipment(Equipment equipment);
    int deleteById(int id);
    int deleteByGroupId(int group_id);
    int deleteByComId(int com_id);
    @Select("select * from equipment where group_name = #{group_name}")
    List<Equipment> getEquipmentByGroupName(String group_name);
}
