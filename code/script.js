// this is my URl for london to start with
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ceaf4c70fd0be39496ec90e5c961cd5f&units=metric'

const apiKey = 'ceaf4c70fd0be39496ec90e5c961cd5f'
const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast'


// now the variables for filling up the information
const weatherImg = document.getElementById('weather-img')
const temperature = document.getElementById('temperature')
const currentCity = document.getElementById('city')
const weatherDescripton = document.getElementById('weather-description')

const sunset = document.getElementById('sunset')
const sunrise = document.getElementById('sunrise')

const upcommingWeather = document.getElementById('upcomming-weather')

const startCity = 'Trondheim'

const root = document.querySelector(':root')

// function for deciding the weather symbol
const symbolDecider = (weatherType, moreInfo) => {
    let imageSrc = ''
    if (weatherType == 'Clear') {
        imageSrc = './assets/sun.png'


    } else if (weatherType == 'Clouds') {
        if (moreInfo.includes('overcast')) {
            imageSrc = './assets/cloud.png'

        } else {
            imageSrc = './assets/suncloud.png'


        }

    } else if (weatherType == 'Snow') {
        imageSrc = './assets/snow.png'



    } else if (weatherType == 'Rain' | weatherType == 'Drizzle') {
        imageSrc = './assets/rain.png'


    } else if (weatherType == 'Thunderstorm') {
        imageSrc = './assets/lightning.png'

    }
    else {
        imageSrc = './assets/sun.png'

    }
    return imageSrc
}

const backgroundChanger = (weatherType, moreInfo) => {

    if (weatherType == 'Clear') {

        root.style.setProperty('--background', '#D29F94')
        root.style.setProperty('--foreground', '#FFE8E8')

    } else if (weatherType == 'Clouds') {
        if (moreInfo.includes('overcast')) {

            root.style.setProperty('--background', '#C8D1DE')
            root.style.setProperty('--foreground', '#E8E9FF')
        } else {

            root.style.setProperty('--background', '#D6B696')
            root.style.setProperty('--foreground', '#FFF8E8')

        }

    } else if (weatherType == 'Snow') {


        root.style.setProperty('--background', '#C8D1DE')
        root.style.setProperty('--foreground', '#E8E9FF')

    } else if (weatherType == 'Rain' | weatherType == 'Drizzle') {

        root.style.setProperty('--background', '#C8D1DE')
        root.style.setProperty('--foreground', '#E8E9FF')

    } else if (weatherType == 'Thunderstorm') {

        root.style.setProperty('--background', '#B8AB80')
        root.style.setProperty('--foreground', '#FFF8E8')

    }
    else {

        root.style.setProperty('--background', '#D29F94')
        root.style.setProperty('--foreground', '#FFE8E8')
    }

}
// now lets start with fetching some weather data 
const fetchWeatherData = async (city) => {
    try {
        // here I make the URL depending on which city is given
        let newURL = `${baseURL}?q=${city}&APPID=${apiKey}&units=metric`
        const response = await fetch(newURL)
        if (!response.ok) {
            throw new Error(`HTTP error: Status ${response.status}`)
        }
        const data = await response.json()

        // now I want to update the diferent fields
        // here I look for the main weather so I can update the image and the secription
        let mainWeather = data.weather[0].main
        let moreInfo = data.weather[0].description
        // here I make sure the temperature is always roundend
        let currTemp = Math.round(data.main.temp)
        // sunrise and sunset need to be transformed 
        let currentSunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let currentSunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })


        imgSource = symbolDecider(mainWeather, moreInfo)
        backgroundChanger(mainWeather, moreInfo)
        weatherImg.src = imgSource

        // I will update the inner text here as I will replace whatever data is there currently 
        weatherDescripton.innerText = moreInfo
        temperature.innerText = `${currTemp} °C`
        currentCity.innerText = city

        sunset.innerText = `Sunset: ${currentSunset}`
        sunrise.innerText = `Sunrise: ${currentSunrise}`

    } catch (error) {
        console.error('Fetch error: ', error)
        currentCity.innerText = `${city} is not valid... maybe a typo?`
    }

}



// now we fetch the data for the future days... 

const fetchForecastData = async (city) => {
    try {
        let newURL = `${forecastURL}?q=${city}&APPID=${apiKey}&units=metric`
        const response = await fetch(newURL)
        if (!response.ok) {
            throw new Error(`HTTP error: Status ${response.status}`)
        }
        const data = await response.json()

        // in the array I know need to find the same time slots so i only have one for each day 
        forecastData = data.list
        // now I make sure I only use the ones from 12:00

        rightTimeData = forecastData.filter((timePoint) => String(timePoint.dt_txt).includes('12:00:00'))

        // I have data for the next 4 extra days, so i will skip the first one.. 
        // rightTimeData.shift()

        // now I will add each day into my container
        rightTimeData.forEach((dayData) => {
            // now I create the elements that will fill the container.. I will make an overall div for each day
            let dayContainer = document.createElement('div')
            dayContainer.classList = 'day-container'
            // into the container will come the day, image and temp
            let dayWeekday = document.createElement('h3')
            let dayImg = document.createElement('img')
            let dayTemp = document.createElement('h3')

            // we can give them some classes for later styling
            dayWeekday.classList = 'day-text'
            dayTemp.classList = 'day-text'
            dayImg.classList = 'day-img'

            // now we can fill it with info
            let currDayTemp = Math.round(dayData.main.temp)
            let dayMainWeather = dayData.weather[0].main
            let dayMoreInfo = dayData.weather[0].description
            let allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let weekday = new Date(dayData.dt * 1000).getDay()

            // here we add to the elements
            dayTemp.innerText = `${currDayTemp} °C`

            dayImgSource = symbolDecider(dayMainWeather, dayMoreInfo)

            dayImg.src = dayImgSource

            dayWeekday.innerText = allDays[weekday]

            // now we add it all to the day container
            dayContainer.append(dayWeekday)
            dayContainer.append(dayImg)
            dayContainer.append(dayTemp)

            // now I make sure that I empty the container! 

            // and now we add it to the overall container 
            upcommingWeather.append(dayContainer)

        })


    } catch (error) {
        console.error('Fetch error: ', error)
        currentCity.innerText = `${city} is not valid... maybe a typo?`
    }
}

// now we make the search bar that we can actually change the city and update the page 
const searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', () => {
    // so this is the event when the button gets clicked
    cityName = document.getElementById('search-bar').value

    fetchWeatherData(cityName)

    while (upcommingWeather.hasChildNodes()) {
        upcommingWeather.removeChild(upcommingWeather.firstChild)
    }

    fetchForecastData(cityName)

    // delete the value from the search bar
    document.getElementById('search-bar').value = ''
})

// With this I can initialize the website for trondheim
fetchWeatherData(startCity)
fetchForecastData(startCity)