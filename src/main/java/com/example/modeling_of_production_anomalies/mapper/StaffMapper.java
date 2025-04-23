package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.Staff;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface StaffMapper {
    List<Staff> staffList(int com_id);
    List<Staff> depStaffList(int dep_id);
    int addStaff(Staff staff);
    int updateStaff(Staff staff);
    int deleteById(int id);
}
