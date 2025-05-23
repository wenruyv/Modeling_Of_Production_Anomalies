package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Department;

import java.util.List;

public interface DepartmentService {
    List<Department> depList(int com_id);
    int addDepartment(Department department);
    Department selectByD_username(String d_username);
    Department selectDepById(int id);
    int updateDep(Department department);
    int deleteDepByComId(int com_id);
    int deleteDepById(int id);

}
