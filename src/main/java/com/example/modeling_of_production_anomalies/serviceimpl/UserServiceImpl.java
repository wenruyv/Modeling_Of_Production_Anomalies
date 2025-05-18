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
        return user;
    }

    @Override
    public User findByUserId(int user_id) {
        return userMapper.findByUserId(user_id);
    }

    @Override
    public List<User> UserList() {
        List<User> list = userMapper.UserList();
        return list;
    }

    @Override
    public int addUser(User user) {
        int newUser = userMapper.addUser(user);
        return newUser;
    }

    @Override
    public int updateUser(User user) {
        return userMapper.updateUser(user);
    }

    @Override
    public int deleteUserById(int user_id) {
        return userMapper.deleteUserById(user_id);
    }
}
