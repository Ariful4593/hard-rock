const songBtn = document.getElementById("search-btn");
const apiLink = "https://api.lyrics.ovh";
songBtn.addEventListener("click", function(e){
    var searchItem = document.getElementById("search-song").value;
    if(!searchItem)
    {
        alert("Please type a song...")
        document.getElementById("search-btn").onfocus();
    }
    else{

        fetch(`${apiLink}/suggest/${searchItem}`)
        .then(res => res.json())
        .then(data => showData(data))
            // console.log(data)
    
    const list = document.getElementById("song-list");
    function showData(data){
        let output = "";
        let outputArray = []
            data.data.forEach(song =>{   
            output += `
            <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
            <h3 class="lyrics-name">${song.artist.name}</h3>
            <p class="author lead"> Album by <span>${song.title}</span></p></div> <div class="col-md-3 text-md-right text-center"><button class="btn btn-success" data-artist ="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button></div></div>
            `;
            outputArray.push(output);
        });
        const afterSlice = outputArray.slice(9,10)
        outputArray.push(afterSlice)
        console.log(afterSlice)
        document.getElementById("song-list").innerHTML = `${afterSlice}`
    }
    document.getElementById("song-list").addEventListener("click", e =>{
        const btn = e.target;
        if(btn.tagName === 'BUTTON')
        {
            const artist = btn.getAttribute('data-artist');
            const songTitle = btn.getAttribute("data-songtitle");

            getLyrics(artist,songTitle);
        }
    })
    function getLyrics(artist, songTitle){
        fetch(`${apiLink}/v1/${artist}/${songTitle}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
            document.getElementById("song-list").innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
            `
        })
    }
    }
})
