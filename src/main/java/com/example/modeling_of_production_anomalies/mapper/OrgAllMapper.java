package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.OrgAll;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface OrgAllMapper {
    List<OrgAll> orgAllList();
    OrgAll findById(int id);
    OrgAll findInfo(String com_type, String size );
    List<String> findType();
    int batchInsert(List<OrgAll> orgList);
    int updateOrgAll(OrgAll orgAll);
}
