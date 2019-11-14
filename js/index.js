//choose a character to add to the start of a string
const chosenCharacter = "#";

let data = d3.csv("kleurOgen.csv")
        .then(data => checkStartCharacter(data))
        .then(checkStartCharacter => setStartCharacter(checkStartCharacter))
        .catch(err => console.error(err))

function checkStartCharacter(listToClean){
        //maps over the array it needs to clean
        const newHashArray = listToClean
                            .map(hexItem => {
                                //save in varaible for better readability
                                let newValue = hexItem["Kleur ogen (HEX code bijv.  #ff5733  )"]
                                //sets all characters to uppercase
                                newValue = newValue.toUpperCase()
                                //return the modified value
                                return newValue
                            })
                            //returns the newly made array
                            return newHashArray
}

//gets the newly made array as parameter
function setStartCharacter(newHashArray){
        //maps over every item in array and checks the start character of each value             
        const newArray = newHashArray
                            .map(chosenItem => {
                                //if doesn't start with a chosencharacter add the chosencharacter to start of each value
                                if(!chosenItem.startsWith(chosenCharacter, 0)) chosenItem = chosenCharacter + chosenItem
                                //if it's longer or shorter than 7 characters which would mean it's no hexcode, replace with null
                                if(chosenItem.length < 7 || chosenItem.length > 7) chosenItem = null
                                //return modified values
                                return chosenItem
                            })
                            //show the newly made array with the modified values
                            console.log(newArray)
                    }