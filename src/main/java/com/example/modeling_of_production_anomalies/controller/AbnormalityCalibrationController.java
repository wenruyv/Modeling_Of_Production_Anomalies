package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.AbnormalityCalibration;
import com.example.modeling_of_production_anomalies.service.AbnormalityCalibrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/abnormality-calibrations")
public class AbnormalityCalibrationController {

    @Autowired
    private AbnormalityCalibrationService abnormalityCalibrationService;

    /**
     * 查询所有校准信息
     * @return 校准信息列表
     */
    @GetMapping
    public List<AbnormalityCalibration> findAll() {
        return abnormalityCalibrationService.findAll();
    }

    /**
     * 根据 ID 查询校准信息
     * @param id 校准信息 ID
     * @return 校准信息
     */
    @GetMapping("/search/{id}")
    public AbnormalityCalibration findById(@PathVariable String id) {
        return abnormalityCalibrationService.findById(id);
    }

    /**
     * 保存校准信息
     * @param abnormalityCalibration 校准信息对象
     * @return 受影响的行数
     */
    @PostMapping("/save")
    public int save(@RequestBody AbnormalityCalibration abnormalityCalibration) {
        return abnormalityCalibrationService.save(abnormalityCalibration);
    }

    /**
     * 更新校准信息
     * @param abnormalityCalibration 校准信息对象
     * @return 受影响的行数
     */
    @PutMapping("/update")
    public int update(@RequestBody AbnormalityCalibration abnormalityCalibration) {
        return abnormalityCalibrationService.update(abnormalityCalibration);
    }

    /**
     * 根据 ID 删除校准信息
     * @param id 校准信息 ID
     * @return 受影响的行数
     */
    @DeleteMapping("/delete/{id}")
    public int deleteById(@PathVariable String id) {
        return abnormalityCalibrationService.deleteById(id);
    }
}