package com.grupp1;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Spark;

public class API {
  API(){
    this(4567);
  }
  API(int port){
    if (port != 4567)
      Spark.port(port);
    setUpEndpoints();
  }

  private void setUpEndpoints(){
    Spark.get("/hello/:name", this::hello);
    Spark.post("/register", this::register);
  }

  String hello(Request request, Response response){
    System.out.println("body: " + request.body());
    System.out.println("attributes: " + request.attributes());
    System.out.println("params: " + request.params());
    System.out.println("query: " + request.queryParams());
    System.out.println("queryg: " + request.queryParams("g"));
    return "Hello" + request.params(":name");
  }

  String register(Request req, Response res) {

    Map<String, Object> json;
    try {
      json = new ObjectMapper().readValue(req.body(), HashMap.class);

    } catch (JsonProcessingException e) {
      System.out.println("error");
      throw new RuntimeException(e);

    }

      for (Map.Entry<String, Object> lol : json.entrySet()) {
        System.out.println(lol.getKey() + " : " + lol.getValue());
        System.out.println(lol.getValue().getClass());

  /*
  firstName: "",
    lastName: "",
    email: "",
    personalNumber: "",
    userName: "",
    userPassword: "",
    confirmUserPassword: "",
    confirmationMessage: "",
   */
      }




    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    return "ble";
  }


}
