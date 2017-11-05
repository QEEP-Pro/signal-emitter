import * as React from 'react'

import { css } from 'emotion'

import ParametersList from './ParametersList'
import ParametersView from './ParametersView'

import Parameter from '../model/Parameter'

import fetchParameters from '../api/fetchParameters'


interface LocalState {
    parameters: Parameter[]
    activeIds: number[]
}

export default class Acceptor extends React.Component<{}, LocalState> {

    state = {
        parameters: [],
        activeIds: [],
    } as LocalState

    componentWillMount() {
        fetchParameters().then(parameters => this.setState({parameters}))
    }

    render() {
        const { parameters, activeIds } = this.state

        return (
            <div>
                <div className={s.container}>
                    <div className={s.aside}>
                        <ParametersList
                            parameters={parameters}
                            activeIds={activeIds} 
                            handleToggle={this.handleToggleParameter}
                        />
                    </div>
                    <div className={s.main}>
                        <ParametersView ids={activeIds} getParameterCallback={this.getParameterById} />
                    </div>
                </div>
            </div>
        )
    }

    handleToggleParameter = (index: number) => {
        const { activeIds } = this.state

        const newIds = []

        if (activeIds.indexOf(index) !== -1) {
            newIds.push(...activeIds.filter((i: number) => i !== index))
        } else {
            newIds.push(...activeIds, index)
        }

        this.setState({
            activeIds: newIds
        })
    }

    getParameterById = (id: number) => {
        const parameter = this.state.parameters.find((p: Parameter) => p.id === id)
        return parameter ? parameter : new Parameter({})
    }
}

const s = {
    container: css`
        padding: 2rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `,

    aside: css`
        width: calc(30% - 1rem);
    `,

    main: css`
        width: calc(70% - 1rem);
    `,
}