package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.OrgAll;
import com.example.modeling_of_production_anomalies.mapper.OrgAllMapper;
import com.example.modeling_of_production_anomalies.service.OrgALLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrgAllServiceImpl implements OrgALLService {
    @Autowired
    private OrgAllMapper orgAllMapper;

    @Override
    public List<OrgAll> orgAllList() {
        return orgAllMapper.orgAllList();
    }

    @Override
    public OrgAll findInfo(String com_type, String size) {
        return orgAllMapper.findInfo(com_type, size);
    }

    @Override
    public OrgAll findById(int id) {
        return orgAllMapper.findById(id);
    }

    @Override
    public List<String> findType() {
        return orgAllMapper.findType();
    }

    @Override
    public int batchInsert(List<OrgAll> orgList) {
        return orgAllMapper.batchInsert(orgList);
    }

    @Override
    public int updateOrgAll(OrgAll orgAll) {
        return orgAllMapper.updateOrgAll(orgAll);
    }
}
