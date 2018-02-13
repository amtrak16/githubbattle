import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css'
import { connect } from 'react-redux';
import { getGitHubUser } from './state/actions';
import axios from 'axios';

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        player1Val: '',
        player1Dsp: '',
        player1Msg: '',
        player1Err: false,
        player1SbmBtn: true,

        player1Success: false,
        player1PublicRepos: 0,
        player1Followers: 0,
        player1AvatarURL: '',

        player1Score: '',
        player1ScoreMsg: '',
        player1ScoreMsgStyle: '',

        player2Val: '',
        player2Dsp: '',
        player2Msg: '',
        player2Err: false,
        player2SbmBtn: true,

        player2Success: false,
        player2PublicRepos: 0,
        player2Followers: 0,
        player2AvatarURL: '',

        player2Score: '',
        player2ScoreMsg: '',
        player2ScoreMsgStyle: '',
      }

    this.onPlayer1In = this.onPlayer1In.bind(this)
    this.onPlayer2In = this.onPlayer2In.bind(this)
    this.onPlayer1Click = this.onPlayer1Click.bind(this)
    this.onPlayer2Click = this.onPlayer2Click.bind(this)
  }

  onPlayer1In({ target }) {
    if (target.value.length === 0) {
      this.setState({ player1Val: target.value, player1Err: true, player1Msg: 'Please enter the Player 1 user name to search on.', player1SbmBtn: true })
    } else {
      this.setState({ player1Val: target.value, player1Dsp: target.value, player1Err: false, player1Msg: '', githubSuccess: false, player1SbmBtn: false })
    }
  }

  onPlayer2In({ target }) {
    if (target.value.length === 0) {
      this.setState({ player2Val: target.value, player2Err: true, player2Msg: 'Please enter the Player 2 user name to search on.', player2SbmBtn: true })
    } else {
      this.setState({ player2Val: target.value, player2Dsp: target.value, player2Err: false, player2Msg: '', githubSuccess: false, player2SbmBtn: false })
    }
  }

  onPlayer1Click(evt) {
    evt.preventDefault();
    this.getGitHubUser({ id: evt.target.id, userName: this.state.player1Val })
    // if (this.props.player1Success) {
    //   this.setState({ player1Val: '', player1SbmBtn: true })
    // } else {
    //   console.log(this.props.player1Success)
    //   this.setState({ player1Val: this.state.player1Val, player1Err: true, player1Msg: 'GitHub username does not exist, try again.', player1SbmBtn: true })
    // }
  }

  onPlayer2Click(evt) {
    evt.preventDefault();
    this.getGitHubUser({ id: evt.target.id, userName: this.state.player2Val })
    // if (this.props.player2Success) {
    //   this.setState({ player2Val: '', player2SbmBtn: true })
    // } else {
    //   console.log(this.props.player2Success)
    //   this.setState({ player2Val: this.state.player2Val, player2Err: true, player2Msg: 'GitHub username does not exist, try again.', player2SbmBtn: true })
    // }
  }

  getGitHubUser(payload) {
    let apiVal = `https://api.github.com/users/${payload.userName}`
    axios.get(apiVal)
      .then((response) => {
        if (payload.id == 1) {
          this.setState({ player1Val: '', player1SbmBtn: true, player1Success: true, player1PublicRepos: response.data.public_repos, player1Followers: response.data.followers, player1AvatarURL: response.data.avatar_url })
        } else {
          this.setState({ player2Val: '', player2SbmBtn: true, player2Success: true, player2PublicRepos: response.data.public_repos, player2Followers: response.data.followers, player2AvatarURL: response.data.avatar_url })
        }
      })
      .catch((error) => {
        if (payload.id == 1) {
          this.setState({ player1Val: this.state.player1Val, player1Err: true, player1Msg: 'GitHub username does not exist, try again.', player1SbmBtn: false, player1Success: false, player1PublicRepos: 0, player1Followers: 0, player1AvatarURL: '' })
        } else {
          this.setState({ player2Val: this.state.player2Val, player2Err: true, player2Msg: 'GitHub username does not exist, try again.', player2SbmBtn: false, player2Success: false, player2PublicRepos: 0, player2Followers: 0, player2AvatarURL: '' })
        }
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <form>
          <div className="row">
            {!this.state.player1Success &&
              <div className="small-6 columns">
                <div className="card">
                  <div className="row">
                    <h1 className="small-4 columns">Player 1</h1>
                  </div>
                  <div className="row">
                    <div className="small-6 columns md-text-field with-floating-label icon-left">
                      <input type="search" id="player1_in" placeholder='github_username' value={this.state.player1Val} onChange={this.onPlayer1In} />
                      <label for="player1_in">Github Username:</label>
                      <span className="error">{this.state.player1Msg}</span>
                      <span className="icon icon-sysicon-search"></span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="small-6 columns">
                      <button type="search" className="button btn-cta" id="1" disabled={this.state.player1SbmBtn} onClick={this.onPlayer1Click}>Get User</button>
                    </div>
                  </div>
                </div>
              </div>
            }
            {this.state.player1Success &&
              <div className="small-6 columns">
                <div className="card">
                  <div className="row">
                    <div className="playerCtn">
                      <img className="playerImg" src={this.state.player1AvatarURL} alt='Not Found' />
                      <h3 className="playerDsp" >{this.state.player1Dsp}</h3>
                    </div>
                  </div>
                </div>
              </div>
            }
            {!this.state.player2Success &&
              <div className="small-6 columns">
                <div className="card">
                  <div className="row">
                    <h1 className="small-4 columns">Player 2</h1>
                  </div>
                  <div className="row">
                    <div className="small-6 columns md-text-field with-floating-label icon-left">
                      <input type="search" id="player2_in" placeholder='github_username' value={this.state.player2Val} onChange={this.onPlayer2In} />
                      <label for="player2_in">Github Username:</label>
                      <span className="error">{this.state.player2Msg}</span>
                      <span className="icon icon-sysicon-search"></span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="small-6 columns">
                      <button type="search" className="button btn-cta" id="2" disabled={this.state.player2SbmBtn} onClick={this.onPlayer2Click}>Get User</button>
                    </div>
                  </div>
                </div>
              </div>
            }
            {this.state.player2Success &&
              <div className="small-6 columns">
                <div className="card">
                  <div className="row">
                    <div className="playerCtn">
                      <img className="playerImg" src={this.state.player2AvatarURL} alt='Not Found' />
                      <h3 className="playerDsp" >{this.state.player2Dsp}</h3>
                    </div>
                  </div>
                </div>
              </div>
            }
            {this.state.player1Success && this.state.player2Success &&
              <div className="row">
                <div className="battle_btn_ctn small-2 columns">
                  <button type="submit" className="battle-btn button btn-cta" onClick={this.onBattleClick}>BATTLE!</button>
                </div>
              </div>
            }
          </div>
        </form>
      </div >
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
