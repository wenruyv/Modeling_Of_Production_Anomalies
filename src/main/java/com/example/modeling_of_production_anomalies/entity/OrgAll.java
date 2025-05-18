package com.example.modeling_of_production_anomalies.entity;

public class OrgAll {
    private int id;
    private String com_type;
    private String size;
    private String info;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCom_type() {
        return com_type;
    }

    public void setCom_type(String com_type) {
        this.com_type = com_type;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public String toString() {
        return "OrgAll{" +
                "id=" + id +
                ", com_type='" + com_type + '\'' +
                ", size='" + size + '\'' +
                ", info='" + info + '\'' +
                '}';
    }
}
