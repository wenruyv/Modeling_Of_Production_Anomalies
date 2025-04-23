package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.Department;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DepartmentMapper {
    List<Department> depList(int com_id);
    int addDepartment(Department department);
    Department selectByD_username(String d_username);
    int updateDep(Department department);
    int deleteDepById(int id);
    Department selectDepById(int id);

}
