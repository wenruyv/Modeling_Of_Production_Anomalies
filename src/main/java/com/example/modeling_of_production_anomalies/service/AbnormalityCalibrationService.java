package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.AbnormalityCalibration;

import java.util.List;

public interface AbnormalityCalibrationService {

    /**
     * 查询所有校准信息
     * @return 校准信息列表
     */
    List<AbnormalityCalibration> findAll();

    /**
     * 根据 ID 查询校准信息
     * @param id 校准信息 ID
     * @return 校准信息
     */
    AbnormalityCalibration findById(String id);

    /**
     * 保存校准信息
     * @param abnormalityCalibration 校准信息对象
     * @return 受影响的行数
     */
    int save(AbnormalityCalibration abnormalityCalibration);

    /**
     * 更新校准信息
     * @param abnormalityCalibration 校准信息对象
     * @return 受影响的行数
     */
    int update(AbnormalityCalibration abnormalityCalibration);

    /**
     * 根据 ID 删除校准信息
     * @param id 校准信息 ID
     * @return 受影响的行数
     */
    int deleteById(String id);
}