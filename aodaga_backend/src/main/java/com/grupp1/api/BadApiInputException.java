package com.grupp1.api;

public class BadApiInputException extends Exception {
  public BadApiInputException(String message) {
    super(message);
  }
}
