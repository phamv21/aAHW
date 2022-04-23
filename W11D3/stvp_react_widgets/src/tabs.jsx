import React from "react";

class Tabs extends React.Component{
    constructor(props){
        super(props)
        //
        this.state ={
           index:0
        }
        this.selectTab = this.selectTab.bind(this);
    }
    selectTab(event){
        this.setState({ index: event.currentTarget.value})

    }

    render(){
        let name = (num) =>{
            if(this.state.index === num){
                return 'active'
            }
            return ''
        }

        let titleItems = this.props.info.map((el, idx) => 
        (<li  onClick={this.selectTab}  value={idx} key={idx} className={name(idx)}>
            {el.title}
        </li>));

        let currentContent = this.props.info[this.state.index].content;
        

        return(
            <div className="tabs">
                <div className="tab-title">
                    <ul>
                        {titleItems}
                    </ul>
                </div>

                <div className="tab-content">
                <article> {currentContent}</article>
                </div>
            </div>
        )
    }
}

export default Tabs;
