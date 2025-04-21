package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.AbnormalityCalibration;
import com.example.modeling_of_production_anomalies.mapper.AbnormalityCalibrationMapper;
import com.example.modeling_of_production_anomalies.service.AbnormalityCalibrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbnormalityCalibrationServiceImpl implements AbnormalityCalibrationService {

    @Autowired
    private AbnormalityCalibrationMapper abnormalityCalibrationMapper;

    @Override
    public List<AbnormalityCalibration> findAll() {
        return abnormalityCalibrationMapper.findAll();
    }

    @Override
    public AbnormalityCalibration findById(String id) {
        return abnormalityCalibrationMapper.findById(id);
    }

    @Override
    public int save(AbnormalityCalibration abnormalityCalibration) {
        return abnormalityCalibrationMapper.save(abnormalityCalibration);
    }

    @Override
    public int update(AbnormalityCalibration abnormalityCalibration) {
        return abnormalityCalibrationMapper.update(abnormalityCalibration);
    }

    @Override
    public int deleteById(String id) {
        return abnormalityCalibrationMapper.deleteById(id);
    }
}