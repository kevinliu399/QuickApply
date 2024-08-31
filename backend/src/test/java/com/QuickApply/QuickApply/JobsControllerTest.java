package com.QuickApply.QuickApply;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class JobsControllerTest {

    @Mock
    private JobsService jobsService;

    @InjectMocks
    private JobsController jobsController;

    private ObjectId userId;
    private ObjectId jobId;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        userId = new ObjectId();
        jobId = new ObjectId();
    }

    @Test
    public void testCreateJob() {
        Jobs job = new Jobs();
        job.setTitle("Software Engineer");

        when(jobsService.createJob(any(Jobs.class), eq(userId))).thenReturn(job);

        Jobs createdJob = jobsController.createJob(job, userId);

        assertNotNull(createdJob);
        assertEquals("Software Engineer", createdJob.getTitle());
        verify(jobsService, times(1)).createJob(job, userId);
    }

    @Test
    public void testGetAllJobs() {
        Jobs job1 = new Jobs();
        Jobs job2 = new Jobs();

        when(jobsService.getAllJobsByUserId(userId)).thenReturn(Arrays.asList(job1, job2));

        List<Jobs> jobs = jobsController.getAllJobs(userId);

        assertEquals(2, jobs.size());
        verify(jobsService, times(1)).getAllJobsByUserId(userId);
    }

    @Test
    public void testGetJobById() {
        Jobs job = new Jobs();
        when(jobsService.getJobByIdAndUserId(jobId, userId)).thenReturn(Optional.of(job));

        Optional<Jobs> foundJob = jobsController.getJobById(jobId, userId);

        assertTrue(foundJob.isPresent());
        verify(jobsService, times(1)).getJobByIdAndUserId(jobId, userId);
    }

    @Test
    public void testUpdateJob() {
        Jobs job = new Jobs();
        job.setTitle("Updated Title");

        when(jobsService.updateJob(eq(jobId), any(Jobs.class), eq(userId))).thenReturn(job);

        Jobs updatedJob = jobsController.updateJob(jobId, job, userId);

        assertNotNull(updatedJob);
        assertEquals("Updated Title", updatedJob.getTitle());
        verify(jobsService, times(1)).updateJob(eq(jobId), eq(job), eq(userId));
    }

    @Test
    public void testDeleteJob() {
        doNothing().when(jobsService).deleteJob(jobId, userId);

        jobsController.deleteJob(jobId, userId);

        verify(jobsService, times(1)).deleteJob(jobId, userId);
    }

    @Test
    public void testGetAllUniqueTags() {
        when(jobsService.getAllUniqueTagsByUserId(userId)).thenReturn(Set.of("Java", "Spring"));

        Set<String> tags = jobsController.getAllUniqueTags(userId);

        assertEquals(2, tags.size());
        assertTrue(tags.contains("Java"));
        assertTrue(tags.contains("Spring"));
    }
}

