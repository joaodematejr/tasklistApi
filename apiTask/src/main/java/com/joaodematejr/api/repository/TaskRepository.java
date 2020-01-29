package com.joaodematejr.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.joaodematejr.api.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{

}
