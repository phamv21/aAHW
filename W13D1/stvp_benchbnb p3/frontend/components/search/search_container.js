import Search from "./search";
import { fetchBenches } from "../../actions/bench_actions";
import { connect } from "react-redux";
import { updateFilters,updateFilter } from "../../actions/bound_actions";
import { receiveHighlight } from "../../actions/highlight_actions";

// import { useNavigate } from "react-router-dom";
const mapStateToProps = state => {

    return {
        benches: state.entities.benches,
        bounds: state.bounds,
        filters: state.ui.filters,
        minSeating: state.ui.filters.min_seating,
        maxSeating: state.ui.filters.max_seating,
        highlightId: state.ui.highlight.benchId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchBenches: (filter) => dispatch(fetchBenches(filter)),
        updateFilters: (filter,value) => dispatch(updateFilters(filter,value)),
        updateFilter: (filter,value) => dispatch(updateFilter(filter,value)),
        receiveHighlight: benchId => dispatch(receiveHighlight(benchId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)