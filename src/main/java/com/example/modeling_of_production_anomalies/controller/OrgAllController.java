package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.OrgAll;
import com.example.modeling_of_production_anomalies.service.OrgALLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orgAll")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class OrgAllController {
    @Autowired
    private OrgALLService orgallService;
    @RequestMapping("/list")
    public List<OrgAll> orgAllList(){
        return orgallService.orgAllList();
    }
    @RequestMapping("/findById")
    public OrgAll findById(@RequestParam int id){
        return orgallService.findById(id);
    }
    @PostMapping("/update")
    public int updateOrgAll(@RequestBody OrgAll orgAll){
        return orgallService.updateOrgAll(orgAll);
    }
    @PostMapping("/addOrgAll")
    public int addOrgAll(@RequestBody List<OrgAll> orgList){
        return orgallService.batchInsert(orgList);
    }
    @RequestMapping("/findType")
    public List<String> findType(){
        return orgallService.findType();
    }
    @RequestMapping("/findInfo")
    public OrgAll findInfo(@RequestParam String com_type,String size){
        return orgallService.findInfo(com_type,size);
    }

}
