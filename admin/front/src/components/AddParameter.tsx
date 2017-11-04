import * as React from 'react'

import { css } from 'emotion'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import NumberInput from 'material-ui-number-input'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'

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
    mean?: number
    dispersion?: number
    period?: number
    noise: boolean
}

export default class AddParameter extends React.Component<Props, LocalState> {

    state = {
        law: undefined,
        name: undefined,
        unit: undefined,
        min: undefined,
        max: undefined,
        mean: undefined,
        dispersion: undefined,
        period: undefined,
        
        noise: true,
    } as LocalState

    render() {
        const { laws } = this.props
        const { law, name, unit, min, max, mean, dispersion, period, noise } = this.state

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

                    <NumberInput
                        fullWidth
                        value={mean ? mean.toString() : undefined}
                        onChange={this.handleChangeMean}
                        strategy={'warn'}

                        floatingLabelText={'Математическое ожидание'}
                    />

                    <NumberInput
                        fullWidth
                        value={dispersion ? dispersion.toString() : undefined}
                        onChange={this.handleChangeDispersion}
                        strategy={'warn'}

                        floatingLabelText={'Дисперсия'}
                    />
    
                    <SelectField
                        fullWidth
                        value={law}
                        onChange={this.handleChangeLaw}

                        floatingLabelText={'Закон распределения'}
                    >
                        {laws.map((l: Law) =>
                            <MenuItem key={l.id} value={l} primaryText={l.title} />
                        )}
                    </SelectField>

                    <Checkbox
                        label={'Добавить шумы'}
                        checked={noise}
                        onCheck={this.handleChangeNoise}

                        className={css`padding-top: 15px;`}
                    />

                    <NumberInput
                        fullWidth
                        value={period ? period.toString() : undefined}
                        onChange={this.handleChangePeriod}
                        strategy={'warn'}

                        floatingLabelText={'Период испускания (мс)'}
                    />

                </CardText>
                
                <CardActions>
                    <FlatButton label={'Сохранить'} fullWidth />
                </CardActions>
            </Card>
        )
    }

    handleChangeLaw = (_1: any, _2: any, law: Law) => this.setState({law})

    handleChangeName = (_: any, name: string) => this.setState({name})
    handleChangeUnit = (_: any, unit: string) => this.setState({unit})

    handleChangeMin = (_: any, min: string) => this.setState({min: parseFloat(min)})
    handleChangeMax = (_: any, max: string) => this.setState({max: parseFloat(max)})

    handleChangeMean = (_: any, mean: string) => this.setState({mean: parseFloat(mean)})
    handleChangeDispersion = (_: any, dispersion: string) => this.setState({dispersion: parseFloat(dispersion)})

    handleChangePeriod = (_: any, period: string) => this.setState({period: parseFloat(period)})

    handleChangeNoise = (_: any, noise: boolean) => this.setState({noise})
}

const s = {
    row: css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `,
}