import filterData from './modules/filterData.js';
import renderGraph from './modules/renderGraph.js';
import fetchData from './modules/fetchData.js';
import modifyObjects from './modules/modifyObjects.js'

    
fetchData()
    .then(data => filterData(data))
    .then(filterData => modifyObjects(filterData))
    .then(modifyObjects => renderGraph(modifyObjects));