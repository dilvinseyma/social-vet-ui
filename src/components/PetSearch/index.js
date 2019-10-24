import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';

import {
    SEARCH_BY_NAME,
    SEARCH_BY_PETSITTER_USERNAME,
    GET_PETS
} from '../../config/path';

class PetSitterRegisteration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            pets: []
        };
    }

    handleChange = (name, e) => {
        this.setState({ [name]: e.target.value });
    };

    searchByName = () => {
        var { username, name, surName, mailAddress, phoneNumber, address } = this.state;
        fetch(SEARCH_BY_NAME, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                animalName: this.state.filter
            })
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            var tmpArray = [...data];
            this.setState({ pets: tmpArray })
            console.log('Pets: ' + this.state.pets);
        }).catch(err => {
            console.log("Error Reading data " + err);
        }).finally(() => {

        });
    }

    searchByPetSitterUserName = () => {
        fetch(SEARCH_BY_PETSITTER_USERNAME, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.filter
            })
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            var tmpArray = [...data];
            this.setState({ pets: tmpArray })
            console.log('Pets: ' + this.state.pets);
        }).catch(err => {
            console.log("Error Reading data " + err);
        }).finally(() => {

        });
    }

    showAll = () => {
        fetch(GET_PETS, {
            method: 'GET'
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            var tmpArray = [...data];
            this.setState({ pets: tmpArray })
            console.log('Pets: ' + this.state.pets);
        }).catch(err => {
            console.log("Error Reading data " + err);
        }).finally(() => {

        });
    }


    render() {
        var { pets } = this.state;
        return (
            <div>
                <div class="container">
                    <h2>Search for Pet</h2>
                    <form
                        noValidate autoComplete="on">

                        <div class="row">
                            <TextField
                                id="outlined-name"
                                label="Search"
                                value={this.state.filter}
                                onChange={(e) => this.handleChange('filter', e)}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <br />
                        <div class="row justify-content-around">
                        <div class="col-4">
                                <Button
                                    variant="contained" color="primary"
                                    onClick={this.showAll}>
                                    Show ALL
  </Button>
                            </div>
                            <div class="col-4">

                                <Button
                                    variant="contained" color="primary"
                                    onClick={this.searchByName}>
                                    Search by Name
  </Button>
                            </div>
                            <div class="col-4">

                                <Button
                                    variant="contained" color="primary"
                                    onClick={this.searchByPetSitterUserName}>
                                    Search by PetsitterUserName
  </Button>
                            </div>
                       

                        </div>
                    </form>

                </div>
                <br/>
                <div class="row">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.length > 0 ? (
                                pets.map(pet => (
                                    <tr key={pet.id}>
                                        <td>{pet.name}</td>
                                        <td>{pet.type}</td>
                                        <td>
                                            <button className="button muted-button">Edit</button>
                                            <button className="button muted-button">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                    <tr>
                                        <td colSpan={3}>No data</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PetSitterRegisteration;