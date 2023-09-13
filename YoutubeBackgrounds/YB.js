require("dotenv").config()


fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCXuqSBlHAE6Xw-yeJA0Tunw&maxResults=8&order=relevance&key=[YOUR_API_KEY]")
.then((result)=> {
    const response = result.json();
    console.log(response);
    return response;
}).then((data)=>{
    if (data && data.items && Array.isArray(data.items)) {
        let videos = data.items;
        let container = document.querySelector(".Backgrounds-container")
        for (let video of videos) {
            if (video.snippet && video.snippet.title) {
                container.innerHTML+=`
                <h3 ${video.snippet.title}></h3>
                <img src="${video.snippet.thumbnails.default.url}">
                `
            }
        }
    } else {
        console.error("Invalid data structure or 'items' array is missing.");
    }
})
.catch((error) => {
    console.error("An error occurred:", error);
});