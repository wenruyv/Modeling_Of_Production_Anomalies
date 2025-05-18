package com.example.modeling_of_production_anomalies.entity;

public class Equipment {
    private int id;
    private String name;//设备名称
    private String type;//设备类型
    private String number;
    private String buy_date;//购买日期
    private String warranty_period;//保修期
    private String use_life;//使用年限
    private String description;//设备描述
    private int group_id;//小组
    private String group_name;
    private int dep_id;//小组
    private String dep_name;
    private int com_id;//公司
    private String com_name;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getBuy_date() {
        return buy_date;
    }

    public void setBuy_date(String buy_date) {
        this.buy_date = buy_date;
    }

    public String getWarranty_period() {
        return warranty_period;
    }

    public void setWarranty_period(String warranty_period) {
        this.warranty_period = warranty_period;
    }

    public String getUse_life() {
        return use_life;
    }

    public void setUse_life(String use_life) {
        this.use_life = use_life;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getGroup_id() {
        return group_id;
    }

    public void setGroup_id(int group_id) {
        this.group_id = group_id;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    public int getDep_id() {
        return dep_id;
    }

    public void setDep_id(int dep_id) {
        this.dep_id = dep_id;
    }

    public String getDep_name() {
        return dep_name;
    }

    public void setDep_name(String dep_name) {
        this.dep_name = dep_name;
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
        return "Equipment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", number='" + number + '\'' +
                ", buy_date='" + buy_date + '\'' +
                ", warranty_period='" + warranty_period + '\'' +
                ", use_life='" + use_life + '\'' +
                ", description='" + description + '\'' +
                ", group_id=" + group_id +
                ", group_name='" + group_name + '\'' +
                ", dep_id=" + dep_id +
                ", dep_name='" + dep_name + '\'' +
                ", com_id=" + com_id +
                ", com_name='" + com_name + '\'' +
                '}';
    }
}
