//events
const form = document.querySelector('form')
    .addEventListener('submit', climateArea)

//selectors armazenados em variáveis
const input = document.querySelector('#searchInput')
const openBox = document.querySelector('.resultado')
let iconImage = document.querySelector('img')
let windDirection = document.querySelector('.ventoPonto')

//functions
async function climateArea(e){
    e.preventDefault()

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=948d61e3991ba09ec95f13976f250676&lang=pt_br`
    let response = await fetch(url)
    let json = await response.json()
    console.log(json)

    if(input.value != ''){
        
        if(json.cod === '404'){
            openBox.style.display = 'none'
            alert('Inválido: Cidade digitada inexistente,incompleta ou digitada errada e é permitido apenas o nome da cidade, sem estado')
        }else{
            openBox.style.display = 'block'
            document.querySelector('.titulo').innerHTML = json.name
            document.querySelector('.tempInfo').innerHTML = `${json.main.temp} <sup>ºC</sup>`
            document.querySelector('.ventoInfo').innerHTML= `${json.wind.speed} <span>km/h</span>`
            iconImage.setAttribute(`src`, `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
            windDirection.style.transform =  `rotate(${json.wind.deg - 90}deg)`
        }

    }else{
        openBox.style.display = 'none'
        alert('Nenhuma cidade digitada')
    }

    input.value = ""
}