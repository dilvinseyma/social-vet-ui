import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';

import { Button } from '@material-ui/core';

import {
  ANIMAL_TYPES,
  SAVE_ANIMAL,
} from '../../config/path';


class PetRegiteration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: props.edit,
      pet: props.pet,
      petId: '',
      name: '',
      age: '',
      description: '',
      animalTypes: [],
      type: '',
      genus: '',
      petSitterUsername: '',
      petSitterId: '',
      open: false,
      snackbarMessage: ''
    };
    // this.redirectToLogin = this.redirectToLogin.bind(this);
    // this.onSend = this.onSend.bind(this);
    // this.generateSignature = this.generateSignature.bind(this);
  }
  componentDidMount() {
    this.getAnimalTypes();

    if(this.state.edit){
      this.setState({
        petId: this.state.pet.id,
        name: this.state.pet.name,
        age: this.state.pet.age,
        description: this.state.pet.description,
        type : this.state.pet.type,
        genus: this.state.pet.genus,
        petSitterUsername: this.state.pet.petSitterUsername
      });
    }
  }

  handleChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  getAnimalTypes = () => {
    fetch(ANIMAL_TYPES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      console.log(response);
      return response.json();
    }).then(data => {
      console.log(data);
      this.setState({ animalTypes: data })
    }).catch(err => {
      console.log("Error Reading data " + err);
    }).finally(() => {

    });
  }

  saveAnimal = () => {
    var { petId,name, type, genus, age, description, petSitterUsername } = this.state;

    fetch(SAVE_ANIMAL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: petId,
        name: name,
        type: type,
        genus: genus,
        age: age,
        description: description,
        petSitterUsername: petSitterUsername
      })
    }).then(response => {
      console.log(response);
      return response.json();
    }).then(data => {
      console.log(data);
      this.setState({ open: true, snackbarMessage: 'Animal saved successfully' })
    }).catch(err => {
      console.log("Error Reading data " + err);
    }).finally(() => {

    });
  }

  snackbarHandleClose = () => {
    this.setState({ open: false });
  }

  render() {


    return (
      <div class="container" style = {{backgroundColor: "white",padding: '20px'}}>
        <h2>{this.state.edit ? 'Edit the Pet' : 'Register A Pet'}</h2>
        <form
          //className={this.props.classes.container} 
          noValidate autoComplete="off">
          <div class="row">
            <TextField
              id="outlined-name"
              label="Name"
              //className={classes.textField}
              value={this.state.name}
              onChange={(e) => this.handleChange('name', e)}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div class="row">
            <TextField
              id="outlined-name"
              label="Age"
              //className={classes.textField}
              value={this.state.age}
              onChange={(e) => this.handleChange('age', e)}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div class="row">
            <TextField
              id="outlined-name"
              label="Description"
              //className={classes.textField}
              value={this.state.description}
              onChange={(e) => this.handleChange('description', e)}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div class="row">
            <FormControl variant="outlined"
            //className={this.props.classes.formControl}
            >
              <InputLabel htmlFor="age-label-placeholder">
                Animal Type
        </InputLabel>
              <Select
                value={this.state.type}
                onChange={(e) => this.handleChange('type', e)}
                inputProps={{
                  name: 'type',
                  id: 'type-label-placeholder',
                }}
                displayEmpty
                name="type"
                autoWidth={true}
                style={{ width: '50px' }}
              //className={this.props.classes.selectEmpty}
              >
                {this.state.animalTypes.map(type => <option value={type.id}>{type.name}</option>)}
              </Select>
            </FormControl>
          </div>
          <div class="row">
            <TextField
              label="Genus"
              //className={classes.textField}
              value={this.state.genus}
              onChange={(e) => this.handleChange('genus', e)}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div class="row">
            <TextField
              label="PetSitter Username"
              //className={classes.textField}
              value={this.state.petSitterUsername}
              onChange={(e) => this.handleChange('petSitterUsername', e)}
              margin="normal"
              variant="outlined"
            />
          </div>
          <br />
          <div class="row">
            <Button
              variant="contained" color="primary"
              onClick={this.saveAnimal}>
              SAVE
</Button>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.open}
          onClose={this.snackbarHandleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />
      </div>

    );
  }
}

export default PetRegiteration;