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
<body >
   
    <?php include_once(__DIR__ . "/partials/nav.inc.php"); ?>
    <div class="link">
        <a class="link-name" href="onlinespace.php">onlinespace</a>
        <a class="link-name" href="message.php">messages</a>
    </div>

    <label class="switch-btn">
            <input type="checkbox">
            <span class="slider-btn" ></span>
    </label> 
    <div class="interactions">
    <h2 id="inter">New interactions</h2>
    
    <div>
        <img class="img-useronline" src="image/useronline1.svg" alt="MonstaX">
        <h1 class="username">@Maddadisys</h1>
        <p class="text">reacted to a song you were listening to</p>
    </div>
        
    <h2 id="inter">Interactions</h2>
    
    <div >
        <img class="img-useronline"  src="image/useronline2.svg" alt="MonstaX">
        <h1 class="username">@GuitaristPanet</h1>
        <p class="text">Sent you a reaction</p>
        <div id="interaction-1"></div>
    </div>
        
    <div>
        <img class="img-useronline"  src="image/useronline3.svg" alt="MonstaX">
        <h1  class="username">@Felicomni</h1>
        <p   class="text">is currently listening to this song:</p>
    
        <div class="box">
            <img class="song-cover" src="https://i.scdn.co/image/ab67616d0000b27388e3cda6d29b2552d4d6bc43" alt="Adele">
            <div>
                <h3>Easy on me</h3>
                <h4>Adele</h4>
                <div class="reaction">
                    <div class="emoji">👀</div>
                    <div class="emoji">❤️</div>
                    <div class="emoji">🤘</div>
                    <div class="emoji">🔥</div>
                </div>
            </div>
        </div>
    </div>

    
</body>
</html>