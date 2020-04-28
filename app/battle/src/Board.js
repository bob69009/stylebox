import PropTypes from 'prop-types'
import shuffle from 'lodash.shuffle'

import React from 'react'

import Case from './Case'
import Action from './Action'
import { Fragment } from 'react'


const SIDEX = 13
const SIDEY = 5
export const ACTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15,16,17,18,19,20,21,22] 

class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {
                life : 100,
                position: 61,
                bonus1:[0,0], //bonus1
                bonus2:[0,0], //bonus2
                bonus3:[0,0], //bonus3
                bonus4:[0,0], //bonus4
                bonus5:[0,0], //bonus5
                bonus6:[0,0], //bonus6

            cases: this._generateSquares(),
            actions: this._generateActions(),
            listActions:this._generateActions().concat(this._generateActions()),
            guesses:0,
            xIsNext: true,
            click:false
        }
    }

    _generateSquares() {
        const result = []
        const size = SIDEX * SIDEY
        let i = 0
        while (result.length < size) {
            result.push(i)
            i++
        }
        return result
    }

    _generateActions() {
        const result = []
        const size = 13
        const numbers = shuffle(ACTIONS)
        while (result.length < size) {
          const action = numbers.pop() //La méthode pop() supprime le dernier élément d'un tableau et retourne cet élément. Cette méthode modifie la longueur du tableau.
          result.push(action)
        }
        return shuffle(result)
    }

    _handleActions(i) {
        const prevListActions = this.state.actions;
        const newListActions = this.state.listActions;
    
        let tabActions = null;
        const arrLength = newListActions.length;
        const maxNumber = 65;
        
        if (this.state.xIsNext===false) {
            arrLength >= maxNumber ? tabActions = prevListActions.concat(newListActions.splice( 0, arrLength-13))
            : tabActions = prevListActions.concat(newListActions) 
        }
    
        !this.state.xIsNext ? this.setState({
          actions:this._generateActions(),
          listActions : tabActions,
          guesses: this.state.guesses + 1,
            position: i,
            click:true,
            xIsNext: !this.state.xIsNext
        }) : this.setState({
            position: i,
            click:true,
            xIsNext: !this.state.xIsNext
        })
      }

    _boardCaseClick(i) {
        this.props.gameCaseClick(i)
        this._handleActions(i)
    }
   

    render () {
        const {cases, actions} = this.state
   
        return (
            <Fragment>
                <section className="game actions ">
                    {actions.map((action, index) => (
                    <Action 
                        action={action} 
                        index={index}
                        key={index} 
                    />
                    ))} 
                </section>

                <section className="game">
                    {cases.map(( index) => (
                    <Case 
                        case={index} 
                        index={index}
                        key={index} 
                        actions={this.state.listActions}
                        boardCaseClick={() => this._boardCaseClick(index)}
                        playerPos={this.state.position}
                        xIsNext={this.state.xIsNext}
                        click={this.state.click}
                    />
                    ))} 
                </section>
            </Fragment>
        )
    }
}

    

  export default Board