package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobsRepository extends MongoRepository<Jobs, ObjectId> {
}
