package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.ProInfo;
import com.example.modeling_of_production_anomalies.service.ProInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proInfo")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class ProInfoController {
    @Autowired
    private ProInfoService proInfoService;
    @RequestMapping("/list")
    public List<ProInfo> findInfoByC_id(@RequestParam int c_id)
    {
        return proInfoService.findInfoByC_id(c_id);
    }
    @RequestMapping("/proList")
    public List<ProInfo> proInfoList()
    {
        return proInfoService.proInfoList();
    }
    @PostMapping("/add")
    public int addProInfo(@RequestBody ProInfo proInfo) {
        return proInfoService.addProInfo(proInfo);
    }
    @PostMapping("/update")
    public int updateProInfo(@RequestBody ProInfo proInfo){
        return proInfoService.updateProInfo(proInfo);
    }
}
