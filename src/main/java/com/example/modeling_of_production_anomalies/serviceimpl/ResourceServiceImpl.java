package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Organization;
import com.example.modeling_of_production_anomalies.entity.Resource;
import com.example.modeling_of_production_anomalies.mapper.ResourceMapper;
import com.example.modeling_of_production_anomalies.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResourceServiceImpl implements ResourceService {
    @Autowired
    private ResourceMapper resourceMapper;
    @Override
    public List<Resource> resourceTree() {
        List<Resource> allNodes = resourceMapper.resourceList(); // 获取所有节点
        return buildTree(allNodes); // 构建树形结构
    }
    // 构建树形结构
    private List<Resource> buildTree(List<Resource> nodes) {
        // 将节点按父节点 ID 分组
        Map<Integer, List<Resource>> parentIdMap = nodes.stream()
                .filter(node -> node.getPid() != null) // 过滤掉根节点
                .collect(Collectors.groupingBy(Resource::getPid)); // 按 parentId 分组

        // 设置子节点
        nodes.forEach(node -> node.setChildren(parentIdMap.get(node.getId())));

        // 返回根节点
        return nodes.stream()
                .filter(node -> node.getPid() == null) // 过滤出根节点
                .collect(Collectors.toList());
    }
}
