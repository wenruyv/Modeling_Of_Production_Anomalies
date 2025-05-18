package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Department;
import com.example.modeling_of_production_anomalies.entity.User;
import com.example.modeling_of_production_anomalies.mapper.DepartmentMapper;
import com.example.modeling_of_production_anomalies.service.DepartmentService;
import com.example.modeling_of_production_anomalies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentMapper departmentMapper;
    @Autowired
    private UserService userService;
    @Override
    public List<Department> depList(int com_id) {
        return departmentMapper.depList(com_id);
    }

    @Override
    public int addDepartment(Department department) {
        int newDepart = departmentMapper.addDepartment(department);
        return newDepart;
    }

    @Override
    public Department selectByD_username(String d_username) {
        return departmentMapper.selectByD_username(d_username);
    }

    @Override
    public Department selectDepById(int id) {
        return departmentMapper.selectDepById(id);
    }

    @Override
    public int updateDep(Department department) {
        return departmentMapper.updateDep(department);
    }

    @Override
    public int deleteDepById(int id) {
        return departmentMapper.deleteDepById(id);
    }

    @Override
    public int deleteDepByComId(int com_id) {
        List<Department> depList = departmentMapper.depList(com_id);
        if(depList != null) //删除部门管理员
            for(Department department : depList){
                User user = userService.findByUsername(department.getD_username());
                userService.deleteUserById(user.getUser_id());
            }
        return departmentMapper.deleteDepByComId(com_id);
    }
}
