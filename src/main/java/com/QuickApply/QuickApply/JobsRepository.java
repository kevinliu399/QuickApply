package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

// Repository is used to interact with the db
@Repository
public interface JobsRepository extends MongoRepository<Jobs, ObjectId> {
}
