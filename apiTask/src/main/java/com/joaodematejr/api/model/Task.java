package com.joaodematejr.api.model;
import java.io.Serializable;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "task")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
public class Task implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@NotBlank
    private String title;
    private Boolean status;
    private String description;
    
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date datesCreation;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date datesEdition;
    
    
    private Date datesRemoval;
    
    
    private Date datesConclusion;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDatesCreation() {
		return datesCreation;
	}

	public void setDatesCreation(Date datesCreation) {
		this.datesCreation = datesCreation;
	}

	public Date getDatesEdition() {
		return datesEdition;
	}

	public void setDatesEdition(Date datesEdition) {
		this.datesEdition = datesEdition;
	}

	public Date getDatesRemoval() {
		return datesRemoval;
	}

	public void setDatesRemoval(Date datesRemoval) {
		this.datesRemoval = datesRemoval;
	}

	public Date getDatesConclusion() {
		return datesConclusion;
	}

	public void setDatesConclusion(Date datesConclusion) {
		this.datesConclusion = datesConclusion;
	}
    
	
	
}
