package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Staff;

import java.util.List;

public interface StaffService {
    List<Staff> staffList(int com_id);
    List<Staff> depStaffList(int dep_id);
    int addStaff(Staff staff);
    int updateStaff(Staff staff);
    int deleteById(int id);
    int deleteByDepId(int dep_id);
    int deleteByComId(int com_id);
    List<Staff> getStaffByGroupName(String group_name);

}
