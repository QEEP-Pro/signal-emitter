import * as React from 'react'

import AppBar from 'material-ui/AppBar'

import Acceptor from './components/Acceptor'


export default class App extends React.Component {
    render() {
      return (
          <div>
              <AppBar title={'Acceptor'} showMenuIconButton={false} />
              <Acceptor />
          </div>
      )
    }
}