package com.example.application.repository;

import com.example.application.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findByChatId(
            @Param("chatId") String chatId,
            Pageable pageable);

    @Query("SELECT c FROM ChatMessage c WHERE c.chatId = :chatId AND (:lastTimestamp IS NULL OR c.timestamp < :lastTimestamp)")
    Page<ChatMessage> findByChatIdAndTimestampBefore(
            @Param("chatId") String chatId,
            @Param("lastTimestamp") LocalDateTime lastTimestamp,
            Pageable pageable);

    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatId = :chatId")
    Page<ChatMessage> findMessagesByChatId(@Param("chatId") String chatId, Pageable pageable);

}
