import axios from 'axios';
/*
 * action types
 */
// export const GETGITHUBUSER = 'GETGITHUBUSER';

/*
 * action creators
 */
  // return { type: GETGITHUBUSER, payload: payload }

export function getGitHubUser(userName) {

  return (dispatch, getState, url) => {
    let apiVal = `${url}${userName}`
    axios.get(apiVal)
      .then((response) => {
        console.log(response.data);
        // const newCity = new curCity(response.data.name, response.data.main.humidity, response.data.main.temp, response.data.main.temp_max, response.data.main.temp_min, response.data.weather)
        // dispatch(updateCurrentCity(newCity))
      })
  }
}

