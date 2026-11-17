package com.villagechef.backend.service.impl;

import com.villagechef.backend.dto.ContactDTO;
import com.villagechef.backend.entity.Contact;
import com.villagechef.backend.repository.ContactRepository;
import com.villagechef.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public ContactDTO saveContactMessage(ContactDTO contactDTO) {
        Contact contact = mapToEntity(contactDTO);
        Contact savedContact = contactRepository.save(contact);
        return mapToDTO(savedContact);
    }

    @Override
    public List<ContactDTO> getAllContactMessages() {
        return contactRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ContactDTO mapToDTO(Contact contact) {
        return ContactDTO.builder()
                .id(contact.getId())
                .name(contact.getName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .message(contact.getMessage())
                .createdAt(contact.getCreatedAt())
                .build();
    }

    private Contact mapToEntity(ContactDTO dto) {
        return Contact.builder()
                .id(dto.getId())
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .message(dto.getMessage())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}
