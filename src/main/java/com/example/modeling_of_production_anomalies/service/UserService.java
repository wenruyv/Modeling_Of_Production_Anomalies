package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.User;

import java.util.List;


public interface UserService {
    User findByUsername(String username);
    User findByUserId(int user_id);
    List<User> UserList();
    int addUser(User user);
    int updateUser(User user);
    int deleteUserById(int user_id);
}
