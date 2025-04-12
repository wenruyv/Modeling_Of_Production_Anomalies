package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Staff;
import com.example.modeling_of_production_anomalies.mapper.StaffMapper;
import com.example.modeling_of_production_anomalies.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private StaffMapper staffMapper;
    @Override
    public List<Staff> staffList() {
        return staffMapper.staffList();
    }

    @Override
    public int addStaff(Staff staff) {
        return staffMapper.addStaff(staff);
    }
}
