package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper {
    //查询
    User findByUsername(String username);
    //列表展示
    List<User> UserList();
    int addCuser(User user);
    int addDuser(User user);


}
