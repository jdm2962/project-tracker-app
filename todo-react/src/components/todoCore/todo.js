import React from "react";


export default class Todo extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			todo : this.props.todo.todo,
			isdone : this.props.todo.isdone,
			todoid : this.props.todo.todoid,
			isEditable : false,
			editText : this.props.todo.todo
		};

		this.inputChange = this.inputChange.bind(this);
		this.toggleEditable = this.toggleEditable.bind(this);
		this.editTextChange = this.editTextChange.bind(this);
		this.saveUpdate = this.saveUpdate.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);
	}

	inputChange(event)
	{
		let changeIsDone = this.props.changeIsDone;
		let todo = this.props.todo;
		todo.isdone = event.target.checked;
		changeIsDone(todo);
	}

	toggleEditable()
	{
		this.setState({isEditable : !this.state.isEditable});
	}

	editTextChange(event)
	{
		this.setState({editText : event.target.value});
	}

	saveUpdate()
	{
		if(this.state.todo !== this.state.editText)
		{
			this.props.updateTodo(this.state.todo, this.state.editText);
			this.setState({todo : this.state.editText});
			this.setState({isEditable : false});
		}
		else
		{
			return;
		}
	}

	deleteTodo()
	{
		let deleteTodo = this.props.deleteTodo;
		deleteTodo(this.state.todo);
	}

	moveUp()
	{
		let todo = 
		{
			todo : this.state.todo,
			isdone : this.state.isdone,
			todoid : this.state.todoid,
			isEditable : this.state.isEditable,
			editText : this.state.editText
		};
		this.props.moveTodo(todo, "up", this.state.isdone);
		this.setState({isEditable : false});
	}

	moveDown()
	{
		let todo = 
		{
			todo : this.state.todo,
			isdone : this.state.isdone,
			todoid : this.state.todoid,
			isEditable : this.state.isEditable,
			editText : this.state.editText
		};
		this.props.moveTodo(todo, "down", this.state.isdone);
		this.setState({isEditable : false});
	}


	componentDidUpdate(prevProps, prevState)
	{
		if(this.props.todo !== prevProps.todo)
		{
			let newTodo = this.props.todo.todo;
			this.setState({todo : newTodo, editText : newTodo});
		}
	}


	render()
	{
		return(
			<div id = "taskContainer">
			{
				this.state.isEditable 
				?
					<div className = "" id = "editTodo">
						<div className = "is-flex" id = "editTodoButtons">
							<button 
								className = "mr-1"
								onClick = {this.saveUpdate}>
								<span className = "icon"><i className="fas fa-save"></i></span>
							</button>
							<button onClick = {this.toggleEditable}>
								<span className = "icon"><i className="fas fa-times"></i></span>
							</button>
							<button 
								onClick = {this.deleteTodo}
								className = "deleteBtn">
								<span className = "icon"><i className="fas fa-trash-alt"></i></span>
							</button>
						</div>
						<div className = "is-flex" id = "editTodoInput">
							<textarea 
								className = "input" value = {this.state.editText}
								onChange = {this.editTextChange}/>
						</div>
					</div>
				:
					<div 
						id = "todo"
						onClick = {this.toggleEditable}>
						<label className="checkbox">
							<input 
								type = "checkbox" 
								defaultChecked = {this.props.todo.isdone} 
								onChange = {this.inputChange}/>
						</label>
						<div
							className = {this.state.isdone ? "content is-medium strike" : "content is-medium"}>
								{this.state.todo}
						</div>
					</div>
			}
			<div id = "changeOrderButtons">
				<button onClick = {this.moveUp}>
					<span className = "icon"><i className="fas fa-chevron-up"></i></span>
				</button>
				<button onClick = {this.moveDown}>
					<span className = "icon"><i className="fas fa-chevron-down"></i></span>
				</button>
			</div>
		</div>
		);
	}
}