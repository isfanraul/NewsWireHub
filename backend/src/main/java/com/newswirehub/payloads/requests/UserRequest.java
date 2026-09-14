package com.newswirehub.payloads.requests;

import com.newswirehub.models.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
  private String username;

  @Size(max = 50)
  @Email
  private String email;

  private Role roles;

  private Long id;
}
