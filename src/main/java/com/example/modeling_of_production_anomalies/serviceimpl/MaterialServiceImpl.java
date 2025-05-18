package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Material;
import com.example.modeling_of_production_anomalies.mapper.MaterialMapper;
import com.example.modeling_of_production_anomalies.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MaterialServiceImpl implements MaterialService {
    @Autowired
    private MaterialMapper materialMapper;
    @Override
    public List<Material> materialList(int com_id) {
        return materialMapper.materialList(com_id);
    }

    @Override
    public List<Material> materialByDepId(int dep_id) {
        return materialMapper.materialByDepId(dep_id);
    }

    @Override
    public int addMaterial(Material material) {
        return materialMapper.addMaterial(material);
    }

    @Override
    public int updateMaterial(Material material) {
        return materialMapper.updateMaterial(material);
    }

    @Override
    public int deleteById(int id) {
        return materialMapper.deleteById(id);
    }
    @Override
    public List<Material> getMaterialByGroupName(String group_name) {
        return materialMapper.getMaterialByGroupName(group_name);
    }
}
