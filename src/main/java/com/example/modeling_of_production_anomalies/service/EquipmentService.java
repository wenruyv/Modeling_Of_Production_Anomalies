package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Equipment;

import java.util.List;

public interface EquipmentService {
    List<Equipment> equipmentList(int com_id);
    List<Equipment> equipmentByDepId(int dep_id);
    int addEquipment(Equipment equipment);
    int updateEquipment(Equipment equipment);
    int deleteById(int id);
    List<Equipment> getEquipmentByGroupName(String group_name);

}
