import axios from 'axios'

const instance=axios.create({
  baseURL:'https://burger-app-d580d-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;