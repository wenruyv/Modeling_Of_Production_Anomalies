package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Department;
import com.example.modeling_of_production_anomalies.mapper.DepartmentMapper;
import com.example.modeling_of_production_anomalies.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentMapper departmentMapper;
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
    public int updateDep(Department department) {
        return departmentMapper.updateDep(department);
    }
}
