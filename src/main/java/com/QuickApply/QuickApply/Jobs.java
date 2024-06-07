package com.QuickApply.QuickApply;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private Boolean applied;
    private String Description;
    private String applicationDate;
    private String interviewDate;
    private String offerDate;
    private List<String> tags;
}
