package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.AbnormalClass;
import com.example.modeling_of_production_anomalies.service.AbnormalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/abnormal")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class AbnormalController {
    @Autowired
    private AbnormalService abnormalService;

    @RequestMapping("/list")
    public List<AbnormalClass> getAbList() {
        List<AbnormalClass> list = abnormalService.abormalList();
        System.out.println(list);
        return list;
    }

    // 新增记录
    @PostMapping("/add")
    public int insertAbnormal(@RequestBody AbnormalClass abnormalClass) {
        return abnormalService.insertAbnormal(abnormalClass);
    }

    // 根据 ab_id 删除记录
    @DeleteMapping("/delete/{ab_id}")
    public int deleteAbnormalById(@PathVariable int ab_id) {
        return abnormalService.deleteAbnormalById(ab_id);
    }

    // 根据 ab_id 修改记录
    @PutMapping("/update")
    public int updateAbnormal(@RequestBody AbnormalClass abnormalClass) {
        return abnormalService.updateAbnormal(abnormalClass);
    }

    // 根据 ab_level2 查询记录
    @GetMapping("/selectByLevel2/{ab_level2}")
    public List<AbnormalClass> selectAbnormalByLevel2(@PathVariable String ab_level2) {
        return abnormalService.selectAbnormalByLevel2(ab_level2);
    }
}