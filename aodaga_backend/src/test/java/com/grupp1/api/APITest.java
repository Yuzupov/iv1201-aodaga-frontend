package com.grupp1.api;

import java.util.HashMap;
import junit.framework.TestCase;

public class APITest extends TestCase {

  @org.junit.jupiter.api.Test
  void register() {
  }

  private class FakeRegisterObject{

    String body(){
      return  "{"
          +"\"firstName\" : \"feta\","
          +"\"lastName\" : \"ost\","
          +"\"email\" : \"feta@ost.com\","
          +"\"personalNumber\" : \"12355\","
          +"\"userName\" : \"feta\","
          +"\"UserPassword\" : \"ost\","
          +"\"confirmUserPassword\" : \"\""
          +"}";
    }
  }

  public void testRegister() {
    FakeRegisterObject req = new FakeRegisterObject();
    API api = new API(4567);
    //assertEquals("woop woop", api.register(req));
  }
}

/*
    "{"
          +"\"firstName\" : \"feta\","
          +"\"lastName\" : \"ost\","
          +"\"email\" : \"feta@ost.com\","
          +"\"personalNumber\" : \"12355\","
          +"\"userName\" : \"feta\","
          +"\"UserPassword\" : \"ost\","
          +"\"confirmUserPassword\" : \"\""
          +"}";

    */