package com.chauhan.dev.walmartproductsearch.servlet;


import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Statement;
import java.util.ArrayList;

public class AddToCartServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();

        String rowData = request.getParameter("rowDataParam");

        try {
            JSONObject rowDataObj = new JSONObject(rowData);
            JSONArray rowDataArr = rowDataObj.getJSONArray("rowData");
            ArrayList<String> rowDataList = new ArrayList<String>();
            if (rowDataArr != null) {
                for (int i = 0; i < rowDataArr.length(); i++) {
                    rowDataList.add(rowDataArr.getString(i));
                }
            }
            String productId = rowDataList.get(0);
            String productName = rowDataList.get(1);
            String productPrice = rowDataList.get(2);


            //creating connection to Oracle database using JDBC
            Connection conn = ConnectToDatabase.connect();

            String sql = "INSERT INTO CART VALUES('" + productId + "','" + productName + "','" + productPrice + "')";

            Statement statement = conn.createStatement();
            statement.executeQuery(sql);
            out.print("Added to cart!");
            conn.close();
        } catch (Exception e) {
            if (e instanceof SQLIntegrityConstraintViolationException) {
                out.print("Product already added to cart!");
            }
        }
    }
}
