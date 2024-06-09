package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobsService {

    @Autowired
    private JobsRepository jobsRepository;

    public Jobs createJob(Jobs job) {
        return jobsRepository.save(job);
    }

    public List<Jobs> getAllJobs() {
        return jobsRepository.findAll();
    }

    public Optional<Jobs> getJobById(ObjectId id) {
        return jobsRepository.findById(id);
    }

    public List<Jobs> allJobs() {
        return null;
    }
}
