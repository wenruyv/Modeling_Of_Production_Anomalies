package com.example.modeling_of_production_anomalies.entity;

public class Company {
    private int id;
    private String name;
    private String location;
    private String established_date;
    private String type;
    private String phone;
    private String email;
    private String ceo_name;
    private String web;
    private String c_username;
    private String c_password;
    private String introduction;

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEstablished_date() {
        return established_date;
    }

    public void setEstablished_date(String established_date) {
        this.established_date = established_date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCeo_name() {
        return ceo_name;
    }

    public void setCeo_name(String ceo_name) {
        this.ceo_name = ceo_name;
    }

    public String getWeb() {
        return web;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    public String getC_username() {
        return c_username;
    }

    public void setC_username(String c_username) {
        this.c_username = c_username;
    }

    public String getC_password() {
        return c_password;
    }

    public void setC_password(String c_password) {
        this.c_password = c_password;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", established_date='" + established_date + '\'' +
                ", type='" + type + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", ceo_name='" + ceo_name + '\'' +
                ", web='" + web + '\'' +
                ", c_username='" + c_username + '\'' +
                ", c_password='" + c_password + '\'' +
                ", introduction='" + introduction + '\'' +
                '}';
    }
}
