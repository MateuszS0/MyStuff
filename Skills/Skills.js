//add a fancy level up animation
//add switching backgrounds ? animation/keyframes
//add progress bar animation ?
//Work in progress
let btn5 = document.querySelectorAll('[data-btn5]')
let btn25 = document.querySelectorAll('[data-btn25]')
let btn100 = document.querySelectorAll('[data-btn100]')
let btnD = document.querySelectorAll('[data-btnD]')
let pText = document.querySelectorAll('[data-PText]')
let progressBars = document.querySelectorAll('[data-ProgressBar]')
let progressBarLevel = document.querySelector('[data-ProgressBarLevel]')
let levelHtml = document.querySelector('[data-Level]') 

if (localStorage.getItem('SkillsStorage') == 1) {
    console.log("Local storage has already been set")
}
else {
console.log("Setting Local Storage")
localStorage.setItem('Html_Css', 50)
localStorage.setItem('Html_CssExp', 0)
localStorage.setItem('Javascript', 50)
localStorage.setItem('JavascriptExp', 0)
localStorage.setItem('Frameworks', 50)
localStorage.setItem('FrameworksExp', 0)
localStorage.setItem('Java', 50)
localStorage.setItem('JavaExp', 0)
localStorage.setItem('Cpp', 50)
localStorage.setItem('CppExp', 0)
localStorage.setItem('PHP', 50)
localStorage.setItem('PHPExp', 0)
localStorage.setItem('SkillsStorage', 1)
console.log("Local Storage has been set")
}

//why parseInt for EXP
let Html_Css = parseInt(localStorage.getItem('Html_Css'))
let Html_CssExp = parseInt(localStorage.getItem('Html_CssExp'))
let Javascript = parseInt(localStorage.getItem('Javascript'))
let JavascriptExp = parseInt(localStorage.getItem('JavascriptExp'))
let Frameworks = parseInt(localStorage.getItem('Frameworks'))
let FrameworksExp = parseInt(localStorage.getItem('FrameworksExp'))
let Java = parseInt(localStorage.getItem('Java'))
let JavaExp = parseInt(localStorage.getItem('JavaExp'))
let Cpp = parseInt(localStorage.getItem('Cpp'))
let CppExp = parseInt(localStorage.getItem('CppExp'))
let PHP = parseInt(localStorage.getItem('PHP'))
let PHPExp = parseInt(localStorage.getItem('PHPExp'))
//variables and arrays
statNameArr = ['Html_Css','Javascript','Frameworks','Java','Cpp','PHP']
statArr = [Html_Css,Javascript,Frameworks,Java,Cpp,PHP]
statExpNameArr = ['Html_CssExp','JavascriptExp','FrameworksExp','JavaExp','CppExp','PHPExp']
let statExpArr = [Html_CssExp,JavascriptExp,FrameworksExp,JavaExp,CppExp,PHPExp]
statsToHTML()
let expRequiredHelper = 1 //levels
const expRequired =[] //exp required for every level
for (let i=1;i<201;i++) { //how much experience is needed for each level
    expRequired[i] = parseInt(expRequiredHelper*Math.log10(expRequiredHelper)/4*10) 
    expRequiredHelper++
}
let level
let levelExp 
LevelUp() //initial calculation for Level
levelHtml.innerText = parseInt(level) 
LevelUp()

let statExpArrPercentage = [] //the percentage also WIDTH of progress bars
for (i=0;i<statExpNameArr.length;i++) {
    progressBars[i] = i
    expRefresh(i)
    addToBar(i)
}
let buttonHelper=0 //incremented in btn.foreach to number them
btn5.forEach(buttons5 => { //runs it for all buttons (6times)
    buttons5[buttonHelper] = buttonHelper
    buttonHelper++
    buttons5.addEventListener('click',()=>{
        for(i=0;i<statExpNameArr.length;i++){
        if (i==buttons5[i]) //dont use console.log inside
            statExpArr[i] = statExpArr[i] +5
            expRefresh() //might not need the first one in each
            expCheck()
            expRefresh()
    }
})
})
buttonHelper =0
btn25.forEach(buttons25 => {
    buttons25[buttonHelper] = buttonHelper
    buttonHelper++
    buttons25.addEventListener('click',()=>{
        for(i=0;i<statExpNameArr.length;i++){
        if (i==buttons25[i]) //checks which button was pressed
            statExpArr[i] = statExpArr[i] +25
            expRefresh()
            expCheck()
            expRefresh()
    } 
})
})
buttonHelper=0
btn100.forEach(buttons100 => {
    buttons100[buttonHelper] = buttonHelper
    buttonHelper++
    buttons100.addEventListener('click',()=>{ 
        for(i=0;i<statExpNameArr.length;i++){
        if (i==buttons100[i]) 
            statExpArr[i] = statExpArr[i] +100
            expRefresh()
            expCheck()
            expRefresh()
    } 
})
})
buttonHelper=0
btnD.forEach(buttonsD => {
    buttonsD[buttonHelper] = buttonHelper
    buttonHelper++
    buttonsD.addEventListener('click',()=>{
        for(i=0;i<statExpNameArr.length;i++){
        if (i==buttonsD[i]) //checks which button was pressed
            statArr[i] = statArr[i] -1
            expRefresh()
            expCheck()
            expRefresh()
    } 
})
})
buttonHelper=0
for(i=0;i<statExpArr.length;i++) { //refreshes exp in progress bar
pText[i].innerText = statExpArr[i]+"/"+expRequired[statArr[i]]
}
function statsToHTML(i=0){ //puts all stats in their place in html
    let stats = document.querySelectorAll('[data-stats]')
    stats = Array.from(stats) 
    stats.forEach(()=> {     
            stats[i].innerText = statArr[i]
            i++
    })
    }
function expCheck(){ //checks if there's enough experience for an attribute to level up after pressing the + exp buttons
    for (j=0; j<statExpArr.length;j++) { 
    if (statExpArr[i] >= expRequired[statArr[i]])  {
        statExpArr[i] = statExpArr[i] - expRequired[statArr[i]]
        statArr[i]++
        LevelUp()
        }   
        statsToHTML()
        }   
    }
    function expRefresh() { //refreshes experience on progress bar and in local storage
        localStorage.setItem(statExpNameArr[i],statExpArr[i])
        localStorage.setItem(statNameArr[i], statArr[i])
        pText[i].innerText = statExpArr[i]+"/"+expRequired[statArr[i]]
        statExpArrPercentage[i] = Math.round(statExpArr[i]/expRequired[statArr[i]]*100)
        addToBar()
    }

    function LevelUp() { //calculates Level and updates LevelHtml
        level = (statArr[0]+statArr[1]+statArr[2]+statArr[3]+statArr[4]+statArr[5])/statArr.length
        levelExp = (level % 1)
    levelExp = parseFloat(levelExp.toPrecision(4))
    progressBarLevel.style.width = Math.round(levelExp*100) + "%" //refresh level progress bar
    if (level % 1==0) {
        level = parseInt(level)
    levelHtml.innerText = level
    }
    }

function addToBar() { //Progress bar movement
    if (statExpArrPercentage >= 100) {
    } else {
        progressBars[i].style.width = statExpArrPercentage[i] + "%";
    }
}

