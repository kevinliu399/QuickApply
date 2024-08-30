package com.QuickApply.QuickApply;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.bson.types.ObjectId;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class JobsServiceTest {

    @Mock
    private JobsRepository jobsRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private JobsService jobsService;

    private ObjectId userId;
    private ObjectId jobId;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        userId = new ObjectId();
        jobId = new ObjectId();
    }

    /* 
    @Test
    public void testCreateJob() {
        Jobs job = new Jobs();
        job.setTitle("Software Engineer");

        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(jobsRepository.save(any(Jobs.class))).thenReturn(job);

        Jobs savedJob = jobsService.createJob(job, userId);

        assertNotNull(savedJob);
        assertEquals("Software Engineer", savedJob.getTitle());
        verify(jobsRepository, times(1)).save(job);
        verify(userRepository, times(1)).save(user);
    }*/

    @Test
    public void testGetAllJobsByUserId() {
        Jobs job1 = new Jobs();
        Jobs job2 = new Jobs();

        when(jobsRepository.findByUserId(userId)).thenReturn(Arrays.asList(job1, job2));

        List<Jobs> jobs = jobsService.getAllJobsByUserId(userId);

        assertEquals(2, jobs.size());
        verify(jobsRepository, times(1)).findByUserId(userId);
    }

    @Test
    public void testGetJobByIdAndUserId() {
        Jobs job = new Jobs();
        when(jobsRepository.findByIdAndUserId(jobId, userId)).thenReturn(Optional.of(job));

        Optional<Jobs> foundJob = jobsService.getJobByIdAndUserId(jobId, userId);

        assertTrue(foundJob.isPresent());
        verify(jobsRepository, times(1)).findByIdAndUserId(jobId, userId);
    }

    @Test
    public void testUpdateJob() {
        Jobs job = new Jobs();
        job.setTitle("Updated Title");

        when(jobsRepository.save(job)).thenReturn(job);

        Jobs updatedJob = jobsService.updateJob(jobId, job, userId);

        assertNotNull(updatedJob);
        assertEquals("Updated Title", updatedJob.getTitle());
        verify(jobsRepository, times(1)).save(job);
    }

    /* 
    @Test
    public void testDeleteJob() {
        Jobs job = new Jobs();
        job.setId(jobId);

        User user = new User();
        user.setId(userId);
        user.setJobIds(Arrays.asList(jobId));

        when(jobsRepository.findByIdAndUserId(jobId, userId)).thenReturn(Optional.of(job));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        jobsService.deleteJob(jobId, userId);

        verify(jobsRepository, times(1)).deleteById(jobId);
        verify(userRepository, times(1)).save(user);
    }
    */

    @Test
    public void testGetAllUniqueTagsByUserId() {
        Jobs job1 = new Jobs();
        job1.setTags(Arrays.asList("Java", "Spring"));

        Jobs job2 = new Jobs();
        job2.setTags(Arrays.asList("Spring", "MongoDB"));

        when(jobsRepository.findByUserId(userId)).thenReturn(Arrays.asList(job1, job2));

        Set<String> tags = jobsService.getAllUniqueTagsByUserId(userId);

        assertEquals(3, tags.size());
        assertTrue(tags.contains("Java"));
        assertTrue(tags.contains("Spring"));
        assertTrue(tags.contains("MongoDB"));
    }
}
