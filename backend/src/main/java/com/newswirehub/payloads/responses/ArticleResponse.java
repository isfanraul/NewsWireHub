package com.newswirehub.payloads.responses;

import com.newswirehub.models.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ArticleResponse {
  private Long sitemapId;
  private Long id;
  private String loc;
  private String lastmod;
  private String channelName;
  private String title;
  private String description;
  private String thumbnail;
  private User user;
}
