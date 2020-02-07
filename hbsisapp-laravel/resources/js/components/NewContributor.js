import axios from 'axios'
import React, { Component } from 'react'
import MaskedInput from 'react-text-mask'

class NewContributor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      cpf: '',
      salary: '',
      dependents: '',
      errors: []
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewContributor = this.handleCreateNewContributor.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    if(event.target.name == 'cpf'){
      this.setState({ documentId: cpfMask(event.target.value) })
    }
  }

  handleCreateNewContributor (event) {
    event.preventDefault()

    const { history } = this.props

    const contributor = {
      name: this.state.name,
      cpf: this.state.cpf.replace(/[^0-9]/g, ''),
      salary: this.state.salary,
      dependents: this.state.dependents
    }

    axios
      .post('/api/contributors', contributor)
      .then(response => {
        // redirect to the homepage
        history.push('/')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
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
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Create new contributor</div>

              <div className='card-body'>

                <form onSubmit={this.handleCreateNewContributor}>

                  <div className='form-group'>
                    <label htmlFor='name'>Contributor name</label>
                    <input
                      id='name'
                      type='text'
                      className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                      name='name'
                      value={this.state.name}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('name')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='cpf'>Contributor cpf</label>
                    <MaskedInput
                      mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-',  /[0-9]/, /[0-9]/]}
                      id='cpf'
                      className={`form-control ${this.hasErrorFor('cpf') ? 'is-invalid' : ''}`}
                      name='cpf'
                      value={this.state.cpf}
                      onChange={this.handleFieldChange}
                    />

                    {this.renderErrorFor('cpf')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='salary'>Contributor salary</label>
                    <input
                      type="number"
                      min="0"
                      id='salary'
                      className={`form-control ${this.hasErrorFor('salary') ? 'is-invalid' : ''}`}
                      name='salary'
                      value={this.state.salary}
                      onChange={this.handleFieldChange}
                    />

                    {this.renderErrorFor('salary')}
                  </div>

                  <div className='form-group'>
                    <label htmlFor='dependents'>Contributor dependents?</label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      id='dependents'
                      className={`form-control ${this.hasErrorFor('dependents') ? 'is-invalid' : ''}`}
                      name='dependents'
                      value={this.state.dependents}
                      onChange={this.handleFieldChange}
                    />

                    {this.renderErrorFor('dependents')}
                  </div>

                  <button className='btn btn-primary'>Create</button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewContributor
