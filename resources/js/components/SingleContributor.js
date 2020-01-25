import axios from 'axios';
import React, { Component } from 'react';

class SingleContributor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contributor: {}
    }
  }

  componentDidMount () {
    const contributorId = this.props.match.params.id

    axios.get(`/api/contributors/${contributorId}`).then(response => {
      this.setState({
        contributor: response.data
      })
    })
  }

  render () {
    const { contributor } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{contributor.name}</div>

              <div className='card-body'>
                <p><strong>CPF:&nbsp;</strong><span className="cpf">{contributor.cpf}</span></p>
                <hr />
                <p><strong>Salary:&nbsp;</strong>{contributor.salary}</p>
                <hr />
                <p><strong>Dependents:&nbsp;</strong>{contributor.dependents}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleContributor
