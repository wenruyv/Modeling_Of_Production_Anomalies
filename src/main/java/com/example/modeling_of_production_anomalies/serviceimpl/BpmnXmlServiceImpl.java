package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.BpmnXml;
import com.example.modeling_of_production_anomalies.mapper.BpmnXmlMapper;
import com.example.modeling_of_production_anomalies.service.BpmnXmlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BpmnXmlServiceImpl implements BpmnXmlService {

    private final BpmnXmlMapper bpmnXmlMapper;

    @Autowired
    public BpmnXmlServiceImpl(BpmnXmlMapper bpmnXmlMapper) {
        this.bpmnXmlMapper = bpmnXmlMapper;
    }

    @Override
    public BpmnXml findByName(String name) {
        return bpmnXmlMapper.findByName(name);
    }

    @Override
    public BpmnXml findById(Long id) {
        return bpmnXmlMapper.findById(id);
    }

    @Override
    public BpmnXml findByNameAndUserName(String name, String userName) {
        return bpmnXmlMapper.findByNameAndUserName(name, userName);
    }

    @Override
    @Transactional
    public boolean updateDataByNameAndUserName(BpmnXml bpmnXml) {
        int result = bpmnXmlMapper.updateDataByNameAndUserName(bpmnXml);
        return result > 0;
    }

    @Override
    @Transactional
    public boolean insertBpmnXml(BpmnXml bpmnXml) {
        int result = bpmnXmlMapper.insertBpmnXml(bpmnXml);
        return result > 0;
    }

    @Override
    public List<BpmnXml> findAll() {
        return bpmnXmlMapper.findAll();
    }

    @Override
    @Transactional
    public boolean deleteByNameAndUserName(String name, String userName) {
        int result = bpmnXmlMapper.deleteByNameAndUserName(name, userName);
        return result > 0;
    }
}