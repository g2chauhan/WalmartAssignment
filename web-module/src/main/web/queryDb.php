<?php

$data = $_POST['rowData'];
// Create connection to Oracle
$conn = oci_connect("system", "9_A3m1ss10n", "//129.157.218.70/orcl");
if (!$conn) {
    $m = oci_error();
    echo $m['message'], "\n";
    exit;
}
else {
    print "Connected to Oracle!";
}

$query = 'select * from CACHEDPRODUCT';
$stid = oci_parse($conn, $query);
$r = oci_execute($stid);

print '$r';

// Close the Oracle connection
oci_close($conn);
?>