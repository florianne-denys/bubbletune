<?php 
    include_once(__DIR__ . "/../classes/User.php");
    session_start();
    // echo $_SESSION['userId'];
    
    if(!empty($_POST)){
        $user = new User;
        $user->setUsername($_POST['username']);
        $user->setId($_POST['id']);
        $_SESSION["id"]=$_POST['id'];
        $user->newUser();

        $response = [
            'status' => 'succes',
            'message' => 'User saved'
        ];

        header('Content-Type: application/json');
        echo json_encode($response);
    };

?>