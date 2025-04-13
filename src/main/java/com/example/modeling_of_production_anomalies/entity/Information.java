package com.example.modeling_of_production_anomalies.entity;

import java.util.ArrayList;
import java.util.List;

public class Information {
    private String id;
    private String label;
    private String pid;
    private List<Information> children = new ArrayList<>(); // 子节点列表
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

    public List<Information> getChildren() {
        return children;
    }

    public void setChildren(List<Information> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "Information{" +
                "id='" + id + '\'' +
                ", label='" + label + '\'' +
                ", pid='" + pid + '\'' +
                '}';
    }
}
