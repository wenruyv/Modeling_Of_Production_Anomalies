package com.example.modeling_of_production_anomalies.entity;

public class Group1 {
    private int id;
    private String name;
    private String leader;
    private String group_function;
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

    public String getLeader() {
        return leader;
    }

    public void setLeader(String leader) {
        this.leader = leader;
    }
    public String getGroup_function() {
        return group_function;
    }

    public void setGroup_function(String group_function) {
        this.group_function = group_function;
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
        return "Group1{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", leader='" + leader + '\'' +
                ", function='" + group_function + '\'' +
                ", dep_id=" + dep_id +
                ", dep_name='" + dep_name + '\'' +
                ", com_id=" + com_id +
                ", com_name='" + com_name + '\'' +
                '}';
    }
}
