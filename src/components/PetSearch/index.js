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
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import cloneDeep from 'lodash/cloneDeep';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
    SEARCH_BY_NAME,
    SEARCH_BY_PETSITTER_USERNAME,
    GET_PETS,
    DELETE_PET
} from '../../config/path';
import PetRegiteration from '../PetRegisteration';

const styles = {
    paper: {
        width: '-webkit-fill-available'
    }
};

class PetSitterRegisteration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            pets: [],
            editDialog: false,
            petToEdit: {},
            deleteDialog: false
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
        }).catch(err => {
            console.log("Error Reading data " + err);
        }).finally(() => {

        });
    }

    editPet = (pet, id) => {

        const pets = cloneDeep(pet);
        this.setState({
            editDialog: true,
            petToEdit: pets
        })
        console.log(JSON.stringify(pets))
    }

    onDialogClose = () => {
        this.setState({ editDialog: false });
        this.showAll();
    }

    deletePet = (key) => {
        fetch(DELETE_PET, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: key
            })
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            this.showAll();
        }).catch(err => {
            console.log("Error Reading data " + err);
        }).finally(() => {
            this.showAll();
        });
    }

    render() {
        var { pets } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <div class="container" style = {{backgroundColor: "white",
            padding: '20px'}}> 
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
                <br />

                <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">PetSitter Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {pets.length > 0 ? (
            pets.map(pet => (
            <TableRow key={pet.id}>
              <TableCell component="th" scope="row">
                {pet.name}
              </TableCell>
              <TableCell align="right">{pet.age}</TableCell>
              <TableCell align="right">{pet.description}</TableCell>
              <TableCell align="right">{pet.petSitterUsername}</TableCell>
              <TableCell align="right">

              <Button
                                                variant="contained" color="primary"
                                                onClick={pet, key => this.editPet(pet, key)}>
                                                EDIT
</Button>
<Button
                                                variant="contained" color="secondary"
                                                onClick={() => this.deletePet(pet.id)}>
                                                DELETE
</Button>
              </TableCell>
            </TableRow>
            ))) : (   <TableRow>
                <TableCell component="th" scope="row">
                  No pet
                </TableCell>
                </TableRow>)
         
        }
               </TableBody>
               </Table>
             </Paper>
                <div>
                    <Dialog
                        classes={{
                            paper: classes.paper,
                        }}
                        aria-labelledby="simple-dialog-title" open={this.state.editDialog} onClose={this.onDialogClose} style={{ width: '-webkit-fill-available' }}>
                        <PetRegiteration
                            edit={true}
                            pet={this.state.petToEdit}
                        ></PetRegiteration>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PetSitterRegisteration);