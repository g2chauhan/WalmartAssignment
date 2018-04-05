$(document).ready(function () {
    $("#searchButton").on('click', function () {
        $("#recommendedProductsResultBody").empty();
        $("#searchResultBody").empty();
        $("#recommendedProductsResultDiv").hide();
        $("#searchResultDiv").hide();
        window.filteredResponse = [];
        $(".loading").show();
        searchProduct();
    });
});


// search for Products
function searchProduct() {
    const query = $("#form-input").val();

    const processProductSearchResponse = function (response) {
        const jsonResponse = JSON.parse(response);
        const searchResponse = jsonResponse.searchResponse;
        if (searchResponse.totalResults === 0) {
            alert(("Item not found!"));
            return;
        } else {
            $(".loading").hide();
            $("#searchResultDiv").show();
            $.each(searchResponse.items, function (key, value) {
                let rowData = '<tr><td>' + value.itemId + '</td><td>' + value.name + '</td><td>' + value.salePrice
                    + '</td><td>' + value.customerRating + '</td></tr>';
                $('#searchResultBody').append(rowData);
            });

        }
        // selects the item ID of the first product and sends it to recommendation API
        getRecommendedProducts(searchResponse.items[0].itemId);
    };

    $.ajax({
        url: "SearchServlet",
        type: 'GET',
        data: {query: query},
        success: processProductSearchResponse,
        error: function (error) {
            console.log("Error", error);
        }
    });
}


// Gets a list of recommended products using the item ID of the first product from the search API
function getRecommendedProducts(firstSearchProductId) {

    // var url = 'http://api.walmartlabs.com/v1/nbp?apiKey=' + window.apiKey + '&itemId='
    //     + firstProductId + "&format=json&_ts=" + (new Date()).getMilliseconds();


    const processRecommendedProductsResponse = function (response) {
        const jsonResponse = JSON.parse(response);
        const recommendedProductsResponse = jsonResponse.recommendedProductsResponse;

        if (recommendedProductsResponse.length === 0) {
            alert(("No recommended products found!"));
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


        window.filteredResponse.sort(function (a, b) {
            return -parseFloat(a.averageOverallRating) + parseFloat(b.averageOverallRating);
        });
        $("#recommendedProductsResultDiv").show();
        $.each(window.filteredResponse, function (key, value) {
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

// Gets the rating of recommended products using the itemID of each recommended products
function getProductReview(recommendedProductId) {

    // Selects only the required info from the Reviews API response
    function processProductReviewResponse(response) {
        const jsonResponse = JSON.parse(response);
        const productReviewResponse = jsonResponse.productReviewResponse;

        return {
            "itemId": productReviewResponse.itemId,
            "name": productReviewResponse["name"],
            "salePrice": productReviewResponse.salePrice,
            "averageOverallRating":
            // if there is no rating info, then assuming it as zero
                !!productReviewResponse.reviewStatistics ? productReviewResponse.reviewStatistics.averageOverallRating : "0.00"
        }
    }

    $.ajax({
        url: "ProductReviewServlet",
        type: 'GET',
        data: {recommendedProductId:recommendedProductId},
        async: false,
        success: function (response) {
            /* 
                response from Reviews API is passed to checkResponse function
                which selects only the required information(product id, name, price, rating)
                and each of this info is pushed into a filteredResponse array
            */
            window.filteredResponse.push(processProductReviewResponse(response));
        },
        error: function (e) {
            console.log(e);
        }
    });
}
