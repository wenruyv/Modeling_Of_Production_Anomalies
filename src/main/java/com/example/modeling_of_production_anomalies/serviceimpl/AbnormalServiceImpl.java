package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.AbnormalClass;
import com.example.modeling_of_production_anomalies.mapper.AbnormalMapper;
import com.example.modeling_of_production_anomalies.service.AbnormalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbnormalServiceImpl implements AbnormalService {
    @Autowired
    private AbnormalMapper abnormalMapper;

    @Override
    public List<AbnormalClass> abormalList() {
        List<AbnormalClass> ablist = abnormalMapper.abnormalList();
        return ablist;
    }

    @Override
    public int insertAbnormal(AbnormalClass abnormalClass) {
        return abnormalMapper.insertAbnormal(abnormalClass);
    }

    @Override
    public int deleteAbnormalById(int ab_id) {
        return abnormalMapper.deleteAbnormalById(ab_id);
    }

    @Override
    public int updateAbnormal(AbnormalClass abnormalClass) {
        return abnormalMapper.updateAbnormal(abnormalClass);
    }

    @Override
    public List<AbnormalClass> selectAbnormalByLevel2(String ab_level2) {
        return abnormalMapper.selectAbnormalByLevel2(ab_level2);
    }
}