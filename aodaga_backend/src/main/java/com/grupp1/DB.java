package com.grupp1;

import java.sql.*;

class DB {

  static String user = "aodaga";
  static String password = "";
  static String db = "aodaga";
  static String host = "localhost";
  static String port = "5432";

  private static Connection getConn() throws SQLException {
    String url = "jdbc:postgresql://" + host + ":" + port + "/" + db;
    return DriverManager.getConnection(url, user, password);
  }

  static void createUser(String name, String surname, String pnr, String email, String password,
      String username)
      throws SQLException {
    String query = "INSERT INTO person (name, surname, pnr, email, password, username) " +
        "VALUES (?, ?, ?, ?, ?, ?)";
    try {

      Connection conn = getConn();
      PreparedStatement stmt = conn.prepareStatement(query);
      stmt.setString(1, name);
      stmt.setString(2, surname);
      stmt.setString(3, pnr);
      stmt.setString(4, email);
      stmt.setString(5, password);
      stmt.setString(6, username);

      System.out.println(query);
      if (!stmt.execute()) {
        throw new SQLException("Unknown SQL Error");
      }

      conn.close();
    } catch (SQLException e) {
      e.printStackTrace();
      throw e;
    }


  }
}
