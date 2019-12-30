# functional-programming

## Introduction

For the course functional-programming a CMDA we were given the excercise to make a data visualisation using the D3 library in javascript. In this repository you will find my code project as well as my [documentation](https://github.com/CountNick/functional-programming/wiki)

### [Checkout the live demo here!](https://countnick.github.io/functional-programming/)
![demoImg](https://i.imgur.com/N1vvuSj.png)

## Contents

* ### [1 - Concept](#1-Concept)
* ### [2 - Data](#2-data)
* ### [3 - Functional pattern](#3-Functional-pattern)
* ### [4 - Installation](#4-Installation)


## 1 - Concept - *Nieuwe afbeelding*

The concept is a stacked bar chart that visualizes the amounts of smoke pipes that are in the collection of the museums. The colors represent the types of pipes(opiumpipes, tobaccopipes etc.) and they are grouped by the continent they originate from. If you want to read through my whole concept checkout [the project Wiki](https://github.com/CountNick/functional-programming/wiki/2.3---Concept)

![ConceptImg](https://i.imgur.com/CKsA8Fr.png)

## 2 - Data

To realise this visualisation i needed to get every continet, every type of smoking tool and the amount of each smoking tool from each continent.

I made use of the follwing query, which i tweaked from one of Ivo's examples:

```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?herkomstSuper ?herkomstSuperLabel ?typeLabel (COUNT(?cho) AS ?amount) 
WHERE {
  # geef ruilmiddelen
  <https://hdl.handle.net/20.500.11840/termmaster14607> skos:narrower* ?type .
  ?type skos:prefLabel ?typeLabel .

  # geef de continenten
  <https://hdl.handle.net/20.500.11840/termmaster2> skos:narrower ?herkomstSuper .
  ?herkomstSuper skos:prefLabel ?herkomstSuperLabel .

  # geef per continent de onderliggende geografische termen
  ?herkomstSuper skos:narrower* ?herkomstSub .
  ?herkomstSub skos:prefLabel ?herkomstSubLabel .

  # geef objecten bij de onderliggende geografische termen
  ?cho dct:spatial ?herkomstSub .
  ?cho edm:object ?type . 
  
} #GROUP BY ?herkomstSuper ?herkomstSuperLabel 
```

Once the json is loaded you get everything as a string value, even the numeric values. I fixed this by using the parseInt function to turn every string that needs to be a number in a number: 

```javascript
object.amount = parseInt(object.amount.value)
```

## 3 - Functional pattern

I wanted to make use of the D3 stack function as seen in [this example](https://observablehq.com/@d3/stacked-bar-chart) by Mike Bostock. But for this to work the data had to be transformed from this hierarchy:

```javascript

{origin: "Azië", type: "opiumpijpen", amount: 2}

```

into this:

```javascript

{origin: "Azië", waterpijpen: 103, pijpen: 193, opiumpijpen: 146, tabakspijpen: 193}

```


One of the assignments was to write a functional piece of code. I wrote a piece of functional code to clean up the data from the survey we filled in at school. The row i chose to clean up was the eye color row. The piece of functional code i wrote is found on [this page](https://github.com/CountNick/functional-programming/blob/master/js/index.js). If you want to read more about my proces of reading this piece of code check out [the project wiki](https://github.com/CountNick/functional-programming/wiki/3.2-Data-cleaning). The pattern first sets every hexcode to uppercase, after that it checks whether each value starts with a #. If it doesn't it pastes a # to the start of each value. After this is done the values get passed to a new array which checks the length. A hexcode needs 7 characters, if it does not have 7 characters it's not a hexcode. If it's not a hexcode its value gets set to null.

## 4 - Installation:cd:

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)


* `git clone https://github.com/CountNick/functional-programming.git`

Open the index.html file in your browser to see the project
