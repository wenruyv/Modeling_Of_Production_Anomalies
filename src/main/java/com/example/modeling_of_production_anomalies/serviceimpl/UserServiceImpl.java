package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.User;
import com.example.modeling_of_production_anomalies.mapper.UserMapper;
import com.example.modeling_of_production_anomalies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Override
    public User findByUsername(String username) {
        User user = userMapper.findByUsername(username);
        System.out.println("service" + username);
        System.out.println("sususu" + user);
        if (user == null) {
            // 处理未找到用户的情况
            System.out.println("service用户不存在");
        } else {
            System.out.println("service找到的用户：" + user);
        }
        return user;
    }
    @Override
    public List<User> UserList() {
        List<User> list = userMapper.UserList();
        return list;
    }
}
