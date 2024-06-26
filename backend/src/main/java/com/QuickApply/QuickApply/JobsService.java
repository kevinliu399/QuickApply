package com.QuickApply.QuickApply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

    public Jobs updateJob(ObjectId id, Jobs job) {
        job.setId(id);
        return jobsRepository.save(job);
    }

    public void deleteJob(ObjectId id) {
        jobsRepository.deleteById(id);
    }

    public Set<String> getAllUniqueTags() {
        return jobsRepository.findAll()
                .stream()
                .flatMap(job -> job.getTags().stream())
                .collect(Collectors.toSet());
    }
}
