package com.grupp1;

import com.grupp1.api.BadApiInputException;
import com.grupp1.api.ServerException;
import java.sql.SQLException;
import java.util.Map;

public class Controller {

  public static boolean register(Map<String, Object> fields)
      throws BadApiInputException, ServerException {
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
    String name = (String) fields.get("firstName");
    if (fields.get("firstName").getClass() != name.getClass()) {
      throw new BadApiInputException("bad 'firstName' parameter");
    }

    String surname = (String) fields.get("lastName");
    if (fields.get("lastName").getClass() != surname.getClass()) {
      throw new BadApiInputException("bad 'lastName' parameter");
    }

    String pnr = (String) fields.get("personalNumber");
    if (fields.get("personalNumber").getClass() != pnr.getClass()) {
      throw new BadApiInputException("bad 'personalNumber' parameter");
    }

    String email = (String) fields.get("email");
    if (fields.get("email").getClass() != email.getClass()) {
      throw new BadApiInputException("bad 'email' parameter");
    }

    String password = (String) fields.get("userPassword");
    if (fields.get("userPassword").getClass() != password.getClass()) {
      throw new BadApiInputException("bad 'userPassword' parameter");
    }

    String userName = (String) fields.get("userName");
    if (fields.get("userName").getClass() != userName.getClass()) {
      throw new BadApiInputException("bad 'userName' parameter");
    }

    try {
      DB.createUser(name, surname, pnr, email, password, userName);
    } catch (SQLException e) {
      throw new ServerException(e.toString());
    }

    return true;

  }

}
