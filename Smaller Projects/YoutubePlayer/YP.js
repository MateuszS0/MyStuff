
fetch("https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCXuqSBlHAE6Xw-yeJA0Tunw&maxResults=10&key=AIzaSyC37wwFilzh7wEqffTg7dlUTM3BwmIherM")
.then((result => {
    const response = result.json();
    console.log(response);
    return response;
})).then((data)=> {
    if (data) {
        let videos = data.items
        let container = document.querySelector("video-container")
        for (let video in videos) {
            if (video.snippet) {
                container.innerHTML += video.snippet
            }
        }
    }
})



// .then((result)=> {
//     const response = result.json();
//     console.log(response);
//     return response;
// }).then((data)=>{
//     if (data && data.items && Array.isArray(data.items)) {
//         let videos = data.items;
//         let container = document.querySelector(".Backgrounds-container")
//         for (let video of videos) {
//             if (video.snippet && video.snippet.title) {
//                 container.innerHTML+=`
//                 <h3 ${video.snippet.title}></h3>
//                 <img src="${video.snippet.thumbnails.default.url}">
//                 `
//             }
//         }
//     } else {
//         console.error("Invalid data structure or 'items' array is missing.");
//     }
// })
// .catch((error) => {
//     console.error("An error occurred:", error);
// });