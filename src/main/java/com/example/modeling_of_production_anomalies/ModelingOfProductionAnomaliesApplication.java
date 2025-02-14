package com.example.modeling_of_production_anomalies;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.modeling_of_production_anomalies.mapper")
public class ModelingOfProductionAnomaliesApplication {

    public static void main(String[] args) {
        SpringApplication.run(ModelingOfProductionAnomaliesApplication.class, args);
    }
}