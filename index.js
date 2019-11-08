//console.log("D3 to the fucking rescue", d3)


let data = d3.csv("kleurOgen.csv").then(data => {cleanData(data) 
    //console.log(data)

    

    //console.log("Hiero", data)
}).then( cleanData())


//You can change the value here


// makes a new array of colorList

function cleanData(data){
    //choose a character to add to the start of a string
    const chosenCharacter = "#";
const setHashArray = data
                    .map(hexItem => {
                        //sets all characters to uppercase
                        let newValue = hexItem["Kleur ogen (HEX code bijv.  #ff5733  )"]
                        //newvalue = newValue.toUpperCase()
                        newValue.toUpperCase()

                        return setStartCharacter(chosenCharacter, newValue)
                    })//.filter(hexItem => {if (!hexItem.length < 7 || !hexItem.length > 7) return hexItem})
                    
                    
                    function setStartCharacter(chosenCharacter, chosenItem){

                        if(!chosenItem.startsWith(chosenCharacter, 0)){
                            chosenItem = chosenCharacter + chosenItem
                        }
                        if(chosenItem.length < 7 || chosenItem.length > 7){
                            chosenItem = null
                        }
                    
                        return chosenItem
                    }
                    return setHashArray
                }
                
//console.log(setHashArray)