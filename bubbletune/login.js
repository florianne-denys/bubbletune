const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:8888/bubbletune/index.php";
// const redirectUri = "http://localhost:8888/bubbletune/index.php";
const clientId = "";
const scopes =["user-read-playback-state"];

const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
document.querySelector(".spotify-btn").addEventListener("click", function(event){
    console.log("spotify")
    console.log(loginUrl)
    window.location.replace(loginUrl)
})
