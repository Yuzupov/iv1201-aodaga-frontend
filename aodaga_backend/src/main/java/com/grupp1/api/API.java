package com.grupp1.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupp1.Controller;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;

import static spark.Spark.before;

public class API {

  public API() {
    this(4567);
  }

  public API(int port) {
    if (port != 4567) {
      Spark.port(port);
    }
    setUpEndpoints();
    enableCORS("http://localhost:5173", "*", "content-type");
  }

  private void setUpEndpoints() {
    //Spark.get("/hello/:name", this::hello);
    Spark.post("/register", this::register);
    Spark.options("/register", this::test);
  }

  private static void enableCORS(final String origin, final String methods, final String headers) {
    before(new Filter() {
      @Override
      public void handle(Request request, Response response) throws Exception {
        response.header("Access-Control-Allow-Origin", origin);
        response.header("Access-Control-Request-Method", methods);
        response.header("Access-Control-Allow-Headers", headers);
      }
    });
  }

  String test(Request req, Response res) {
    return "ble";
  }

  String decryptString(String cipher) throws JsonProcessingException, BadApiInputException {
    Map<String, String> jsoncrypt;
    jsoncrypt = new ObjectMapper().readValue(cipher, HashMap.class);
    return Crypt.decrypt(jsoncrypt.get("cipher"), jsoncrypt.get("iv"));
  }

  String register(Request req, Response res) {

    Map<String, Object> json;
    try {
      String requestBody = req.body();
      requestBody = decryptString(requestBody);
      json = new ObjectMapper().readValue(requestBody, HashMap.class);

    } catch (JsonProcessingException e) {
      System.out.println("error");
      System.out.println(e);
      res.status(400);
      return "Malformed json:\n" + e.getMessage().substring(0, e.getMessage().indexOf("\n"))
          + "\r\n\r\n";
    } catch (Throwable e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }

    try {
      boolean success = Controller.register(json);
    } catch (BadApiInputException e) {
      res.status(400);
      return "Bad Input:\n" + e.getMessage() + "\r\n\r\n";
    } catch (ServerException e) {
      res.status(500);
      return "Internal server error:\n" + e.getMessage() + "\r\n\r\n";
    }

    return "woop woop";
  }

}
