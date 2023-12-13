
async function fetchWeather() {
 const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Kathmandu`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "29b07914aemshbbb733b3a9594e2p15a0c0jsna427e95f6301",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const weather = document.getElementById('weatherList')
      const weatherList = document.createElement('li');
      const temperature = document.getElementById('temperature')
    temperature.textContent = `${result.temp}°C`;
    const city = document.getElementById('city');
    const dateShow = document.getElementById('dateShow');
    dateShow.textContent = new Date();
    city.textContent = userWeather;
      weatherList.textContent=new Date()
      weather.appendChild(weatherList)
      weatherList.appendChild(city)
      console.log(result);
    }catch(error){
        console.log('error while fetching data',error)
    }
}
function submitData (event){
    event.preventDefault();
    let output = document.createElement('li')
    let myForm = document.getElementById('myForms')
let parentlist = document.getElementById('myUnorderdList')
    let userInput = document.getElementById('userInput').value
if (userInput === '') {
    alert("List should not be empty")

}else{
    localStorage.setItem("list",userInput)
output.textContent = localStorage.getItem("list")
output.classList.add("myList")
parentlist.classList.add("weatherList")
parentlist.appendChild(output)
myForm.reset();
}
let deleteButton =document.createElement('button');
deleteButton.innerHTML ="Delete";
deleteButton.addEventListener('click',()=>{
localStorage.removeItem("list")
output.remove();
})
output.appendChild(deleteButton)

}
fetchWeather();