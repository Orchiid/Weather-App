/* Global Variables */
const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const date = document.querySelector('#date');
const feelings = document.querySelector('#feelings');
const feel = document.querySelector('.feeling');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
const weather = document.querySelector('#weather');
const city = document.querySelector('#city');
const feelsLike = document.querySelector('#feelsLike');
const humidity = document.querySelector('#humidity');
const visibility = document.querySelector('#visibility');
const wind = document.querySelector('#wind');
const icon = document.querySelector('.icon');
const server = " http://127.0.0.1:8000";
// Personal API Key for OpenWeatherMap API
const key ='&appid=ad23211db6d8c42d81929bab02584b55&units=imperial'
const zipExample ='api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}';
const baseURI ='https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString(); 

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', (e) => {
    e.preventDefault();
    const genURL = `${baseURI}${zip.value}${key}`;
    const addData = server + "/add"
    const allData = server + "/all"
    getData(genURL)
    .then((data) => {
        projectData(data)
        .then((docs) => {
            postData(addData, docs)
            .then((data) => {
                sortData(allData)
                .then((data) => {
                    updateData(data);
                })
            });
        });
    });
});

/* Function called by event listener */
async function getData(urL) {
    try {
        const response = await fetch(urL);
        const input = await response.json();
        if (input.cod == 200) {
            console.log(input);
            return input;
        } else {
            console.log(input.message);
        }

    } catch (error) {
        console.log(error);
    }
}

/* Function to GET Web API Data*/
async function projectData(data) {
    try {
        if (data.cod != 200) {
            return data;
        } else {
            const fact = {
                date: newDate,
                feelings: feelings.value,
                temp: Math.round(data.main.temp),
                weather: data.weather[0].description,
                country: data.sys.country,
                city: data.name,
                feelsLike:  data.main.feels_like,
                humidity: data.main.humidity,
                visibility: data.visibility,
                wind: data.wind.speed,
                icon:data.weather[0].icon,
            };
            console.log(fact);
            return fact;
        }
    } catch (error) {
        console.log(error);
    }
}

/* Function to POST data */
async function postData(url = '', data = {}) {
    try {
        const info = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        });
        return info;
    } catch (error) {
        console.log(error);
    }
}

/* Function to retrieve data */
async function sortData(url) {
    const data = await fetch(url);
    try {
        const response = await data.json();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    };

}

/* Function to update data */
async function updateData(data) {
    const response = await data;
    if (response.date) {
        date.innerHTML = response.date;
        temp.innerHTML = response.temp + '°';
        content.innerHTML = 'Feelings:' + response.feelings ? response.feelings : 'How are you doing today?';
        weather.innerHTML = response.weather;
        feelsLike.innerHTML = 'Feels Like' + ' ' + response.feelsLike + '°' ;
        humidity.innerHTML = 'Humidity' + ' ' + response.humidity + '%';
        visibility.innerHTML = 'Visibility' + ' ' + response.visibility  + 'm';
        wind.innerHTML = 'Wind' + ' ' + response.wind + 'mph';
        icon.innerHTML = city.innerHTML = response.city + ", " + response.country + `<img src="https://openweathermap.org/img/w/${response.icon}.png"/>`;
    } else {
        document.querySelector('error').innerHTML = response.message;
    }
}







