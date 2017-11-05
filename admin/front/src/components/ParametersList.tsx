import * as React from 'react'

import { Card, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import { css } from 'emotion'

import Parameter from './Parameter'
import AddParameter from './AddParameter'

import ParameterModel from '../models/Parameter'
import Law from '../models/Law'

import { getParameters, createParameter, deleteParameter, refreshParameters } from '../utils/api/parameters'
import { getLaws } from '../utils/api/laws'


interface LocalState {
    parameters: ParameterModel[]
    laws: Law[]
}

export default class ParametersList extends React.Component<{}, LocalState> {

    state = {
        parameters: [],
        laws: [],
    } as LocalState

    componentWillMount() {
        getParameters().then(parameters => this.setState({parameters}))
        getLaws().then(laws => this.setState({laws}))
    }

    render() {
        const { parameters, laws } = this.state

        return (
            <div className={s.container}>
                <div className={s.main}>
                    <Card>
                        <CardTitle title={'Активные сигналы'} />
                    </Card>
                    {parameters.map((parameter: ParameterModel, i: number) =>
                        <Parameter
                            key={i}
                            parameter={parameter}
                            deleteParameterCallback={this.removeParameter}
                        />
                    )}
                </div>
                <div className={s.aside}>
                    <FlatButton
                        className={css`margin-bottom: 2rem;`}
                        fullWidth
                        label={'Обновить параметры эмиттера'}
                        onClick={() => refreshParameters()}
                    />
                    <AddParameter laws={laws} createParameterCallback={this.addParameter} />
                </div>
            </div>
        )
    }

    addParameter = (parameter: ParameterModel) => {
        const { parameters } = this.state

        createParameter(parameter).then((data: ParameterModel) => {
            parameters.unshift(data)
            this.setState({parameters})
        })
    }

    removeParameter = (parameter: ParameterModel) => {
        const { parameters } = this.state

        deleteParameter(parameter).then((_: any) => {
            this.setState({
                parameters: parameters.filter((p: ParameterModel) => p.id !== parameter.id)
            })
        })
    }
}

const s = {
    container: css`
        padding: 2rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `,

    main: css`
        width: calc(60% - 1rem);
    `,

    aside: css`
        width: calc(40% - 1rem);
    `,
}