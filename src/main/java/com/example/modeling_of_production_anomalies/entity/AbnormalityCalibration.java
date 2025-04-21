package com.example.modeling_of_production_anomalies.entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "abnormality_calibration")
public class AbnormalityCalibration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
}