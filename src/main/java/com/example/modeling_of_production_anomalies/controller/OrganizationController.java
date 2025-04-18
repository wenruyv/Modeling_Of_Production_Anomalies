package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.Organization;
import com.example.modeling_of_production_anomalies.entity.User;
import com.example.modeling_of_production_anomalies.service.OrganizationService;
import com.example.modeling_of_production_anomalies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organization")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class OrganizationController {
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private UserService userService;
    // 获取树形结构数据
    @GetMapping("/tree")
    public List<Organization> getTree() {
        return organizationService.getOrgTree();
    }
    @PostMapping("/updateTree")
    public int updateOrgTree(@RequestBody Organization node){
        int result = organizationService.updateOrgTree(node);
        if (result == 1) {
            return result;
        } else {
            return 0;
        }
    }
    @PostMapping("/addTree")
    public int addNodeTree(@RequestBody Organization node){
        int result = organizationService.addTree(node);
        if (result == 1) {
            return result;
        } else {
            return 0;
        }
    }
    @PostMapping("/deleteTree")
    public int deleteNodeTree(@RequestBody Organization id){
        int result = organizationService.deleteNode(id);
        if (result == 1) {
            return result;
        } else {
            return 0;
        }
    }

    @RequestMapping("/list")
    public List<Company> getCompanyList(){
        List<Company> list = organizationService.companyList();
        System.out.println(list);
        return list;
    }
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
    @GetMapping("/companyInfo")
    public Company companyInfoByUsername(@RequestParam String c_username){
        Company company = organizationService.selectByC_username(c_username);
        return company;
    }
    @PostMapping("/updateCompany")
    public int updateCompany(@RequestBody Company company) {
        int result = organizationService.updateCompany(company);
        if (result == 1) {
            return result;
        } else {
            return 0;
        }
    }
}
