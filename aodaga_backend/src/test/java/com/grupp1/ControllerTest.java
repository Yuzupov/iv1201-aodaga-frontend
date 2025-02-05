package com.grupp1;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.grupp1.api.BadApiInputException;
import com.grupp1.api.ServerException;
import java.util.HashMap;
import java.util.Map;
import junit.framework.TestCase;
import com.fasterxml.jackson.databind.ObjectMapper;
public class ControllerTest extends TestCase {


  /**
   * what to test for in register():
   * 1. missing fields
   * 2. null fields
   * 3. 0 < length of fields < 255 chars
   * 4. personal number format
   * 5. email format
   * 6. that input is string
   * @throws JsonProcessingException
   * @throws BadApiInputException
   * @throws ServerException
   */
  public void testRegisterMissingField() throws JsonProcessingException{
    String missingFieldJson = "{"
        +"\"firstName\" : \"feta\","
        +"\"lastName\" : \"ost\","
        +"\"email\" : \"feta@ost.com\","
        +"\"personalNumber\" : \"12345588-9876\","
        +"\"userName\" : \"feta\","
        +"\"confirmUserPassword\" : \"\""
        +"}";

    ObjectMapper objectMapper = new ObjectMapper();

    Map<String, Object> map = objectMapper.readValue(missingFieldJson, HashMap.class);

    try{
      Controller.register(map);
      fail("Expected exception was not thrown");
    }
    catch (Exception e){
      assertEquals(BadApiInputException.class, e.getClass());
      String message = e.getMessage();
      assertEquals("missing 'userPassword' parameter", message);
    }
  }
  public void testRegisterNullField() throws JsonProcessingException {
    String nullFielsJson = "{"
        + "\"firstName\" : \"feta\","
        + "\"lastName\" : \"ost\","
        + "\"email\" : \"feta@ost.com\","
        + "\"personalNumber\" : \"12345588-9876\","
        + "\"userName\" : \"feta\","
        + "\"UserPassword\" : null,"
        + "\"confirmUserPassword\" : \"\""
        + "}";

    ObjectMapper objectMapper = new ObjectMapper();

    Map<String, Object> map = objectMapper.readValue(nullFielsJson, HashMap.class);

    try{
      Controller.register(map);
      fail("Expected exception was not thrown");
    }
    catch (Exception e){
      assertEquals(BadApiInputException.class, e.getClass());
      String message = e.getMessage();
      assertEquals("missing 'userPassword' parameter", message);
    }
  }

