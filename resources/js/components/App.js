import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewContributor from './NewContributor'
import ContributorsList from './ContributorsList'
import ContributorsCalc from './ContributorsCalc'
import SingleContributor from './SingleContributor'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={ContributorsList} />
            <Route path='/create' component={NewContributor} />
            <Route path='/calculate/:minsalary' exact render={ props => <ContributorsCalc {...props} /> } />
            <Route path='/:id' component={SingleContributor} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))