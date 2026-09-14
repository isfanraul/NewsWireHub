package com.newswirehub.clients;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SitemapNewsClient {

  @Value("${sitemap.news.sources}")
  List<String> sources;

  public List<String> getSources() {
    return sources;
  }

  public String getStringResponse(String url) {
    HttpURLConnection connection = null;
    try {
      connection = (HttpURLConnection) new URL(url).openConnection();
      InputStream inputStream = connection.getInputStream();
      String text =
          new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
              .lines()
              .collect(Collectors.joining("\n"));
      return text;
    } catch (IOException e) {
      log.error("Tried to access sitemap endpoint {} with no success.", url);
      throw new RuntimeException(e);
    }
  }
}

