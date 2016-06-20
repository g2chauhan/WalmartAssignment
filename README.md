# WalmartAssignment

Overview of Solution:

1. Technical Stacks:
  - Front End: HTML
  - Back End: JQuery, javascript


2. Instructions for executing the Solution
  - Install the CORS browser plugin from this link: https://goo.gl/LHChNQ
    This will allow the web application to make cross domain AJAX requests to 'api.walmart' domain
    (Additional explanation for installing this plugin is given below in the Issues/Bugs) section.
  - Open the index.html file located inside the 'Walmart-Programming-Assignment-Solution' folder in a web browser.


3. How does the application work?
  - User input is taken from the HTML document and the input value is passed to the searchProduct(). The search API call fetches the results from the server and is stored in a response.
  - The itemID of the first product is taken and is passed in the parameter for getRecommendedResponses(). The Product Recommendation API call fetches the recommended products (maximum 10) based on the product ID that was passed to it.
  - Each of this recommended product's itemID is passed to the Reviews API call.
  - From the response of Reviews API call, we select only the required information like itemID, name, sale price and averageOverallRating.
  - These responses are then sorted based on the rating using jQuery's sort function
  - The responses are appended to the div tag of the HTML and is presented to the user in a tabular format.

4. Issues/ Bugs while developing the app:
  
  - The server which responds to the API call doesn't allow all origins to fetch the data. To overcome this, I used callback function for jsonp with jQuery AJAX. However, only the search API call responses are in jsonp format while other two APIs have json responses. I also posted this issue in the Walmart Open API developer forum (https://developer.walmartlabs.com/forum/read/191239). Hence I used CORS protocol by installing a browser plugin which allows my web app to make cross domain AJAX requests.
