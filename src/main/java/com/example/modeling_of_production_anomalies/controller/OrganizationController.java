package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.Organization;
import com.example.modeling_of_production_anomalies.entity.User;
import com.example.modeling_of_production_anomalies.service.*;
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
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private StaffService staffService;
    @Autowired
    private ProInfoService proInfoService;
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
        User user = userService.findByUsername(company.getC_username());
        if(user != null){
            //存在同名
            return 2;
        }
        int newCom = organizationService.addCompany(company);
        User cuser = new User();
        //设置企业管理员
        cuser.setUsername(company.getC_username());
        cuser.setPassword(company.getC_password());
        cuser.setUser_type(2);
        // 添加Cuser到数据库
        int newCuser = userService.addUser(cuser);

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
        Company oldCom = organizationService.findById(company.getId());//找到旧的公司值
        if (oldCom == null) return 0;
        //更新公司信息
        int result = organizationService.updateCompany(company);
        //3. 检查并更新用户
        String oldUsername = oldCom.getC_username();

        String oldPassword = oldCom.getC_password();
        String newUsername = company.getC_username();
        String newPassword = company.getC_password();
        if (oldUsername != newUsername || oldPassword !=newPassword) {
            User user = userService.findByUsername(oldUsername);
            if(user != null){
                user.setUsername(newUsername);
                user.setPassword(newPassword);
                userService.updateUser(user);
            }
        }
        return result;
    }
    @PostMapping("/updateC_org")
    public int updateC_org(@RequestParam String c_username, @RequestParam String c_org) {
        int result = organizationService.updateC_org(c_username,c_org);
        if (result == 1) {
            return result;
        } else {
            return 0;
        }
    }
    @GetMapping("/isEmptyOrg")
    public String isEmptyOrg(@RequestParam String c_username) {
        String result = organizationService.isEmptyOrg(c_username);
        return result;
    }
    @GetMapping("/orgById")
    public String OrgById(@RequestParam int id) {
        String result = organizationService.orgById(id);
        return result;
    }
    @DeleteMapping("/delete/{id}")
    public int deleteById(@PathVariable int id){
        Company company = organizationService.findById(id);
        User user = userService.findByUsername(company.getC_username());
        int deUser = userService.deleteUserById(user.getUser_id());//删除公司管理员
        int deDep = departmentService.deleteDepByComId(company.getId());//删除部门
        int deStaff = staffService.deleteByComId(company.getId());//删除公司员工
        int deProInfo = proInfoService.deleteByComId(company.getId());//删除公司生产信息
        return organizationService.deleteById(id);
    }
}
