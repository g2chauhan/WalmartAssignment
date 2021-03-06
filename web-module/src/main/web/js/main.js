$(document).ready(function () {
    $("#searchButton").on('click', function () {
        $("#recommendedProductsResultBody").empty();
        $("#searchResultBody").empty();
        $("#messagePrint").empty();
        $("#recommendedProductsResultDiv").hide();
        $("#searchResultDiv").hide();
        window.recommendedProductsList = [];
        $(".loading").show();
        searchProduct();
    });
});

const processCartItems = function (response) {
    const jsonResponse = JSON.parse(response);
    $.each(jsonResponse, function (key, value) {
        let rowData = '<tr><td>' + value.productId + '</td><td>' + value.productName + '</td><td>' + value.productPrice
            + '</td></tr>';
        $('#cartBody').append(rowData);
    });
};

// show cart items
$(document).on('click', "button#showCart", function () {
    $.post('view-cart.php').done(function (data) {
        // const jsonData = JSON.parse(data);
        $("#cartResultDiv").show();

        $('#cartBody').html("");


        $.ajax({
            url: "ShowCartServlet",
            type: 'GET',
        }).error(function (response) {
            $("#messagePrint").html("There was an error processing your request");
        }).success(function (response) {
            processCartItems(response);
        });
    });
});

// trigger adding to cart database
$(document).on('click', "button.addToCart", function () {
    $(".loading").hide();
    const rowElement = $(this).parent().parent();
    const rowData = rowElement.children("td").map(function () {
        return $(this).text();
    }).get();

    const rowDataObj = {rowData: rowData};
    const stringRowData = JSON.stringify(rowDataObj);

    $.ajax({
        url: "AddToCartServlet",
        type: 'GET',
        data: {rowDataParam: stringRowData},
    }).done(function (response) {
        $("#messagePrint").html(response);
    })
});

// Gets the rating of recommended products using the itemID of each recommended products
function getProductReview(recommendedProductId) {

    // Selects only the required info from the Reviews API response
    function processProductReviewResponse(response) {
        const jsonResponse = JSON.parse(response);
        const productReviewResponse = jsonResponse.productReviewResponse;

        return {
            "itemId": !!productReviewResponse.itemId ? productReviewResponse.itemId : "--",
            "name": !!productReviewResponse["name"] ? productReviewResponse["name"] : "--",
            "salePrice": !!productReviewResponse.salePrice ? productReviewResponse.salePrice : "--",
            "averageOverallRating":
            // if there is no rating info, then assuming it as zero
                !!productReviewResponse.reviewStatistics ? productReviewResponse.reviewStatistics.averageOverallRating : "0.00"
        }
    }

    $.ajax({
        url: "ProductReviewServlet",
        type: 'GET',
        data: {recommendedProductId: recommendedProductId},
        async: false,
        success: function (response) {
            /*
                response from Reviews API is passed to processProductReviewResponse function
                which selects only the required information(product id, name, price, rating)
                and each of this info is pushed into a recommendedProductsList
            */
            window.recommendedProductsList.push(processProductReviewResponse(response));
        },
        error: function (e) {
            console.log(e);
        }
    });
}


// Gets a list of recommended products using the item ID of the first product from the search API
function getRecommendedProducts(firstSearchProductId) {
    const processRecommendedProductsResponse = function (response) {
        const jsonResponse = JSON.parse(response);
        const recommendedProductsResponse = jsonResponse.recommendedProductsResponse;

        if (!recommendedProductsResponse || recommendedProductsResponse.length === 0) {
            $("#messagePrint").append("No recommended products found!");
            return;
        }

        let count = 0;
        $.each(recommendedProductsResponse, function (key, value) {
            // considers only 10 recommended products
            if (count > 9) return;
            //for each recommended product, it sends the itemId to Reviews API for getting overall rating
            getProductReview(value.itemId);
            count++;
        });


        window.recommendedProductsList.sort(function (a, b) {
            return -parseFloat(a.averageOverallRating) + parseFloat(b.averageOverallRating);
        });
        $("#recommendedProductsResultDiv").show();
        $.each(window.recommendedProductsList, function (key, value) {
            let rowData = '<tr><td>' + value.itemId + '</td><td>' + value.name + '</td><td>' + value.salePrice
                + '</td><td>' + value.averageOverallRating + '</td></tr>';
            $('#recommendedProductsResultBody').append(rowData);
        });
    };

    $.ajax({
        url: "RecommendedProductsServlet",
        type: 'GET',
        data: {firstSearchProductId: firstSearchProductId},
        success: processRecommendedProductsResponse,
        error: function (error) {
            console.log("Error", error);
        }
    });
}

// search for Products
function searchProduct() {
    const searchQuery = $("#form-input").val();

    const processProductSearchResponse = function (response) {
        $(".loading").hide();
        const jsonResponse = JSON.parse(response);
        const searchResponse = jsonResponse.searchResponse;
        if (searchResponse.totalResults === 0 || searchResponse.errors) {
            $("#messagePrint").html("No products found!");
            return;
        } else {
            $("#searchResultDiv").show();
            $.each(searchResponse.items, function (key, value) {
                let customerRating = !value.customerRating ? "--" : value.customerRating;
                let rowData = '<tr><td>' + value.itemId + '</td><td>' + value.name + '</td><td>' + value.salePrice
                    + '</td><td>' + customerRating + '</td><td><button class="addToCart">Add To Cart</button></td></tr>';
                $('#searchResultBody').append(rowData);
            });

        }
        // selects the item ID of the first product and sends it to recommendation API
        getRecommendedProducts(searchResponse.items[0].itemId);
    };

    $.ajax({
        url: "SearchServlet",
        type: 'GET',
        data: {query: searchQuery},
        success: processProductSearchResponse,
        error: function (error) {
            console.log("Error: ", error);
            $(".loading").hide();
        }
    });
}




