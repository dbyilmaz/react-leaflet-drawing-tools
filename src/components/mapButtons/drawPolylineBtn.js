import React from 'react'
import { PropTypes } from 'prop-types'
import ReactDOM from 'react-dom'
import L from 'leaflet'
import { MapControl } from 'react-leaflet'

export default class DrawPolylineBtn extends MapControl {
  static contextTypes = {
    map: PropTypes.instanceOf(Map),
  }
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }
  componentWillMount() {
    const centerControl = L.control({position: 'topright'})
    const jsx = (
      <div {...this.props} onClick={this.onClick} style={{width: 30, height: 30, backgroundColor: '#FFF', cursor: 'pointer'}}>
        <img src='style/images/polyline.png' />
      </div>
    )

    centerControl.onAdd = function (map) {
      let div = L.DomUtil.create('div', '')
      ReactDOM.render(jsx, div)
      return div
    }
    this.leafletElement = centerControl
  }
  onClick() {
    const { map } = this.context
    const { drawControl } = this.props
    new L.Draw.Polyline(map, drawControl.options.polyline).enable()
  }
}
