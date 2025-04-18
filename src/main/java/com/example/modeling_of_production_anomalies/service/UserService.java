package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.User;

import java.util.List;


public interface UserService {
    User findByUsername(String username);
    List<User> UserList();
    int addCuser(User user);
    int addDuser(User user);
}
