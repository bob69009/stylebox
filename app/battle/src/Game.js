import React, { Component, Fragment } from 'react'
import shuffle from 'lodash.shuffle'
import Popup from 'reactjs-popup'

import './App.css'

import Board from './Board'



class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
                number : 1,
                life : 100,
                position: 55,
                bonus1:[0,0], //bonus1
                bonus2:[0,0], //bonus2
                bonus3:[0,0], //bonus3
                bonus4:[0,0], //bonus4
                bonus5:[0,0], //bonus5
                bonus6:[0,0] //bonus6
                
        }
    }   

   _gameCaseClick(result) {
      // console.log('tareuss est a la position = '+ result);
       
   }

    render() {
        return (
            <Board 
                gameCaseClick={(i) => this._gameCaseClick(i)}
            />
        )
    }
}

export default Game