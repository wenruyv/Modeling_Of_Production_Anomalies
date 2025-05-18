package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Group1;
import com.example.modeling_of_production_anomalies.service.Group1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/group1")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class Group1Controller {
    @Autowired
    private Group1Service group1Service;

    @RequestMapping("/list")
    public List<Group1> getGroup1List(@RequestParam int dep_id) {
        List<Group1> list = group1Service.group1List(dep_id);
        return list;
    }

    @PostMapping("/addGroup1")
    public int addGroup1(@RequestBody Group1 group1) {
        int newGroup1 = group1Service.addGroup1(group1);
        return newGroup1;
    }

    @PostMapping("/update")
    public int updateGroup1(@RequestBody Group1 group1) {
        return group1Service.updateGroup1(group1);
    }

    @DeleteMapping("/delete/{id}")
    public int deleteById(@PathVariable int id) {
        return group1Service.deleteById(id);
    }

    // 新增方法：处理获取全部小组信息的请求
    @GetMapping("/allList")
    public List<Group1> getAllGroup1List() {
        return group1Service.getAllGroup1List();
    }
}