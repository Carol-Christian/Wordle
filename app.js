document.addEventListener('DOMContentLoaded', async function(){
    let wordle = ''

    const response = await fetch('https://wordsapiv1.p.rapidapi.com/words?random=true&letters=5', {
        headers: {
            'X-RapidAPIKey': 'a059253279msh3fb00e1564041c7p157b90jsn05ca1461f090',
            'X-Rapid-Host': 'wordsapiv1.p.rapidapi.com'
        }
    })
    
    const data = await response.json()
    wordle = data.word.toUpperCase()
    console.log(wordle)

    const input = document.querySelector('.wordInput')
    const maxRows = 6
    let currentRow = 1
    input.focus()

    input.addEventListener('input', function(){
        const letters = document.querySelectorAll('.row' + currentRow)
        const inputValue = this.value.toUpperCase()

        letters.forEach((div, index) => {
            div.innerText = inputValue[index] || ''
        })
    })
    input.addEventListener('keydown', function(event){
        if(event.key == 'Enter' && this.value.length == 5){
            const inputValue = this.value.toUpperCase()
            // Check fuction
            const letters = document.querySelectorAll('.row' + currentRow)
            letters.forEach((div,index) => {
                setTimeout(()=>{
                    div.classList.add('changeColor')
                    setTimeout(()=>{
                        if(inputValue[index] == wordle[index]){
                            div.style.backgroundColor = 'rgb(60, 138, 33)'
                        }else if(wordle.includes(inputValue[index])){
                            div.style.backgroundColor = 'rgb(193, 151, 17)'
                        }else{
                            div.style.backgroundColor = 'rgb(153, 153, 153)'
                        }
                    }, 500)
                }, index * 500)
            })
            setTimeout(()=>{
                if (currentRow < maxRows){
                    currentRow++
                    this.value = ''
                }
            })
        }
    })

    input.addEventListener('blur', function(){
        input.focus()
    })

})