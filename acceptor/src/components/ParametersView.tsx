import * as React from 'react'


interface Props {
    ids: number[]
}

interface LocalState {
    active: boolean
}

export default class ParametersView extends React.Component<Props, LocalState> {

    socket?: WebSocket = undefined

    componentWillMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(nextProps: Props) {
        let socket = this.socket

        if (!socket) {
            socket = new WebSocket('ws://localhost:13254')

            socket.onopen = () => {
                console.log('Socket Open')
            }
            socket.onclose = () => {
                console.log('Socket Close')
            }
    
            socket.onmessage = (message) => {
                console.log(message)
            }
        }

        if (socket.readyState) {
            socket.send(JSON.stringify(nextProps.ids))
        }

        this.socket = socket
    }

    render() {
        const { ids } = this.props

        return(
            <div>
                {ids.map((id: number) => <p key={id}>{id}</p>)}
            </div>
        )
    }
}
