package com.wings.wingsuserservice.security.services;

import com.wings.wingsuserservice.models.SpecificNotice;
import com.wings.wingsuserservice.models.User;
import com.wings.wingsuserservice.payload.request.NoticeDTO;
import com.wings.wingsuserservice.repository.NoticeRepository;
import com.wings.wingsuserservice.repository.SpecificNoticeRepository;
import com.wings.wingsuserservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {

    @Autowired
    NoticeRepository noticeRepository;

    @Autowired
    SpecificNoticeRepository specificNoticeRepository;

    @Autowired
    UserRepository userRepository;

    public void createSpecificNotice (NoticeDTO noticeDTO){
        User user = new User();
        user.setId(noticeDTO.getUserId());
        SpecificNotice specificNotice = new SpecificNotice();
        specificNotice.setText_notice(noticeDTO.getText_notice());
        specificNotice.setNote(noticeDTO.getNote());
        specificNotice.setUser(user);

        specificNoticeRepository.save(specificNotice);
    }

    public void createProductNotice (NoticeDTO noticeDTO){
        SpecificNotice specificNotice = new SpecificNotice();
        specificNotice.setText_notice(noticeDTO.getText_notice());
        specificNotice.setNote(noticeDTO.getNote());
        specificNotice.setProductId(noticeDTO.getProductId());

        specificNoticeRepository.save(specificNotice);
    }
}
