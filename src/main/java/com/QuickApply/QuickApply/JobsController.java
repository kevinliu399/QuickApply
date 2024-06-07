package com.QuickApply.QuickApply;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Repository is for the HTTP Requests
@RestController
@RequestMapping("/api/v1/jobs")
public class JobsController {
    @Autowired
    private JobsService jobsService;
    @GetMapping
    public ResponseEntity<List<Jobs>> getAllJobs() {
        return new ResponseEntity<List<Jobs>>(jobsService.allJobs(), HttpStatus.OK);
    }

}
