import { PropTypes } from 'prop-types'
import React from 'react'
import Draw from 'leaflet-draw' // eslint-disable-line
import _ from 'lodash'

import { LayersControl } from 'react-leaflet'
import { Map } from 'leaflet'

const eventHandlers = {
  onEdited: 'draw:edited',
  onDrawStart: 'draw:drawstart',
  onDrawStop: 'draw:drawstop',
  onDrawVertex: 'draw:drawvertex',
  onEditStart: 'draw:editstart',
  onEditMove: 'draw:editmove',
  onEditResize: 'draw:editresize',
  onEditVertex: 'draw:editvertex',
  onEditStop: 'draw:editstop',
  onDeleted: 'draw:deleted',
  onDeleteStart: 'draw:deletestart',
  onDeleteStop: 'draw:deletestop',
}

export default class EditControl extends LayersControl {
  static contextTypes = {
    map: PropTypes.instanceOf(Map),
    layerContainer: PropTypes.shape({
      addLayer: PropTypes.func.isRequired,
      removeLayer: PropTypes.func.isRequired
    })
  }

  constructor() {
    super()
    this.state = {
      drawControl: null,
      features: [],
    }
  }

  onDrawCreate = (e) => {
    const { onCreated } = this.props
    const { layerContainer } = this.context
    layerContainer.addLayer(e.layer)
    onCreated && onCreated(e)
  }

  componentWillMount() {
    const { map } = this.context
    this.updateDrawControls()
    map.on('draw:created', this.onDrawCreate)
    for (const key in eventHandlers) {
      if (this.props[key]) {
        map.on(eventHandlers[key], this.props[key])
      }
    }
  }


  componentDidUpdate(prevProps) {
    // super updates positions if thats all that changed so call this first
    super.componentDidUpdate(prevProps)
    this.updateDrawControls()

    return null
  }

  updateDrawControls = () => {
    const { map, layerContainer } = this.context
    map.addLayer(layerContainer)
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: layerContainer
        }
    })
    // map.addControl(new drawLineBtn({drawControl}))
    // map.addControl(<DrawPolygonBtn drawControl={drawControl} />)
    // map.addControl(drawControl)
    this.setState({drawControl})
  }
  render () {
    const {children} = this.props
    const n_childern = _.size(children)
    var childrenWithProps = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        drawControl: this.state.drawControl,
        first: index === 0,
        last: index === n_childern - 1,
      })
    })

    return <div>{childrenWithProps}</div>
  }
}
