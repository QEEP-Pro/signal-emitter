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
import Parameter from '../models/Parameter'


interface Props {
    laws: Law[]

    createParameterCallback: (parameter: Parameter) => void
}

interface LocalState {
    law?: Law
    name?: string
    unit?: string
    min: number
    max: number
    mean: number
    dispersion: number
    period: number
    noise: boolean
}

export default class AddParameter extends React.Component<Props, LocalState> {

    state = {
        law: undefined,
        name: undefined,
        unit: undefined,
        min: 0,
        max: 10,
        mean: 5,
        dispersion: 12,
        period: 10,
        noise: true,
    } as LocalState

    render() {
        const { laws } = this.props
        const { law, name, unit, min, max, mean, dispersion, period, noise } = this.state

        return(
            <Card>
                <CardTitle title={'Добавить новый'} />
            
                <CardText>
                    <TextField
                        fullWidth
                        value={name}
                        required
                        onChange={this.handleChangeName}

                        floatingLabelText={'Название'}
                    />

                    <TextField
                        fullWidth
                        value={unit}
                        required
                        onChange={this.handleChangeUnit}

                        floatingLabelText={'Единица измерения'}
                    />
                    
                    <div className={s.row}>
                        <NumberInput
                            fullWidth
                            value={min.toString()}
                            onChange={this.handleChangeMin}
                            strategy={'warn'}

                            floatingLabelText={'Минимум'}                            
                        />
                        <NumberInput
                            fullWidth
                            value={max.toString()}
                            onChange={this.handleChangeMax}
                            strategy={'warn'}

                            floatingLabelText={'Максимум'}
                        />
                    </div>

                    <div className={s.row}>
                        <NumberInput
                            fullWidth
                            value={mean.toString()}
                            onChange={this.handleChangeMean}
                            strategy={'warn'}

                            floatingLabelText={'Математическое ожидание'}
                        />
                        <NumberInput
                            fullWidth
                            value={dispersion.toString()}
                            onChange={this.handleChangeDispersion}
                            strategy={'warn'}

                            floatingLabelText={'Дисперсия'}
                        />
                    </div>
    
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
                        value={period.toString()}
                        onChange={this.handleChangePeriod}
                        strategy={'warn'}

                        floatingLabelText={'Период испускания (мс)'}
                    />

                </CardText>
                
                <CardActions>
                    <FlatButton label={'Сохранить'} fullWidth onClick={this.handleClickCreate} />
                </CardActions>
            </Card>
        )
    }

    handleChangeLaw = (_1: any, _2: any, law: Law) => this.setState({law})

    handleChangeName = (_: any, name: string) => this.setState({name})
    handleChangeUnit = (_: any, unit: string) => this.setState({unit})

    handleChangeMin = (_: any, min: string) => this.setState({min: parseFloat(min) || 0})
    handleChangeMax = (_: any, max: string) => this.setState({max: parseFloat(max) || 0})

    handleChangeMean = (_: any, mean: string) => this.setState({mean: parseFloat(mean) || 0})
    handleChangeDispersion = (_: any, dispersion: string) => this.setState({dispersion: parseFloat(dispersion) || 0})

    handleChangePeriod = (_: any, period: string) => this.setState({period: parseFloat(period) || 0})

    handleChangeNoise = (_: any, noise: boolean) => this.setState({noise})

    handleClickCreate = (_1: any) => {
        if (this.validateData(this.state)) {
            this.props.createParameterCallback({...this.state} as Parameter)
        } else {
            console.log('erro')
        }
        
    }

    validateData = (data: LocalState) =>
        !!data.law && !!data.name && !!data.period
            && (data.min < data.max) && (data.period > 0)
}

const s = {
    row: css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `,
}
