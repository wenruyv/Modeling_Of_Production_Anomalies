package com.example.modeling_of_production_anomalies.entity;

public class Organization {
    private int id;
    private String company;
    private String department;
    private String group;
    private String position;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    @Override
    public String toString() {
        return "Organization{" +
                "id=" + id +
                ", company='" + company + '\'' +
                ", department='" + department + '\'' +
                ", group='" + group + '\'' +
                ", position='" + position + '\'' +
                '}';
    }
}
