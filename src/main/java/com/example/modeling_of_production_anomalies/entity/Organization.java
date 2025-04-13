package com.example.modeling_of_production_anomalies.entity;

import java.util.ArrayList;
import java.util.List;

public class Organization {
    private String id;
    private String label;
    private String pid;
    private List<Organization> children = new ArrayList<>(); // 子节点列表

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public List<Organization> getChildren() {
        return children;
    }

    public void setChildren(List<Organization> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "Organization{" +
                "id=" + id +
                ", name='" + label + '\'' +
                ", parent_id='" + pid + '\'' +
                '}';
    }
}
