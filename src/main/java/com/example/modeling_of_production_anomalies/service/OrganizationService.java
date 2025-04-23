package com.example.modeling_of_production_anomalies.service;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.Organization;

import java.util.List;

public interface OrganizationService {
    int addCompany(Company company);
    Company selectByC_username(String c_username);
    Company findById(int id);
    int updateCompany(Company company);
    List<Organization> getOrgTree();
    List<Company> companyList();
    int updateOrgTree(Organization organization);
    int addTree(Organization organization);
    int deleteNode(Organization id);
    int updateC_org(String c_username,String c_org);
    String isEmptyOrg(String c_username);
    String orgById(int id);
    int deleteById(int id);
}
