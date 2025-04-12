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
    public List<Staff> getStaffList(){
        List<Staff> list = staffService.staffList();
        return list;
    }
    @PostMapping("/addStaff")
    public int addStaff(@RequestBody Staff staff){
        int newStaff = staffService.addStaff(staff);
        return newStaff;
    }
}
