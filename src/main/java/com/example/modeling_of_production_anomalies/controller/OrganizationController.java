package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.User;
import com.example.modeling_of_production_anomalies.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/organization")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class OrganizationController {
    @Autowired
    private OrganizationService organizationService;
    @PostMapping("/addCompany")
    public int addCompany(@RequestBody Company company){
        int newCom = organizationService.addCompany(company);
        System.out.println(newCom);
        return newCom;
    }
}
