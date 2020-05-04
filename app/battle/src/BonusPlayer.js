
import React from 'react'

class BonusPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.infoPlayer = this.props.infoPlayer
    }

    render() {
        return (
            <div className={`player${this.props.infoPlayer.number}`}>
                {this.props.infoPlayer.bonus1[1] > 0 ? <div className={`bg-${this.props.infoPlayer.bonus1[0]}`}>X{this.props.infoPlayer.bonus1[1]} </div> : null }
                {this.props.infoPlayer.bonus2[1] > 0 ? <div className={`bg-${this.props.infoPlayer.bonus2[0]}`}>X{this.props.infoPlayer.bonus2[1]} </div> : null }
                {this.props.infoPlayer.bonus3[1] > 0 ? <div className={`bg-${this.props.infoPlayer.bonus3[0]}`}>X{this.props.infoPlayer.bonus3[1]} </div> : null }
                {this.props.infoPlayer.bonus4[1] > 0 ? <div className={`bg-${this.props.infoPlayer.bonus4[0]}`}>X{this.props.infoPlayer.bonus4[1]} </div> : null }
                {this.props.infoPlayer.bonus5[1] > 0 ? <div className={`bg-${this.props.infoPlayer.bonus5[0]}`}>X{this.props.infoPlayer.bonus5[1]} </div> : null }
                {this.props.infoPlayer.bonus6[1] > 0 ? <div className={`bg-${this.props.infoPlayer.bonus6[0]}`}>X{this.props.infoPlayer.bonus6[1]} </div> : null }
                {this.props.infoPlayer.bonus7[1] > 0 ? <div className={`bg-${this.props.infoPlayer.bonus7[0]}`}>X{this.props.infoPlayer.bonus7[1]} </div> : null }
            </div>
        )
    }
}

 export default BonusPlayer



