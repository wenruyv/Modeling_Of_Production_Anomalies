package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.User;
import com.example.modeling_of_production_anomalies.service.OrganizationService;
import com.example.modeling_of_production_anomalies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/organization")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class OrganizationController {
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private UserService userService;
    @PostMapping("/addCompany")
    public int addCompany(@RequestBody Company company){
        int newCom = organizationService.addCompany(company);
        User cuser = new User();
        //设置企业管理员
        cuser.setUsername(company.getC_username());
        cuser.setPassword(company.getC_password());
        cuser.setUser_type(2);
        // 添加Cuser到数据库
        int newCuser = userService.addCuser(cuser);

        // 输出调试信息
        System.out.println("公司添加结果: " + newCom);
        System.out.println("企业管理员添加结果: " + newCuser);
        System.out.println(newCom);

        return newCom;
    }
}
