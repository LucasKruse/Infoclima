
const APIKey = 'b14a4f951fc5fc4cacd2a96132ae4589';

const fetchData = position => {
    const { latitude, longitude} = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp();
}
const cleanUp = () => {
    let container = document.getElementById("container");
    let loader = document.getElementById("loader");
    
    loader.style.display = 'none';
    container.style.display = 'flex';
}
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0'+ (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;
}
const onload = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}