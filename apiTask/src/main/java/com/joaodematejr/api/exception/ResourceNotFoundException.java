package com.joaodematejr.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String resourceTitle;
    private String fieldTitle;
    private Object fieldValue;
    
    public ResourceNotFoundException( String resourceTitle, String fieldTitle, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceTitle, fieldTitle, fieldValue));
        this.resourceTitle = resourceTitle;
        this.fieldTitle = fieldTitle;
        this.fieldValue = fieldValue;
    }
    
    public String getResourceTitle() {
        return resourceTitle;
    }
    
    public String getFieldTitle() {
        return fieldTitle;
    }

    public Object getFieldValue() {
        return fieldValue;
    }
    
    
}