package com.example.modeling_of_production_anomalies.mapper;

import com.example.modeling_of_production_anomalies.entity.AbnormalityCategory;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AbnormalityCategoryMapper {

    @Select("SELECT * FROM abnormality_category")
    List<AbnormalityCategory> findAll();

    @Select("SELECT * FROM abnormality_category WHERE name = #{name}")
    AbnormalityCategory findByName(String name);

    @Insert("INSERT INTO abnormality_category (name, description) VALUES (#{name}, #{description})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int save(AbnormalityCategory abnormalityCategory);

    @Update("UPDATE abnormality_category SET name = #{name}, description = #{description} WHERE id = #{id}")
    int update(AbnormalityCategory abnormalityCategory);

    @Delete("DELETE FROM abnormality_category WHERE id = #{id}")
    int deleteById(Long id);
}