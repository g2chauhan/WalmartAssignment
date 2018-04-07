package com.chauhan.dev.walmartproductsearch.servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectToDatabase {
    public static Connection connect() throws SQLException, ClassNotFoundException {
        Class.forName("oracle.jdbc.driver.OracleDriver");

        //URL of Oracle database server
        String url = "jdbc:oracle:thin:@129.157.218.70:1521:orcl";

        //properties for creating connection to Oracle database
        Properties props = new Properties();
        props.setProperty("user", "system");
        props.setProperty("password", "9_A3m1ss10n");

        //creating connection to Oracle database using JDBC
        return DriverManager.getConnection(url, props);
    }
}
