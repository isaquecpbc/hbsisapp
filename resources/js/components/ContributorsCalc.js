import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ContributorsCalc extends Component {
  constructor () {
    super()

    this.state = {
      contributors: []
    }
  }

  componentDidMount () {

    axios.get("/api/contributors/calculate/" + this.props.match.params.minsalary).then(response => {
      this.setState({
        contributors: response.data
      })
    })
  }

  render () {
    const { contributors } = this.state
    contributors.sort(function (a, b) {
      if(a.tax == b.tax) {
          return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
      } else {
          return (a.tax < b.tax) ? -1 : 1;
      }
  });

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All contributors with tax</div>

              <div className='card-body'>

                <ul className='list-group list-group-flush'>
                  {contributors.map(contributor => (
                    <div
                      className='list-group-item list-group-item-action d-flex'
                    >
                      {contributor.name},&nbsp;<strong>Salary:</strong>&nbsp;{contributor.salary},&nbsp;<strong>Tax IR:</strong>&nbsp;{contributor.tax}
                    </div>
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

export default ContributorsCalc