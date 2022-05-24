<?php 
    include_once(__DIR__ . "/../classes/User.php");
    session_start();
    // echo $_SESSION['userId'];
    
    if(!empty($_POST)){
        $user = new User;
        $user->setId($_SESSION['id']);
        $user->setLongtitude($_POST['longtitude']);
        $user->setLatitude($_POST['latitude']);
        $user->saveLongLat();
        $usersNearby = $user->getUsersNearby();

        $response = [
            'status' => 'succes',
            'usersNearby' => $usersNearby,
            'message' => 'Location saved'
        ];

        header('Content-Type: application/json');
        echo json_encode($response);
    };

?>