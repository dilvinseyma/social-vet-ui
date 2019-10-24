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
    SAVE_PETSITTER
  } from '../../config/path';

class PetSitterRegisteration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            name:'',
            surName:'',
            mailAddress:'',
            phoneNumber:'',
            address:'',
            open: false,
            snackbarMessage: ''
        };
    }

    handleChange = (name, e) => {
        this.setState({ [name]: e.target.value });
      };

    savePetSitter = () => {
        var { username,name, surName, mailAddress, phoneNumber, address } = this.state;
        fetch(SAVE_PETSITTER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              name: name,
              surName: surName,
              mailAddress: mailAddress,
              phoneNumber: phoneNumber,
              address: address
            })
          }).then(response => {
            console.log(response);
            return response.json();
          }).then(data => {
            console.log(data);
            this.setState({ open: true, snackbarMessage: 'PetSitter saved successfully' })
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
        <div class="container">
          <h2>Register A PetSitter</h2>
          <form
            noValidate autoComplete="on">
            <div class="row">
            <TextField
                id="outlined-name"
                label="Username"
                value={this.state.username}
                onChange={(e) => this.handleChange('username', e)}
                margin="normal"
                variant="outlined"
              />
              </div>
              <div class = "row">
              <TextField
                id="outlined-name"
                label="Name"
                value={this.state.name}
                onChange={(e) => this.handleChange('name', e)}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div class = "row">
              <TextField
                id="outlined-name"
                label="Surname"
                value={this.state.surName}
                onChange={(e) => this.handleChange('surName', e)}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div class="row">
              <TextField
                id="outlined-name"
                label="MailAddress"
                //className={classes.textField}
                value={this.state.mailAddress}
                onChange={(e) => this.handleChange('mailAddress', e)}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div class="row">
              <TextField
                id="outlined-name"
                label="PhoneNumber"
                value={this.state.phoneNumber}
                onChange={(e) => this.handleChange('phoneNumber', e)}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div class="row">
              <TextField
                id="outlined-name"
                label="Address"
                value={this.state.address}
                onChange={(e) => this.handleChange('address', e)}
                margin="normal"
                variant="outlined"
              />
            </div>
            <br />
            <div class="row">
              <Button
                variant="contained" color="primary"
                onClick={this.savePetSitter}>
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

export default PetSitterRegisteration;