package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.User;
import com.example.modeling_of_production_anomalies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User login(@RequestBody User user){
        System.out.println(user);
        String username = user.getUsername();
        String password = user.getPassword();
        System.out.println(username);
        System.out.println(password);
        User u = userService.findByUsername(username);
        System.out.println(user);
        if (u == null) {
            System.out.println("用户名不存在或错误");
            return null;
        }
        // 验证密码
        if (password.equals(u.getPassword())) {
            return u;
        } else {
            return null;
        }
        // 如果密码不匹配，则返回密码错误信息
    }

    @RequestMapping("/list")
    public List<User> getSuserList(){
        List<User> list = userService.UserList();
        System.out.println(list);
        return list;
    }
}
