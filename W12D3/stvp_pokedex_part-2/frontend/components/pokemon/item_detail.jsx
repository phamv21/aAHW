import React from "react";

class ItemDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            itemId: this.props.match.params.itemId
        }
    }

    componentDidUpdate(Prev) {
        if (this.props.match.params.itemId !== Prev.match.params.itemId) {
            const pId = this.props.match.params.itemId
            this.setState({ itemId: pId })

        }
    }

    render(){
       let itemInfo = null
        this.props.itemData === undefined ? itemInfo = null 
            : itemInfo = <ul>
                <h2>{this.props.itemData.name}</h2>
                <h3>Happiness: {this.props.itemData.happiness}</h3> 
                <h3>Price: ${this.props.itemData.price}</h3> 
            </ul>
            

        return(
            <div>
                {itemInfo}
            </div>
            
        )
    }
}

export default ItemDetail