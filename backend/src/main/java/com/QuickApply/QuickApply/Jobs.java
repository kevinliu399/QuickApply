package com.QuickApply.QuickApply;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "jobs") // specified on MongoDB
@Data // Specifies this is data
@AllArgsConstructor // Create a constructor with all the args
@NoArgsConstructor  // Create an empty constructor
public class Jobs {
    @Id
    private ObjectId id;
    private String title;
    private String company;
    private String status;
    private String link;
    private Boolean applied;
    private String Description;
    private LocalDate applicationDate;
    private LocalDate interviewDate;
    private LocalDate offerDate;
    private List<String> tags;
}
