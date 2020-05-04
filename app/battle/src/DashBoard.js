
import React from 'react'

import BonusPlayer from './BonusPlayer'

const speed = 1
let end = false
class DashBoard extends React.Component {
    constructor(props) {
      super(props)
        this.infoPlayer = this.props.infoPlayer
        this.state ={
          progress: this.props.progress
        }
    }

    componentDidMount() {
      if (this.props.infoPlayer[0].life > 0 && this.props.infoPlayer[1].life > 0) {
        this.interval = setInterval(() => this._frame(), 100)
      }
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
      this.setState({
        progress: 100
      })
    }

    _frame() {
        if (this.state.progress > 0){
          this.setState((prevState) => ({
            progress: prevState.progress - speed
          }));      
        }
        end = this.props.end
        if (this.state.progress === 0 && this.props.infoPlayer[0].life >= 0 && this.props.infoPlayer[1].life >= 0){
           
            this.componentWillUnmount()
            setTimeout(() => {  this.componentDidMount()  }, 2000);
              
            end = true
        }
    }

    

    render () {

      return (
        
        <section className="dashboard grid-2 has-gutter">
          <div className="col-all">
            <h5 className="txtcenter alert">BATTLE MONKEYS</h5>
          </div>
          <div>
            <span className="alert--danger txtleft"><span className="pls prs"> Player 1, life : {this.props.infoPlayer[0].life}, bonus1 =  {this.props.infoPlayer[0].bonus1}</span></span> 
            <progress className="player-1 html5" max="100" value={this.props.infoPlayer[0].life} label={`${this.props.infoPlayer[0].life}%`}></progress>
            <BonusPlayer
              infoPlayer={this.props.infoPlayer[0]}
            />
          </div>
          <div>
            <span className="alert--success"><span className="pls prs">Player 2</span></span>
            <progress className="player-2 python" max="100" value={this.props.infoPlayer[1].life}></progress>
            <BonusPlayer
              infoPlayer={this.props.infoPlayer[1]}
            />
          </div>
          <div className="col-all timeline">
            Tour : {this.props.guesses}
            <progress className="css3" max="100" value={this.state.progress} label={this.props.getInfo(end.toString())}></progress>
          </div>
        </section>
      )
    }
}


export default DashBoard

