import * as React from 'react'

import { css } from 'emotion'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
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
    min: string
    max: string
    mean: string
    dispersion: string
    period: string
    noise: boolean
}

export default class AddParameter extends React.Component<Props, LocalState> {

    state = {
        law: undefined,
        name: undefined,
        unit: undefined,
        min: '0',
        max: '10',
        mean: '5',
        dispersion: '12',
        period: '10',
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

                    <SelectField
                        fullWidth
                        value={law}
                        onChange={this.handleChangeLaw}

                        floatingLabelText={'Форма сигнала'}
                    >
                        {laws.map((l: Law) =>
                            <MenuItem key={l.id} value={l} primaryText={l.title} />
                        )}
                    </SelectField>
                    
                    <div className={s.row}>
                        <TextField
                            fullWidth
                            value={min.toString()}
                            onChange={this.handleChangeMin}

                            floatingLabelText={'Минимум'}                            
                        />
                        <TextField
                            fullWidth
                            value={max.toString()}
                            onChange={this.handleChangeMax}

                            floatingLabelText={'Максимум'}
                        />
                    </div>

                    <div className={s.row}>
                        <TextField
                            fullWidth
                            value={mean.toString()}
                            onChange={this.handleChangeMean}

                            floatingLabelText={'Математическое ожидание'}
                        />
                        <TextField
                            fullWidth
                            value={dispersion.toString()}
                            onChange={this.handleChangeDispersion}

                            floatingLabelText={'Дисперсия'}
                        />
                    </div>

                    <Checkbox
                        label={'Добавить шумы'}
                        checked={noise}
                        onCheck={this.handleChangeNoise}

                        className={css`padding-top: 15px;`}
                    />

                    <TextField
                        fullWidth
                        value={period.toString()}
                        onChange={this.handleChangePeriod}

                        floatingLabelText={'Период испускания (сек)'}
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

    handleChangeMin = (_: any, min: string) => this.setState({min: min })
    handleChangeMax = (_: any, max: string) => this.setState({max: max })

    handleChangeMean = (_: any, mean: string) => this.setState({mean: mean })
    handleChangeDispersion = (_: any, dispersion: string) => this.setState({dispersion: dispersion })

    handleChangePeriod = (_: any, period: string) => this.setState({period: period})

    handleChangeNoise = (_: any, noise: boolean) => this.setState({noise})

    handleClickCreate = (_1: any) => {
        if (this.validateData(this.state)) {
            this.props.createParameterCallback({
                name: this.state.name,
                law: this.state.law,
                unit: this.state.unit,
                min: parseFloat(this.state.min),
                max: parseFloat(this.state.max),
                mean: parseFloat(this.state.mean),
                dispersion: parseFloat(this.state.dispersion),
                period: parseFloat(this.state.period),
                noise: this.state.noise
            } as Parameter)
            
        } else {
            console.log('erro')
        }
        
    }

    validateData = (data: LocalState) =>
        !!data.law && !!data.name && !!data.period
            && (parseFloat(data.min)) < parseFloat(data.max) && (parseFloat(data.period) > 0)
}

const s = {
    row: css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `,
}
