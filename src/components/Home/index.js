import React, { Component } from "react";

import { Button } from '@material-ui/core';
import {  Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div>
                <div style={{
                    backgroundColor: "white",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: '50px'
                }}>

                    <Button
                        variant="contained" color="primary"
                        onClick={this.showAll}>
                        <Link to="/petregisteration">Add a Pet</Link>
                </Button>
                </div>
                <div style={{
                    backgroundColor: "white",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: '50px'
                }}>

                    <Button
                        variant="contained" color="primary"
                        onClick={this.searchByName}>
                        <Link to="/petsitterregisteration">Add a PetSitter</Link>
                     </Button>
                        </div>
                </div>               
        );
    }
}

export default Home;