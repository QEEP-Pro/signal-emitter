import axios from 'axios'

import { HOST, PORT } from './settings'

import Law from '../../models/Law'


export const getLaws = () =>
    axios
        .get(`http://${HOST}:${PORT}/laws`)
        .then(data => data.data.map((item: any) => new Law(item)))