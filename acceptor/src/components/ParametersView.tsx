import * as React from 'react'


interface Props {
    ids: number[]
}

export default class ParametersView extends React.Component<Props, {}> {

    componentWillMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(nextPops: Props) {
        const socket = new WebSocket('ws://localhost:3000/sockjs-node/916/wkxbeewj/websocket')

        socket.onopen = () => {
            console.log('ok')
        }
    }

    render() {
        const { ids } = this.props

        return(
            <div>
                <p>...</p>
                {ids.map((id: number) => <p key={id}>{id}</p>)}
            </div>
        )
    }
}
