import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link className="btn btn-info  btn-sm" to={"/edit/"+props.exercise._id}>edit</Link> | <button className="btn btn-danger btn-sm" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
    </td>
  </tr>
)

export default class ExerciseList extends Component {
	constructor(props){
		super(props);
		this.state = { excercises: [] };

		this.deleteExercise = this.deleteExercise.bind(this);
	}

	componentDidMount(){
		axios.get('http://localhost:3001/exercises')
		.then((response) => {
				this.setState({ excercises: response.data });
		}).catch(err => console.log(err));
	}

	deleteExercise(id){
		axios.delete('http://localhost:3001/exercises/delete/' + id)
		.then(res => console.log(res));

			this.setState({ 
				excercises: this.state.excercises.filter(ele => ele._id !== id)
			});
	}
	exerciseList(){
		return this.state.excercises.map(currentExercise => {
			return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>
		})
	}

	render() {
		return (
			 <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
		);
	}
}
