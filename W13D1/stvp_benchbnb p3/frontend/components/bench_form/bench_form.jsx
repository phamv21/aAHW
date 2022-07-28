import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

class BenchForm extends React.Component {

    constructor(props){
        super(props)
        // asign the default val
        let xlat = ''
        let xlng = ''
        if(this.props.location.state != null){
            xlat = this.props.location.state.lat;
            xlng = this.props.location.state.lng
        }
        this.state = {
                seating: 0,
                description: '',
                lat: xlat,
                lng: xlng,
                photo: null,
                photoUrl:''

        }


        // bind here
        this.handleDescription = this.handleDescription.bind(this);
        this.handleLat = this.handleLat.bind(this);
        this.handleLng = this.handleLng.bind(this);
        this.handleNumSeat = this.handleNumSeat.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        //<==
    }

    handleNumSeat(event){
        event.preventDefault();
        this.setState({seating:event.target.value})
    
    }

    handleDescription(event){

        event.preventDefault();
        this.setState({ description: event.target.value })
    }

    handleLat(event){

        event.preventDefault();
        this.setState({ lat: parseFloat(event.target.value) })
    }

    handleLng(event){

        event.preventDefault();
        this.setState({ lng: parseFloat(event.target.value) })
        console.log(this.state.lng)
    }
    handlePhoto(e){
        e.preventDefault();
        //
        const fileReader = new FileReader();
        const photo = e.target.files[0]
        fileReader.onloadend =()=>{
            this.setState({photo:photo,photoUrl:fileReader.result})
        }
        //
        if (photo){
            fileReader.readAsDataURL(photo)
        }else{
            this.setState({photoUrl:'',photo:null})
        }
        // this.setState({ photo: e.target.files[0] })

    }

     handleSubmit(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('bench[description]',this.state.description)
        formData.append('bench[lat]',this.state.lat)
        formData.append('bench[lng]',this.state.lng)
        formData.append('bench[seating]',this.state.seating)
        formData.append('bench[photo]',this.state.photo)

        this.props.submit(formData)
        this.props.navigate('/')
    
    }

    render(){
            let preview = this.state.photo == null ? null : <img className="thumb" src={this.state.photoUrl}/>
        return(
            <form onSubmit={this.handleSubmit} className='bench-form'>
                <input type="number" placeholder="Number of seat" className="form_input" onChange={this.handleNumSeat} value={this.state.seating}  />
                <input type="text" placeholder="Description" className="form_input" onChange={this.handleDescription} value={this.state.description} />
                <input type="text" placeholder="Lattitude" className="form_input" onChange={this.handleLat} value={this.state.lat} />
                <input type="text" placeholder="Longtitude" className="form_input" onChange={this.handleLng} value={this.state.lng} />
                <input type="file" accept="image/*" multiple={false} onChange={this.handlePhoto} src="" alt="" />
                {preview}
                <input type="submit" value="Submit" />
                <button onClick={(e)=>{e.preventDefault(); this.props.navigate('/') }}>Back</button>
            </form>
        )
    }

}

export default function(props){
    let location = useLocation();
    let navigate = useNavigate();
    return <BenchForm {...props} location={location} navigate={navigate} />
}