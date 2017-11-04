import axios from 'axios'

import { HOST, PORT } from './settings'

import Parameter from '../../models/Parameter'
import Law from '../../models/Law'


export const getParameters = () =>
    axios
        .get(`http://${HOST}:${PORT}/parameters`)
        .then(data => data.data.map((item: any) => ({
            id: parseInt(item.id, 10),
            name: item.name,
            period: parseInt(item.period, 10),
            min: parseFloat(item.min),
            max: parseFloat(item.max),
            unit: item.unit,
            noise: item.noise,
            law: {
                id: parseInt(item.law.id, 10),
                name: item.law.name,
            } as Law,
        } as Parameter)))