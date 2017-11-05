import * as React from 'react'

const randomColor = require('randomcolor')
const Color = require('color')

import { Line } from 'react-chartjs-2'

import Point from '../model/Point'


interface Props {
    points: Point[]
}

export default class Chart extends React.Component<Props, {}> {

    color =  Color(randomColor())

    render() {
        const { points } = this.props

        return (
            <Line
                data={{
                    labels: points.map((ds: Point) => ds.x.toString()),
                    datasets: [
                        {
                            data: points.map((ds: Point) => ({
                                x: ds.x,
                                y: ds.y
                            })),
                            borderColor: this.color.string(),
                            backgroundColor: this.color.alpha(0.4).string()
                        },
                    ]
                }}
                options={{
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20,
                        },
                    },
                    legend: {
                        position: 'bottom',
                    }
                }}
            />
        )
    }
}