import checkKeys from './checkKeys.js';
import mergeObjects from './mergeObjects.js';

export default function modifyObjects(data){
    //make a new array filled with modified objects
    const modifiedObjectsArray = data.map(object => {
        // resource: https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
        let clean = {origin: object.origin, [object.type]: object.amount} 
        //return the modified objects
        return clean
    });
    //merge modified objects with same origin
    const cleanData = mergeObjects(modifiedObjectsArray)
    //give non existing keys a key with a value of 0
    checkKeys(cleanData)
    //pass the cleaned data to the renderGraph function
    return cleanData
}