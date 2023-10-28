
let p = new Promise((resolve, reject) => {
    let a =1+2
    if (a==2) {
        resolve(a)
    } else {
        reject("It's not 2")
    }
}).catch((message) => {
    console.log("caught: "+message);
})
// .then((message) => {
//     console.log("resolved: "+message);
    
// }).catch((message) => {
//     console.log("Catched message: "+message);
// })

let pr = new Promise((resolve, reject) => {
    let b=2
    if (b==2) {
        resolve("resolved: "+b)
    } else {
        reject("Rejected: "+b)
    }
})

Promise.all([ 
    p, 
    pr

])
.then((messages) =>{ //if all resolved or caught (catch)
    console.log(messages);
}) 