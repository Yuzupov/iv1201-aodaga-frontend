package com.grupp1;

import com.grupp1.api.BadApiInputException;
import com.grupp1.api.ServerException;
import java.sql.SQLException;
import java.util.Map;

public class Controller {

  public static boolean register(Map<String, Object> fields)
      throws BadApiInputException, ServerException {

    String[] expectedFields = {
        "firstName",
        "lastName",
        "personalNumber",
        "email",
        "userPassword",
        "userName"};
    String[] parsedFields = new String[6];
    int i = 0;
    for (String field : expectedFields) {
      if (fields.get(field) == null) {
        throw new BadApiInputException("missing '" + field + "' parameter");
      }
      if (fields.get(field).getClass() != String.class) {
        throw new BadApiInputException("bad '" + field + "' parameter (should be string)");
      }
      String f = (String) fields.get(field);
      if (f.length() > 255) {
        throw new BadApiInputException("'" + field + "' too long");
      }
      if (field.equals("personalNumber")) {
        if (!f.matches("\\d{8}-\\d{4}")) {
          throw new BadApiInputException("Invalid 'personalNumber' format");
        }
      }
      if (field.equals("email")) {
        //RFC 5322
        if (!f.matches(
            "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])")) {
          throw new BadApiInputException("Invalid '" + field + "' format");
        }

      }
      parsedFields[i++] = f;
    }

    try {
      DB.createUser(parsedFields[0], parsedFields[1], parsedFields[2], parsedFields[3],
          parsedFields[4], parsedFields[5]);
    } catch (SQLException e) {
      throw new ServerException(e.toString());
    }

    return true;

  }

}
