//get token
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

let token = getCookie("token");




//get current user
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
    console.log(id)
    console.log(username)
    
    setUser(id, username)
  }
  asyncCall();
})
.catch(err => {
  throw Boom.badRequest(err);
});

function setUser(id, username){
    var box = document.createElement("div");
    box.classList.add("box")

    var spotifyUserTitle = document.createElement('h2')
    spotifyUserTitle.innerHTML = "Spotify user:"
    box.appendChild(spotifyUserTitle)

    var spotifyUsername = document.createElement('h4')
    spotifyUsername.innerHTML = username
    box.appendChild(spotifyUsername)

    document.querySelector(".spotify-user").appendChild(box)
}




//get current song
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

function setSong(_title, _artist, _albumImageUrl){
    var box = document.createElement("div");
    box.classList.add("box")

    //cover
    var cover = document.createElement("img")
    cover.classList.add("song-cover")
    cover.src = _albumImageUrl

    //info
        var title = document.createElement("h3")
        title.innerHTML = _title

        var artist = document.createElement("h4")
        artist.innerHTML = _artist

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

    document.querySelector(".spotify-song").appendChild(box);
      
}