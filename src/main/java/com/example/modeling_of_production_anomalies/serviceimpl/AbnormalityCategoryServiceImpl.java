package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.AbnormalityCategory;
import com.example.modeling_of_production_anomalies.mapper.AbnormalityCategoryMapper;
import com.example.modeling_of_production_anomalies.service.AbnormalityCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbnormalityCategoryServiceImpl implements AbnormalityCategoryService {

    @Autowired
    private AbnormalityCategoryMapper abnormalityCategoryMapper;

    @Override
    public List<AbnormalityCategory> findAll() {
        return abnormalityCategoryMapper.findAll();
    }

    @Override
    public AbnormalityCategory findByName(String name) {
        return abnormalityCategoryMapper.findByName(name);
    }

    @Override
    public int save(AbnormalityCategory abnormalityCategory) {
        return abnormalityCategoryMapper.save(abnormalityCategory);
    }

    @Override
    public int update(AbnormalityCategory abnormalityCategory) {
        return abnormalityCategoryMapper.update(abnormalityCategory);
    }

    @Override
    public int deleteById(Long id) {
        return abnormalityCategoryMapper.deleteById(id);
    }
}
