package com.example.modeling_of_production_anomalies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ModelingOfProductionAnomaliesApplication {

    public static void main(String[] args) {
        SpringApplication.run(ModelingOfProductionAnomaliesApplication.class, args);
    }

}
