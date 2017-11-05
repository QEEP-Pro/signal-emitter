import * as React from 'react'

import { css } from 'emotion'

import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'

import Parameter from '../models/Parameter'


interface Props {
    parameter: Parameter

    deleteParameterCallback: (parameter: Parameter) => void
}

export default ({ parameter, deleteParameterCallback }: Props) => (
    <Card className={css`margin-top: 2rem;`}>
        <CardTitle title={parameter.name} />
        <div className={s.row}>
            <List style={{width: '50%'}}>
                <ListItem primaryText={getRangeWithUnit(parameter)} secondaryText={'Диапозон значений'} />
                <ListItem primaryText={parameter.law.title} secondaryText={'Форма сигнала'} />
            </List>
            <List style={{width: '50%'}}>
                <ListItem primaryText={parameter.mean} secondaryText={'Математическое ожидание'} />
                <ListItem primaryText={parameter.dispersion} secondaryText={'Дисперсия'} />
            </List>
        </div>
        <CardActions>
            <FlatButton label={'Удалить'} onClick={(_1: any) => deleteParameterCallback(parameter)} />
        </CardActions>
    </Card>
)

const getRangeWithUnit = ({min, max, unit = false}: Parameter) =>
    `от ${min}${unit ? ` ${unit}` : null} до ${max}${unit ? ` ${unit}` : null}`

const s = {
    row: css`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    `,
}
