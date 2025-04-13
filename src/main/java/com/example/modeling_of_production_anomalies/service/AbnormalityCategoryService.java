package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.AbnormalityCategory;

import java.util.List;

public interface AbnormalityCategoryService {

    List<AbnormalityCategory> findAll();

    AbnormalityCategory findByName(String name);

    int save(AbnormalityCategory abnormalityCategory);

    int update(AbnormalityCategory abnormalityCategory);

    int deleteById(Long id);
}