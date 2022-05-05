import React from "react";


//title body edit

export default class TodoEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.todo.id,
            title: this.props.todo.title,
            body: this.props.todo.body,
            done: this.props.todo.done
        };
        this.titleTodo = this.titleTodo.bind(this);
        this.bodyTodo = this.bodyTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.uniqueId = this.uniqueId.bind(this);

    }
    ///
    uniqueId() {
        return new Date().getTime()
    }

    titleTodo(event) {
        this.setState({ title: event.currentTarget.value })
    }
    bodyTodo(event) {
        this.setState({ body: event.currentTarget.value })
    }
    editTodo(event) {

        event.preventDefault();
        // this.props.receiveTodo(this.state)
        this.props.patchTodo(this.state);
    }

    render() {
        return (
            <form action="" className="todo-form form">
                <label>
                    Title:
                    <input className="input" type="text" name="" id="" onChange={this.titleTodo} value={this.state.title} />
                </label>
                <label>
                    Body:
                    <textarea className="input" type="text" name="" id="" onChange={this.bodyTodo} value={this.state.body} />
                </label>
                <input className="create-list" type="submit" name="" id="" onClick={this.editTodo} value='Edit List' />
            </form>
        );
    }
}

