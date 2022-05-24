//---------------------------------------------------wanneer page load----------------------------------------

//token ophalen
const getTokenFromUrl = ()=>{
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item)=>{
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);

    return initial
  }, {})
}
const token = getTokenFromUrl()['access_token'];
console.log(getTokenFromUrl()['access_token']);
//create cookie met token zodat p kan verlaten worden en opnieuw bezocht worden
document.cookie = "token=" +token;

//user ophalen
fetch("https://api.spotify.com/v1/me", {
  headers: {
    "Authorization": "Bearer " + token
  }
})
.then(response => { 
  async function asyncCall(_, res) {
    const user = await response.json()
    const username = user.display_name
    const id = user.id
    // console.log(id)
    // console.log(username)
    setUser(id, username)
  }
  asyncCall();
})
.catch(err => {
  throw Boom.badRequest(err);
});

//user opslaan in db via ajax
function setUser(_id, _username){
      // console.log(_id)
      // console.log(_username)
      let id = _id;
      let username = _username

      const formData = new FormData();
      formData.append('id', id);
      formData.append('username', username);
      fetch('./ajax/save_user.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .catch(error => {
          console.error('Error:', error);
      });
}




  

//---------------------------------------wanneer radar aan/uit-----------------------------------------------


var radar = document.querySelector(".radar")
var radarOn = 0;
var watchID;

radar.addEventListener('click', function(event) {
  
  // console.log(getTokenFromUrl()['access_token'])
  if(radarOn === 0){
          document.querySelector("#layer4").style.display = "none"
          document.querySelector("#layer5").style.display = "none"
          document.querySelector(".radar").classList.remove("inactive")
          document.querySelector(".list-title").innerHTML = "Detected songs:"
          if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(showPosition, showError);
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
          //get current song (elke 30 sec)
          var currentSong = setInterval(function (){
              fetch("https://api.spotify.com/v1/me/player", {
                headers: {
                  "Authorization": "Bearer " + token
                }
              })
              .then(response => {
                async function asyncCall(_, res) {
                    const song = await response.json()
                    const isPlaying = song.is_playing
                    const title = song.item.name
                    const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
                    const album = song.item.album.name
                    const albumImageUrl = song.item.album.images[0].url
                    const songUrl = song.item.external_urls.spotify
                    setSong(title, artist, albumImageUrl)
                }
                asyncCall();
              
              })
              .catch(err => {
                throw Boom.badRequest(err);
              });
          }, 15000);
          
          

          radarOn = 1;
          console.log(1)
  }else{
          document.querySelector("#layer4").style.display = "block"
          document.querySelector("#layer5").style.display = "block"
          document.querySelector(".radar").classList.add("inactive")
          document.querySelector(".list-title").innerHTML = "Tap on the bubble radar to search songs around you"
          stopShowPosition();
          clearInterval(currentSong);
          setSong(0, 0, 0);
          const list = document.getElementById("list")
          while (list.firstChild) {
            list.firstChild.remove()
          }
          radarOn = 0;
          console.log(0)
  }

});

function setSong(_title, _artist, _albumImageUrl){
  // console.log(_title)
  // console.log(_artist)
  // console.log(_albumImageUrl)
  let title = _title;
  let artist = _artist
  let albumImageUrl = _albumImageUrl

  const formData = new FormData();
  formData.append('title', title);
  formData.append('artist', artist);
  formData.append('albumImageUrl', albumImageUrl);
  fetch('./ajax/save_song.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .catch(error => {
      console.error('Error:', error);
  });
}
    
function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);
  let latitude = position.coords.latitude;
  let longtitude = position.coords.longitude;

  const formData = new FormData();
  formData.append('latitude', latitude);
  formData.append('longtitude', longtitude);

  fetch('./ajax/save_location.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(result => {
    //li
    const list = document.getElementById("list")
		while (list.firstChild) {
 			list.firstChild.remove()
		}
    for (let i = 0; i < result.usersNearby.length; i++) {
      if(result.usersNearby[i]['song_title'] !== "0"){
      // var li = document.createElement("li");
      // li.innerHTML = result.usersNearby[i]['song_title'];
      // document.getElementById("list").appendChild(li);
      // }
      // if(result.usersNearby[i]['song_title'] !== 0){
        var box = document.createElement("div");
        box.classList.add("box")
  
        //cover
        var cover = document.createElement("img")
        cover.classList.add("song-cover")
        cover.src = result.usersNearby[i]['song_cover']
  
        //info
          var title = document.createElement("h3")
          title.innerHTML = result.usersNearby[i]['song_title']
    
          var artist = document.createElement("h4")
          artist.innerHTML = result.usersNearby[i]['song_artist']

          //emojis
          var reaction = document.createElement("div")
          reaction.classList.add("reaction")

          var emoji1 = document.createElement("div")
          emoji1.classList.add("emoji")
          emoji1.innerHTML = "👀"
          var emoji2 = document.createElement("div")
          emoji2.classList.add("emoji")
          emoji2.innerHTML = "❤️"
          var emoji3 = document.createElement("div")
          emoji3.classList.add("emoji")
          emoji3.innerHTML = "🤘"
          var emoji4 = document.createElement("div")
          emoji4.classList.add("emoji")
          emoji4.innerHTML = "🔥"

          reaction.appendChild(emoji1)
          reaction.appendChild(emoji2)
          reaction.appendChild(emoji3)
          reaction.appendChild(emoji4)
        
  
        var songInfo = document.createElement("div");
        songInfo.appendChild(title)
        songInfo.appendChild(artist)
        songInfo.appendChild(reaction)
        // songInfo.innerHTML = result.usersNearby[i]['song_title'];
  
        // var li = document.createElement("li");
        // li.appendChild(box);
        box.appendChild(cover)
  
        box.appendChild(songInfo)
  
        document.getElementById("list").appendChild(box);
      }
    }

  })
  .catch(error => {
      console.error('Error:', error);
  });
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.")
      break;
  }
}

function stopShowPosition(){
  navigator.geolocation.clearWatch(watchID)
  //0 in db loggen
  const formData = new FormData();
  formData.append('latitude', 0);
  formData.append('longtitude', 0);
  fetch('./ajax/save_location.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(result => {
    console.log("location removed")
    //css nummers wegnemen

  })
  .catch(error => {
      console.error('Error:', error);
  });
}

  