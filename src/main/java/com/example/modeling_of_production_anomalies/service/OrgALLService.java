package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.OrgAll;

import java.util.List;

public interface OrgALLService {
    List<OrgAll> orgAllList();
    OrgAll findById(int id);
    OrgAll findInfo(String com_type, String size );
    List<String> findType();
    int batchInsert(List<OrgAll> orgList);
    int updateOrgAll(OrgAll orgAll);
}
