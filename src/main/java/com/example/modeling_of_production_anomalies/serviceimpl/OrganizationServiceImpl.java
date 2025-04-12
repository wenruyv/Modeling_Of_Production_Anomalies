package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Company;
import com.example.modeling_of_production_anomalies.entity.Organization;
import com.example.modeling_of_production_anomalies.mapper.CompanyMapper;
import com.example.modeling_of_production_anomalies.mapper.OrganizationMapper;
import com.example.modeling_of_production_anomalies.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrganizationServiceImpl implements OrganizationService {
    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private OrganizationMapper organizationMapper;
    @Override
    public String isEmptyOrg(String c_username){
        return companyMapper.isEmptyOrg(c_username);
    }
    @Override
    public int updateC_org(String c_username,String c_org){
        return companyMapper.updateC_org(c_username,c_org);
    }
    @Override
    public List<Organization> getOrgTree() {
        List<Organization> allNodes = organizationMapper.orgList(); // 获取所有节点
        return buildTree(allNodes); // 构建树形结构
    }

    @Override
    public int addTree(Organization organization) {
        return organizationMapper.addTree(organization);
    }

    @Override
    public int deleteNode(Organization id) {
        System.out.println("后端接受的数据：：：" + id);
        return organizationMapper.deleteNode(id);
    }

    @Override
    public int updateOrgTree(Organization organization) {
        // 1. 检查节点是否存在
        Organization existingNode = organizationMapper.findById(organization.getId());
        if (existingNode == null) {
            throw new RuntimeException("节点不存在，ID: " + organization.getId());
        }

        // 2. 更新节点数据
        existingNode.setLabel(organization.getLabel()); // 更新节点名称
        existingNode.setPid(organization.getPid()); // 更新父节点 ID

        // 3. 调用 Mapper 更新数据库
        return organizationMapper.updateOrgTree(existingNode);
    }

    // 构建树形结构
    private List<Organization> buildTree(List<Organization> nodes) {
        // 将节点按父节点 ID 分组
        Map<String, List<Organization>> parentIdMap = nodes.stream()
                .filter(node -> node.getPid() != null) // 过滤掉根节点
                .collect(Collectors.groupingBy(Organization::getPid)); // 按 parentId 分组

        // 设置子节点
        nodes.forEach(node -> node.setChildren(parentIdMap.get(node.getId())));

        // 返回根节点
        return nodes.stream()
                .filter(node -> node.getPid() == null) // 过滤出根节点
                .collect(Collectors.toList());
    }


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

    @Override
    public List<Company> companyList() {
        return companyMapper.companyList();
    }
}
