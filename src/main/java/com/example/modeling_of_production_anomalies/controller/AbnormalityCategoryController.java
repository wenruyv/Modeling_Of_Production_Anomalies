package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.AbnormalityCategory;
import com.example.modeling_of_production_anomalies.service.AbnormalityCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/abnormalityCategories")
public class AbnormalityCategoryController {

    @Autowired
    private AbnormalityCategoryService abnormalityCategoryService;

    @GetMapping
    public List<AbnormalityCategory> findAll() {
        return abnormalityCategoryService.findAll();
    }

    @GetMapping("/findByName/{name}")
    public AbnormalityCategory findByName(@PathVariable String name) {
        return abnormalityCategoryService.findByName(name);
    }

    @PostMapping
    public int save(@RequestBody AbnormalityCategory abnormalityCategory) {
        return abnormalityCategoryService.save(abnormalityCategory);
    }

    @PutMapping
    public int update(@RequestBody AbnormalityCategory abnormalityCategory) {
        return abnormalityCategoryService.update(abnormalityCategory);
    }

    @DeleteMapping("/delete/{id}")
    public int deleteById(@PathVariable Long id) {
        return abnormalityCategoryService.deleteById(id);
    }
}