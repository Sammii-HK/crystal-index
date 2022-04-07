import * as d3 from 'd3';
import { geoOrthographic, geoPath, geoDistance } from 'd3-geo'
import * as topojson from 'topojson'

const setupGlobe = (container, locationData) => {
  const width = 500
  // const width = 1500
  const height = 500
  // const width = document.width
  // const height = document.height
  const config = {
    speed: 0.005,
    verticalTilt: -30,
    horizontalTilt: 0
  }
  let locations = []
  const center = [width/2, height/2]
  const projection = geoOrthographic()
  projection.rotate([0, -15])
  const initialScale = projection.scale()
  projection.translate(center)
  const path = geoPath().projection(projection)
  let svg
  let markerGroup
  let x

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

  drawGlobe()
  // drawGraticule()
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
    projection.rotate([spinX, -15])
    svg.selectAll("path").attr("d",path);
    drawMarkers();

    spinX += spinVelocity;
    spinVelocity *= dampening;

    if (animating) requestAnimationFrame(animate);
  }

  animate();

  function cleanUpGlobe() {
    animating = false;

    container.removeEventListener('pointerdown', onPointerDown);
    container.removeEventListener('pointerup', onPointerUp);
    container.removeEventListener('pointerleave', onPointerLeave);
    container.removeEventListener('pointermove', onPointerMove);
  }
  
  function drawGlobe() {
    d3.queue()
      .defer(d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')
      // .defer(d3.json, '/data/locations.json')
      // .defer(d3.csv, '/data/significantvolcanoeruptions.csv')
      .await((error, worldData, /* locationData */) => {
        svg.selectAll(".segment")
          .data(topojson.feature(worldData, worldData.objects.countries).features)
          .enter().append("path")
          .attr("class", "segment")
          .attr("d", path)
          .style("fill", "#aaaaaa")
          .style("stroke", "#ccc")
          .style("stroke-width", "0.3px")
          locations = locationData
          drawMarkers()
          console.log('locations', locations)
          // console.log('worldData', worldData)
        }
      )
    console.log('finished')
  }
  
  // function drawGraticule() {
  //   const graticule = d3.geoGraticule().step([10, 10])
  
  //   svg.append("path")
  //     .datum(graticule)
  //     .attr("class", "graticule")
  //     .attr("d", path)
  //     // .style("fill", "#fff")
  //     .style("stroke", "#ccc")
  //     .style("stroke-width", "0.3px")
  //   }
  
  function drawMarkers() {
    const markers = markerGroup.selectAll('circle').data(locations)
    const coordinates = (d) => [parseFloat(d.long), parseFloat(d.lat)]
    
    markers
      .enter()
      .append('circle')
      .merge(markers)
      .attr('cx', d => projection(coordinates(d))[0])
      .attr('cy', d => projection(coordinates(d))[1])
      .attr('fill', d => {
        const gdistance = geoDistance(coordinates(d), projection.invert(center))
        return gdistance > 1.57 ? 'none' : 'steelblue' //`hsla(${360 * (1-(gdistance/1.57))}, 100%, 50%, ${1-(gdistance/1.57)})`
      })
      .attr('r', 7)
      .text(d => d.placeName );
      // .addEventListener(d => ('pointerenter', onPointerEnter))
  
    const onPointerEnter = (e) => {
      console.log("e", e.pointerId);
      
    }

    markerGroup.each(function () {
      this.parentNode.appendChild(this)

    
      // this.addEventListener('pointerenter', onPointerEnter);
    })
  }

  return cleanUpGlobe;
}

export default setupGlobe;