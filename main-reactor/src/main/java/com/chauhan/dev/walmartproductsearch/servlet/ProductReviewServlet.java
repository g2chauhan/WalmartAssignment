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

public class ProductReviewServlet extends HttpServlet {
    private static final String ApiKey = "b4j7c87qgxpc5nvztz3uaqur";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        String productReviewResponseUrl = "http://api.walmartlabs.com/v1/reviews/" + request.getParameter("recommendedProductId")
                + "?apiKey=" + ApiKey;

        HttpGet productReviewRequest = new HttpGet(productReviewResponseUrl);
        HttpClient httpClient = new DefaultHttpClient();
        HttpResponse productReviewResponse = httpClient.execute(productReviewRequest);
        String jsonResponseString = EntityUtils.toString(productReviewResponse.getEntity());

        JsonParser jsonParser = new JsonParser();

        JsonElement responseText = jsonParser.parse(jsonResponseString);
        JsonObject responseJsonObj = new JsonObject();
        responseJsonObj.add("productReviewResponse", responseText);
        out.print(responseJsonObj);
    }
}
