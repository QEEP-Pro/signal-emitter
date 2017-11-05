import * as React from 'react'

import { css } from 'emotion'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import Parameter from '../models/Parameter'


interface Props {
    parameter: Parameter

    deleteParameterCallback: (parameter: Parameter) => void
}

export default ({ parameter, deleteParameterCallback }: Props) => (
    <Card className={css`margin-top: 2rem; position: relative;`}>
        <CardHeader
            title={parameter.name}
            subtitle={`${parameter.law.title} (${getRangeWithUnit(parameter)})`}
        >
            <FlatButton
                className={css`float: right;`}
                label={'Удалить'}
                onClick={(_1: any) => deleteParameterCallback(parameter)}
            />
        </CardHeader>
        <CardText>
            {parameter.noise ?
                <div>
                    <p>Сигнал включает шумы</p>
                    <p>Математическое ожидание: {parameter.mean}, дисперсия: {parameter.dispersion}</p>
                </div>
                : <p>Сигнал не включает шумов</p>
            }
        </CardText>
    </Card>
)

const getRangeWithUnit = ({min, max, unit = false}: Parameter) =>
    `от ${min}${unit ? ` ${unit}` : null} до ${max}${unit ? ` ${unit}` : null}`
