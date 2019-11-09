//choose a character to add to the start of a string
const chosenCharacter = "#";

let data = d3.csv("kleurOgen.csv")
        .then(data => checkStartCharacter(data))
        .then(checkStartCharacter => setStartCharacter(checkStartCharacter))
        .then(setStartCharacter => checkLength(setStartCharacter))
        .catch(err => console.error(err))

function checkStartCharacter(listToClean){
        
        const newHashArray = listToClean
                            .map(hexItem => {
                                
                                let newValue = hexItem["Kleur ogen (HEX code bijv.  #ff5733  )"]
                                
                                //sets all characters to uppercase
                                newValue = newValue.toUpperCase()
        
                                return newValue
                            })
                            return newHashArray
}

function setStartCharacter(newHashArray){
                       
        const newArray = newHashArray
                            .map(chosenItem => {

                                if(!chosenItem.startsWith(chosenCharacter, 0)) chosenItem = chosenCharacter + chosenItem
                                
                                if(chosenItem.length < 7 || chosenItem.length > 7) chosenItem = null
                                
                            
                                return chosenItem

                            })

                            console.log(newArray)
                    }

function checkLength(newArray){

}
                
//console.log(setHashArray)