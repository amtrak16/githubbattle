import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';
import { newDossier, addNewItem, clrActive, selDossier } from './state/actions';

class Rankings extends Component {

  render() {
    return (
      <div className="rankings">
        <header className="App-header">
          <h2 className="App-title">Rankings</h2>
        </header>
        <div class="card">
          <div>
            <div class="row">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Rankings;
