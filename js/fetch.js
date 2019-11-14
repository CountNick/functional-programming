//console.log(d3.symbol())

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = objectsArray => {
  
  const xValue = row => row.amount;
  const yValue = originRow => originRow.origin;
  const margin = { top: 20, right: 20, bottom: 20, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = d3.scaleLinear()
  	.domain([0, d3.max(objectsArray, xValue)])
  	.range([0, innerWidth])
  	.nice();
  
  const yScale = d3.scalePoint()
  	.domain(objectsArray.map(yValue))
  	.range([0, innerHeight])
  	.padding(0.7)
  
  //check to see if range is right
  console.log(xScale.range())
  
  const g = svg.append('g')
  	.attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  g.append('g')
    .call(d3.axisLeft(yScale));
  
  g.append('g')
    .call(d3.axisBottom(xScale))
  	.attr('transform', `translate(0, ${innerHeight})`);
  
  const color = d3.scaleOrdinal()
    .domain(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen" ])
    .range([ "#FF0047", "#FF8600", "#6663D5", "#FFF800"]);
  
    const symbol = d3.symbol();

	g.selectAll('circle')
    .data(objectsArray)
  	.enter()
    	.append('circle')
  			.attr('cy', d => yScale(yValue(d)))
  			.attr('cx', d => xScale(xValue(d)))
  			.attr('r', 15)
  			.style('fill', d => { return color(d.type) } )

  
}


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


d3.json(url+"?query="+ encodeURIComponent(query) +"&format=json")
    .then(data => data)
    .then(json => {
        
        let data = json.results.bindings

        const objectsArray = data
            .map(object => {
                
                object.amount = +object.amount.value
                object.type = object.typeLabel.value
                object.origin = object.herkomstSuperLabel.value

                return object
            })
            
                let nest = d3.nest()
                .key( d => {return d.origin;})
                .entries(objectsArray)
                console.log( nest)
        //console.log("LOGG", objectsArray)
        render(objectsArray)

    })