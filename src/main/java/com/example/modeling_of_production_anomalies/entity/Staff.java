package com.example.modeling_of_production_anomalies.entity;

public class Staff {
    private int id;
    private String name;
    private String gender;
    private String birth_date;
    private int id_number;//身份证
    private String phone;
    private String email;
    private String position;//职位
    private int dep_id;
    private String department;//部门
    private String hire_date;//入职日期
    private String group1;//所属小组
    private String group_leader;//组长
    private int com_id;
    private String com_name;//部门

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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(String birth_date) {
        this.birth_date = birth_date;
    }

    public int getId_number() {
        return id_number;
    }

    public void setId_number(int id_number) {
        this.id_number = id_number;
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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getHire_date() {
        return hire_date;
    }

    public void setHire_date(String hire_date) {
        this.hire_date = hire_date;
    }

    public String getGroup1() {
        return group1;
    }

    public void setGroup1(String group1) {
        this.group1 = group1;
    }

    public String getGroup_leader() {
        return group_leader;
    }

    public void setGroup_leader(String group_leader) {
        this.group_leader = group_leader;
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

    public int getDep_id() {
        return dep_id;
    }

    public void setDep_id(int dep_id) {
        this.dep_id = dep_id;
    }

    @Override
    public String toString() {
        return "Staff{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", birth_date='" + birth_date + '\'' +
                ", id_number=" + id_number +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", position='" + position + '\'' +
                ", dep_id=" + dep_id +
                ", department='" + department + '\'' +
                ", hire_date='" + hire_date + '\'' +
                ", group1='" + group1 + '\'' +
                ", group_leader='" + group_leader + '\'' +
                ", com_id=" + com_id +
                ", com_name='" + com_name + '\'' +
                '}';
    }
}
