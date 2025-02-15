package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.Organization;

import java.util.List;

public interface OrganizationService {
    int addCompany(Company company);
    Company selectByC_username(String c_username);
    int updateCompany(Company company);
    List<Organization> orgList();
}
