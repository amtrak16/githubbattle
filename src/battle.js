import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';
import { getGitHubUser } from './state/actions';

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        player1Val: '',
        player1Msg: '',
        player1Err: false,
        player1SbmBtn: true,
        player1Score: '',
        player1ScoreMsg: '',
        player1ScoreMsgStyle: '',

        player2Val: '',
        player2Msg: '',
        player2Err: false,
        player2SbmBtn: true,
        player2Score: '',
        player2ScoreMsg: '',
        player2ScoreMsgStyle: ''

      }

    this.onPlayer1In = this.onPlayer1In.bind(this)
    this.onPlayer2In = this.onPlayer2In.bind(this)
    this.onPlayer1Click = this.onPlayer1Click.bind(this)
    this.onPlayer2Click = this.onPlayer2Click.bind(this)

    // this.onSbmClick = this.onSbmClick.bind(this)

  }

  onPlayer1In({ target }) {
    if (target.value.length === 0) {
      this.setState({ player1Val: target.value, player1Err: true, player1Msg: 'Please enter the Player 1 user name to search on.', player1SbmBtn: true })
    } else {
      this.setState({ player1Val: target.value, player1Err: false, player1Msg: '', githubSuccess: false, player1SbmBtn: false })
    }
  }

  onPlayer2In({ target }) {
    if (target.value.length === 0) {
      this.setState({ player2Val: target.value, player2Err: true, player2Msg: 'Please enter the Player 2 user name to search on.', player2SbmBtn: true })
    } else {
      this.setState({ player2Val: target.value, player2Err: false, player2Msg: '', githubSuccess: false, player2SbmBtn: false })
    }
  }

  onPlayer1Click(evt) {
    evt.preventDefault();
    this.props.getGitHubUser({ id: evt.target.id, userName: this.state.player1Val })
    if (this.props.player1Success) {
      this.setState({ player1Val: '', player1SbmBtn: true })
    } else {
      console.log(this.props.player1Success)
      this.setState({ player1Val: this.state.player1Val, player1Err: true, player1Msg: 'GitHub username does not exist, try again.', player1SbmBtn: true })
    }
  }

  onPlayer2Click(evt) {
    evt.preventDefault();
    this.props.getGitHubUser({ id: evt.target.id, userName: this.state.player2Val })
    if (this.props.player2Success) {
      this.setState({ player2Val: '', player2SbmBtn: true })
    } else {
      console.log(this.props.player2Success)
      this.setState({ player2Val: this.state.player2Val, player2Err: true, player2Msg: 'GitHub username does not exist, try again.', player2SbmBtn: true })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <form>
          <div className="row">
            <div className="small-5 columns">
              <div className="card">
                <div className="row">
                  <h1 className="small-4 columns">Player 1</h1>
                  {/* <div className="small-1 columns">&nbsp;</div> */}
                </div>
                <div className="row">
                  <div className="small-4 columns md-text-field with-floating-label icon-left">
                    <input type="search" id="player1_in" placeholder='github_username' value={this.state.player1Val} onChange={this.onPlayer1In} />
                    <label for="player1_in">Github Username:</label>
                    <span className="error">{this.state.player1Msg}</span>
                    <span className="icon icon-sysicon-search"></span>
                  </div>
                </div>
                <div className="row">
                  <div className="small-4 columns">
                    <button type="search" className="button btn-cta" id="1" disabled={this.state.player1SbmBtn} onClick={this.onPlayer1Click}>Get User</button>
                  </div>
                  {/* <div className="small-1 columns">&nbsp;</div> */}
                </div>
              </div>
            </div>
            <div className="small-5 columns">
              <div className="card">
                <div className="row">
                  <h1 className="small-4 columns">Player 2</h1>
                  {/* <div className="small-3 columns">&nbsp;</div> */}
                </div>
                <div className="row">
                  <div className="small-4 columns md-text-field with-floating-label icon-left">
                    <input type="search" id="player2_in" placeholder='github_username' value={this.state.player2Val} onChange={this.onPlayer2In} />
                    <label for="player2_in">Github Username:</label>
                    <span className="error">{this.state.player2Msg}</span>
                    <span className="icon icon-sysicon-search"></span>
                  </div>
                  {/* <div className="small-1 columns">&nbsp;</div> */}
                </div>
                <div className="row">
                  <div className="small-4 columns">
                    <button type="search" className="button btn-cta" id="2" disabled={this.state.player2SbmBtn} onClick={this.onPlayer2Click}>Get User</button>
                  </div>
                  {/* <div className="small-2 columns">&nbsp;</div> */}
                </div>
              </div>
            </div>
            <div className="small-2 columns"></div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player1Success: state.player1Success,
    player2Success: state.player2Success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGitHubUser: function (payload) {
      dispatch(getGitHubUser(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Battle);
