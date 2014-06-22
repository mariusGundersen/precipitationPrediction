define('plot', ['rickshaw'], function(Rickshaw){
    
  var graph = new Rickshaw.Graph( {
    element: document.getElementById("chart"),
    width: 960,
    height: 500,
    renderer: 'scatterplot',
    series: [{
      color: "#ff9030",
      data: [],
      name: "rain"
    }]
  });

  graph.renderer.dotSize = 6;

  new Rickshaw.Graph.HoverDetail({ graph: graph });
  
  return function (points){
    graph.series[0].data = points;
    graph.render();
  }
});