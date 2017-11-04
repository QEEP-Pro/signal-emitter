import * as React from 'react'

import { Card, CardTitle } from 'material-ui/Card'

import { css } from 'emotion'

import Parameter from './Parameter'
import AddParameter from './AddParameter'

import ParameterModel from '../models/Parameter'
import Law from '../models/Law'

import { getParameters, createParameter } from '../utils/api/parameters'
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
        getParameters().then(data => console.log(data))
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
                        <Parameter key={i} parameter={parameter} />
                    )}
                </div>
                <div className={s.aside}>
                    <AddParameter laws={laws} createParameterCallback={this.addParameter} />
                </div>
            </div>
        )
    }

    addParameter(parameter: ParameterModel) {
        createParameter(parameter).then((data: any) => console.log(data))
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
        width: calc(70% - 1rem);
    `,

    aside: css`
        width: calc(30% - 1rem);
    `,
}