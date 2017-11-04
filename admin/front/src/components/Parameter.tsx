import * as React from 'react'

import Parameter from '../models/Parameter'


interface Props {
    parameter: Parameter
}

export default (props: Props) => (
    <p>{props.parameter.name}</p>
)
