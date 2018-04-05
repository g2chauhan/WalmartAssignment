package com.chauhan.dev.walmartproductsearch.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


public class SearchServlet extends HttpServlet {

    private static final String ApiKey = "b4j7c87qgxpc5nvztz3uaqur";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        PrintWriter out = response.getWriter();
        String searchUrl = "http://api.walmartlabs.com/v1/search?apiKey=" + ApiKey
            + "&query=" + request.getParameter("query");

        HttpGet searchRequest = new HttpGet(searchUrl);
        HttpClient httpClient = new DefaultHttpClient();
        HttpResponse searchResponse = httpClient.execute(searchRequest);
        String jsonResponseString = EntityUtils.toString(searchResponse.getEntity());

        JsonParser jsonParser = new JsonParser();

        JsonElement responseText = jsonParser.parse(jsonResponseString);
        JsonObject responseJsonObj = new JsonObject();
        responseJsonObj.add("searchResponse", responseText);
        out.print(responseJsonObj);
    }
}
