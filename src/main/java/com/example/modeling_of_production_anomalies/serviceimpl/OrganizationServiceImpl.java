package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.mapper.CompanyMapper;
import com.example.modeling_of_production_anomalies.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationServiceImpl implements OrganizationService {
    @Autowired
    private CompanyMapper companyMapper;

    @Override
    public int addCompany(Company company) {
        int newCompany = companyMapper.addCompany(company);
        return newCompany;
    }
}
