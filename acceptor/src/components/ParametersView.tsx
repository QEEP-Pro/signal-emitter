import * as React from 'react'

import { css } from 'emotion'

import { Card, CardTitle } from 'material-ui/Card'

import Chart from './Chart'

import Parameter from '../model/Parameter'
import Point from '../model/Point'


const MAX_POINTS = 100

interface Props {
    ids: number[]

    getParameterCallback: (id: number) => Parameter
}

interface LocalState {
    active: boolean

    points: Point[]
}

export default class ParametersView extends React.Component<Props, LocalState> {

    socket?: WebSocket = undefined

    state = {
        active: false,
        points: [],
    } as LocalState

    componentWillMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(nextProps: Props) {
        let socket = this.socket

        const { points } = this.state

        if (!socket) {
            socket = new WebSocket('ws://localhost:13254')

            socket.onopen = () => {
                console.log('Socket Open')
                this.setState({active: true})
            }
            socket.onclose = () => {
                console.log('Socket Close')
                this.setState({active: false})
            }
    
            socket.onmessage = (message) => {
                if (points.length > MAX_POINTS) {
                    points.shift()
                }
                const point = new Point(JSON.parse(message.data))

                points.push(point)

                this.setState({points})
            }
        }

        if (socket.readyState) {
            socket.send(JSON.stringify(nextProps.ids))
        }

        this.socket = socket
    }

    render() {
        const { ids, getParameterCallback } = this.props
        const { points, active } = this.state

        console.log(points)

        return(
            <div>
                <Card>
                    <CardTitle
                        title={active ? 'Содинение активно' : 'Соединение закрыто'}
                        subtitle={active ? false : 'Попробуйте перезагрузить страницу'}
                    />
                </Card>
                {ids.map((id: number) =>
                    <Card key={id} className={css`margin-top: 2rem;`}>
                        <CardTitle title={getParameterCallback(id).name} />
                        <Chart
                            points={points.filter((p: Point) => p.parameterId === id)}
                        />
                    </Card>
                )}
            </div>
        )
    }
}
