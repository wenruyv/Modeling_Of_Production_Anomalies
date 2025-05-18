package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Material;

import java.util.List;

public interface MaterialService {
    List<Material> materialList(int com_id);
    List<Material> materialByDepId(int dep_id);
    int addMaterial(Material material);
    int updateMaterial(Material material);
    int deleteById(int id);
    List<Material> getMaterialByGroupName(String group_name);
}
