//remove card from cards using splice after drawing it
//change "52" to cards.length 

let dealerHand = document.getElementById('dealer');
let yourHand = document.getElementById('you');

let house = [];
let hand = [];

const cards = ["Ah", "Ad", "Ac", "As",
    "2h", "2d", "2c", "2s",
    "3h", "3d", "3c", "3s",
    "4h", "4d", "4c", "4s",
    "5h", "5d", "5c", "5s",
    "6h", "6d", "6c", "6s",
    "7h", "7d", "7c", "7s",
    "8h", "8d", "8c", "8s",
    "9h", "9d", "9c", "9s",
    "10h", "10d", "10c", "10s",
    "Jh", "Jd", "Jc", "Js",
    "Qh", "Qd", "Qc", "Qs",
    "Kh", "Kd", "Kc", "Ks"];

function giveFirstCards() {
    console.log()
    for (let i = 0; i < 2; i++) {
        house[i] = cards[Math.floor(Math.random() * 52)];
        hand[i] = cards[Math.floor(Math.random() * 52)];
    }
    dealerHand.innerText = house[0] + house[1];
    yourHand.innerText = hand;
    
}
function Hit() {
    hand[hand.length] = cards[Math.floor(Math.random() * 52)];

    yourHand.innerText = hand
}

function Stay() {
    let houseNums = [];
    const faceCards = ["Jh", "Jd", "Jc", "Js", "Qh", "Qd", "Qc", "Qs", "Kh", "Kd", "Kc", "Ks", "10h", "10d", "10c", "10s"];
    const aces = ["Ah", "Ad", "Ac", "As"];

    for (let i = 0; i < house.length; i++) {
        if (faceCards.includes(house[i])) {
            houseNums[i] = 10;
            console.log(houseNums)
        }
        else if (aces.includes(house[i])) {
            houseNums[i] = 11;
        }
        else {
            let houseSplit = house[i].split("");
            houseNums[i] = parseInt(houseSplit[0]);
        }
        console.log(houseNums);
    }

    if (houseNums.length >= 2 && houseNums.reduce((sum, num) => sum + num, 0) <= 16) {
        house[house.length] = cards[Math.floor(Math.random() * 52)];
        dealerHand.innerText = house;
      } else if (houseNums.reduce((sum, num) => sum + num, 0) > hand.reduce((sum, num) => sum + num, 0)) {
        console.log("House: " + houseNums.reduce((sum, num) => sum + num, 0) + " You: " + hand.reduce((sum, num) => sum + num, 0));
        console.log("House wins");
      } else {
        console.log("You win");
      }
}
giveFirstCards();