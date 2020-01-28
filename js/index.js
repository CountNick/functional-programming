import filterData from './modules/filterData.js';
import renderGraph from './modules/renderGraph.js'
import checkKeys from './modules/checkKeys.js'
import fetchData from './modules/fetchData.js'

    
fetchData()
    .then(data => filterData(data))
    .then(filterData => transformObjects(filterData))
    .then(transformObjects => renderGraph(transformObjects))


function transformObjects(data){

    const modifiedObjectsArray = data.map(object => {

        // resource: https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
        let clean = {origin: object.origin, [object.type]: object.amount} 

        return clean

    });

    const complete = mergeObjects(modifiedObjectsArray)

    //fix empty values
    checkKeys(complete)

    return complete
}

function mergeObjects(data){
    //intialize empty objects for each origin
    const amerikaObject = {};
    const afrikaObject = {};
    const asiaObject = {};
    const eurAsiaObject = {};
    const oceaniaObject = {};
    const complete = [];

data.map( object => {

        //resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        if(object.origin == 'Amerika') Object.assign(amerikaObject, object)
        else if(object.origin == 'Afrika') Object.assign(afrikaObject, object)
        else if(object.origin == 'Azië') Object.assign(asiaObject, object)
        else if(object.origin == 'Eurazië') Object.assign(eurAsiaObject, object)
        else if(object.origin == 'Oceanië') Object.assign(oceaniaObject, object)
        
    });

    //push each individual object to the complete data array
    complete.push(amerikaObject)
    complete.push(afrikaObject)
    complete.push(asiaObject)
    complete.push(eurAsiaObject)
    complete.push(oceaniaObject)

    //return the complete data array
    return complete
}
