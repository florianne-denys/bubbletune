<?php
    class User{
        protected $username;
        protected $id;
        protected $password;
        protected $password_conf;
        protected $longtitude;
        protected $latitude;
        protected $song_title;
        protected $song_artist;
        protected $song_cover;

        public function getUsername(){
            return $this->username;
        }
        public function setUsername($username){
            if(empty($username)){
                throw new Exception("Username cannot be empty.");
            }
            $this->username = $username;
            return $this;
        }

        public function getId(){
            return $this->id;
        }
        public function setId($id){
            $this->id = $id;
            return $this;
        }

        public function newUser(){
            include_once(__DIR__."/./Db.php");
            $conn = Db::getConnection();
            $statement=$conn->prepare("select * from users where user_id = :id");
            $statement->bindValue(":id", $this->id);
            $statement->execute();
            $existingUser = $statement->fetch();
            if($existingUser){

            }
            else{
                $conn = Db::getConnection();
                $statement=$conn->prepare("insert into users(username, user_id) values (:username, :id)");
                $statement->bindValue(":username", $this->username);
                $statement->bindValue(":id", $this->id);
            }
            return $statement->execute();
            
        }

        public function getSong_title(){
            return $this->song_title;
        }
        public function setSong_title($song_title){
            $this->song_title = $song_title;
            return $this;
        }

        public function getSong_artist(){
            return $this->song_artist;
        }
        public function setSong_artist($song_artist){
            $this->song_artist = $song_artist;
            return $this;
        }

        public function getSong_cover(){
            return $this->song_cover;
        }
        public function setSong_cover($song_cover){
            $this->song_cover = $song_cover;
            return $this;
        }

        public function newSong(){
            include_once(__DIR__."/./Db.php");
            $conn = Db::getConnection();

            $statement=$conn->prepare("update users set song_title = :song_title, song_artist = :song_artist, song_cover = :song_cover where user_id = :id");
            $statement->bindValue(":song_title", $this->song_title);
            $statement->bindValue(":song_artist", $this->song_artist);
            $statement->bindValue(":song_cover", $this->song_cover);
            $statement->bindValue(":id", $this->id);
            
            return $statement->execute();
        }

        public function getLongtitude(){
            return $this->longtitude;
        }
        public function setLongtitude($longtitude){
            $this->longtitude = $longtitude;
            return $this;
        }

        public function getLatitude(){
            return $this->latitude;
        }

        public function setLatitude($latitude){
            $this->latitude = $latitude;
            return $this;
        }

        public function saveLongLat(){
            include_once(__DIR__."/./Db.php");
            $conn = Db::getConnection();

            $statement=$conn->prepare("update users set longtitude = :longtitude, latitude = :latitude where user_id = :id");
            $statement->bindValue(":longtitude", $this->longtitude);
            $statement->bindValue(":latitude", $this->latitude);
            $statement->bindValue(":id", $this->id);
            
            return $statement->execute();
        }

        public function saveSong(){
            include_once(__DIR__."/./Db.php");
            $conn = Db::getConnection();

            $statement=$conn->prepare("insert into users(username) values (:username)");
            $statement->bindValue(":username", $this->username);
            
            return $statement->execute();
        }

        public function getUsersNearby(){
            include_once(__DIR__."/./Db.php");
            $conn = Db::getConnection();

            $radius = 20;

            $statement=$conn->prepare("select * from users where (longtitude between (:longtitude - :radius) and (:longtitude + :radius))  and (latitude between (:latitude - :radius) and (:latitude + :radius)) and user_id not in ( :id)");
            $statement->bindValue(":radius", $radius);
            $statement->bindValue(":longtitude", $this->longtitude);
            $statement->bindValue(":latitude", $this->latitude);
            $statement->bindValue(":id", $this->id);
            $statement->execute();
            $usersNearby = $statement->fetchAll();
            return $usersNearby;
        }

        

        
    }