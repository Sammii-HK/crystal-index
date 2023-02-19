import * as d3 from 'd3';
import { geoOrthographic, geoPath, geoDistance } from 'd3-geo'
import * as topojson from 'topojson'

const setupGlobe = ({container, locationData, onLocationHovered, onLocationClicked}) => {
  const width = 500
  const height = 500
  let locations = []
  const center = [width/2, height/2]
  let svg
  let markerGroup
  const radius = 7
  let labelsList

  const projection = geoOrthographic()
  projection.rotate([0, -15])
  projection.translate(center)

  const path = geoPath().projection(projection)

  let spinVelocity = 0;
  let spinX = 0;
  let lastMouseX;
  let currentMouseX;
  let dampening = 0.9;

  svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    // .attr('class', 'container')
    .attr("preserveAspectRatio", "xMidYMid meet");
  
  markerGroup = svg.append('g')
  labelsList = svg.append('g')

  drawGlobe()
  console.log('JS loaded')

  const onPointerDown = (event) => {
    event.preventDefault();
    dragging = true;
    return false;
  }

  container.addEventListener('pointerdown', onPointerDown);

  const onPointerUp = () => {
    dragging = false;
    lastMouseX = undefined;
  }
  
  container.addEventListener('pointerup', onPointerUp);

  const onPointerLeave = () => {
    dragging = false;
    lastMouseX = undefined;
  }

  container.addEventListener('pointerleave', onPointerLeave);

  const onPointerMove = (event) => {
    event.preventDefault();
    if (dragging) {
      currentMouseX = event.clientX;
  
      requestAnimationFrame(() => {
        if (lastMouseX !== undefined) {
          spinVelocity = currentMouseX - lastMouseX;
        }
        lastMouseX = currentMouseX;
      });
    }
  }
  
  container.addEventListener('pointermove', onPointerMove);

  let dragging = false;

  let animating = true;

  function animate() {
    if (Math.abs(spinVelocity) > 0.001) {
      projection.rotate([spinX, -15])
      svg.selectAll("path").attr("d",path);
      drawMarkers();
      drawLabels();
    }

    spinX += spinVelocity;
    spinVelocity *= dampening;

    if (animating) requestAnimationFrame(animate);
  }

  animate();

  function cleanUpGlobe() {
    animating = false;

    container.removeChild(svg.node());
    // container.selectAll().remove()

    container.removeEventListener('pointerdown', onPointerDown);
    container.removeEventListener('pointerup', onPointerUp);
    container.removeEventListener('pointerleave', onPointerLeave);
    container.removeEventListener('pointermove', onPointerMove);
  }
  
  function drawGlobe() {
    d3.queue()
      .defer(d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')
      .await((error, worldData, /* locationData */) => {
        svg.selectAll(".segment")
          .data(topojson.feature(worldData, worldData.objects.countries).features)
          .enter()
          .append("path")
          .attr("class", "segment")
          .attr("d", path)
          .style("fill", "#aaaaaa")
          .style("stroke", "#ccc")
          .style("stroke-width", "0.3px")
          locations = locationData
          drawMarkers()
          drawLabels()
        }
      )
    console.log('finished')
  }
  
  function drawMarkers() {
    const markers = markerGroup.selectAll('circle')    
    const coordinates = (d) => [parseFloat(d.long), parseFloat(d.lat)]

    function onMouseEnter(d) {
      onLocationHovered(d.id);
      d3.select(this).style('cursor', 'pointer'); 
      d3.select(`#location-${d.id}`).style('display', 'block')
      // Use D3 to select element, change color and size
      d3.select(this).attr({
        fill: 'orange',
        r: radius * 2
      });
      return d
    }

    function onMouseLeave(d) {
      onLocationHovered();
      d3.select(this).style('cursor', 'default');
      d3.select(`#location-${d.id}`).style('display', 'none')
    }

    function onMouseClick() {
      d3.event.preventDefault();
      d3.event.stopPropagation();
      onLocationClicked()
      return false;
    }

    markers
      .data(locations)
      .enter()
      .append('circle')
      .merge(markers)
      .attr('cx', d => projection(coordinates(d))[0])
      .attr('cy', d => projection(coordinates(d))[1])
      .attr('fill', d => {
        const gdistance = geoDistance(coordinates(d), projection.invert(center))
        return gdistance > 1.57 ? 'none' : 'steelblue' //`hsla(${360 * (1-(gdistance/1.57))}, 100%, 50%, ${1-(gdistance/1.57)})`
      })
      .attr('background-color', 'white')
      .attr('r', radius)
      .on('mouseenter', onMouseEnter)
      .on('mouseleave', onMouseLeave)
      .on('pointerdown', onMouseClick)
  

    markerGroup.each(function () {
      this.parentNode.appendChild(this)
    })
  }

  function drawLabels() {
    const labels = labelsList.selectAll('text')
    const coordinates = (d) => [parseFloat(d.long), parseFloat(d.lat)]

    labels
      .data(locations)
      .enter()
      .append('text')
      .merge(labels)
      .text((d) => d.placeName)
      .attr('x', d => projection(coordinates(d))[0] + 10)
      .attr('y', d => projection(coordinates(d))[1] + 5)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '15px')
      .attr('id', d => `location-${d.id}`)
      .style('z-index', 9999)
      .attr('fill', 'black')
      .attr('display', 'none')

      labelsList.each(function () {
        this.parentNode.appendChild(this)
      })
  }

  return cleanUpGlobe;
}

export default setupGlobe;