<?php
    session_start();
    
    // $_SESSION['username'] 
    // include_once(__DIR__."/classes/SpotifyWebAPI.php");
    // method 1-try
    // $spotify = new SpotifyWebAPI;
    // $spotify->setAccessToken($_COOKIE["token"]);
    // $info = $spotify->getMyCurrentPlaybackInfo();
    // echo $info;
    // var_dump($info);
    // echo $_COOKIE["token"]

    
?><!DOCTYPE html>
<html lang="en">
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
    <div class="radar location inactive">  
        <img class="noot" src="./image/noot.png" alt="music note"> 
        <div class="front"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <div class="layer4" id="layer4"></div>
        <div class="layer5" id="layer5"></div>
    </div> 
    <p class="list-title">Tap on the bubble radar to search songs around you</p>
    <div id="list">
</div>
</body>
<script type="module" src="app.js"></script>
</html>