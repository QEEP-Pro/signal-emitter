import * as React from 'react'


interface Props {
    ids: number[]
}

export default class ParametersView extends React.Component<Props, {}> {
    render() {
        console.log(this.props.ids)

        return(
            <p>...</p>
        )
    }
}
