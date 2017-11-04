import * as React from 'react'

import { Card, CardTitle } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'

import Parameter from '../model/Parameter'


interface Props {
    parameters: Parameter[]
    activeIds: number[]
    handleToggle: (index: number) =>  void
}

export default (props: Props) => (
    <Card>
        <CardTitle title={'Доступные сигналы'} />
        <List>
            {props.parameters.map((parameter: Parameter) =>
                <ListItem
                    key={parameter.id}
                    leftCheckbox={
                        <Checkbox
                            checked={props.activeIds.indexOf(parameter.id) !== -1}
                            onClick={(_: any) => props.handleToggle(parameter.id)}
                        />
                    // tslint:disable-next-line:jsx-curly-spacing
                    }
                    primaryText={parameter.name}
                />
            )}
        </List>
    </Card>
)