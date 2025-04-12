package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Staff;

import java.util.List;

public interface StaffService {
    List<Staff> staffList();
    int addStaff(Staff staff);
}
