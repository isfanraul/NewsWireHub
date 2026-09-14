package com.newswirehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NewsWireHubApplication {

  public static void main(String[] args) {
    SpringApplication.run(NewsWireHubApplication.class, args);
  }
}
