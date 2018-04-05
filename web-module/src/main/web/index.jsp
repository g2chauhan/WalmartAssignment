<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Walmart Web App</title>
    <link rel="icon" type="image/png" href="images/favicon.png">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <meta charset="utf-8"/>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body>
<div id="container">
    <center><h2>Walmart</h2></center>
    <br/>
    <div class="left">
        <!-- Form Begins -->
        <form>
            <h3>Search for a Product</h3>
            <label><input type="text" placeholder="Enter product name" id="form-input"/></label>
            <br/><br/>
            <input type="button" id="searchButton" value="Search"/> &nbsp&nbsp
            <button type="reset"> Reset</button>
        </form>
        <!-- Form Ends -->
    </div>
    <div class="left">
        <div id="searchResultDiv">
            <h3>Search Results</h3>
            <table>
                <thead>
                <th>Item ID</th>
                <th>Name</th>
                <th>Sale Price</th>

                <th>Customer Rating</th>
                </thead>
                <tbody id="searchResultBody">
                </tbody>
            </table>
        </div>
    </div>

    <div class="left">
        <div id="recommendedProductsResultDiv">
            <h3>Recommended Products</h3>
            <table>
                <thead>
                <th>Item ID</th>
                <th>Name</th>
                <th>Sale Price</th>

                <th>Overall Rating</th>
                </thead>
                <tbody id="recommendedProductsResultBody">
                </tbody>
            </table>
        </div>
    </div>
</div>
<div class="loading"></div>
</body>
</html>