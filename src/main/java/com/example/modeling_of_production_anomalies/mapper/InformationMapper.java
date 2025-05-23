package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.Information;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


import java.util.List;
@Mapper
@Repository
public interface InformationMapper {
    List<Information> informationList();
}
