import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'

class ContributorsList extends Component {

  constructor (props) {
    super(props)

    this.state = {
      minsalary: '',
      errors: [],
      contributors: []
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCalcTribute = this.handleCalcTribute.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
    axios.get('/api/contributors').then(response => {
      this.setState({
        contributors: response.data
      })
    })
  }
  
  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleCalcTribute (event) {
    event.preventDefault()

    const { history } = this.props
    const minsalary = this.state.minsalary

    axios
      .get('/api/contributors/calculate/'+minsalary)
        .then(response => {
          history.push('/calculate/'+minsalary)
        })
        .catch(error => console.log(error))
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render () {
    const { contributors } = this.state
    contributors.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

    return (
       <div className='container py-4'>
        <div className='row justify-content-center mb-2'>
          <div className='col-md-8'>
            <form onSubmit={this.handleCalcTribute}>
              <div className='input-group'>
                <input
                  type='text'
                  name='minsalary'
                  className={`form-control ${this.hasErrorFor('minsalary') ? 'is-invalid' : ''}`}
                  placeholder='Basic salary'
                  value={this.state.minsalary}
                  onChange={this.handleFieldChange}
                />
                <div className='input-group-append'>
                  <button className='btn btn-primary'>Calculate</button>
                </div>
                {this.renderErrorFor('minsalary')}
              </div>
            </form>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>
                <h4 className='list-inline-item'>All contributors</h4>
                <Link className='btn btn-primary btn-sm float-right' to='/create'>
                  Insert new contributor
                </Link>
              </div>

              <div className='card-body'>
                <ul className='list-group list-group-flush'>
                  {contributors.map(contributor => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`/${contributor.id}`}
                      key={contributor.id}
                    >
                      {contributor.name}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContributorsList
