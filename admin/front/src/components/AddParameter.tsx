import * as React from 'react'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Law from '../models/Law'


interface Props {
    laws: Law[]
}

export default (props: Props) => (
    <Card>
        <CardTitle title={'Добавить новый'} />
        
        <CardText>
            <TextField hintText={'Название'} />

            <p>...</p>
            <SelectField floatingLabelText={'Закон распределения'}>
                {props.laws.map((law: Law) =>
                    <MenuItem key={law.id} value={law.id} primaryText={law.name} />
                )}
            </SelectField>
        </CardText>
    </Card>
)