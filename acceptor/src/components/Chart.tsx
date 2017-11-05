import * as React from 'react'
const _ = require('lodash')

const randomColor = require('randomcolor')
const Color = require('color')

import { Line } from 'react-chartjs-2'

import Point from '../model/Point'

import { addSpacesToNumber } from '../utils'


const MAX_POINTS = 25

interface Props {
    points: Point[]
    unit?: string
    name?: string
}

export default class Chart extends React.Component<Props, {}> {

    color =  Color(randomColor())

    render() {
        const { points, unit, name } = this.props

        let sortedPoints = points
        if (sortedPoints.length > MAX_POINTS) {
            sortedPoints = _.slice(sortedPoints, sortedPoints.length - MAX_POINTS)
        }
        

        return (
            <Line
                data={{
                    labels: sortedPoints.map((ds: Point) => ds.x.toString()),
                    datasets: [
                        {
                            data: sortedPoints.map((ds: Point) => ({
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
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: (value: any, _1: any, _2: any[]) =>
                                     `${value.toFixed(2)}${unit ? ` ${unit}` : false} `,
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                callback: (value: any, _1: any, _2: any[]) =>
                                     `${value}`,
                            },
                        }],
                    },
                    tooltips: {
                        mode: 'point',
                        callbacks: {
                            label: (item: any, data: any) =>
                                `${name}: ${addSpacesToNumber(item.yLabel)}${unit ? ` ${unit}` : false}`,
                            
                        },
                    },
                    legend: {
                        display: false,
                    }
                }}
            />
        )
    }
}