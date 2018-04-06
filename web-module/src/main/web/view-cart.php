<?php
error_reporting(E_ERROR | E_PARSE);
// $array=json_decode($_POST['stringRowData']);

// $itemId = $array[0]; // productId
// $productName = $array[1];
// $price = $array[2];



// Create connection to Oracle
$tns2 = "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 129.157.218.70)(PORT = 1521)) (CONNECT_DATA = (SID = orcl)))";
   if ($conn = oci_connect("system","9_A3m1ss10n", $tns2))
   {
	   // add the product to the cart db
       $sql = "SELECT * FROM CACHEDPRODUCT";
	   $compiled = oci_parse($conn, $sql);
	   
	   oci_execute($compiled);
	   
	   while(($row = oci_fetch_array($compiled, OCI_ASSOC)) != false) {
		   $rows[] = $row;
	   }
	   
	   print json_encode($rows);
	   oci_close($conn);
   }
   else
   {
       die("There was a problem displaying the products of the cart. Please try again later.");
   }
?>