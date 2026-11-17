package com.villagechef.backend.service;

import com.villagechef.backend.dto.ContactDTO;
import java.util.List;

public interface ContactService {
    ContactDTO saveContactMessage(ContactDTO contactDTO);
    List<ContactDTO> getAllContactMessages();
}
