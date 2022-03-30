import * as d3 from 'd3';
import { geoOrthographic, geoPath, geoDistance } from 'd3-geo'
import * as topojson from 'topojson'

const setupGlobe = (container, locationData) => {
  const width = 960
  const height = 500
  const config = {
    speed: 0.005,
    verticalTilt: -30,
    horizontalTilt: 0
  }
  let locations = []
  const center = [width/2, height/2]
  const projection = geoOrthographic()
  projection.rotate([0, -15])
  const path = geoPath().projection(projection)
  const initialScale = projection.scale()
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
    .attr('class', 'container')
  
  markerGroup = svg.append('g')

  drawGlobe()
  // drawGraticule()
  console.log('JS loaded')

  animate();

  container.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    dragging = true;
    return false;
  });
  
  container.addEventListener('pointerup', () => {
    dragging = false;
    lastMouseX = undefined;
  });

  container.addEventListener('pointerleave', () => {
    dragging = false;
    lastMouseX = undefined;
  });
  
  container.addEventListener('pointermove', (event) => {
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
  });

  let dragging = false;

  function animate() {
    projection.rotate([spinX, -15])
    svg.selectAll("path").attr("d",path);
    drawMarkers();

    spinX += spinVelocity;
    spinVelocity *= dampening;

    requestAnimationFrame(animate);
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
          console.log('worldData', worldData)
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
    
    markers
      .enter()
      .append('circle')
      .merge(markers)
      .attr('cx', d => projection([d.longitude, d.latitude])[0])
      .attr('cy', d => projection([d.longitude, d.latitude])[1])
      .attr('fill', d => {
        const coordinate = [d.longitude, d.latitude]
        const gdistance = geoDistance(coordinate, projection.invert(center))
        return gdistance > 1.57 ? 'none' : 'steelblue'
      })
      .attr('r', 7)
  
    markerGroup.each(function () {
      this.parentNode.appendChild(this)
    })
  }
}

export default setupGlobe;