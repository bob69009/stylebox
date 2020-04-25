import React, { Component, Fragment } from 'react'
import shuffle from 'lodash.shuffle'
import Popup from 'reactjs-popup'

import './App.css'

import DashBoard from './DashBoard'
import Action from './Action'
import Player from './Player'
import Square from './Square'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput'


const SIDEX = 13
const SIDEY = 5
export const ACTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15,16,17,18,19,20,21,22] 
export const VISUAL_PAUSE_MSECS = 8000


class App extends Component {
  state = {
    squares: this.generateSquares(),
    actions:this.generateActions(),
    listActions:this.generateActions().concat(this.generateActions()) ,
    history: [
      {
        squares: this.generateSquares()
      }
    ],
    player1 : 55, 
    player2 : 61,
    player1Life : 100,
    player2Life : 100,
    player1Vanish : null,
    player2Vanish : null,
    player1Bonus1 : [0,0],
    player2Bonus1 : [0,0],
    player1Bonus2 : [0,0],
    player2Bonus2 : [0,0],
    player1Bonus3 : [0,0],
    player2Bonus3 : [0,0],
    player1Bonus4 : [0,0],
    player2Bonus4 : [0,0],
    player1Bonus5 : [0,0],
    player2Bonus5 : [0,0],
    player1Bonus6 : [0,0],
    player2Bonus6 : [0,0],
    player1Bonus7 : [0,0],
    player2Bonus7 : [0,0],
    stepNumber: 1,
    progress : 100,
    speed: 1, 
    xIsNext: true,
    guesses : 0,
    hallOfFame : null,
  }

  displayHallOfFame = hallOfFame => {
    this.setState({ hallOfFame })
  }

