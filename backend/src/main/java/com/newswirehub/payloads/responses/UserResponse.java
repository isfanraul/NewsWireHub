package com.newswirehub.payloads.responses;

import com.newswirehub.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserResponse {
  private Long id;
  private String email;
  private String username;
  private Role role;
}
