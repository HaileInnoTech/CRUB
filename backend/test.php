<?php
$conn = mysqli_init();
mysqli_ssl_set($conn, NULL, NULL, "./DigiCertGlobalRootCA.crt.pem", NULL, NULL);
mysqli_real_connect($conn, "mysqlazuretest.mysql.database.azure.com", "hai28022002", "Matkhaulaloz02", "crud", 3306, MYSQLI_CLIENT_SSL);

?>