  public void testRegisterEmptyStringField() throws JsonProcessingException {
    String emptyFirstNameStringJson = "{"
        +"\"firstName\" : \"\","
        +"\"lastName\" : \"ost\","
        +"\"email\" : \"feta@ost.com\","
        +"\"personalNumber\" : \"12345588-9876\","
        +"\"userName\" : \"feta\","
        +"\"UserPassword\" : \"ost\","
        +"\"confirmUserPassword\" : \"\""
        +"}";

    ObjectMapper objectMapper = new ObjectMapper();

    Map<String, Object> map = objectMapper.readValue(emptyFirstNameStringJson, HashMap.class);

    try{
      Controller.register(map);
      fail("Expected exception was not thrown");
    }
    catch (Exception e){
      assertEquals(BadApiInputException.class, e.getClass());
      String message = e.getMessage();
      assertEquals("'firstName' too short", message);
    }
  }
  public void testRegisterTooLongField() throws JsonProcessingException {
    String tooLongLastNameJson = "{"
        +"\"firstName\" : \"feta\","
        +"\"lastName\" : \"ostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostostost\","
        +"\"email\" : \"feta@ost.com\","
        +"\"personalNumber\" : \"12345588-9876\","
        +"\"userName\" : \"feta\","
        +"\"UserPassword\" : \"ost\","
        +"\"confirmUserPassword\" : \"\""
        +"}";

    ObjectMapper objectMapper = new ObjectMapper();

    Map<String, Object> map = objectMapper.readValue(tooLongLastNameJson, HashMap.class);

    try{
      Controller.register(map);
      fail("Expected exception was not thrown");
    }
    catch (Exception e){
      assertEquals(BadApiInputException.class, e.getClass());
      String message = e.getMessage();
      assertEquals("'lastName' too long", message);
    }
  }
  public void testRegisterWrongTypeField() throws JsonProcessingException {
    String lastNameNotStringJson = "{"
        +"\"firstName\" : \"feta\","
        +"\"lastName\" : 18274,"
        +"\"email\" : \"feta@ost.com\","
        +"\"personalNumber\" : \"12345588-9876\","
        +"\"userName\" : \"feta\","
        +"\"UserPassword\" : \"ost\","
        +"\"confirmUserPassword\" : \"\""
        +"}";

    ObjectMapper objectMapper = new ObjectMapper();

    Map<String, Object> map = objectMapper.readValue(lastNameNotStringJson, HashMap.class);

    try{
      Controller.register(map);
      fail("Expected exception was not thrown");
    }
    catch (Exception e){
      assertEquals(BadApiInputException.class, e.getClass());
      String message = e.getMessage();
      assertEquals("bad 'lastName' parameter (should be string)", message);
    }
  }
  public void testRegisterWrongPersonalNumberFormatField() throws JsonProcessingException {
    String wrongPersonalNumberFormatJson = "{"
        +"\"firstName\" : \"feta\","
        +"\"lastName\" : \"ost\","
        +"\"email\" : \"feta@ost.com\","
        +"\"personalNumber\" : \"123455\","
        +"\"userName\" : \"feta\","
        +"\"UserPassword\" : \"ost\","
        +"\"confirmUserPassword\" : \"\""
        +"}";

    ObjectMapper objectMapper = new ObjectMapper();

    Map<String, Object> map = objectMapper.readValue(wrongPersonalNumberFormatJson, HashMap.class);

    try{
      Controller.register(map);
      fail("Expected exception was not thrown");
    }
    catch (Exception e){
      assertEquals(BadApiInputException.class, e.getClass());
      //String message = e.getMessage();
      //assertEquals("invalid 'lastName' too long", message);
    }
  }
  public void testRegisterWrongEmailFormatField() throws JsonProcessingException {
    String badEmailJson = "{"
        +"\"firstName\" : \"feta\","
        +"\"lastName\" : \"ost\","
        +"\"email\" : \"feta@ost\","
        +"\"personalNumber\" : \"12345588-9876\","
        +"\"userName\" : \"feta\","
        +"\"UserPassword\" : \"ost\","
        +"\"confirmUserPassword\" : \"\""
        +"}";

    ObjectMapper objectMapper = new ObjectMapper();

    Map<String, Object> map = objectMapper.readValue(badEmailJson, HashMap.class);

    try{
      Controller.register(map);
      fail("Expected exception was not thrown");
    }
    catch (Exception e){
      assertEquals(BadApiInputException.class, e.getClass());
      //String message = e.getMessage();
      //assertEquals("invalid 'lastName' too long", message);
    }
  }
  public void testRegister() throws JsonProcessingException, BadApiInputException, ServerException {
    String okJson = "{"
        +"\"firstName\" : \"feta\","
        +"\"lastName\" : \"ost\","
        +"\"email\" : \"feta@ost.com\","
        +"\"personalNumber\" : \"12345588-9876\","
        +"\"userName\" : \"feta\","
        +"\"UserPassword\" : \"ost\","
        +"\"confirmUserPassword\" : \"\""
        +"}";

    ObjectMapper objectMapper = new ObjectMapper();

    Map<String, Object> map = objectMapper.readValue(okJson, HashMap.class);

    try {
      assertTrue(Controller.register(map));
    }
    catch (Exception e){
      fail("Exception was thrown");
    }
  }
}