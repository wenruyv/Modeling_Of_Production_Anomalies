package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.ProInfo;

import java.util.List;

public interface ProInfoService {
    List<ProInfo> findInfoByC_id(int c_id);
    ProInfo findInfoById(int id);
    List<ProInfo> proInfoList();

    int addProInfo(ProInfo proInfo);

    int updateProInfo(ProInfo proInfo);

    int deleteProInfo(int id);

    int deleteByComId(int c_id);
}
