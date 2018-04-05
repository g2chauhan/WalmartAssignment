package com.chauhan.dev.walmartproductsearch.servlet;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class RecommendedProductsServlet extends HttpServlet{
    private static final String ApiKey = "b4j7c87qgxpc5nvztz3uaqur";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        String recommendedProductsResponseUrl = "http://api.walmartlabs.com/v1/nbp?apiKey=" + ApiKey + "&itemId="
                + request.getParameter("firstSearchProductId") + "&format=json";

        HttpGet recommendedProductsRequest = new HttpGet(recommendedProductsResponseUrl);
        HttpClient httpClient = new DefaultHttpClient();
        HttpResponse recommendedProductsResponse = httpClient.execute(recommendedProductsRequest);
        String jsonResponseString = EntityUtils.toString(recommendedProductsResponse.getEntity());

        JsonParser jsonParser = new JsonParser();

        JsonElement responseText = jsonParser.parse(jsonResponseString);
        JsonObject responseJsonObj = new JsonObject();
        responseJsonObj.add("recommendedProductsResponse", responseText);
        out.print(responseJsonObj);
    }
}
