let hexColorList = `
#3d9f54
#2271b3
#634e34
#778899
#633616
#18622F
#BCBDD0
777a6e
#33472e

#5B716E
#9FC0C6
39302b
#936A44
#0000ff
6E9E9B
#1EADF4
#9CA89C
#5d9b9b

#45322e
#d2691e
b0c1db
ADD8E6
Bruin
#2A170E
#B0E0E6
#008080
#653024
#386373
#588b96
B5651D
Groen, grijs
#27ae60
#170d03
58737E
#3baaff
#433533
8B4513
#00c750
a85418
0c5b00
#896b1f
#00
471206
201815
#3CA130
#593900
503b38
#81724b
#663300
#008080
595967
#3783af
#38425B
#0000ff

#4A3225
#567787
#518b94
#2e2108
4081aa
#3C0D0D
#A52A2A
#2271b3
#008080

Ff5733
#654321
#6B8C21
#3d671d
#657886
8B572A
#8f6e1a
776536
#8B4513
497DB0
#544832
#53472f
#595c55
#301c0f
#8b4513`


//puts every entry split bij newline in hexColorArray
//const hexColorArray = hexColorList.split("\n");
//New array for cleaned results
let cleanedResultsArray = [];

//toUpperCase?
//loops through every entry 
/*for(let i = 0; i < hexColorArray.length; i++){

    hexColorArray[i] = hexColorArray[i].toUpperCase()
    //checks whether entry starts with # and whether array index is not empty
    if(!hexColorArray[i].startsWith("#", 0) && hexColorArray[i] != ""){
        //Adds # to start of string
        hexColorArray[i] = "#" + hexColorArray[i];
        //check whether string is truely manipulated
        //console.log(hexColorArray[i]);
    }

    cleanedResultsArray.push(hexColorArray[i].split(", "))
    
    
}*/

//You can change the value here
const chosenCharacter = "#"



const setHashArray = hexColorList
                    .split(/\n/)
                    .map(hexItem => {
                        //sets all characters to uppercase
                        hexItem = hexItem.toUpperCase();

                        return setStartCharacter(chosenCharacter, hexItem)
                    }).filter(hexItem => {if (hexItem.length < 7 || hexItem > 7) return null})
                    
                    
                    function setStartCharacter(chosenCharacter, chosenItem){

                        if(!chosenItem.startsWith(chosenCharacter, 0)){
                            chosenItem = chosenCharacter + chosenItem
                        }
                        // if(chosenItem.length < 7 || chosenItem.length > 7){
                        //     chosenItem = null
                        // }
                    
                        return chosenItem
                    }


console.log(setHashArray)

//console.log(newNewArray)

//console.log(hexColorArray)

//console.log("Cleand results for the master: ", cleanedResultsArray)


