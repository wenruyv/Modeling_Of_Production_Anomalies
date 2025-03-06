package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.Department;
import com.example.modeling_of_production_anomalies.entity.User;
import com.example.modeling_of_production_anomalies.service.DepartmentService;
import com.example.modeling_of_production_anomalies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/depart")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private UserService userService;
    @RequestMapping("/list")
    public List<Department> getDepList(){
        List<Department> list = departmentService.depList();
        System.out.println(list);
        return list;
    }
    @PostMapping("/addDepartment")
    public int addDepartment(@RequestBody Department department){
        int newDep = departmentService.addDepartment(department);
        User duser = new User();
        //设置企业管理员
        duser.setUsername(department.getD_username());
        duser.setPassword(department.getD_password());
        duser.setUser_type(3);
        // 添加Duser到数据库
        int newDuser = userService.addDuser(duser);

        // 输出调试信息
        System.out.println("公司添加结果: " + newDep);
        System.out.println("企业管理员添加结果: " + newDuser);

        return newDep;
    }

}
