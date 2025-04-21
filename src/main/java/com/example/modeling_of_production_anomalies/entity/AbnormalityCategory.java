package com.example.modeling_of_production_anomalies.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "abnormality_category")
public class AbnormalityCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String important;
}