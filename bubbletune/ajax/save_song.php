<?php 
    include_once(__DIR__ . "/../classes/User.php");
    session_start();
    // echo $_SESSION['userId'];
    
    if(!empty($_POST)){
        $user = new User;
        $user->setId($_SESSION["id"]);
        $user->setSong_title($_POST['title']);
        $user->setSong_artist($_POST['artist']);
        $user->setSong_cover($_POST['albumImageUrl']);
        
        $user->newSong();
        $usersNearby = $user->getUsersNearby();

        $response = [
            'status' => 'succes',
            'message' => 'User saved'
        ];

        header('Content-Type: application/json');
        echo json_encode($response);
    };

?>