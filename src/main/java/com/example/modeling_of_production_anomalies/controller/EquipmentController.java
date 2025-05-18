package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Equipment;
import com.example.modeling_of_production_anomalies.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipment")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class EquipmentController {
    @Autowired
    private EquipmentService equipmentService;
    @RequestMapping("/list")
    public List<Equipment> getEquipmentList(@RequestParam int com_id){
        List<Equipment> list = equipmentService.equipmentList(com_id);
        return list;
    }
    @RequestMapping("/depList")
    public List<Equipment> getEquipmentByDepId(@RequestParam int dep_id){
        List<Equipment> list = equipmentService.equipmentByDepId(dep_id);
        return list;
    }
    @PostMapping("/addEquipment")
    public int addEquipment(@RequestBody Equipment equipment){
        int newEquipment = equipmentService.addEquipment(equipment);
        return newEquipment;
    }
    @PostMapping("/update")
    public int updateEquipment(@RequestBody Equipment equipment){
        return equipmentService.updateEquipment(equipment);
    }
    @DeleteMapping("/delete/{id}")
    public int deleteById(@PathVariable int id){
        return equipmentService.deleteById(id);
    }

    @GetMapping("/getByGroupName")
    public List<Equipment> getEquipmentByGroupName(@RequestParam String group_name) {
        return equipmentService.getEquipmentByGroupName(group_name);
    }
}

