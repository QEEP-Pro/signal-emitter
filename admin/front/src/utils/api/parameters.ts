import axios from 'axios'

import { HOST, PORT } from './settings'

import Parameter from '../../models/Parameter'


export const getParameters = () =>
    axios
        .get(`http://${HOST}:${PORT}/parameters`)
        .then(data => data.data.map((item: any) => new Parameter(item)))

export const createParameter = (parameter: Parameter) =>
        axios
            .post(`http://${HOST}:${PORT}/parameters`, parameter)
            .then(data => new Parameter(data.data))

export const deleteParameter = (parameter: Parameter) =>
    axios
        .get(`http://${HOST}:${PORT}/parameters?id=${parameter.id}`)
        .then(data => true)