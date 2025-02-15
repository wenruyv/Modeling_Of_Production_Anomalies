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

    @Override
    public Company selectByC_username(String c_username) {
        Company company = companyMapper.selectByC_username(c_username);
        return company;
    }

    @Override
    public int updateCompany(Company company) {
        // 根据公司ID或其他唯一标识更新公司信息
        return companyMapper.updateCompany(company);
    }
}
