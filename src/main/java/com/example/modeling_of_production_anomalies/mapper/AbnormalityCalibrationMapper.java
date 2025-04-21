package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.AbnormalityCalibration;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AbnormalityCalibrationMapper {

    /**
     * 查询所有校准信息
     * @return 校准信息列表
     */
    @Select("SELECT * FROM abnormality_calibration")
    List<AbnormalityCalibration> findAll();

    /**
     * 根据 ID 查询校准信息
     * @param id 校准信息 ID
     * @return 校准信息
     */
    @Select("SELECT * FROM abnormality_calibration WHERE id = #{id}")
    AbnormalityCalibration findById(String id);

    /**
     * 保存校准信息
     * @param abnormalityCalibration 校准信息对象
     * @return 受影响的行数
     */
    @Insert("INSERT INTO abnormality_calibration (id, name) VALUES (#{id}, #{name})")
    int save(AbnormalityCalibration abnormalityCalibration);

    /**
     * 更新校准信息
     * @param abnormalityCalibration 校准信息对象
     * @return 受影响的行数
     */
    @Update("UPDATE abnormality_calibration SET name = #{name} WHERE id = #{id}")
    int update(AbnormalityCalibration abnormalityCalibration);

    /**
     * 根据 ID 删除校准信息
     * @param id 校准信息 ID
     * @return 受影响的行数
     */
    @Delete("DELETE FROM abnormality_calibration WHERE id = #{id}")
    int deleteById(String id);
}