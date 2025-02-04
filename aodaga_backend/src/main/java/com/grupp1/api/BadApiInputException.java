package com.grupp1.api;

public class BadApiInputException extends RuntimeException {
  public BadApiInputException(String message) {
    super(message);
  }
}
