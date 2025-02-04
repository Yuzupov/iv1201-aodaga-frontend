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
    try {
      Connection conn = getConn();
      Statement stmt = conn.createStatement();
      StringBuilder query = new StringBuilder();
      query.append("INSERT INTO person ");
      query.append("(name, surname, pnr, email, password, username) VALUES (");
      query.append("'").append(name).append("', ");
      query.append("'").append(surname).append("', ");
      query.append("'").append(pnr).append("', ");
      query.append("'").append(email).append("', ");
      query.append("'").append(password).append("', ");
      query.append("'").append(username).append("');");
      System.out.println(query);
      stmt.execute(query.toString());
      conn.close();
    } catch (SQLException e) {
      System.out.println(e);
      throw new RuntimeException(e);
    }


  }
  public static void main(String[] args) {

    DB.createUser("ernst", "hugo", "812635", "torsten@lol.va", "lösneord", "anvnamn");
  }
}
