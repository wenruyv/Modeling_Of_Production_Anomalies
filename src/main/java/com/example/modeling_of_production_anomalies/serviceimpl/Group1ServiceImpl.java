package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Group1;
import com.example.modeling_of_production_anomalies.mapper.Group1Mapper;
import com.example.modeling_of_production_anomalies.service.Group1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Group1ServiceImpl implements Group1Service {
    @Autowired
    private Group1Mapper group1Mapper;

    @Override
    public List<Group1> group1List(int dep_id) {
        return group1Mapper.group1List(dep_id);
    }

    @Override
    public int addGroup1(Group1 group1) {
        return group1Mapper.addGroup1(group1);
    }

    @Override
    public int updateGroup1(Group1 group1) {
        return group1Mapper.updateGroup1(group1);
    }

    @Override
    public int deleteById(int id) {
        return group1Mapper.deleteById(id);
    }

    @Override
    public int deleteByDepId(int dep_id) {
        return group1Mapper.deleteByDepId(dep_id);
    }

    @Override
    public int deleteByComId(int com_id) {
        return group1Mapper.deleteByComId(com_id);
    }

    // 实现获取全部小组信息的方法
    @Override
    public List<Group1> getAllGroup1List() {
        return group1Mapper.getAllGroup1List();
    }
}