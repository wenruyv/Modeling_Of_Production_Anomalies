package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Material;
import com.example.modeling_of_production_anomalies.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/material")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class MaterialController {
    @Autowired
    private MaterialService materialService;
    @RequestMapping("/list")
    public List<Material> getMaterialList(@RequestParam int com_id){
        List<Material> list = materialService.materialList(com_id);
        return list;
    }
    @RequestMapping("/depList")
    public List<Material> getMaterialByDepId(@RequestParam int dep_id){
        List<Material> list = materialService.materialByDepId(dep_id);
        return list;
    }
    @PostMapping("/addMaterial")
    public int addMaterial(@RequestBody Material material){
        int newMaterial = materialService.addMaterial(material);
        return newMaterial;
    }
    @PostMapping("/update")
    public int updateMaterial(@RequestBody Material material){
        return materialService.updateMaterial(material);
    }
    @DeleteMapping("/delete/{id}")
    public int deleteById(@PathVariable int id){
        return materialService.deleteById(id);
    }

    @GetMapping("/getByGroupName")
    public List<Material> getMaterialByGroupName(@RequestParam String group_name) {
        return materialService.getMaterialByGroupName(group_name);
    }
}
