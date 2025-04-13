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
//        if (user == null) {
//            // 处理未找到用户的情况
//            System.out.println("service用户不存在");
//        } else {
//            System.out.println("service找到的用户：" + user);
//        }
        return user;
    }
    @Override
    public List<User> UserList() {
        List<User> list = userMapper.UserList();
        return list;
    }

    @Override
    public int addCuser(User user) {
        int newCuser = userMapper.addCuser(user);
        return newCuser;
    }

    @Override
    public int addDuser(User user) {
        int newDuser = userMapper.addDuser(user);
        return newDuser;
    }
}
