export default function checkKeys(data){
    //give non existent values a key with a value of 0
    //resource to check if key exists: https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object
    //resource to add a value of 0 : https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object
        data.filter( object => {
            if(!('waterpijpen' in object)) Object.assign(object.waterpijpen = 0, object)
            if(!('opiumpijpen' in object)) Object.assign(object.opiumpijpen = 0, object)
            if(!('hasjpijpen' in object)) Object.assign(object.hasjpijpen = 0, object)
        })
}