  componentDidMount() {
    if (this.state.player1Life > 0 && this.state.player2Life > 0) {
      this.interval = setInterval(() => this.frame(), 100)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.setState({
      progress: 100
    })
  }

  bonusDec() {
    console.log("décremntation " + this.state.stepNumber )
    if (this.state.player1Bonus1[1]-1 >= 1) {this.setState({ player1Bonus1 : [2, this.state.player1Bonus1[1]-1] })} else {this.setState({ player1Bonus1 : [0,0] }) }
    if (this.state.player1Bonus2[1]-1 >= 1) {this.setState({ player1Bonus2 : [3, this.state.player1Bonus2[1]-1] })} else { this.setState({ player1Bonus2 : [0,0] }) }
    if (this.state.player1Bonus3[1]-1 >= 1) {this.setState({ player1Bonus3 : [7, this.state.player1Bonus3[1]-1] })} else { this.setState({ player1Bonus3 : [0,0] }) }
    if (this.state.player1Bonus4[1]-1 >= 1) {this.setState({ player1Bonus4 : [8, this.state.player1Bonus4[1]-1] })} else { this.setState({ player1Bonus4 : [0,0] }) }
    if (this.state.player1Bonus5[1]-1 >= 1) {this.setState({ player1Bonus5 : [9, this.state.player1Bonus5[1]-1] })} else { this.setState({ player1Bonus5 : [0,0], player1Vanish : null }) }
    if (this.state.player1Bonus6[1]-1 >= 1) {this.setState({ player1Bonus6 : [11, this.state.player1Bonus6[1]-1] })} else { this.setState({ player1Bonus6 : [0,0] }) }
    if (this.state.player1Bonus7[1]-1 >= 1) {this.setState({ player1Bonus7 : [13, this.state.player1Bonus7[1]-1] })} else  {this.setState({ player1Bonus7 : [0,0] }) }

    if (this.state.player2Bonus1[1]-1 >= 1) {this.setState({ player2Bonus1 : [2, this.state.player2Bonus1[1]-1] })}  else { this.setState({ player2Bonus1 : [0,0] }) }
    if (this.state.player2Bonus2[1]-1 >= 1) {this.setState({ player2Bonus2 : [3, this.state.player2Bonus2[1]-1] })}  else { this.setState({ player2Bonus2 : [0,0] }) }
    if (this.state.player2Bonus3[1]-1 >= 1) {this.setState({ player2Bonus3 : [7, this.state.player2Bonus3[1]-1] })}  else { this.setState({ player2Bonus3 : [0,0] }) }
    if (this.state.player2Bonus4[1]-1 >= 1) {this.setState({ player2Bonus4 : [8, this.state.player2Bonus4[1]-1] })}  else  {this.setState({ player2Bonus4 : [0,0] }) }
    if (this.state.player2Bonus5[1]-1 >= 1) {this.setState({ player2Bonus5 : [9, this.state.player2Bonus5[1]-1] })}  else  {this.setState({ player2Bonus5 : [0,0], player2Vanish : null }) }
    if (this.state.player2Bonus6[1]-1 >= 1) {this.setState({ player2Bonus6 : [11, this.state.player2Bonus6[1]-1] })}  else  {this.setState({ player2Bonus6 : [0,0] }) }
    if (this.state.player2Bonus7[1]-1 >= 1) {this.setState({ player2Bonus7 : [13, this.state.player2Bonus7[1]-1] })}  else  {this.setState({ player2Bonus7 : [0,0] })}
  
  }

  handleActions() {
    const prevListActions = this.state.actions;
    const newListActions = this.state.listActions;

    let tabActions = null;
    const arrLength = newListActions.length;
    const maxNumber = 65;
    
    if (this.state.xIsNext===false) {
      if (arrLength >= maxNumber) {
        tabActions = prevListActions.concat(newListActions.splice( 0, arrLength-13))
        
      } else {
        tabActions = prevListActions.concat(newListActions) 
      }
    }

    if (this.state.stepNumber%2 !==0) {
      this.bonusDec()
    }
    if (this.state.stepNumber%2 !==0) {
      if (this.state.player2Bonus4 > 0) this.setState({ player2Life : this.state.player2Life - 15 })
      if (this.state.player1Bonus4 > 0) this.setState({ player1Life : this.state.player1Life - 15 })
    }

    this.state.stepNumber%2 ===0 ? this.setState({
      actions:this.generateActions(),
      listActions : tabActions,
      player2 : this.state.player2,
      stepNumber: this.state.stepNumber + 1,
      guesses: this.state.guesses + 1,
      xIsNext: !this.state.xIsNext
    }) : this.setState({
      stepNumber: this.state.stepNumber + 1,
      player1 : this.state.player1,
      xIsNext: !this.state.xIsNext
    })
  }

  checkShoot() {
    const posPlayer1 = this.state.player1
    const posPlayer2 = this.state.player2
    let inc = 1
    let ligne1, ligne2, colonne1, colonne2
    
    for (let i=1; i <14; i++) {
      for (let j=1; j <6; j++) {
        inc++
        if (posPlayer1===inc) {
          ligne1 = j
          colonne1 = i
          console.log("Player 1 ligne = " + ligne1 + " Player 1 colonne = " + colonne1)
        } else if (posPlayer2===inc) {
          ligne2 = j
          colonne2 = i
          console.log("Player 2 ligne = " + ligne2 + " Player 2 colonne = " + colonne2)
        }
      }
    }
    if (ligne1 === ligne2) {
      return true
    } else if (colonne1 === colonne2) {
      return true
    } else return false
  }

  checkPosPlayer2() {
    const posPlayer1 = this.state.player1
    const posPlayer2 = this.state.player2
    let lines = [ -1, 1, -12, -13, -14, 12, 13, 14];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i] + posPlayer1 === posPlayer2) {
        return true
      } 
    }    
  }
  checkPosPlayer1() {
    const posPlayer1 = this.state.player1
    const posPlayer2 = this.state.player2
    let lines = [ -1, 1, -12, -13, -14, 12, 13, 14];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i] + posPlayer2 === posPlayer1) {
        return true
      } 
    }    
  }


  checkPaf() {
    const posPlayer1 = this.state.player1
    const posPlayer2 = this.state.player2
    let lines = [ -2, -1, 1, 2, -11, -12, -13, -14, -15,-24,-25,-26, -27,-28, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i] + posPlayer1 === posPlayer2) {
        return true
      } 
    }    
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  actionPlayer1(player) {
    switch(this.state.listActions[player]) {
      case 1:
        this.setState({
          player1Life: this.state.player1Life - 40
        })
      break;
      
      case 2://force BONUS
      if (this.state.player1Bonus1[1] > 0 ) {
        this.setState({
          player1Bonus1: [2,this.state.player1Bonus1[1]+3]
        })
      } else {
        this.setState({
          player1Bonus1: [2,3]
        })
      }
      break;
      
      case 3://sleep 
        if (this.state.player2Bonus5[1] === 0) {
          this.setState({
            player2Bonus2: [3,1]
          })
        }        
      break

      case 4:
        this.setState({
          player1Bonus4: [0,0],
          player2Bonus1: [0,0],
          player2Bonus2: [0,0],
          player2Bonus3: [0,0],
          player2Bonus4: [0,0],
          player2Bonus5: [0,0],
          player2Bonus6: [0,0],
          player2Bonus7: [0,0],
          player2Vanish: null,
        })
      break 

      case 5: //riffle
        if (this.checkShoot()) {
          //dégâts ou non
          if (this.state.player2Bonus3[1] === 0)
            this.state.player1Bonus1[1] > 0 ? this.setState({ player2Life: this.state.player2Life - 80 })
            : this.setState({ player2Life: this.state.player2Life - 40 })
        }
      break

      case 6: //heart
      if (this.state.player1Life >= 75) { this.setState({ player1Life: 100 }) }
      else { this.setState({ player1Life: this.state.player1Life + 30 })} 
      break

      case 7://shield BONUS 
        if (this.state.player1Bonus3[1] > 0 ) {
          this.setState({
            player1Bonus3: [7, this.state.player1Bonus3[1]+3]
          })
        } else {
          this.setState({
            player1Bonus3: [7,3]
          }) 
        }
      break

      case 8://skull BONUS
      if (this.state.player2Bonus3[1] === 0 && this.state.player2Bonus5[1] === 0) {
        if (this.state.player2Bonus4[1] > 0 ) {
          this.setState({
            player2Bonus4: [8, this.state.player2Bonus4[1]+2]
          })
        } else {
          this.setState({
            player2Bonus4: [8,4]
          })
        }
        //dégâts ou non
          this.state.player1Bonus1[1] > 0 ? this.setState({ player2Life: this.state.player2Life - 30 })
          : this.setState({ player2Life: this.state.player2Life - 15 })
      }
      break

      case 9://vanisher BONUS
        if (this.state.player1Bonus5[1] > 0 ) {
          this.setState({
            player1Bonus5: [9, this.state.player1Bonus5[1]+2],
            player1Vanish: 'vanish' 
          })
        } else {
          this.setState({
            player1Bonus5: [9,2],
            player1Vanish: 'vanish' 
          })
        }        
      break

      case 10://bolt
        //dégâts ou non
        if (this.state.player2Bonus3[1] === 0 && this.state.player2Bonus5[1] === 0) {
          this.state.player1Bonus1[1] > 0 ? this.setState({ player2Life: this.state.player2Life - 40 })
          : this.setState({ player2Life: this.state.player2Life - 20 })
        }
      break

      case 11://hammer BONUS
        if (this.state.player1Bonus6[1] > 0 ) {
          this.setState({
            player1Bonus6: [11, this.state.player1Bonus6[1]+4]
          })
        } else {
          this.setState({
            player1Bonus6: [11,4]
          })
        }
       
      break

      case 12://meteorite
        //dégats ou non
        if (this.state.player2Bonus3[1] === 0 && this.state.player2Bonus5[1] === 0) {
          this.state.player1Bonus1[1] > 0 ? this.setState({ player2Life: this.state.player2Life - 40 })
          : this.setState({ player2Life: this.state.player2Life - 20 })
        }
      break

      case 13://extra jump BONUS
        if (this.state.player1Bonus7[1] > 0 ) {
          this.setState({
            player1Bonus7: [13, this.state.player1Bonus7[1]+2]
          })
        } else {
          this.setState({
            player1Bonus7: [13,2]
          }) 
        }
      break

      case 14:
        if (this.checkPaf()) {
          // degats ou non
          if (this.state.player2Bonus3[1] === 0) {
            this.state.player1Bonus1[1] > 0 ? this.setState({ player2Life: this.state.player2Life - 60 })
            : this.setState({ player2Life: this.state.player2Life - 30 })
          }
        }
      break    
      default:console.log("Player 2 a le bouclier ? " + this.state.player2Bonus3[1])

    }
  }

  actionPlayer2(player) {
    switch(this.state.listActions[player]) {
      case 1:
        this.setState({
          player2Life: this.state.player2Life - 40
        })
      break;
      
      case 2://force BONUS
      if (this.state.player2Bonus1[1] > 0 ) {
        this.setState({
          player2Bonus1: [2,this.state.player2Bonus1[1]+3]
        })
      } else {
        this.setState({
          player2Bonus1: [2,3]
        })
      }
      break;
      
      case 3://sleep BONUS
        if (this.state.player1Bonus5[1] === 0) {
          this.setState({
            player1Bonus2: [3,1]
          })
        }
      break

      case 4:
        this.setState({
          player2Bonus4: [0,0],
          player1Bonus1: [0,0],
          player1Bonus2: [0,0],
          player1Bonus3: [0,0],
          player1Bonus4: [0,0],
          player1Bonus5: [0,0],
          player1Bonus6: [0,0],
          player1Bonus7: [0,0],
          player1Vanish: null,
        })
      break

      case 5: //riffle
        if (this.checkShoot()) {
          //dégâts ou non
          if (this.state.player1Bonus3[1] === 0 && this.state.player1Bonus5[1] === 0)
            this.state.player2Bonus1[1] > 0 ? this.setState({ player1Life: this.state.player1Life - 80 })
            : this.setState({ player1Life: this.state.player1Life - 40 })
        }
      break

      case 6: //heart
        if (this.state.player2Life >= 75) { this.setState({ player2Life: 100 }) }
        else { this.setState({ player2Life: this.state.player2Life + 30 })} 
      break

      case 7://shield BONUS 
        if (this.state.player2Bonus3[1] > 0 ) {
          this.setState({
            player2Bonus3: [7, this.state.player2Bonus3[1]+3]
          })
        } else {
          this.setState({
            player2Bonus3: [7,3]
          }) 
        }
      break

      case 8://skull BONUS
      if (this.state.player1Bonus3[1] === 0 && this.state.player1Bonus5[1] === 0) {
        if (this.state.player1Bonus4[1] > 0 ) {
          this.setState({
            player1Bonus4: [8, this.state.player1Bonus4[1]+2]
          })
        } else {
          this.setState({
            player1Bonus4: [8,4]
          })
        }
        //dégâts ou non
          this.state.player2Bonus1[1] > 0 ? this.setState({ player1Life: this.state.player1Life - 30 })
          : this.setState({ player1Life: this.state.player1Life - 15 })
      }
      break

      case 9://vanisher BONUS
        if (this.state.player2Bonus5[1] > 0 ) {
          this.setState({
            player2Bonus5: [9, this.state.player2Bonus5[1]+2],
            player2Vanish: 'vanish' 
          })
        } else {
          this.setState({
            player2Bonus5: [9,2],
            player2Vanish: 'vanish' 
          })
        }        
      break

      case 10://bolt
        //dégâts ou non
        if (this.state.player1Bonus3[1] === 0 && this.state.player1Bonus5[1] === 0) {
          this.state.player2Bonus1[1] > 0 ? this.setState({ player1Life: this.state.player1Life - 40 })
            : this.setState({ player1Life: this.state.player1Life - 20 })
        }
      break

      case 11://hammer BONUS
        if (this.state.player2Bonus6[1] > 0 ) {
          this.setState({
            player2Bonus6: [11, this.state.player2Bonus6[1]+4]
          })
        } else {
          this.setState({
            player2Bonus6: [11,4]
          })
        }
       
      break

      case 12://meteorite
        //dégâts ou non
        if (this.state.player1Bonus3[1] === 0 && this.state.player1Bonus5[1] === 0) {
          this.state.player2Bonus1[1] > 0 ? this.setState({ player1Life: this.state.player1Life - 40 })
            : this.setState({ player1Life: this.state.player1Life - 20 })
        }
      break

      case 13://extra jump BONUS
        if (this.state.player2Bonus7[1] > 0 ) {
          this.setState({
            player2Bonus7: [13, this.state.player2Bonus7[1]+2]
          })
        } else {
          this.setState({
            player2Bonus7: [13,2]
          }) 
        }
      break

      case 14:
        if (this.checkPaf()) {
          //degats ou non
          if (this.state.player1Bonus3[1] === 0) {
            this.state.player2Bonus1[1] > 0 ? this.setState({ player1Life: this.state.player1Life - 60 })
            : this.setState({ player1Life: this.state.player1Life - 30 })
          }
        }
      break    
      default:console.log("Player 1 a le bouclier ? " + this.state.player1Bonus3[1])

    }
  }

  diceGame() {
    let de1 = this.getRandomInt(6)
    let de2 = this.getRandomInt(6)
      if (de1 > de2) {
        console.log("Player 2 recule d'une case")
        this.setState({
          player2 : this.state.player2-1,
          player2Life: this.state.player2Life-10
        })
      }  
      if (de1 < de2) {
        console.log("PLayer 1 recule d'une case")
        this.setState({
          player1 : this.state.player1-1,
          player1Life: this.state.player1Life-10
        }) 
      }       
      if (de1 === de2) {
        console.log("egalité, chacun recule d'une case")
        this.setState({
          player1 : this.state.player1-1,
          player2 : this.state.player2+1, 
        }) 
      }     
  }

  attack(i) {
    let EspectedActionPlayer1 = this.state.player1
    let EspectedActionPlayer2 = this.state.player2
    //même position
    if (this.state.player1 === this.state.player2) {
      this.diceGame()
    } 
    //corps à corps
    if (this.state.player1Bonus6.length > 0 ) {
      if (this.checkPosPlayer2() && this.state.player2Bonus3[1] === 0 ) {
        this.state.player1Bonus1[1] > 0 ? this.setState({ player2Life: this.state.player2Life - 60 })
            : this.setState({ player2Life: this.state.player2Life - 30 })
      }
    }
    if (this.state.player2Bonus6.length > 0 ) {
      if (this.checkPosPlayer1() && this.state.player1Bonus3[1] === 0 ) {
        this.state.player2Bonus1[1] > 0 ? this.setState({ player1Life: this.state.player1Life - 60 })
            : this.setState({ player1Life: this.state.player1Life - 30 })
      }
    }

    //actions générales
    if (this.state.listActions.length >= EspectedActionPlayer1 && this.state.stepNumber%2 !==0) {
      console.log("action player 1")
      this.actionPlayer1(EspectedActionPlayer1)
    }
    if (this.state.listActions.length >= EspectedActionPlayer2 && this.state.stepNumber%2 !==0 ) {
      console.log("action player 2")
      this.actionPlayer2(EspectedActionPlayer2)
    }
  }
  
  frame() {
  
    if (this.state.progress > 0){
      this.setState((prevState, props) => ({
        progress: prevState.progress - this.state.speed
      }));      
    }
    if (this.state.player2Life <=0 || this.state.player1Life <= 0) {
      this.componentWillUnmount()
    }
    if (this.state.progress === 0 && this.state.player2Life >=0 && this.state.player1Life >= 0){
      this.componentWillUnmount()
     
        this.componentDidMount()   
        this.handleActions()
        this.attack()
      
    }
  }


  generateActions() {
    const result = []
    const size = 13
    const numbers = shuffle(ACTIONS)
    while (result.length < size) {
      const action = numbers.pop() //La méthode pop() supprime le dernier élément d'un tableau et retourne cet élément. Cette méthode modifie la longueur du tableau.
      result.push(action)
    }
    return shuffle(result)
  }
  generateSquares() {
    const result = []
    const size = SIDEX * SIDEY
    let i = 0
    while (result.length < size) {
      result.push(i)
      i++
    }
    return result
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    this.handleActions() 
    
    squares[i] = this.state.xIsNext ? "Player 1" : "Player 2";  
     
    this.state.stepNumber%2 ===0 ? 
      this.setState({
        player2: i
      })
    : this.setState({
        player1: i
      })
     
      this.componentWillUnmount() 
      this.componentDidMount()
      this.attack(i)

     /* if (this.state.stepNumber%2 ===0) {
        this.componentWillUnmount() 

      } else {
        if (this.state.progress === 0) {
        } else {
          this.componentWillUnmount() 
          this.componentDidMount()
        }
      }*/
    
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  
  
  
  render() {
    
    const {squares, actions, player1Life, player2Life, hallOfFame, guesses, stepNumber, player1Vanish, player2Vanish, progress} = this.state
    const player1Won = player2Life <= 0 
    const player2Won = player1Life <= 0
    const player2Sleep = this.state.player2Bonus2[1] > 0
    const player1Sleep = this.state.player1Bonus2[1] > 0
    let player1Jump = 1
    if (this.state.player1Bonus7[1]>0) player1Jump = 2
    let player2Jump = 1
    if (this.state.player2Bonus7[1]>0) player2Jump = 2 
    
    const Modal = () => (
      <Popup
        trigger={
          <div className={`flex-container`}>
            <button className="button item-center"> FIN DE LA PARTIE !  {player2Life<= 0? <span><br />Player 1 a gagné</span> : <span><br />Player 2 a gagné</span>}</button>
          </div>
        }
        modal
        closeOnDocumentClick
      >
        { hallOfFame ? <HallOfFame entries={hallOfFame} player1Won={player1Won} player2Won={player2Won} /> : <HighScoreInput guesses={guesses} player1Won={player1Won} player2Won={player2Won} onStored={this.displayHallOfFame}  />}
      </Popup>
    )
    
    return (
      <Fragment>
        <DashBoard 
          player1Life={player1Life}
          player2Life={player2Life}
          player1Bonus1={this.state.player1Bonus1}
          player1Bonus2={this.state.player1Bonus2}
          player1Bonus3={this.state.player1Bonus3}
          player1Bonus4={this.state.player1Bonus4}
          player1Bonus5={this.state.player1Bonus5}
          player1Bonus6={this.state.player1Bonus6}
          player1Bonus7={this.state.player1Bonus7}
          player2Bonus1={this.state.player2Bonus1}
          player2Bonus2={this.state.player2Bonus2}
          player2Bonus3={this.state.player2Bonus3}
          player2Bonus4={this.state.player2Bonus4}
          player2Bonus5={this.state.player2Bonus5}
          player2Bonus6={this.state.player2Bonus6}
          player2Bonus7={this.state.player2Bonus7}
          progress={progress}  
          guesses={guesses}
        /> 
        <hr />
        <hr />
        {player1Won || player2Won ? 
          <Modal /> : null
        }
        <section className="game actions ">
            {actions.map((action, index) => (
              <Action 
                action={action} 
                index={index}
                key={index} 
              />
            ))} 
        </section>
        <hr />
       
          
          <section className="game">
             
            
            {squares.map((square, index) => (
              <Square 
                xIsNext={this.state.xIsNext}
                player1={this.state.player1}
                player2={this.state.player2}
                player1Life={this.state.player1Life}
                player2Life={this.state.player2Life}
                player1Vanish={player1Vanish}
                player2Vanish={player2Vanish}
                player1Sleep={player1Sleep}
                player2Sleep={player2Sleep}
                player1Jump={player1Jump}
                player2Jump={player2Jump}
                actions={this.state.listActions}
                square={square} 
                index={index}
                key={index} 
                onClick={index => this.handleClick(index)} 
              />
            ))} 
          </section>
          {
            process.env.NODE_ENV === 'development' ?
            <p>Currently using React {React.version}</p> : null
          }
        </Fragment>
    )
  }
}


export default App