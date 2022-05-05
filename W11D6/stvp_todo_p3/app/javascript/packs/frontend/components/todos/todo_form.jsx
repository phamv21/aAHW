import React from "react";


//title body submit

export default class TodoForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            // id: this.uniqueId(),
            title:'',
            body: '',
            done: false,
            tag_name:'',
            tag_names:[]
        };
        this.titleTodo = this.titleTodo.bind(this);
        this.bodyTodo = this.bodyTodo.bind(this);
        this.submitTodo =this.submitTodo.bind(this);
        this.uniqueId = this.uniqueId.bind(this);
        this.getTag = this.getTag.bind(this);
        this.addTag = this.addTag.bind(this);
    }
    ///
    uniqueId() { 
        return new Date().getTime()
    }

    titleTodo(event){
        this.setState({ title:event.currentTarget.value})
    }
    bodyTodo(event){
        this.setState({ body: event.currentTarget.value })
    }
    submitTodo(event){

        event.preventDefault();
        // this.props.receiveTodo(this.state)
        this.props.createTodo(this.state).then((respn) => this.setState({  title: '', body: '',tag_name: '',tag_names: [] }));
    }
    getTag(event){
        this.setState({tag_name:event.currentTarget.value})

    }

    addTag(event){
        event.preventDefault();
        let nextTags = this.state.tag_names;
        nextTags.push(this.state.tag_name);
        this.setState({tag_names:nextTags});
        this.setState({tag_name:''});
    }

    render(){
        let tag_buttons = this.state.tag_names.map((tag,idx)=>(
            <button key={idx} type="button" className="tag-btn"> {tag}</button>
        ))


        return(
            <form action="" className="todo-form form">
                <label>
                    Title:
                    <input className="input" type="text" name="" id="" onChange={this.titleTodo} value={this.state.title}/>
                </label>
                <label>
                    Body:
                    <textarea className="input"  type="text" name="" id="" onChange={this.bodyTodo} value={this.state.body}/>
                </label>
                {/* tags */}
                <label>
                    Tags:
                    <input className="input" type="text" name="" id="" onChange={this.getTag} value={this.state.tag_name} />
                </label>
                <input className="create-list" type="submit" name="" id="" onClick={this.addTag} value='Add Tag' />
                {/* tags arrea */}
                <div className="tags">
                    {tag_buttons}
                </div>
                

                <input className="create-list"  type="submit" name="" id="" onClick={this.submitTodo} value='New List'/>

            </form>
            );
    }
}

