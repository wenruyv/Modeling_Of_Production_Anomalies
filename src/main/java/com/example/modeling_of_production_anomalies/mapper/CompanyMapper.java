package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.Company;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CompanyMapper {
    int addCompany(Company company);
    Company selectByC_username(String c_username);
    int updateCompany(Company company);
    List<Company> companyList();
}
