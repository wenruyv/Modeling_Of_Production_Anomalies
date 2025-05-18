package com.example.modeling_of_production_anomalies.entity;

public class Material {
    private int id;
    private String name;
    private String number;
    private String unit;
    private String unit_price;
    private String supplier;
    private String description;
    private int group_id;
    private String group_name;
    private int dep_id;
    private String dep_name;
    private int com_id;
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

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(String unit_price) {
        this.unit_price = unit_price;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
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
        return "Material{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", number='" + number + '\'' +
                ", unit='" + unit + '\'' +
                ", unit_price='" + unit_price + '\'' +
                ", supplier='" + supplier + '\'' +
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
