import * as React from 'react'

import { css } from 'emotion'

import { Card, CardTitle } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

import Parameter from '../models/Parameter'


interface Props {
    parameter: Parameter
}

export default ({ parameter }: Props) => (
    <Card className={css`margin-top: 2rem;`}>
        <CardTitle title={parameter.name} />
        <List>
            <ListItem primaryText={getRangeWithUnit(parameter)} secondaryText={'Диапозон значений'} />
            <ListItem primaryText={parameter.law.title} secondaryText={'Закон рапределения'} />
            <ListItem primaryText={parameter.mean} secondaryText={'Математическое ожидание'} />
            <ListItem primaryText={parameter.dispersion} secondaryText={'Дисперсия'} />
        </List>
    </Card>
)

const getRangeWithUnit = ({min, max, unit = false}: Parameter) =>
    `от ${min}${unit ? ` ${unit}` : null} до ${max}${unit ? ` ${unit}` : null}`
