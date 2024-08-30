package com.QuickApply.QuickApply;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.bson.types.ObjectId;

import java.util.List;

@DataMongoTest
public class JobsRepositoryTest {

    @Autowired
    private JobsRepository jobsRepository;

    @Test
    public void testFindByUserId() {
        ObjectId userId = new ObjectId();
        Jobs job = new Jobs();
        job.setUserId(userId);
        job.setTitle("Software Engineer");
        jobsRepository.save(job);

        List<Jobs> foundJobs = jobsRepository.findByUserId(userId);

        assertEquals(1, foundJobs.size());
        assertEquals("Software Engineer", foundJobs.get(0).getTitle());
    }
}

