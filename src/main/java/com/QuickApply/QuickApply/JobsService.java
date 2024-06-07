package com.QuickApply.QuickApply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobsService {
    @Autowired
    private JobsRepository jobsRepository;
    public List<Jobs> allJobs() {
        return jobsRepository.findAll();
    }
}
