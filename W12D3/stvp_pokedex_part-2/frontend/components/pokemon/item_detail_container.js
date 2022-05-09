import { connect } from "react-redux";
import ItemDetail from "./item_detail";

const mapStateToProps = (state,ownprops) =>{
    const itemId = ownprops.match.params.itemId;
        return{
            itemData: state.entities.items[itemId]
        }
}
export default connect(mapStateToProps)(ItemDetail)