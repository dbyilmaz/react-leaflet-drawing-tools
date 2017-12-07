import React, { Component } from 'react'
import { render } from 'react-dom'
import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet'
import EditControl from './EditControl'

import { MAP_URL_DEFAULT } from './constants'

const styles = {
  map: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    height: '800px',
    position: 'relative',
    boxSizing: 'border-box',
  },
}

export default class MyMap extends Component {
  renderMap() {
    return <TileLayer url={MAP_URL_DEFAULT} />
  }
  _onCreate(a,b,c,d) {
    console.log('onCreate')
    console.log('a: ', a)
    console.log('b: ', b)
    console.log('c: ', c)
    console.log('d: ', d)
  }

  _onEditPath(a,b,c,d) {
    console.log('_onEditPath')
    console.log('a: ', a)
    console.log('b: ', b)
    console.log('c: ', c)
    console.log('d: ', d)
  }

  _onDrawStop(a,b,c,d) {
    console.log('_onDrawStop')
    console.log('a: ', a)
    console.log('b: ', b)
    console.log('c: ', c)
    console.log('d: ', d)
  }

  renderDraw() {
    return (
      <FeatureGroup>
        <EditControl
          position='topright'
          onEdited={this._onEditPath}
          onCreated={this._onCreate}
          onDeleted={this._onDeleted}
          onDrawStop={this._onDrawStop}
        />
      </FeatureGroup>
    )
  }

  render () {
    const position = [51.505, -0.09]
    return (
      <div style={styles.mapContainer}>
        <Map center={position} zoom={12} style={styles.map}>
          {this.renderMap()}
          {this.renderDraw()}
        </Map>
      </div>
    )
  }
}
