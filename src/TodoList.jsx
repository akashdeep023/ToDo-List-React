import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// uuidv4();

export default function TodoList() {
	let [todos, setTodos] = useState([
		{ task: "Sample Task", id: uuidv4(), isDone: false },
	]);
	let [newTodo, setNewTodo] = useState("");
	let [allDone, setAllDone] = useState(false);
	let [allUpper, setAllUpper] = useState(false);
	let addNewTaks = () => {
		setTodos((prevTodos) => {
			return [...prevTodos, { task: newTodo, id: uuidv4() }];
		}); //destructure todos and add newTodo value in array
		setNewTodo("");
	};
	let updateTodoValue = (event) => {
		setNewTodo(event.target.value);
	};
	let deleteTask = (id) => {
		setTodos((prevTodos) =>
			todos.filter((prevTodos) => prevTodos.id != id)
		);
	};
	let deleteAllTask = () => {
		setTodos((prevTodos) =>
			todos.filter((prevTodos) => prevTodos.id == "")
		);
	};
	let upperCaseAll = () => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => {
				if (allUpper == false) {
					//   allUpper = true;
					return {
						...todo,
						task: todo.task.toUpperCase(),
					};
				} else {
					// allUpper = false;
					return {
						...todo,
						task: todo.task.toLowerCase(),
					};
				}
			})
		);
		setAllUpper(!allUpper);
	};

	let upperCaseOne = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => {
				if (todo.id == id) {
					if (todo.task === todo.task.toUpperCase()) {
						return {
							...todo,
							task: todo.task.toLowerCase(),
						};
					} else {
						return {
							...todo,
							task: todo.task.toUpperCase(),
						};
					}
				} else {
					return todo;
				}
			})
		);
	};

	let completeTask = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => {
				if (todo.id == id) {
					return {
						...todo,
						isDone: !todo.isDone,
					};
				} else {
					return todo;
				}
			})
		);
	};
	let completeAllTask = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => {
				if (allDone == false) {
					return {
						...todo,
						isDone: true,
					};
				} else {
					return {
						...todo,
						isDone: false,
					};
				}
			})
		);
		setAllDone(!allDone);
	};

	let doneStyle = {
		textDecorationLine: "line-through",
		backgroundColor: "white",
		color: "black",
	};
	return (
		<div>
			<input
				type="text"
				placeholder="Add a task"
				value={newTodo}
				onChange={updateTodoValue}
			/>
			<br />
			<button onClick={addNewTaks}>Add Task</button>
			<br />
			<br />
			<br />
			<br />
			<hr />
			<h4>Tasks ToDo </h4>
			{/* <ul>
        {todos.map((todo) => {
          return <li>{todo}</li>;
        })}
      </ul> */}
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.isDone ? (
							<span style={doneStyle}>{todo.task}</span>
						) : (
							<span>{todo.task}</span>
						)}
						&nbsp;&nbsp;&nbsp;
						<button onClick={() => deleteTask(todo.id)}>
							Delete
						</button>
						&nbsp;
						{todo.task === todo.task.toUpperCase() ? (
							<button onClick={() => upperCaseOne(todo.id)}>
								LowerCase
							</button>
						) : (
							<button onClick={() => upperCaseOne(todo.id)}>
								UpperCase
							</button>
						)}
						&nbsp;
						{todo.isDone ? (
							<button onClick={() => completeTask(todo.id)}>
								UnComplete
							</button>
						) : (
							<button onClick={() => completeTask(todo.id)}>
								Complete
							</button>
						)}
					</li>
				))}
			</ul>
			<button onClick={deleteAllTask}>Delete All</button>
			&nbsp;
			{allUpper ? (
				<button onClick={upperCaseAll}>LowerCase All</button>
			) : (
				<button onClick={upperCaseAll}>UpperCase All</button>
			)}
			&nbsp;
			{allDone ? (
				<button onClick={completeAllTask}>UnComplete All</button>
			) : (
				<button onClick={completeAllTask}>Complete All</button>
			)}
		</div>
	);
}
