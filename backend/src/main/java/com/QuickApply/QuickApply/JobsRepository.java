package com.QuickApply.QuickApply;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface JobsRepository extends MongoRepository<Jobs, ObjectId> {
    List<Jobs> findByUserId(ObjectId userId);
    Optional<Jobs> findByIdAndUserId(ObjectId id, ObjectId userId);
}
