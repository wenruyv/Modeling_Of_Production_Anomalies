package com.example.modeling_of_production_anomalies.serviceimpl;

import com.example.modeling_of_production_anomalies.entity.Information;
import com.example.modeling_of_production_anomalies.entity.Organization;
import com.example.modeling_of_production_anomalies.mapper.InformationMapper;
import com.example.modeling_of_production_anomalies.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InformationServiceImpl implements InformationService {
    @Autowired
    private InformationMapper informationMapper;
    @Override
    public List<Information> informationTree() {
        List<Information> allNodes = informationMapper.informationList(); // 获取所有节点
        return buildTree(allNodes); // 构建树形结构
    }
    // 构建树形结构
    private List<Information> buildTree(List<Information> nodes) {
        // 将节点按父节点 ID 分组
        Map<String, List<Information>> parentIdMap = nodes.stream()
                .filter(node -> node.getPid() != null) // 过滤掉根节点
                .collect(Collectors.groupingBy(Information::getPid)); // 按 parentId 分组

        // 设置子节点
        nodes.forEach(node -> node.setChildren(parentIdMap.get(node.getId())));

        // 返回根节点
        return nodes.stream()
                .filter(node -> node.getPid() == null) // 过滤出根节点
                .collect(Collectors.toList());
    }
}
