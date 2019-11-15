console.log(d3.symbol())

//puts the endpoint in a variable
const url ="https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-36/sparql"

const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?herkomstSuper ?herkomstSuperLabel ?typeLabel (COUNT(?cho) AS ?amount) 
WHERE {
  # geef ruilmiddelen
  <https://hdl.handle.net/20.500.11840/termmaster14607> skos:narrower* ?type .
  ?type skos:prefLabel ?typeLabel .

  # geef de continenten
  <https://hdl.handle.net/20.500.11840/termmaster2> skos:narrower ?herkomstSuper .
  ?herkomstSuper skos:prefLabel ?herkomstSuperLabel .

  # geef per continent de onderliggende geografische termen
  ?herkomstSuper skos:narrower* ?herkomstSub .
  ?herkomstSub skos:prefLabel ?herkomstSubLabel .

  # geef objecten bij de onderliggende geografische termen
  ?cho dct:spatial ?herkomstSub .
  ?cho edm:object ?type . 
  
} #GROUP BY ?herkomstSuper ?herkomstSuperLabel 
`

// fetch data from endpoint
d3.json(url+"?query="+ encodeURIComponent(query) +"&format=json")
    .then(data => data)
    .then(json => {
        
        // pur fetch results in variable
        let data = json.results.bindings

        //map over data objects and make new array filled with modified objects
        const objectsArray = data
            .map(object => {
                
                object.amount = parseInt(object.amount.value)
                object.type = object.typeLabel.value
                object.origin = object.herkomstSuperLabel.value

                return object
            })
        //invoke the renderGraph function and pass the new array with it
        renderGraph(objectsArray)
    })




function renderGraph(objectsArray) {

    //select the svg element in index.html
    const svg = d3.select('svg');
    //sets height and width to height and width of svg element
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    //sets x and y values to the values of amount and origin
    const xValue = d => d.amount;
    const yValue = d => d.origin;
    const margin = { top: 40, right: 30, bottom: 150, left: 120 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(objectsArray, xValue)])
        .range([0, innerWidth])
        .nice();
  
    const yScale = d3.scalePoint()
        .domain(objectsArray.map(yValue))
        .range([0, innerHeight])
        .padding(0.7);
  
  
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
    g.append('g')
        .call(d3.axisLeft(yScale)
            .tickSize(-innerWidth))
  	    .append('text')
  	    .attr('fill', 'black');
  	    //.attr('y', innerHeight /2)
  	    //.text('Continenten');
  
    g.append('g')
        .call(d3.axisBottom(xScale)
            .tickSize(-innerHeight))
  	    .attr('transform', `translate(0, ${innerHeight})`)
        .append('text')
  	    .attr('y', 60)
  	    .attr('x', innerWidth / 2)
  	    .attr('fill', 'black')
  	    .text('Aantal pijpen');

    //makes an ordinal color scale for each type
    const color = d3.scaleOrdinal()
        .domain(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen" ])
        .range([ "#FF0047", "#FF8600", "#6663D5", "#FFF800"]);
  
    //draw the circles in the graph
	g.selectAll('circle')
        .data(objectsArray)
  	    .enter()
        .append('circle')
            .transition()
  			.attr('cy', d => yScale(yValue(d)))
  			.attr('cx', d => xScale(xValue(d)))
  			.attr('r', 15)
            .style('fill', d => { return color(d.type) } );
    
    //got his piece of code from Ramon, who got it from Laurens' code at https://beta.vizhub.com/Razpudding/921ee6d44b634067a2649f738b6a3a6e
    const legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
            legend.append("rect")
            .attr("x", innerWidth /3)
            .attr('y', innerHeight+70)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);
            legend.append("text")
            .attr("x", innerWidth / 3)
            .attr("y", innerHeight +79)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text( d => { return d; })

    //sets the graph title
    g.append('text')
        .attr('y', -10)
          .text('Aantal rookgerei naar type en continent')
          
}
