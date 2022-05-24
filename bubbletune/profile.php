<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>bubbletune</title>
    <link rel="stylesheet" type="" href="styling/style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">
</head>
<body>
<?php include_once(__DIR__ . "/partials/nav.inc.php"); ?>

<div>
    <img class="img"  src="image/usericonb.png" alt="userIcon">
</div>

<div class="spotify-user"></div>
<div class="spotify-song"></div>

<div class="box2">
    <h2 class="noti">Notifications</h2>
    <label class="switch">
        <input type="checkbox">
        <span class="slider"></span>
    </label>
</div>
   
<div class="box2 logout" >
    <a id="logout" href="logout.php">Log out</a>
    <div class="triangle"></div>
</div>
    
</body>
<script type="module" src="profile.js"></script>
</html>