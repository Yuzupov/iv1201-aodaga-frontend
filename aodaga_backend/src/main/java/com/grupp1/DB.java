package com.grupp1;
import java.sql.*;

class DB{
  static String user = "aodaga";
  static String password = "";
  static String db = "aodaga";
  static String host = "localhost";
  static String port = "5432";

    /*
  DB(){
    try{
      String url = "jdbc:postgresql://"+host+":"+port+"/"+db;
      Connection con=DriverManager.getConnection(
          url, user, password);
      Statement stmt=con.createStatement();
      ResultSet rs=stmt.executeQuery("select * from availability");
      while(rs.next())
        System.out.println(rs.getInt(1)+"  "+rs.getInt(2)+" "+rs.getString(3)+" "+rs.getString(4));
      con.close();
    }catch(Exception e){ System.out.println(e);}
  }
     */

  private static Connection getConn(){
    try {
      String url = "jdbc:postgresql://" + host + ":" + port + "/" + db;
      return DriverManager.getConnection(url, user, password);
    } catch (SQLException e) {
      System.out.println(e);
      throw new RuntimeException(e);
    }
  }
  static void createUser(String name, String surname, String pnr, String email, String password, String username){
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
      stmt.execute();
      conn.close();
    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }


  }
  public static void main(String[] args) {

    DB.createUser("ernst", "hugo", "812635", "torsten@lol.va", "lösneord", "anvnamn");
  }
}
