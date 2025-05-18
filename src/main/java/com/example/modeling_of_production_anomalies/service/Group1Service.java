package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Group1;

import java.util.List;

public interface Group1Service {
    List<Group1> group1List(int dep_id);
    int addGroup1(Group1 group1);
    int updateGroup1(Group1 group1);
    int deleteById(int id);
    int deleteByDepId(int dep_id);
    int deleteByComId(int com_id);
    // 新增方法：获取全部小组信息
    List<Group1> getAllGroup1List();
}