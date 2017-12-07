import L from 'leaflet'

export default class drawLineBtn extends L.Control{
  constructor (props) {
    super()
    this.props = props
  }
  options: {
    position: 'topleft'
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  }
  onAdd (map) {
    const {layerContainer, drawControl} = this.props
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.style.backgroundColor = 'white';
    container.style.width = '30px';
    container.style.height = '30px';
    container.style.cursor = 'pointer'
    container.onclick = function(){
      new L.Draw.Polyline(map, drawControl.options.polyline).enable()
    }
    return container;
  }
}
