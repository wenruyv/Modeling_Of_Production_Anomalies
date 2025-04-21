package com.example.modeling_of_production_anomalies.entity;

public class Department {
    private int id;
    private String department;
    private String d_username;
    private String d_password;
    private String d_name;
    private String location;
    private String description;
    private int com_id;
    private String com_name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getD_username() {
        return d_username;
    }

    public void setD_username(String d_username) {
        this.d_username = d_username;
    }

    public String getD_password() {
        return d_password;
    }

    public void setD_password(String d_password) {
        this.d_password = d_password;
    }

    public String getD_name() {
        return d_name;
    }

    public void setD_name(String d_name) {
        this.d_name = d_name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCom_id() {
        return com_id;
    }

    public void setCom_id(int com_id) {
        this.com_id = com_id;
    }

    public String getCom_name() {
        return com_name;
    }

    public void setCom_name(String com_name) {
        this.com_name = com_name;
    }

    @Override
    public String toString() {
        return "Department{" +
                "id=" + id +
                ", department='" + department + '\'' +
                ", d_username='" + d_username + '\'' +
                ", d_password='" + d_password + '\'' +
                ", d_name='" + d_name + '\'' +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", com_id='" + com_id + '\'' +
                ", com_name='" + com_name + '\'' +
                '}';
    }
}
