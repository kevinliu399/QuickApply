package com.QuickApply.QuickApply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


// Service is used as a middleman for the business logic
@Service
public class JobsService {
    @Autowired // We use it for dependency injection -> inject a dependency into a class without the need to configure it
    private JobsRepository jobsRepository;
    public List<Jobs> allJobs() {
        return jobsRepository.findAll();
    }
}
