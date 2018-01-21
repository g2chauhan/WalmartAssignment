$(document).ready(function() {
    window.apiKey = "b4j7c87qgxpc5nvztz3uaqur";

    $("#searchButton").on('click', function() {

        $("#outputBody").empty();
        $("#outputAreaDiv").hide();
        window.filteredResponse = [];
        $(".loading").show();
        searchProduct();
    });
});

// search for Products
function searchProduct() {
    var query = $("#form-input").val();

    var url = 'http://api.walmartlabs.com/v1/search?apiKey=' + window.apiKey 
        + '&query=' + query + "&_ts=" + (new Date()).getMilliseconds();

    var callback = function(response) {
        if (!!response.errors) {
            alert(("No results found !"));
            return;
        }
        // selects the item ID of the first product and sends it to recommendation API
        getRecommendedResponses(response.items[0].itemId);
    }

    $.ajax({
        url: url,
        type: 'GET',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: callback
    });
}


// Gets a list of recommended products using the item ID of the first product from the search API
function getRecommendedResponses(firstProductId) {

    var url = 'http://api.walmartlabs.com/v1/nbp?apiKey=' + window.apiKey + '&itemId=' 
        + firstProductId + "&format=json&_ts=" + (new Date()).getMilliseconds();


    var callback = function(response) {
        if (!!response.errors) {
            alert(("No results found !"));
            return;
        }
        var count =0;
        $.each(response, function(key, value) {
            // considers only 10 recommended products
            if(count > 9) return;
            //for each recommended product, it sends the itemId to Reviews API for getting overall rating  
            getProductReview(value.itemId);
            count++;
        });


        window.filteredResponse.sort(function(a, b) {
            return -parseFloat(a.averageOverallRating) + parseFloat(b.averageOverallRating);
        });

        $.each(window.filteredResponse, function(key,value) {
            var a='<tr><td>' + value.itemId + '</td><td>' + value.name + '</td><td>' + value.salePrice
                + '</td><td>' + value.averageOverallRating + '</td></tr>';
            $(".loading").hide();
            $("#outputAreaDiv").show();
            $('#outputBody').append(a);
        });
    }
    
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: callback,
        error: function(error) {
            console.log("Error", error);
        }
    });
}

// Gets the rating of recommended products using the itemID of each recommended products
function getProductReview(recommendedProductId) {
    var url = 'http://api.walmartlabs.com/v1/reviews/' + recommendedProductId 
        + '?apiKey=' + window.apiKey + '&_ts=' + (new Date()).getMilliseconds();

    // Selects only the required info from the Reviews API response
    function checkResponse(response){
      return {
        "itemId":response.itemId,
        "name":response["name"],
        "salePrice":response.salePrice,
        "averageOverallRating": 
            // if there is no rating info, then assuming it as zero
            !!response.reviewStatistics ? response.reviewStatistics.averageOverallRating : "0.00"
      }
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            /* 
                response from Reviews API is passed to checkResponse function
                which selects only the required information(product id, name, price, rating)
                and each of this info is pushed into a filteredResponse array
            */
            window.filteredResponse.push(checkResponse(response));
        },
        error: function(e) {
            console.log(e);
        }
    });
}
