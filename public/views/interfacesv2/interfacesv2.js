'use strict';

angular.module('interfacesv2', ['ngRoute'])

 
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/interfacesv2', {
    templateUrl: 'views/interfacesv2/interfacesv2.html',
    controller: 'interfacesv2Ctrl'
  });
}])

.factory('interfacesv2Src', ['$resource', 'WcfConfig', function ($resource, WcfConfig) { 
  return $resource('/api/v0/interfacesv2');}])//managerpage/:id

.controller('interfacesv2Ctrl', ['$scope', 'interfacesv2Src', function ($scope, interfacesv2Src) {
  // $scope.message = 'Manager Control Page';
		var interv2 = interfacesv2Src.query();
		$scope.interv2 = interv2;
		var data = [];
		interv2.$promise.then(function (populateData) {
		$.each(interv2,function(key,val){
			data.push({
				"source":val.srcApp,
				"target":val.destApp,
				"count":val.Count,
				"PII":val.PII,
			})
		})

		var interfacesv2 = null,
        CONTAINER_ID = 'interfacesankey',
        SVG_ID = 'interfacev2svg';
      /* $scope.interv2.$promise.then(function () {
        $('#interfacesankey').bootstrapTable({
          // columns: [
    // ],
          data: $scope.interv2
        });
      }) */
	  
		var units = "Counts";

		var w = $('#' + CONTAINER_ID).parents('.panel-body').width(),
		  h = 650;

		  // Because sometimes in IE, $.width() returns 0
		  if (!w) {
			w = 930; // best fit @1280px screen width in IE11
		  }
		  
		var margin = {top: 5, right: 5, bottom: 5, left: 5},
			width = (w - margin.left - margin.right)*0.9,//700
			height = (h - margin.top - margin.bottom)*0.9;//300
		

		var formatNumber = d3.format(",.0f"),    // zero decimal places
			format = function(d) { return formatNumber(d) + " " + units; },
			color = d3.scale.category20b();

		// append the svg canvas to the page
		var svg = d3.select('#' + CONTAINER_ID).append("svg")
     .attr( "preserveAspectRatio", "xMinYMid meet" )
			.attr("width", w)//width + margin.left + margin.right)
			.attr("height", h)//height + margin.top + margin.bottom)
			.attr("id", SVG_ID)
			.append("g")
			// .attr("transform", "translate(" + w/2 + "," + h/2 + ")");
			.attr("transform", 
				  "translate(" + margin.left + "," + margin.top + ")");

//			svg.append(SVG_ID);
			   
		// Set the sankey diagram properties
		var sankey = d3.sankey()
			.nodeWidth(26)
			.nodePadding(30)
			.size([width, height]);

		var path = sankey.link();
		

		// load the data (using the timelyportfolio csv method)
		// d3.csv("sankey.csv", function(error, data) {

		  //set up graph in same style as original example but empty
		 var  graph = {"nodes" : [], "links" : []};

			data.forEach(function (d) {
			  graph.nodes.push({ "name": d.source });
			  graph.nodes.push({ "name": d.target });
			  graph.links.push({ "source": d.source,
								 "target": d.target,
								 "value": +d.count,
								 "info": d.PII});
			 });

			 // return only the distinct / unique nodes
			 graph.nodes = d3.keys(d3.nest()
			   .key(function (d) { return d.name; })
			   .map(graph.nodes));

			 // loop through each link replacing the text with its index from node
			 graph.links.forEach(function (d, i) {
			   graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
			   graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
			 });

			 //now loop through each nodes to make nodes an array of objects
			 // rather than an array of strings
			 graph.nodes.forEach(function (d, i) {
			   graph.nodes[i] = { "name": d };
			 });

		  sankey
			.nodes(graph.nodes)
			.links(graph.links)
		  	// Note here: if input data has a loop, the program will hange here!
			.layout(32);

		// add in the links
		  var link = svg.append("g").selectAll(".link")
			  .data(graph.links)
			.enter().append("path")
			  .attr("class", "links")
			  .attr("d", path)
			  // .style("fill", function(d) { 
				  // return d.color = color(d.info); })//.replace(/ .*/, "")
			  .style("stroke", function(d) { 
				   return d.color = color(d.info); })//d3.rgb(d.color).brighter(1); })
			  .style("stroke-opacity", 0.7)
			  .style("stroke-width", function(d) { return Math.max(1, d.dy); })
			  .sort(function(a, b) { return b.dy - a.dy; });
    
      link.filter( function(d) { return !d.causesCycle} )
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
		
    // add the link titles
		  link.append("title")
				.text(function(d) {
					return d.source.name + " → " + 
						d.target.name + "\n" + 
						format(d.value) + "\n" + 
						d.info; });

		// add in the nodes
		  var node = svg.append("g").selectAll(".node")
			  .data(graph.nodes)
			.enter().append("g")
			  .attr("class", "node")
			  .attr("transform", function(d) { 
				  return "translate(" + d.x + "," + d.y + ")"; })
			.call(d3.behavior.drag()
			  .origin(function(d) { return d; })
			  .on("dragstart", function() { 
				  this.parentNode.appendChild(this); })
			  .on("drag", dragmove));

		// add the rectangles for the nodes
		  node.append("rect")
			  .attr("height", function(d) { return d.dy; })
			  .attr("width", sankey.nodeWidth())
			  .style("fill", "grey")
			  .style("stroke", "black")
			  // .style("fill", function(d) { 
				  // return d.color = color(d.name.replace(/ .*/, "")); })
			  // .style("stroke", function(d) { 
				  // return d3.rgb(d.color).darker(2); })
			.append("title")
			  .text(function(d) { 
				  return d.name + "\n" + format(d.value); });

		// add in the title for the nodes
		  node.append("text")
			  .attr("x", -6)
			  .attr("y", function(d) { return d.dy / 2; })
			  .attr("dy", ".35em")
			  .attr("text-anchor", "end")
			  .attr("transform", null)
			  .text(function(d) { return d.name; })
			.filter(function(d) { return d.x < width / 2; })
			  .attr("x", 6 + sankey.nodeWidth())
			  .attr("text-anchor", "start");
			  
		// the function for moving the nodes
		  function dragmove(d) {
			d3.select(this).attr("transform", 
				"translate(" + (
					   d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
					) + "," + (
						   d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
					) + ")");
			sankey.relayout();
			link.attr("d", path);
		  }
/* 		// the function for moving the nodes
		  function dragmove(d) {
			d3.select(this).attr("transform", 
				"translate(" + d.x + "," + (
						d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
					) + ")");
			sankey.relayout();
			link.attr("d", path);
		  } */
        // I need to learn javascript
  var numCycles = 0;
  for( var i = 0; i< sankey.links().length; i++ ) {
    if( sankey.links()[i].causesCycle ) {
      numCycles++;
    }
  }
 var cycleTopMarginSize = -10;
 var horizontalMarginSize = 5;
  /* var cycleTopMarginSize = (sankey.cycleLaneDistFromFwdPaths() -
	    ( (sankey.cycleLaneNarrowWidth() + sankey.cycleSmallWidthBuffer() ) * numCycles ) )
  var horizontalMarginSize = ( sankey.cycleDistFromNode() + sankey.cycleControlPointDist() ); */

  svg = d3.select('#' + CONTAINER_ID).select("svg")
    .attr( "viewBox",
	  "" + (0 - horizontalMarginSize ) + " "         // left
	  + cycleTopMarginSize + " "                     // top
	  + (w + horizontalMarginSize * 2 ) + " "     // width
	  + (h + (-1 * cycleTopMarginSize)) + " " );  // height

      
      
		});

        
}]);
