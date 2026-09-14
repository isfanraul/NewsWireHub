package com.newswirehub.payloads.responses;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class SitemapResponse {
  private Long id;

  private String loc;

  private String channel;
}
