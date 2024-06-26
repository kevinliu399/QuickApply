package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    @PatchMapping("/{id}")
    public Jobs updateJob(@PathVariable ObjectId id, @RequestBody Jobs job) {
        return jobsService.updateJob(id, job);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable ObjectId id) {
        jobsService.deleteJob(id);
    }

    @GetMapping("/tags")
    public Set<String> getAllUniqueTags() {
        return jobsService.getAllUniqueTags();
    }
}
