package com.example.application.repository;

import com.example.application.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(Long senderId, Long recipientId);

    @Query("SELECT DISTINCT cr.chatId FROM ChatRoom cr")
    List<String> findDistinctChatIds();

}