package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Information;
import com.example.modeling_of_production_anomalies.entity.Organization;
import com.example.modeling_of_production_anomalies.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/information")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class InformationController {
    @Autowired
    private InformationService informationService;
    @GetMapping("/tree")
    public List<Information> getTree() {
        return informationService.informationTree();
    }
}
