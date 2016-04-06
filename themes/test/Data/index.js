import React, { Component } from 'react'

class Data extends Component {
  render() {
    const {data} = this.props
    return (
      <div>
        { JSON.stringify(data) }
      </div>
    )
  }
}

export default Data
