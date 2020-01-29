package com.joaodematejr.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joaodematejr.api.exception.ResourceNotFoundException;
import com.joaodematejr.api.model.Task;
import com.joaodematejr.api.repository.TaskRepository;

@RestController
@RequestMapping("/api/task")
public class TaskController {
	
	@Autowired
	TaskRepository taskRepository;
	
	// LISTAR TODOS
	@GetMapping
	public List<Task> listAll() {
	    return taskRepository.findAll();
	}
	
	// LISTAR POR ID
	@GetMapping(path = "/{id}")
	public Task getTaskById(@PathVariable(value = "id") Long taskId) {
	    return taskRepository.findById(taskId) .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
	}
	
	// CRIAR 
	@PostMapping
	public Task create(@Valid @RequestBody Task task) {
	    return taskRepository.save(task);
	}
	
	//ATUALIZAR
	@PutMapping(path = "/{id}")
	public Task update(@PathVariable(value = "id") Long taskId,
            @Valid @RequestBody Task taskDetails) {

		Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

		task.setTitle(taskDetails.getTitle());
		task.setDescription(taskDetails.getDescription());

		Task updatedTask = taskRepository.save(task);
		return updatedTask;
	}

	//DELETAR
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") Long taskId) {
	    Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
	    taskRepository.delete(task);
	    
	    return ResponseEntity.ok().build();
	}
	

}
