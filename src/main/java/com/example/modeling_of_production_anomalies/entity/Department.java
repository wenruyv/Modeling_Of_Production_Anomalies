package com.example.modeling_of_production_anomalies.entity;

public class Department {
    private int id;
    private String department;
    private String d_username;
    private String d_password;

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

    @Override
    public String toString() {
        return "Department{" +
                "id=" + id +
                ", department='" + department + '\'' +
                ", d_username='" + d_username + '\'' +
                ", d_password='" + d_password + '\'' +
                '}';
    }
}
