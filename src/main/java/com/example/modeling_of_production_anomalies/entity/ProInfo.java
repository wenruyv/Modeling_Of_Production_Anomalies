package com.example.modeling_of_production_anomalies.entity;

public class ProInfo {
    private int id;
    private String name;
    private int c_id;
    private String c_name;
    private String Info;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getC_name() {
        return c_name;
    }

    public void setC_name(String c_name) {
        this.c_name = c_name;
    }

    public String getInfo() {
        return Info;
    }

    public void setInfo(String info) {
        Info = info;
    }

    public int getC_id() {
        return c_id;
    }

    public void setC_id(int c_id) {
        this.c_id = c_id;
    }

    @Override
    public String toString() {
        return "ProInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", c_id=" + c_id +
                ", c_name='" + c_name + '\'' +
                ", Info='" + Info + '\'' +
                '}';
    }
}
