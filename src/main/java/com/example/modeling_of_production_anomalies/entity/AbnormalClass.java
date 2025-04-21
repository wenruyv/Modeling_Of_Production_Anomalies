package com.example.modeling_of_production_anomalies.entity;

public class AbnormalClass {
    private int ab_id;
    private String ab_class;
    private String ab_level1;
    private String ab_level2;
    private String ab_def;
    private String ab_scene;
    private String ab_effect;
    private String ab_solve;
    private String ab_unit;
    private String ab_important;


    public int getAb_id() {
        return ab_id;
    }

    public void setAb_id(int ab_id) {
        this.ab_id = ab_id;
    }

    public String getAb_class() {
        return ab_class;
    }

    public void setAb_class(String ab_class) {
        this.ab_class = ab_class;
    }

    public String getAb_level1() {
        return ab_level1;
    }

    public void setAb_level1(String ab_level1) {
        this.ab_level1 = ab_level1;
    }

    public String getAb_level2() {
        return ab_level2;
    }

    public void setAb_level2(String ab_level2) {
        this.ab_level2 = ab_level2;
    }

    public String getAb_def() {
        return ab_def;
    }

    public void setAb_def(String ab_def) {
        this.ab_def = ab_def;
    }

    public String getAb_scene() {
        return ab_scene;
    }

    public void setAb_scene(String ab_scene) {
        this.ab_scene = ab_scene;
    }

    public String getAb_effect() {
        return ab_effect;
    }

    public void setAb_effect(String ab_effect) {
        this.ab_effect = ab_effect;
    }

    public String getAb_solve() {
        return ab_solve;
    }

    public void setAb_solve(String ab_solve) {
        this.ab_solve = ab_solve;
    }

    public String getAb_unit() {
        return ab_unit;
    }

    public void setAb_unit(String ab_unit) {
        this.ab_unit = ab_unit;
    }

    public String getAb_important() {
        return ab_important;
    }
    public void setAb_important(String ab_important) {
        this.ab_important = ab_important;
    }


    @Override
    public String toString() {
        return "AbnormalClass{" +
                "ab_id=" + ab_id +
                ", ab_class='" + ab_class + '\'' +
                ", ab_level1='" + ab_level1 + '\'' +
                ", ab_level2='" + ab_level2 + '\'' +
                ", ab_def='" + ab_def + '\'' +
                ", ab_scene='" + ab_scene + '\'' +
                ", ab_effect='" + ab_effect + '\'' +
                ", ab_solve='" + ab_solve + '\'' +
                ", ab_unit='" + ab_unit + '\'' +
                ", ab_important='" + ab_important + '\'' +
                '}';
    }
}
