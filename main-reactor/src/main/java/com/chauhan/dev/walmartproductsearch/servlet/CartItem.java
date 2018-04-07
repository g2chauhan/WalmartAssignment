package com.chauhan.dev.walmartproductsearch.servlet;

public class CartItem {
    private String productId;
    private String productName;
    private String productPrice;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(String productPrice) {
        this.productPrice = productPrice;
    }


    public String toString() {
        return String.format("itemId:%s,productName:%s,price:%s", productId, productName, productPrice);
    }
}
