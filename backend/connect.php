<?php
$user = filter_input(INPUT_POST, 'username');
$pass = filter_input(INPUT_POST, 'password');

if (!empty($user))
{
    if (!empty($pass))
    {
        $host = "localhost";
        $dbusername = "root";
        $dbpassword = "";
        $dbname = "flannelemotiondata";

        // Create connection
        $conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);
        
        if (mysqli_connect_error())
        {
            die('Connect Error ('. mysqli_connect_error() .') '
            . mysqli_connect_error());
        }
        else
        {
            $sql = "INSERT INTO account (username, password)
            values ('$username', '$password')";
        }
    }
    else
    {
        echo "Password shouldn't be empty";
        die();
    }
}
else
{
    echo "Username shouldn't be empty";
    die();
}
?>