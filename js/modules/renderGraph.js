export default function renderGraph(data){
//the horizontal bar chart i made using Curran Kelleher's tutorial: https://www.youtube.com/watch?v=NlBt-7PuaLk&t=800s

    //stack the smokingtools
    let stack = d3.stack()
    .keys(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen"])
    .order(d3.stackOrderAscending)
    .offset(d3.stackOffsetNone);

    
    //gice the stack function the cleaned data
    let series = stack(data)

        //select the svg element in index.html
        const svg = d3.select('svg');
        //sets height and width to height and width of svg element
        const width = +svg.attr('width');
        const height = +svg.attr('height');
        //sets x and y values to the values of amount and origin

        const yValue = d => d.origin;
        const margin = { top: 40, right: 30, bottom: 150, left: 120 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
      
        //set the xscale to the highest value in series, d[1] is selected because the second array index is always the higher one
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
            .range([0, innerWidth])
            .nice();
        //the origin names are spread over the y value
        const yScale = d3.scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(0.1);
      
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
        //append a new group for the y axis and set it on the left side
        g.append('g')
            .call(d3.axisLeft(yScale)
                .tickSize('0'))
              .append('text')
              .attr('fill', 'black');
      
        //append a new group for the x axis and set it at as the bottom axis
        g.append('g')
            .call(d3.axisBottom(xScale)
                //sets ticklines on the x axis
                .tickSize(-innerHeight))
            .attr('transform', `translate(0, ${innerHeight})`)
            .append('text')
            .attr('y', 60)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text('Aantal pijpen');
    
        //makes an ordinal color scale for each type
        const color = d3.scaleOrdinal()
            //.domain(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen" ])
            .range([ '#FF0047', '#FF8600', '#6663D5', '#FFF800', '#29FF3E' ]);
      
        //source: https://observablehq.com/@d3/stacked-bar-chart
        //append a new group and fill each group with the value of that type and color
        g.append("g")
            .selectAll("g")
            .data(series)
            .join("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("y", d => yScale(d.data.origin))
            .attr("x", d => xScale(d[0]))
            .attr("height", yScale.bandwidth())
            .attr("width", d => xScale(d[1]) - xScale(d[0]))
                      
                      
                      //.attr("width", d => console.log(d));

        //got his piece of code from Ramon, who got it from Laurens' code at https://beta.vizhub.com/Razpudding/921ee6d44b634067a2649f738b6a3a6e
        const legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
                legend.append("rect")
                .attr("x", 630 + innerWidth /3)
                .attr('y', innerHeight+70)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color)
                legend.append("text")
                .attr("x", 630 + innerWidth / 3)
                .attr("y", innerHeight + 79)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text( d => { return d; })
                //.attr('fill', 'white')
                
    
        //sets the graph title
        g.append('text')
            .attr('y', -10)
              .text('Aantal rookgerei naar type en continent')
              //.attr('fill', 'white')
}