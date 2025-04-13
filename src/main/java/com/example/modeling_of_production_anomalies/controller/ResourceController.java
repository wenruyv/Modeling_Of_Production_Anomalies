package com.example.modeling_of_production_anomalies.controller;

import com.example.modeling_of_production_anomalies.entity.Organization;
import com.example.modeling_of_production_anomalies.entity.Resource;
import com.example.modeling_of_production_anomalies.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resource")
@CrossOrigin(origins = "http://localhost:8080")
@ResponseBody
public class ResourceController {
    @Autowired
    private ResourceService resourceService;
    @GetMapping("/tree")
    public List<Resource> getTree() {
        return resourceService.resourceTree();
    }
}
