package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.Company;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CompanyMapper {
    int addCompany(Company company);
}
