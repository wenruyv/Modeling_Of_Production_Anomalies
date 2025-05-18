package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.Material;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MaterialMapper {
    List<Material> materialList(int com_id);
    List<Material> materialByDepId(int dep_id);
    int addMaterial(Material material);
    int updateMaterial(Material material);
    int deleteById(int id);
    int deleteByDepId(int dep_id);
    int deleteByComId(int com_id);
    @Select("select * from material  where group_name = #{group_name}")
    List<Material> getMaterialByGroupName(String group_name);
}
