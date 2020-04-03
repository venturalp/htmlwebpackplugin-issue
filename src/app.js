import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HeaderVT from './components/header'
import FooterVT from './components/footer'
import ButtonVT from './components/button'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <HeaderVT txt="MEU HEADER" />
          <Switch>
            <Route
              path="/"
              exact
              render={() => <ButtonVT label="MY BUTTON" link="/teste" />}
            />
            <Route
              path="/teste"
              exact
              render={() => <ButtonVT label="TESTE" />}
            />
            <Route
              path="/product/:id"
              render={infos => <ButtonVT label="TESTE" match={infos.match} />}
            />
            <Route render={() => <ButtonVT label="ERRO 404" />} />
          </Switch>
          <FooterVT txt="MEU FOOTER" />
        </>
      </BrowserRouter>
    )
  }
}
