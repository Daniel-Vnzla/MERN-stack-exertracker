import React, { Component } from 'react';
import DatePicker from 'react-datepicker'; //Biblioteca del componente fecha para react
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; //Biblioteca para hacer peticiones a la base de datos

export default class CreateList extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			description: '',
			duration: 0,
			date: new Date(),
			users: []
		};

		this.onChangeUserData = this.onChangeUserData.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

	}
  // Mostrar los usurios cuando la app este montada 
	componentDidMount(){
		axios.get('http://localhost:3001/users')
		.then((response) => {
			if (response.data.length > 0) {
				this.setState({
					users: response.data.map(user => user.username), //Pedir los usuarios
					username: response.data[0].username //establecer al estado el prmero usuarie del array
				})
			}
		}	);
	}

  // Manejar los datos del formulario 
	onChangeUserData(e){
		const { name , value } = e.target;
		this.setState({ [name]: value });
	}
  // Fecha
	onChangeDate(date){
		this.setState({ date });
	}
  // Enviar formulario con los datos
	async onSubmit(e){
		e.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date
		}

		await axios.post('http://localhost:3001/exercises/add', exercise);

		console.log(exercise);
		window.location = '/';
	}

	render() {
		const { username, description, duration, date} = this.state;
		
		return (
			 <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
          		ref="userInput"
          		name="username"
              required
              className="form-control"
              value={username}
              onChange={this.onChangeUserData}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  
          		type="text"
          		name="description"
              required
              className="form-control"
              value={description}
              onChange={this.onChangeUserData}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              name="duration"
              className="form-control"
              value={duration}
              onChange={this.onChangeUserData}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
         		  <DatePicker
              selected={date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
		);
	}
}
