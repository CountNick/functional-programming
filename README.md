# functional-programming

## changes made for resit

* Code is now rendering a legit stacked bar chart
![stackImg](https://i.imgur.com/IHmm6HL.png)
* Data transformation pattern
* Non existant values are now being added and given a value of 0 to prevent NaN errors when rendering the chart

* Code is split up in modules:
  * [data fetching module](https://github.com/CountNick/functional-programming/blob/master/js/modules/fetchData.js)
    * this function uses the metch method and passes the data to the next function
  * [data filtering module](https://github.com/CountNick/functional-programming/blob/master/js/modules/filterData.js)
    * this function returns only the key values neccessary to make the data visualisation
  * [object transformation module](https://github.com/CountNick/functional-programming/blob/master/js/modules/modifyObjects.js)
    * this function merges the type and amount of each object 
  * [check object keys module](https://github.com/CountNick/functional-programming/blob/master/js/modules/checkKeys.js)
    * this function checks whether some keys exist whithin an object. When an object doesn't have one or more of these keys it gets added and the value will be set to 0
  * [render graph module](https://github.com/CountNick/functional-programming/blob/master/js/modules/renderGraph.js)
    * this function receives the transformed data and makes use of d3's stack function

## functional pattern / data transformation

[What makes it functional you ask?](https://github.com/CountNick/functional-programming/wiki/3.6-What-makes-it-functional%3F)

I wanted to make use of the D3 stack function as seen in [this example](https://observablehq.com/@d3/stacked-bar-chart) by Mike Bostock. But for this to work the data had to be transformed from this hierarchy:

```javascript

0: {origin: "Amerika", type: "opiumpijpen", amount: 2}
1: {origin: "Afrika", type: "tabakspijpen", amount: 51}
2: {origin: "Azië", type: "waterpijpen", amount: 103}
3: {origin: "Afrika", type: "pijpen (rookgerei)", amount: 321}
4: {origin: "Amerika", type: "hasjpijpen", amount: 1}
5: {origin: "Eurazië", type: "tabakspijpen", amount: 2}
6: {origin: "Oceanië", type: "tabakspijpen", amount: 39}
7: {origin: "Afrika", type: "waterpijpen", amount: 2}
8: {origin: "Oceanië", type: "pijpen (rookgerei)", amount: 30}
9: {origin: "Azië", type: "pijpen (rookgerei)", amount: 193}
10: {origin: "Eurazië", type: "pijpen (rookgerei)", amount: 9}
11: {origin: "Afrika", type: "hasjpijpen", amount: 1}
12: {origin: "Azië", type: "opiumpijpen", amount: 146}
13: {origin: "Amerika", type: "tabakspijpen", amount: 11}
14: {origin: "Azië", type: "tabakspijpen", amount: 193}
15: {origin: "Amerika", type: "pijpen (rookgerei)", amount: 81}

```

into this:

```javascript

0: {origin: "Amerika", opiumpijpen: 2, hasjpijpen: 1, tabakspijpen: 11, pijpen (rookgerei): 81, …}
1: {origin: "Afrika", tabakspijpen: 51, pijpen (rookgerei): 321, waterpijpen: 2, hasjpijpen: 1, …}
2: {origin: "Azië", waterpijpen: 103, pijpen (rookgerei): 193, opiumpijpen: 146, tabakspijpen: 193, …}
3: {origin: "Eurazië", tabakspijpen: 2, pijpen (rookgerei): 9, waterpijpen: 0, opiumpijpen: 0, …}
4: {origin: "Oceanië", tabakspijpen: 39, pijpen (rookgerei): 30, waterpijpen: 0, opiumpijpen: 0, …}

```
This had to be done in order to use the [d3 stack function](https://github.com/d3/d3-shape/blob/master/README.md#stacks).

The stack function is used in the following manner: 

```javascript
//stack the smokingtools
let stack = d3.stack()
.keys(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen"])
.order(d3.stackOrderAscending)
.offset(d3.stackOffsetNone);

//give the stack function the cleaned data
let series = stack(data)
```

this produces the following:

```javascript

  [[0, 1], [0, 1], [0,  0], [0,  0], [0, 0], data: {…}] // hasjpijpen
  [[1, 1], [1, 3], [0, 103], [0, 0], [0, 0], data: {…}], // waterpijpen
  [[1, 3], [3, 3], [103, 249], [0, 0], [0, 0], data: {…}], // opiumpijpen
  [[3, 14], [3, 54], [249, 442], [0, 2], [0, 39], data: {…}] // tabakspijpen


```
[Check wiki for in depth explenation](https://github.com/CountNick/functional-programming/wiki/3.5-Making-the-stacked-bar-chart)

## [checkout the data ](https://github.com/CountNick/functional-programming#2---data-1)

### __sources__

I followed [this tutorial by Curran Kelleher](https://www.youtube.com/watch?v=NlBt-7PuaLk&t=800s) to render the basic layout for rendering the barchart using d3.

In order to make the visualisation i studied [this example by Mike Bostock](https://observablehq.com/@d3/stacked-bar-chart).

[async data fetch by Nick Shoup](https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp)

#### To help understanding selection.join :

* [Selection.join by Mike Bostock](https://observablehq.com/@d3/selection-join)

* [The new D3.js Join method is awesome for teaching](https://fabiofranchino.com/blog/the-new-d3.js-join-method-is-awesome-for-t/)

#### Modules:

* [JS modules on MDN](https://www.google.com/search?q=js+modules+how+to+use&rlz=1C5CHFA_enNL716NL718&oq=js+modules+how+&aqs=chrome.1.69i57j0l2.3675j1j7&sourceid=chrome&ie=UTF-8)



## __The old code is [still visible here](https://github.com/CountNick/functional-programming/tree/gh-pages)__





## Introduction

For the course functional-programming a CMDA we were given the excercise to make a data visualisation using the D3 library in javascript. In this repository you will find my code project as well as my [documentation](https://github.com/CountNick/functional-programming/wiki)

### [Checkout the live demo here!](https://countnick.github.io/functional-programming/)
![demoImg](https://i.imgur.com/N1vvuSj.png)

## Contents

* ### [1 - Concept](#1-Concept)
* ### [2 - Data](#2-data)
* ### [3 - Functional pattern](#3-Functional-pattern)
* ### [4 - Installation](#4-Installation)


## 1 - Concept 

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

One of the assignments was to write a functional piece of code. I wrote a piece of functional code to clean up the data from the survey we filled in at school. The row i chose to clean up was the eye color row. The piece of functional code i wrote is found on [this page](https://github.com/CountNick/functional-programming/blob/master/js/index.js). If you want to read more about my proces of reading this piece of code check out [the project wiki](https://github.com/CountNick/functional-programming/wiki/3.4-Data-transformation-for-stacked-bar-chart). The pattern first sets every hexcode to uppercase, after that it checks whether each value starts with a #. If it doesn't it pastes a # to the start of each value. After this is done the values get passed to a new array which checks the length. A hexcode needs 7 characters, if it does not have 7 characters it's not a hexcode. If it's not a hexcode its value gets set to null.

## 4 - Installation:cd:

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)


* `git clone https://github.com/CountNick/functional-programming.git`

Open the index.html file in your browser to see the project
