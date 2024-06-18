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

    public Jobs updateJob(ObjectId id, Jobs updatedJob) {
        Optional<Jobs> optionalJob = jobsRepository.findById(id);
        if (optionalJob.isPresent()) {
            Jobs job = optionalJob.get();
            job.setTitle(updatedJob.getTitle());
            job.setCompany(updatedJob.getCompany());
            job.setStatus(updatedJob.getStatus());
            job.setLink(updatedJob.getLink());
            job.setApplied(updatedJob.getApplied());
            job.setDescription(updatedJob.getDescription());
            job.setApplicationDate(updatedJob.getApplicationDate());
            job.setInterviewDate(updatedJob.getInterviewDate());
            job.setOfferDate(updatedJob.getOfferDate());
            job.setTags(updatedJob.getTags());
            return jobsRepository.save(job);
        } else {
            throw new RuntimeException("Job not found with id " + id);
        }
    }

    public void deleteJob(ObjectId id) {
        jobsRepository.deleteById(id);
    }
}
