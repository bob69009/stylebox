import PropTypes from 'prop-types'

import React from 'react'

import Player from './Player'

let state = {
    case:     55,
    number:   1,
    life:     100,
    position: 55,
    bonus1:   [0,0], 
    bonus3:   [0,0], 
    bonus2:   [0,0], 
    bonus4:   [0,0], 
    bonus5:   [0,0], 
    bonus6:   [0,0], 
    bonus7:   [0,0]
}
let player1Pos = 55
let player2Pos = 61
let player1Life = 100
let player2Life = 100
let {p1bonus1, p1bonus2, p1bonus3, p1bonus4, p1bonus5, p1bonus6, p1bonus7, p2bonus1, p2bonus2, p2bonus3, p2bonus4, p2bonus5, p2bonus6, p2bonus7} = [0, 0]

let style = ''
let infoPlayer = [state,state]


class Case extends React.Component {
    constructor(props) {
        super(props)
        this.playerPos = this.props.position
        this.xIsNext = this.props.xIsNext
        this.click = this.props.click
        this.action = this.props.actions
        this.stepNumber = this.props.stepNumber
        this.value = this.props.case
        this.state = {
            infoPlayer: [],
            value: this.props.case
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    _diceGame() {
        let de1 = this.getRandomInt(6)
        let de2 = this.getRandomInt(6)
        if (de1 > de2) {
            player2Pos = player2Pos - 1
            player2Life = player2Life - 10
        }
        if (de1 < de2) {
            player1Pos = player1Pos - 1
            player1Life = player1Life - 10
        }
        if (de1 === de2) {
            player1Pos = player1Pos - 1
            player2Pos = player2Pos - 1
        }
    }

    _checkPosPlayer() {
        let lines = [-1, 1, -12, -13, -14, 12, 13, 14];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i] + player1Pos === player2Pos) {
                return true
            }
        }
    }
    checkShoot() {
        let inc = 1
        let ligne1, ligne2, colonne1, colonne2

        for (let i = 1; i < 14; i++) {
            for (let j = 1; j < 6; j++) {
                inc++
                if (player1Pos === inc) {
                    ligne1 = j
                    colonne1 = i
                    console.log("Player 1 ligne = " + ligne1 + " Player 1 colonne = " + colonne1)
                } else if (player2Pos === inc) {
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
    checkPaf() {
        let lines = [ -2, -1, 1, 2, -11, -12, -13, -14, -15,-24,-25,-26, -27,-28, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28];
    
        for (let i = 0; i < lines.length; i++) {
          if (lines[i] + player1Pos === player2Pos) {
            return true
          } 
        }    
      }

    _actionPlayer(infoPlayer, player) {
        let damage = 0
        let life = 0
        let opponent = 0
        if (player === 0) { opponent = 1 } else { opponent = 0 }

        console.log("_actionPlayer,  = " + infoPlayer[player].number + "position = " + infoPlayer[player].position)

        switch (this.props.actions[infoPlayer[player].position]) {
            case 1:
                player === 0 ? player1Life = player1Life - 40 : player2Life = player2Life - 40
        
                break;

            case 2://force BONUS
                if (infoPlayer[player].bonus1[1] > 0) {
                    player === 0 ? p1bonus1 = [2, infoPlayer[player].bonus1[1] + 3] : p2bonus1 = [2, infoPlayer[player].bonus1[1] + 3]
                } else {
                    player === 0 ? p1bonus1 = [2, 3] : p2bonus1 = [2, 3]
                }
                break;

            case 3://sleep 
                if (infoPlayer[opponent].bonus5[1] === 0) {
                    player === 0 ? p2bonus2 = [3, 1] : p1bonus2 = [3, 1]
                }
                break

            case 4:
                if (player === 0) {
                    p1bonus4 = [0, 0]
                    p2bonus1 = [0, 0]
                    p2bonus2 = [0, 0]
                    p2bonus3 = [0, 0]
                    p2bonus4 = [0, 0]
                    p2bonus5 = [0, 0]
                    p2bonus6 = [0, 0]
                    p2bonus7 = [0, 0]
                } else {
                    p2bonus4 = [0, 0]
                    p1bonus1 = [0, 0]
                    p1bonus2 = [0, 0]
                    p1bonus3 = [0, 0]
                    p1bonus4 = [0, 0]
                    p1bonus5 = [0, 0]
                    p1bonus6 = [0, 0]
                    p1bonus7 = [0, 0]
                }

                break

            case 5: //riffle
                if (this.checkShoot()) {
                    //dégâts ou non
                    if (infoPlayer[opponent].bonus3[1] === 0) {
                        infoPlayer[player].bonus1[1] > 0 ? damage = -80 : damage = -40
                    }
                }
                break

            case 6: //heart
                player === 0 ? player1Life >= 75 ? player1Life = 100 : player1Life = player1Life + 30
                    : player2Life >= 75 ? player2Life = 100 : player2Life = player2Life + 30

                break

            case 7://shield BONUS 
                if (infoPlayer[player].bonus3[1] > 0) {
                    player === 0 ? p1bonus3 = [7, infoPlayer[player].bonus3[1] + 3] : p2bonus3 = [7, infoPlayer[player].bonus3[1] + 3]
                } else {
                    player === 0 ? p1bonus3 = [7, 3] : p2bonus3 = [7, 3]
                }

                break

            case 8://skull BONUS
                if (infoPlayer[opponent].bonus3[1] === 0 && infoPlayer[opponent].bonus5[1] === 0) {
                    if (infoPlayer[opponent].bonus3[1] > 0) {
                        player === 0 ? p2bonus4 = [8, infoPlayer[opponent].bonus4[1] + 2] : p1bonus4 = [8, infoPlayer[opponent].bonus4[1] + 2]
                    } else {
                        player === 0 ? p2bonus4 = [8, 4] : p1bonus4 = [8, 4]
                    }
                }
                infoPlayer[player].bonus1[1] > 0 ? damage = -30 : damage = -15

                break

            case 9://vanisher BONUS
                if (infoPlayer[player].bonus5[1] > 0) {
                    player === 0 ? p1bonus5 = [9, infoPlayer[player].bonus5[1] + 2] : p2bonus5 = [9, infoPlayer[player].bonus5[1] + 2]
                } else {
                    player === 0 ? p1bonus5 = [9, 2] : p2bonus5 = [9, 2]
                }
                break

            case 10://bolt
                //dégâts ou non
                if (infoPlayer[opponent].bonus3[1] === 0 && infoPlayer[opponent].bonus5[1] === 0) {
                    infoPlayer[player].bonus1[1] > 0 ? damage = -40 : damage = -20
                }
                break

            case 11://hammer BONUS
                if (infoPlayer[player].bonus6[1] > 0) {
                    player === 0 ? p1bonus6 = [11, infoPlayer[player].bonus6[1] + 4] : p2bonus6 = [11, infoPlayer[player].bonus6[1] + 4]
                } else {
                    player === 0 ? p1bonus6 = [11, 4] : p2bonus6 = [11, 4]
                }

                break

            case 12://meteorite
                //dégats ou non
                if (infoPlayer[opponent].bonus3[1] === 0 && infoPlayer[opponent].bonus5[1] === 0) {
                    infoPlayer[player].bonus1[1] > 0 ? damage = -40 : damage = -20
                }

                break

            case 13://extra jump BONUS
                if (infoPlayer[player].bonus7[1] > 0) {
                    player === 0 ? p1bonus7 = [13, infoPlayer[player].bonus7[1] + 2] : p2bonus7 = [13, infoPlayer[player].bonus7[1] + 2]
                } else {
                    player === 0 ? p1bonus7 = [13, 2] : p2bonus7 = [13, 2]
                }

                break

            case 14:
                if (this.checkPaf()) {
                    // degats ou non
                    if (infoPlayer[opponent].bonus3[1] === 0) {
                        infoPlayer[player].bonus1[1] > 0 ? damage = -60 : damage = -30
                    }
                }
                break
            default: console.log("attack finie")

        }

        if (player === 0) { player2Life = player2Life + damage } else { player1Life = player1Life + damage }

    }

    _attackPlayer(player) {
        let damage = 0
        let opponent = 0
        if (player === 0) { opponent = 1 } else { opponent = 0 }

        if (player1Pos === player2Pos) { this._diceGame() }

        if (this.props.stepNumber > 0) {
            /* if (infoPlayer[player].bonus6.length > 0 ) {
                 if (this._checkPosPlayer() && infoPlayer[opponent].bonus3[1] === 0 ) {
                     damage = -30
                 }
             } */
            if (this.props.actions.length >= infoPlayer[player].position) {
                this._actionPlayer(infoPlayer, player)
            }
        }


    }

    _playerInfo(infos) {
        const tab = []
        if (infoPlayer.length < 2) {
            infoPlayer = infoPlayer.concat(infos)

        }
        else {
            infoPlayer = tab.concat(infos)
        }

       // console.log(infoPlayer.length)
    }

    _renderPlayer(i, position, index, life, bonus1, bonus2, bonus3, bonus4, bonus5, bonus6) {
        return <Player playerNumber={i} life={life} position={position} case={index} bonus1={bonus1} bonus2={bonus2} bonus3={bonus3} bonus4={bonus4} bonus5={bonus5} bonus6={bonus6} getInfo={(i) => this._playerInfo(i)} />;
    }

    _changePlayerPosition(PlayerPosition) {

        let position = null
        !this.props.click ? position = player1Pos : position = PlayerPosition

        if (!this.props.xIsNext && player1Pos !== this.props.playerPos) {
            player1Pos = this.props.playerPos
            //this._attackPlayer(1)
        } else if (this.props.xIsNext && player2Pos !== this.props.playerPos) {
            player2Pos = this.props.playerPos
            //this._attackPlayer(0)
        }
    }

    _displayCase(PlayerPosition) {
        if (this._calculatePosition(PlayerPosition, this.props.case, 1)) {

            this.props.actions.length > 0 && this.state.value < this.props.actions.length ?
                style = `active bg-${this.props.actions[this.state.value]}`
                : style = `active`

        } else {
            this.props.actions.length > 0 && this.state.value < this.props.actions.length ?
                style = ` bg-${this.props.actions[this.state.value]}`
                : style = ''
        }

        return (
            <button className={style} tabIndex={1}  onClick={this.props.boardCaseClick(infoPlayer)}> </button>
        )
    }

    render() {
        const { value } = this.state
        return (
            <div className={`square ${this.props.index}`} >

                {player1Pos === this.props.case ? this._renderPlayer(1, player1Pos, this.props.case, player1Life, p1bonus1, p1bonus2, p1bonus3, p1bonus4, p1bonus5, p1bonus6, p1bonus7) : null}
                {player2Pos === this.props.case ? this._renderPlayer(2, player2Pos, this.props.case, player2Life, p2bonus1, p2bonus2, p2bonus3, p2bonus4, p2bonus5, p2bonus6, p2bonus7) : null}
                {this._changePlayerPosition(this.props.playerPos)}
                {this._displayCase(
                    this.props.xIsNext ? player1Pos : player2Pos
                )}


            </div>
        )
    }

    _calculatePosition(player, square, jump) {
        let lines = [-2, -1, 1, 2, -11, -12, -13, -14, -15, -24, -25, -26, -27, -28, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28];
        //console.log("_calculatePosition player pos = " + player + " square " + square)
        switch (player) {
            case 0:
                lines = [1, 2, 13, 14, 15, 26, 27, 28];
                break;
            case 1:
                lines = [1, -1, 2, 12, 13, 14, 15, 25, 26, 27, 28];
                break;
            case 11:
                lines = [1, -1, -2, 11, 12, 13, 14, 24, 25, 26, 27];
                break;
            case 12:
                lines = [-1, -2, 11, 12, 13, 24, 25, 26];
                break;
            case 13:
                lines = [1, 2, -11, -12, 13, -13, 14, 15, 26, 27, 28];
                break;
            case 14:
                lines = [1, -1, 2, -11, -12, 12, 13, -13, 14, -14, 15, 25, 26, 27, 28];
                break;
            case 24:
                lines = [1, -1, -2, 11, 12, -12, 13, -13, 14, -14, -15, 24, 25, -25, 26, 27];
                break;
            case 25:
                lines = [-1, -2, 11, 12, 13, -13, -14, -15, 24, 25, 26];
                break;
            case 26:
                lines = [1, 2, -11, -12, 13, -13, 14, 15, -24, -25, 26, -26, 27, 28];
                break;
            case 27:
                lines = [1, -1, 2, -11, -12, 12, 13, -13, 14, -14, 15, 25, -24, -25, 26, -26, 27, -27, 28];
                break;
            case 37:
                lines = [1, -1, -2, 11, 12, -12, 13, -13, 14, -14, -15, 24, 25, -25, 26, -26, 27, -27, -28];
                break;
            case 38:
                lines = [-1, -2, 11, 12, 13, -13, -14, -15, 24, 25, 26, -26, 27, -27, 28, -28];
                break;
            case 39:
                lines = [1, 2, -11, -12, 13, -13, 14, 15, -26, -25, -24];
                break;
            case 40:
                lines = [1, -1, 2, -11, -12, 12, 13, -13, 14, -14, 15, -24, -25, -26, -27];
                break;
            case 50:
                lines = [1, -1, -2, 11, 12, 13, 14, -12, -13, -14, -15, -25, -26, -27, -28];
                break;
            case 51:
                lines = [-1, -2, 11, 12, 13, -13, -14, -15, -26, -27, -28];
                break;
            case 52:
                lines = [1, 2, -13, -12, -11, -26, -25, -24];
                break;
            case 53:
                lines = [1, -1, 2, -14, -13, -12, -11, -27, -26, -25, -24];
                break;
            case 63:
                lines = [-1, 1, -2, -12, -13, -14, -15, -25, -26, -27, -28];
                break;
            case 64:
                lines = [-1, -2, -13, -14, -15, -26, -27, -28];
                break;

            default:
                lines = [-2, -1, 1, 2, -11, -12, -13, -14, -15, -24, -25, -26, -27, -28, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28];
        }
        if (jump === 2) {
            lines = [-4, -3, -2, -1, 1, 2, 3, 4, -9, -10, -11, -12, -13, -14, -15, -16, -17, -22, -23, -24, -25, -26, -27, -28, -29, -30, 9, 10, 11, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        }
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] + player === square) {
                return true
            }
        }

        return null
    }
}


export default Case