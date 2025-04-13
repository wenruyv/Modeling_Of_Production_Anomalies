package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.Organization;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface OrganizationMapper {
    List<Organization> orgList();
    int updateOrgTree(Organization organization);
    Organization findById(String id);
    int addTree(Organization organization);
    int deleteNode(Organization id);
}
