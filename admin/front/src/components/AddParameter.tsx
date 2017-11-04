import * as React from 'react'

import { css } from 'emotion'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import NumberInput from 'material-ui-number-input'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Law from '../models/Law'


interface Props {
    laws: Law[]
}

interface LocalState {
    law?: Law
    name?: string
    unit?: string
    min?: number
    max?: number
}

export default class AddParameter extends React.Component<Props, LocalState> {

    state = {
        law: undefined,
        name: undefined,
        unit: undefined,
        min: undefined,
        max: undefined,
    } as LocalState

    render() {
        const { laws } = this.props
        const { law, name, unit, min, max } = this.state

        console.log(this.state)

        return(
            <Card>
                <CardTitle title={'Добавить новый'} />
            
                <CardText>
                    <TextField
                        fullWidth
                        value={name}
                        onChange={this.handleChangeName}

                        floatingLabelText={'Название'}
                    />

                    <TextField
                        fullWidth
                        value={unit}
                        onChange={this.handleChangeUnit}

                        floatingLabelText={'Единица измерения'}
                    />
                    
                    <div className={s.row}>
                        <NumberInput
                            fullWidth
                            value={min ? min.toString() : undefined}
                            onChange={this.handleChangeMin}
                            strategy={'warn'}

                            floatingLabelText={'Минимум'}                            
                        />
                        <NumberInput
                            fullWidth
                            value={max ? max.toString() : undefined}
                            onChange={this.handleChangeMax}
                            strategy={'warn'}

                            floatingLabelText={'Максимум'}
                        />
                    </div>
    
                    <SelectField
                        fullWidth
                        value={law}
                        onChange={this.handleChangeLaw}

                        floatingLabelText={'Закон распределения'}
                    >
                        {laws.map((l: Law) =>
                            <MenuItem key={l.id} value={l} primaryText={l.name} />
                        )}
                    </SelectField>

                    

                </CardText>
            </Card>
        )
    }

    handleChangeLaw = (_1: any, _2: any, law: Law) => this.setState({law})
    handleChangeName = (_: any, name: string) => this.setState({name})
    handleChangeUnit = (_: any, unit: string) => this.setState({unit})
    handleChangeMin = (_: any, min: string) => this.setState({min: parseFloat(min)})
    handleChangeMax = (_: any, max: string) => this.setState({max: parseFloat(max)})
}

const s = {
    row: css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `,
}