package com.newswirehub.payloads.requests;

import com.newswirehub.models.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsersRequest {
  @NotBlank private Role role;
}
