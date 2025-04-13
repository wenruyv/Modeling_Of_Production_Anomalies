package com.example.modeling_of_production_anomalies.entity;

import java.util.ArrayList;
import java.util.List;

public class Resource {
    private int id;
    private String label;
    private Integer pid;
    private List<Resource> children = new ArrayList<>(); // 子节点列表

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public List<Resource> getChildren() {
        return children;
    }

    public void setChildren(List<Resource> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "Resource{" +
                "id=" + id +
                ", label='" + label + '\'' +
                ", pid=" + pid +
                ", children=" + children +
                '}';
    }
}
