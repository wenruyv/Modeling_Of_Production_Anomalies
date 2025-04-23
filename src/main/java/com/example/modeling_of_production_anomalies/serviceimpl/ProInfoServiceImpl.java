package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.ProInfo;
import com.example.modeling_of_production_anomalies.mapper.ProInfoMapper;
import com.example.modeling_of_production_anomalies.service.ProInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProInfoServiceImpl implements ProInfoService {
    @Autowired
    private ProInfoMapper proInfoMapper;
    @Override
    public List<ProInfo> findInfoByC_id(int c_id) {
        return proInfoMapper.findInfoByC_id(c_id);
    }

    @Override
    public List<ProInfo> proInfoList() {
        return proInfoMapper.proInfoList();
    }

    @Override
    public int addProInfo(ProInfo proInfo) {
        return proInfoMapper.addProInfo(proInfo);
    }

    @Override
    public int updateProInfo(ProInfo proInfo) {
        return proInfoMapper.updateProInfo(proInfo);
    }
}
