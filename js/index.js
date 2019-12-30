//console.log(d3.symbol())

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
    .then(json => {
        // put fetch results in variable
        let data = json.results.bindings
        //transformData(data)
        return data
    })
    .then(data => transformData(data))
    .then(transformData => nestData(transformData))
    .then(nestData => renderGraph(nestData))
    


function transformData(data){
        //map over data objects and make new array filled with modified objects
    const objectsArray = data
        .map(object => {
            return{

            origin: object.herkomstSuperLabel.value,
            type: object.typeLabel.value,
            amount: parseInt(object.amount.value)

            }
        })
        //console.log("objectsarray: ", objectsArray)
        return objectsArray
}

function nestData(objectsArray){

    const destructuredArray = objectsArray.map(element => {
        let destructure = Object.entries(element);
        //flatten each array in object
        let flatArrays = destructure.flat();
        //filter out type and amount keys, resource used: https://flaviocopes.com/how-to-remove-item-from-array/
        let modifiedArrays = flatArrays.filter( item => item !== 'type' && item !== 'amount');
        //returns the filtered arrays
        //console.log('modifiedArrays: ', modifiedArrays)
        
        // if(flatArrays.includes('Amerika')){
        //    let lol = newArray.push(flatArrays)
           
        // }
        
    //https://medium.com/@Dragonza/four-ways-to-chunk-an-array-e19c889eac4
    function chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
}

let pairedValues = chunk(modifiedArrays, 2)


//console.log(modifiedArrays)

// let newArray = []

// if(modifiedArrays.includes('Amerika')){
    
//     console.log(modifiedArrays)
    
// }

// modifiedArrays.forEach(element => {
    
//         console.log(element)
// })

//resource used: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
//const obj = Object.fromEntries(chunk(modifiedArrays, 2))
//console.log(Object.values(obj))
//console.log(obj)
// if(obj.origin == 'Amerika'){
//     console.log(obj)
// }


return modifiedArrays

    });


    let amerikaArray = [];
    let azieArray = [];
    let eurazieArray = [];
    let afrikaArray = [];
    let oceanieArray = [];
    const completeArray = [];

    for (let key in destructuredArray){
        //console.log(destructuredArray[key])

        if(destructuredArray[key].includes('Amerika')){
            
            amerikaArray = amerikaArray.concat(destructuredArray[key])
        }else if(destructuredArray[key].includes('Afrika')){
            
            afrikaArray = afrikaArray.concat(destructuredArray[key])
        }else if(destructuredArray[key].includes('Azië')){
            
            azieArray = azieArray.concat(destructuredArray[key])
        }
        else if(destructuredArray[key].includes('Eurazië')){
            
            eurazieArray = eurazieArray.concat(destructuredArray[key])
        }
        else if(destructuredArray[key].includes('Oceanië')){
            
            oceanieArray = oceanieArray.concat(destructuredArray[key])
        }   
    }
    
    completeArray.push(Object.fromEntries(chunk(amerikaArray, 2)))
    completeArray.push(Object.fromEntries(chunk(azieArray, 2)))
    completeArray.push(Object.fromEntries(chunk(eurazieArray, 2)))
    completeArray.push(Object.fromEntries(chunk(afrikaArray, 2)))
    completeArray.push(Object.fromEntries(chunk(oceanieArray, 2)))

    //console.log(completeArray)
    return completeArray
}

function chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
}

function renderGraph(result){

    console.log('Result', result)

    let stack = d3.stack()
    .keys(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen"])
    .order(d3.stackOrderAscending)
    .offset(d3.stackOffsetNone);

    let series = stack(result)

    console.log('series: ',series)

        //select the svg element in index.html
        const svg = d3.select('svg');
        //sets height and width to height and width of svg element
        const width = +svg.attr('width');
        const height = +svg.attr('height');
        //sets x and y values to the values of amount and origin
        //const xValue = d => d.amount;
        const yValue = d => d.origin;
        const margin = { top: 40, right: 30, bottom: 150, left: 120 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
      
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
            .range([0, innerWidth])
            .nice();

            console.log('xschaal ', xScale.domain())

      
        const yScale = d3.scaleBand()
            .domain(result.map(yValue))
            .range([0, innerHeight])
            .padding(0.55);
      
      
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
        g.append('g')
            .call(d3.axisLeft(yScale))
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
            .range([ "#FF0047", "#FF8600", "#6663D5", "#FFF800", "#29FF3E"]);
      

        const tooltip = d3.select("body").append("div").attr("class", "toolTip");

                    //draw the circles in the graph
                    // g.selectAll('rect')
                    // .data(series.map(d => {return d}))
                    // .enter()
                    // .append('rect')
                    //     .attr('y', d => yScale(yValue(d)))
                    //     //.attr('x', d => d[1])
                    //     .attr('width', d => d[0])
                    //     .style('fill', d => { return color(d.type) } )

                    g.append("g")
                    .selectAll("g")
                    .data(series)
                    .join("g")
                      .attr("fill", d => color(d.key))
                    .selectAll("rect")
                    .data(d => d)
                    .join("rect")
                      //.attr("x", (d, i) => x(d.data.name))
                      .attr("y", d => yScale(d.data.origin))
                      .attr("x", d => xScale(d[0]))
                      .attr("height", "30px")
                      .attr("width", d => xScale(d[1]) - xScale(d[0]))
                      //.attr("width", d => console.log(d));


        
        //got his piece of code from Ramon, who got it from Laurens' code at https://beta.vizhub.com/Razpudding/921ee6d44b634067a2649f738b6a3a6e
        const legend = g.selectAll(".legend")
                .data(color.domain())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
                .on("mouseenter", d => {
                    console.log(d)
                });
                legend.append("rect")
                .attr("x", innerWidth /3)
                .attr('y', innerHeight+70)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color)
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


