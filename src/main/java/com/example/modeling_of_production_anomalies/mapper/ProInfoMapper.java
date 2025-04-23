package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.ProInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ProInfoMapper {
    List<ProInfo> findInfoByC_id(int c_id);
    List<ProInfo> proInfoList();
    int addProInfo(ProInfo proInfo);
    int updateProInfo(ProInfo proInfo);
}
