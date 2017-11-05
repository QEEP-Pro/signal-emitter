import axios from 'axios'

import { HOST, PORT } from './settings'

import Parameter from '../model/Parameter'


export default () =>
    axios
        .get(`http://${HOST}:${PORT}/parameters`)
        .then(data => data.data.map((item: any) => new Parameter(item)))
