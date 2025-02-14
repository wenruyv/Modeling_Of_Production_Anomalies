package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.AbnormalClass;
import com.example.modeling_of_production_anomalies.mapper.AbnormalMapper;
import com.example.modeling_of_production_anomalies.service.AbnormalService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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
    public List<AbnormalClass> getAbList(){
        List<AbnormalClass> list = abnormalService.abormalList();
        System.out.println(list);
        return list;
    }

}
