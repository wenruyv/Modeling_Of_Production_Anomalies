package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.AbnormalClass;

import java.util.List;

public interface AbnormalService {
    List<AbnormalClass> abormalList();
    // 新增记录
    int insertAbnormal(AbnormalClass abnormalClass);
    // 根据 ab_id 删除记录
    int deleteAbnormalById(int ab_id);
    // 根据 ab_id 修改记录
    int updateAbnormal(AbnormalClass abnormalClass);
    // 根据 ab_level2 查询记录
    List<AbnormalClass> selectAbnormalByLevel2(String ab_level2);
}