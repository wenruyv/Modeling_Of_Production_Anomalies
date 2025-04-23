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
    public List<Department> getDepList(@RequestParam int com_id ){
        List<Department> list = departmentService.depList(com_id);
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
        int newDuser = userService.addUser(duser);

        // 输出调试信息
        System.out.println("公司添加结果: " + newDep);
        System.out.println("企业管理员添加结果: " + newDuser);

        return newDep;
    }
    @GetMapping("/depInfo")
    public Department depInfo(@RequestParam String d_username){
        Department department = departmentService.selectByD_username(d_username);
        return department;
    }
    @PostMapping("/updateDep")
    public int updateDep(@RequestBody Department department) {
        //1. 先获取旧的部门信息
        Department oldDep = departmentService.selectDepById(department.getId());
        if (oldDep == null) {
            return 0; // 部门不存在
        }
        //2. 更新部门信息
        int result = departmentService.updateDep(department);

        //3. 检查并更新用户
        String oldUsername = oldDep.getD_username();

        String oldPassword = oldDep.getD_password();
        String newUsername = department.getD_username();
        String newPassword = department.getD_password();
        if(oldUsername != newUsername || oldPassword !=newPassword){
            // 3.1 如果被修改，先查询旧用户
            User user = userService.findByUsername(oldUsername);
            System.out.println(user);
            if(user != null){
                user.setUsername(newUsername);
                user.setPassword(newPassword);
                userService.updateUser(user);
            }
        }
        return result;
    }
    @DeleteMapping("/delete/{id}")
    public int deleteDepById(@PathVariable int id){
        Department department = departmentService.selectDepById(id);
        User user = userService.findByUsername(department.getD_username());
        int result = userService.deleteUserById(user.getUser_id());
        if(result == 1) return departmentService.deleteDepById(id);
        else return 0;
    }
}
