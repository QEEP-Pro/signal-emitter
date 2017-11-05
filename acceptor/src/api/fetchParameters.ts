import axios from 'axios'

import { HOST, PORT } from '../../../conf/admin_api'

import Parameter from '../model/Parameter'


export default () =>
    axios
        .get(`http://${HOST}:${PORT}/parameters`)
        .then(data => data.data.map((item: any) => new Parameter(item)))
