package com.newswirehub.repositories;

import com.newswirehub.models.Sitemap;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SitemapRepository extends JpaRepository<Sitemap, Long> {
  Optional<Sitemap> findByLoc(String loc);

  Optional<Sitemap> findByChannel(String channel);
}
