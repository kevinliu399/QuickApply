package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jobs")
public class JobsController {

    @Autowired
    private JobsService jobsService;

    @PostMapping
    public Jobs createJob(@RequestBody Jobs job) {
        return jobsService.createJob(job);
    }

    @GetMapping
    public List<Jobs> getAllJobs() {
        return jobsService.getAllJobs();
    }

    @GetMapping("/{id}")
    public Optional<Jobs> getJobById(@PathVariable ObjectId id) {
        return jobsService.getJobById(id);
    }
}
