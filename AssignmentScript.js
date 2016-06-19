$(document).ready(function() {
    var apiKey = "b4j7c87qgxpc5nvztz3uaqur";

    var request = new XMLHttpRequest();



    $("#searchButton").on('click', function() {
        searchProduct();

    });

    $(document).keypress(function(e) {
        if (e.which == 13) {
            searchProduct();
        }
    });


})


function searchProduct() {
    var query = document.getElementById('form-input').value;
    $("#outputArea2").hide();
    
    $("#output1").empty();

    $.ajax({
        url: 'http://api.walmartlabs.com/v1/search?apiKey=b4j7c87qgxpc5nvztz3uaqur&query=' + query,

        type: 'GET',

        crossDomain: true,
        dataType: 'jsonp',
        success: function(productSearchResult) {


            //$.each(result.items, function(key, value) {
            //  var a='<tr><td><a href=\"#\" id="123" onClick=\"recommend('+value.itemId+');\">'+value.itemId+'</a></td><td>'+value.name+'</td><td>'+value.salePrice+'</td></tr>';


            //$('#output1').append(a);


            //});
            getRecommendedResponses(productSearchResult.items[0].itemId)
        }

    });
}

function getRecommendedResponses(firstProductId) {

    $("#outputArea").hide();
    $("#outputArea2").show();
    $("#output2").empty();

    $.ajax({
        url: 'http://api.walmartlabs.com/v1/nbp?apiKey=b4j7c87qgxpc5nvztz3uaqur&itemId=' + firstProductId,

        type: 'GET',
        crossDomain: true,


        dataType: 'json',

        success: function(recommendedProducts) {

            var tempJsonObject = {};
            var temp = [];
            var i = 0;
            $.each(recommendedProducts, function(key, value) {

                getProductReview(value.itemId);


            })

        },

    });
}



function getProductReview(recommendedProductId) {

    $.ajax({
        url: 'http://api.walmartlabs.com/v1/reviews/' + recommendedProductId + '?apiKey=b4j7c87qgxpc5nvztz3uaqur',

        type: 'GET',
        crossDomain: true,
        dataType: 'json',

        success: function(productReviewResponses) {


            //var sortedProductReviewResponses = sortJSON(productReviewResponses,'averageOverallRating' );
            //tempJsonObject['rating']=productReviewResponses.reviewStatistics.averageOverallRating;

            console.log(productReviewResponses.reviewStatistics.averageOverallRating);


        },
        error: function(e) {
            if (e.status == 403) {
                console.log("Request Frobidden due to multiple AJAX calls. Trying again");
                getProductReview(recommendedProductId);
            }
        }

    });
}


/*function sortJSON(data, key) {
    return data.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
*/
