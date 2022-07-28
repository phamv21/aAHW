export default class MarkerManager {
    constructor(map){
        this.map = map;
        this.markers = {}
        this.currentHighlight = null
    }
    updateMarker(benches){
        let markerIds = Object.keys(this.markers);
        let benchIds = Object.keys(benches);

        let checkArr = markerIds.concat(benchIds)

        checkArr.forEach(bId => { 

            if ( this.markers[bId] == null) {
                this.createMarkerFromBench(benches[bId])
            }

            if (bId != null && benches[bId] == null){ // delete marker not in the bench list
                this.markers[bId].setMap(null)
                delete this.markers[bId]
            }

            
            
        })
    }
    createMarkerFromBench(bench){ // if the id is not in marker - add it
        let benchId = bench.id
        if (bench.lat != null){
            let newLatLng = { lat: bench.lat, lng: bench.lng }
            let newEl = new google.maps.Marker({
                position: newLatLng,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                },
                map: this.map,
                title: bench.description
            })
            this.markers[benchId] = newEl
        }
        // bench have id, descripton and lat lng
       
        
    }
    markerHightlight(benchId){
        if (benchId == null){
            if (this.currentHighlight != null){
                this.markers[this.currentHighlight].setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png")    
            }
        }
        if (benchId != null){
            this.currentHighlight = benchId
            this.markers[benchId].setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png")
        }
        
    }
    
}