export default function filterData(data){
    //map over data objects and make new array filled with modified objects
const objectsArray = data
    .map(object => {
        return{

        origin: object.herkomstSuperLabel.value,
        type: object.typeLabel.value,
        amount: +object.amount.value

        }
    })
    //console.log("objectsarray: ", objectsArray)
    return objectsArray
}