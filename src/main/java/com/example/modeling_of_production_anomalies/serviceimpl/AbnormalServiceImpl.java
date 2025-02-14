package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.AbnormalClass;
import com.example.modeling_of_production_anomalies.mapper.AbnormalMapper;
import com.example.modeling_of_production_anomalies.service.AbnormalService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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
}
