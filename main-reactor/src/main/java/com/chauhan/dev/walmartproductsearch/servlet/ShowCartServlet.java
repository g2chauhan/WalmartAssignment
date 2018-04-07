package com.chauhan.dev.walmartproductsearch.servlet;

import com.google.gson.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ShowCartServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        List<CartItem> cartItemList = new ArrayList<CartItem>();
        try {
            Connection conn = ConnectToDatabase.connect();
            String sql = "SELECT * FROM CART";

            Statement statement = conn.createStatement();
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                CartItem cartItem = new CartItem();
                cartItem.setProductId(Integer.toString(resultSet.getInt("itemId")));
                cartItem.setProductName(resultSet.getString("productName"));
                cartItem.setProductPrice(Float.toString(resultSet.getFloat("price")));
                cartItemList.add(cartItem);
            }

            conn.close();

            Gson gson = new GsonBuilder().setPrettyPrinting().create();

            String json =  gson.toJson(cartItemList);
            out.print(json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
