import axios from 'axios'

// import { HOST, PORT } from './settings'

import Parameter from '../model/Parameter'


const HOST = 'localhost'
const PORT = 3002

export default () =>
    axios
        .get(`http://${HOST}:${PORT}/parameters`)
        .then(data => data.data.map((item: any) => new Parameter(item)))
