package com.grupp1;

import com.grupp1.api.BadApiInputException;
import com.grupp1.api.ServerException;
import java.sql.SQLException;
import java.util.List;
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
      String f = (String) fields.get(field);
      if (fields.get(field) == null) {
        throw new BadApiInputException("missing '" + field + "' parameter");
      } else if (fields.get(field).getClass() != String.class) {
        throw new BadApiInputException("bad '" + field + "' parameter (should be string)");
      } else if (f.length() > 255) {
        throw new BadApiInputException("'" + field + "' too long");
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
