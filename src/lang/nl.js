import axios from 'axios'

export default () => {
  return axios.get(process.env.FLAMELINK_DB_URL + '/flamelink/environments/production/content/languageNl/en-US.json')
    .then((response) => {
      return response.data
    });
}