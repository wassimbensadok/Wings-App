package com.wings.wingsuserservice.repository;

import com.wings.wingsuserservice.models.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
