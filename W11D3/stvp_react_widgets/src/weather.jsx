import React from 'react';
import APIKey from './api_key';


const getLoc =()=>{
    let loc = {}
    navigator.geolocation.getCurrentPosition((position) => loc = position.coords)
    return loc
}




export default class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            weather: {}
        };
        this.getData = this.getData.bind(this);
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.getData)  
    }


    //
     getData=(loc)=>{
         let that = this;

        let request = new XMLHttpRequest();
        request.open('GET',`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=${APIKey.openWeather}`, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                let data =JSON.parse(request.response);
                that.setState({weather:data});
            } else {
                // We reached our target server, but it returned an error
                console.log('unresponded server')
            }
        };

        request.onerror = function () {
            console.log('error in getting data')
            // There was a connection error of some sort
        };

        return request.send();
    }


    //





    render(){
        let data = this.state.weather;
        let content = (<div></div>)
        if(Object.keys(data).length===0){content = (<h1>Loading...</h1>)}
        else{
            let temp = parseInt(data.main.temp) - 272;
            let place = data.name;
            let description = data.weather[0].description;

            content = (<div>
            <ul>
                <li>
                    <p>Place:</p>
                </li>                   
                <li>
                    <p>{place}</p>
                </li>
            </ul>

            <ul>
                <li>
                    <p>Temperature:</p>
                </li>
                <li>
                    <p>{temp} Celcius</p>
                </li>
            </ul>
            <ul>
                <li>
                    <p>Description:</p>
                </li>
                <li>
                    <p>{description}</p>
                </li>
            </ul>
            </div>)
        }

       
        
        return(<div className='weather'>
                <h1>Weather</h1>
                {content}
        </div>);
    }
}