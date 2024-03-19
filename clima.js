
const apiImagem = "https://source.unsplash.com/1600x900/?";

const input_city= document.querySelector(".input_city")
const cidade= document.querySelector(".cidade")
const descricao= document.querySelector(".descricao")
const temperatura= document.querySelector(".temperatura")
const humidade= document.querySelector(".humidade")
const velocidade= document.querySelector(".vento")
const botao = document.querySelector(".buscar")
const icon = document.querySelector(".icon")
const pais = document.querySelector(".pais")
const pp = document.querySelector(".pp")
const max = document.querySelector(".max")
const min = document.querySelector(".min")
const bass = document.querySelector(".card-inf")
const erro = document.querySelector(".card-erro")
const erro_msg= document.querySelector(".erro_msg")
const dta = document.querySelector(".data")

const apikey = "19c0cf4d0b381dccab45206fbd1d29e0";
const apikeyFlat= "FPSXabbda7d0b7cd4bf79e9d0cd636ba21e5";

botao.onclick= (()=>{
    const  city = input_city.value
    
    if(city===""){
        alert("nao")
    }
    pegarDados(city)
    input_city.value=""
})
function mostrarDados(dados) {
    erro.style.display="none"
    bass.style.display="flex"
    cidade.innerText = dados.name
    temperatura.innerText= `${parseInt(dados.main.temp)}º` 
    max.innerText= `${dados.main.temp_max}º`  
    min.innerText= `${dados.main.temp_min}º`   
    descricao.innerText= dados.weather[0].description
    
    icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
      );
      
    humidade.innerText = `${dados.main.humidity}%`
    velocidade.innerText= `${dados.wind.speed}km/h`
    const datt= Date.now()
    const today= new Date(datt)
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    dta.innerText = `${day}-${month.toString().padStart(2, '0')}-${year}`;

    document.body.style.backgroundImage = `url("${apiImagem +dados.name}")`;

}

const pegarDados = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    if (res.ok) {
        const data = await res.json();
    
        mostrarDados(data)
        console.log(data)
       
       
    }else{
        
        bass.style.display="none"
        erro.style.display="flex"
        erro_msg.innerText= city

        
    }


  };

  const pegarDadosLocalizado = async (city) => {
   const lat=null
   const lng = null

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat= position.coords.latitude
                lng= position.coords.longitude
                console.log(lat)
                console.log(lng)
            }
        )
    }
   
   
   
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=19c0cf4d0b381dccab45206fbd1d29e0`;

    const res = await fetch(apiWeatherURL);
    if (!res.ok) {
       alert("Nome de cidade nao encontrada")}

    const data = await res.json();
    
    mostrarDados(data)
    console.log(data)
    return data;

  };





