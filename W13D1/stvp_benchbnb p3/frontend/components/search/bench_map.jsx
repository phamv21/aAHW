import React from "react";
import MarkerManager from "../../util/maker_manager";
import {useNavigate} from 'react-router-dom'



class BenchMap extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            bounds: {}
        }
        // bind here
        this._handleClick = this._handleClick.bind(this)
        // <--
    }


    componentDidMount() {
        // set the map to show SF
        const mapOptions = {
            center: { lat: 37.7758, lng: -122.435 }, // this is SF
            zoom: 13
        };

        // wrap this.mapNode in a Google Map

        this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.MarkerManager = new MarkerManager(this.map);

        //add the listener to the map
        this.map.addListener('bounds_changed',()=>{
            let northEast = this.map.getBounds().getNorthEast();
            let southWest = this.map.getBounds().getSouthWest();
            this.setState({bounds:{northEast:{lat:northEast.lat(),lng:northEast.lng()},southWest:{lat:southWest.lat(),lng:southWest.lng()}}});
        })

        //add_click listener
        this.map.addListener('click',(mapsMouseEvent)=>{
            let coords = mapsMouseEvent.latLng
            this._handleClick(coords)
        })
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.benches != this.props.benches){
         this.MarkerManager.updateMarker(this.props.benches);
        }
        if(prevState.bounds != this.state.bounds){

            this.props.updateFilters("bounds",this.state.bounds)
        }
        if (prevProps.highlightId != this.props.highlightId){
            this.MarkerManager.markerHightlight(this.props.highlightId)
        }
    }

    _handleClick(coords) {
        this.props.navigate('benches/new', { state: { lat:coords.lat(),lng:coords.lng() },replace:true })
    }
    render(){
        
        return(
         <div id="map-container" ref={map => this.mapNode = map}>
        </div>

        )
    }
}


export default function(props){
    let navigate = useNavigate()
    return <BenchMap {...props} navigate={navigate}/>
}
