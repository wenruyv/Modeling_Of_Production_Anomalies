package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Department;

import java.util.List;

public interface DepartmentService {
    List<Department> depList();
    int addDepartment(Department department);
}
