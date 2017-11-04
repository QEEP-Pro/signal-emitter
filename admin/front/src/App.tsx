import * as React from 'react'

import AppBar from 'material-ui/AppBar'

import ParametersList from './components/ParametersList'


export default class App extends React.Component {
    render() {
      return (
          <div>
              <AppBar title={'Admin panel'} showMenuIconButton={false} />
              <ParametersList />
          </div>
      )
    }
}
