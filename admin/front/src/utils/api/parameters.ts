import axios from 'axios'

import { HOST, PORT, WS_HOST, WS_PORT } from './settings'

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
        .delete(`http://${HOST}:${PORT}/parameters?id=${parameter.id}`)
        .then(data => true)

export const refreshParameters = () => {
    const socket = new WebSocket(`ws://${WS_HOST}:${WS_PORT}`)
    socket.onopen = () => {
        socket.send('refresh')
    }
}