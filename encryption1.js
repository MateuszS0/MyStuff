const input = document.querySelector('[data-input]')
const output = document.querySelector('[data-output]')
const key = document.querySelector('[data-key]')
const btn = document.querySelector('[data-process]')

let Key = 1
let Input = " "
let temp = ['']
let tempAr = ['']
let nr = [0]
let string = [" "]
let result = ""

btn.addEventListener('click',()=>{
    Key = key.value
    Key = parseInt(Key)
    Input = input.value
    char = Array.from(Input)
    for (let i = 0; i<input.value.length; i++) {
        temp[i] = char[i]
        nr[i] = temp[i].charCodeAt(0)
        nr[i] = nr[i] + Key
        while (nr[i] > 122)
            {
            nr[i] -= 26
        }
        string[i] = String.fromCharCode(nr[i])
        result += string[i]
        result = result.toUpperCase()
        output.value = result
    }
    /*console.log(temp)
    console.log(tempAr)
    console.log(nr)*/
    result = ""
})