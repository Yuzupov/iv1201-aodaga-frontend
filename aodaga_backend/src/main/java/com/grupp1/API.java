package com.grupp1;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;

import static spark.Spark.before;

public class API {
  API(){
    this(4567);
  }
  API(int port){
    if (port != 4567)
      Spark.port(port);
    setUpEndpoints();
    enableCORS("http://localhost:5173", "*", "content-type");
  }

  private void setUpEndpoints(){
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

  /*
  String hello(Request request, Response response){
    System.out.println("body: " + request.body());
    System.out.println("attributes: " + request.attributes());
    System.out.println("params: " + request.params());
    System.out.println("query: " + request.queryParams());
    System.out.println("queryg: " + request.queryParams("g"));
    return "Hello" + request.params(":name");
  }
   */

  String test(Request req, Response res){
    return "ble";
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

    return "ble";
  }


}
