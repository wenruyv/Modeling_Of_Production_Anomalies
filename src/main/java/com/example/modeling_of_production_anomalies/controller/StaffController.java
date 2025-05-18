package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Staff;
import com.example.modeling_of_production_anomalies.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class StaffController {
    @Autowired
    private StaffService staffService;
    @RequestMapping("/list")
    public List<Staff> getStaffList(@RequestParam int com_id){
        List<Staff> list = staffService.staffList(com_id);
        return list;
    }
    @RequestMapping("/depList")
    public List<Staff> getDepStaffList(@RequestParam int dep_id){
        List<Staff> list = staffService.depStaffList(dep_id);
        return list;
    }
    @PostMapping("/addStaff")
    public int addStaff(@RequestBody Staff staff){
        int newStaff = staffService.addStaff(staff);
        return newStaff;
    }
    @PostMapping("/update")
    public int updateStaff(@RequestBody Staff staff){
        return staffService.updateStaff(staff);
    }
    @DeleteMapping("/delete/{id}")
    public int deleteById(@PathVariable int id){
        return staffService.deleteById(id);
    }
    @DeleteMapping("/deleteDep/{dep_id}")
    public int deleteByDepId(@PathVariable int dep_id){
        return staffService.deleteByDepId(dep_id);
    }
    @DeleteMapping("/deleteCom/{com_id}")
    public int deleteByComId(@PathVariable int com_id){
        return staffService.deleteByComId(com_id);
    }
    @GetMapping("/getByGroupName")
    public List<Staff> getStaffByGroupName(@RequestParam String group_name) {
        return staffService.getStaffByGroupName(group_name);
    }
}
