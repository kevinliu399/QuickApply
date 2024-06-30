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

    @Autowired
    private UserRepository userRepository;

    public Jobs createJob(Jobs job, ObjectId userId) {
        job.setUserId(userId);
        Jobs savedJob = jobsRepository.save(job);
    
        // Add job ID to the user's job list
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.getJobIds().add(new ObjectId(savedJob.getId()));
        userRepository.save(user);
    
        return savedJob;
    }

    public List<Jobs> getAllJobsByUserId(ObjectId userId) {
        return jobsRepository.findByUserId(userId);
    }

    public Optional<Jobs> getJobByIdAndUserId(ObjectId id, ObjectId userId) {
        return jobsRepository.findByIdAndUserId(id, userId);
    }

    public Jobs updateJob(ObjectId id, Jobs job, ObjectId userId) {
        job.setId(id);
        job.setUserId(userId);
        return jobsRepository.save(job);
    }

    public void deleteJob(ObjectId id, ObjectId userId) {
        Optional<Jobs> job = jobsRepository.findByIdAndUserId(id, userId);
        if (job.isPresent()) {
            jobsRepository.deleteById(id);
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            user.getJobIds().remove(id);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Job not found or does not belong to the user");
        }
    }

    public Set<String> getAllUniqueTagsByUserId(ObjectId userId) {
        return jobsRepository.findByUserId(userId)
                .stream()
                .flatMap(job -> job.getTags().stream())
                .collect(Collectors.toSet());
    }
}
