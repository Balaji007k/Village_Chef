package com.villagechef.backend.controller;

import com.villagechef.backend.dto.ContactDTO;
import com.villagechef.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactDTO> submitContactMessage(@RequestBody ContactDTO contactDTO) {
        ContactDTO savedMessage = contactService.saveContactMessage(contactDTO);
        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ContactDTO>> getAllMessages() {
        List<ContactDTO> messages = contactService.getAllContactMessages();
        return ResponseEntity.ok(messages);
    }
}
