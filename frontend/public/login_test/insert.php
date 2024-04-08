<?php
$username = $_POST['username']
$password = $_POST['password']

if (!empty($username) || !empty($password))
{
    $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "flannel_emo_data_db";

    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

    if (mysqli_connect_error())
    {
        die('Connect Error('. mysqli_connect_errorno().')'. mysqli_connect_error());
    }
    else
    {
        $SELECT = "SELECT user From flannel_emo_data_db Where User = ? Limit 1";
        $INSERT = "INSERT Into flannel_emo_data_db (username, password) values(?, ?)";

        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($username);
        $stmt->store_result();
        $rnum = $stmt->num_rows;
    }

    if ($rnum==0)
    {
        $stmt->close();
        $stmt = $conn->prepare($INSERT);
        $stmt->bind_param("ssssii", $username, $password);
        $stmt->execute();
        echo "New record entered"
    }
    else
    {
        echo "Someone is already using this username"
    }
    $stmt->close();
    $conn->close();
}
else
{
    echo "All fields required"
    die();
}