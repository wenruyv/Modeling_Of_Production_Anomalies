package com.example.modeling_of_production_anomalies;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 启用Spring Boot的自动配置和组件扫描
@SpringBootApplication
// 指定MyBatis Mapper接口所在的包
@MapperScan("com.example.modeling_of_production_anomalies.mapper")
public class ModelingOfProductionAnomaliesApplication {

    public static void main(String[] args) {
        // 启动Spring Boot应用程序
        SpringApplication.run(ModelingOfProductionAnomaliesApplication.class, args);
    }
}