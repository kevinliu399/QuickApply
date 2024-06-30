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
    public Jobs createJob(@RequestBody Jobs job, @RequestHeader("userId") ObjectId userId) {
        return jobsService.createJob(job, userId);
    }

    @GetMapping
    public List<Jobs> getAllJobs(@RequestHeader("userId") ObjectId userId) {
        return jobsService.getAllJobsByUserId(userId);
    }

    @GetMapping("/{id}")
    public Optional<Jobs> getJobById(@PathVariable ObjectId id, @RequestHeader("userId") ObjectId userId) {
        return jobsService.getJobByIdAndUserId(id, userId);
    }

    @PatchMapping("/{id}")
    public Jobs updateJob(@PathVariable ObjectId id, @RequestBody Jobs job, @RequestHeader("userId") ObjectId userId) {
        return jobsService.updateJob(id, job, userId);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable ObjectId id, @RequestHeader("userId") ObjectId userId) {
        jobsService.deleteJob(id, userId);
    }

    @GetMapping("/tags")
    public Set<String> getAllUniqueTags(@RequestHeader("userId") ObjectId userId) {
        return jobsService.getAllUniqueTagsByUserId(userId);
    }
}
