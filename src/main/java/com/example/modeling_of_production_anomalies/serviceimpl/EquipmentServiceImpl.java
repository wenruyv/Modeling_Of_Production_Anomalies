package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Equipment;
import com.example.modeling_of_production_anomalies.mapper.EquipmentMapper;
import com.example.modeling_of_production_anomalies.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EquipmentServiceImpl implements EquipmentService {
    @Autowired
    private EquipmentMapper equipmentMapper;

    @Override
    public List<Equipment> equipmentList(int com_id) {
        return equipmentMapper.equipmentList(com_id);
    }

    @Override
    public List<Equipment> equipmentByDepId(int dep_id) {
        return equipmentMapper.equipmentByDepId(dep_id);
    }

    @Override
    public int addEquipment(Equipment equipment) {
        return equipmentMapper.addEquipment(equipment);
    }

    @Override
    public int updateEquipment(Equipment equipment) {
        return equipmentMapper.updateEquipment(equipment);
    }

    @Override
    public int deleteById(int id) {
        return equipmentMapper.deleteById(id);
    }
    @Override
    public List<Equipment> getEquipmentByGroupName(String group_name) {
        return equipmentMapper.getEquipmentByGroupName(group_name);
    }
}
