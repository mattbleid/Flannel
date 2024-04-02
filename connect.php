<?php
$user = filter_input(INPUT_POST, 'nameField');
$pass = filter_input(INPUT_POST, 'passField');

if (!empty($user))
{
    echo $user;
}
?>