'use strict';
console.log('script is connected');
// pageNumber is global, we switch it from 1 to 2 depending on which of the two
//pages is selected by the button.
let pageNumber = 1;
//this is the object constructor function. It will be used later by the ajax call that
//loads from the json files. it is important that the keys (ie: this.image_url) match the keywords used in the mustache template
function Horn (img,title,desc,keyword,horns) {
    this.image_url = img;
    this.title = title;
    this.description = desc;
    this.keyword = keyword;
    this.horns = horns;
} 
Horn.prototype.render = function (){
    //the render function will grab the <template id="photo-template"> and set it to a const for use.
    const htmlTemplate = $('#photo-template').html();
    //setting the below const references this object when we make it a parameter of Mustache.render
    const hornObject = this;
    //Mustache will replace all the {{key}} with the values defined in the object as listed in the html and the finished object
    //is set to the below const
    const renderedHornObject = Mustache.render(htmlTemplate, hornObject);
    //this JQuery statement uses the empty <section> in the html as a target to append to.
    //Note: By using 'section' with no id or class this would append the object to any and all sections on the html
    $('section').append(renderedHornObject);
}
//these arrays are global to be used by multiple functions later, and they hold page one and page two's list of objects seperately
const horns2 = [];
const horns = [];
//the ajax loads the json file then the array that is generated full of objects has an arrow function ran upon it
$.ajax('data/page-1.json').then(callStuffBack => {
    console.log(callStuffBack);
//the forEach method iterates through the array performing operations on each item in turn.
    callStuffBack.forEach( (horner) => {
        //that global array to hold the objects gets new Horn objects pushed into it, and the parameters come from the values
        //defined in the json file we loaded.
        horns.push(new Horn(horner.image_url,horner.title,horner.description,horner.keyword,horner.horns));
        //below, the <select> gets options appended to it. I used backtics to write the full tag with the variables inserted in the right places so its writing html tags with their parameters and content the way I want it
        //as each object is loaded the keyword goes into the select tag, cuz we filter with this later. that keyword is set as a class in the
        //parent div in each template
        $('select').append(`<option value="${horner.keyword}">${horner.keyword}</option>`);
        console.log('json horners:',horner);
    });
    //the below calls a function defined later that writes all the content to the page, taking the parameter 1 for the first page of 2
    showPage(1);
})
//this does the same thing as above, but it does it for the 'horns2' array, also it omits populating the select tag with options, as I do that later 
//in the function 'showPage' that is called in the first ajax, and then is also defined in the html as being the onclick handler for the buttons
$.ajax('data/page-2.json').then(callStuffBack => {
        callStuffBack.forEach( (horner) => {
        horns2.push(new Horn(horner.image_url,horner.title,horner.description,horner.keyword,horner.horns));
    });

})
//below is the event handler for the select tag. if there is a .change in the select, it runs the anonymous function    
$('select').change( function () {
    //upon a change to select (meaning that an option is selected) the 'choice' const gets the :selected value.  we'll need it in a minute
    const choice = $('select').find(':selected').text();
    //since all the divs full of content for each object are appended to a section, the JQuery below removes all children elements of it, giving a blank section
    $('section').empty();
    //whether it's page 1 or 2, we'll check a different array full of objects.
    if ( pageNumber === 1) {
        //below we iterate through each object in the horns array
        horns.forEach(horner => {
            //and as it goes through the objects it checks whether that object's keyword property is the same as the value from the select
            if (horner.keyword === choice) {
                //by calling the render method upon the object (was defined as a prototype) we write just the objects that had their keyword match the option selected to the page
                horner.render();
            }
        });
    }
    //this does the same as above, but for the second page as indicated by the variable. as such it uses the 'horns2' array
    if ( pageNumber === 2) {
        horns2.forEach(horner => {
            if (horner.keyword === choice) {
                horner.render();
            }
        });
    }
});
//showPage takes the parameter page. I hardcode the number as '1' when I call it from the ajax loading code. In the HTML
//where I have it set as the onclick="target", the page1 button calls with parameter 1, and the page2 button calls as 2.
function showPage(page) {
    console.log(`page ${page} clicked`);
    if ( page === 1 ) {
        //this sets the global pageNumber because we need it in the filtering functions lower in the code
        pageNumber = 1;
        //we used this before, it takes everything off the page so it can be refilled with what we want
        $('section').empty();
        //this empties the select. if it has page2's stuff in it, we don't want those in the select for page 1
        $('select').empty();
        //we iterate through the array 
        horns.forEach(horner => {
            //this renders the object as we go through the array
            horner.render();
            //this adds the objects keyword to the select
            $('select').append(`<option value="${horner.keyword}">${horner.keyword}</option>`);
        });
    }
    //this does the same stuff as for page 1 but for page 2
    if ( page === 2 ) {
        pageNumber = 2;
        $('section').empty();
        $('select').empty();
        horns2.forEach(horner => { 
            horner.render();
            $('select').append(`<option value="${horner.keyword}">${horner.keyword}</option>`);
        });
    }
}
// this is called as an event handler in the html for the radio buttons
function showForHorns(numHorns) {
    console.log(pageNumber);
    //it empties the section...
    $('section').empty();
    //and below iterates through the horns array and renders the ones that have an amount of horns specified by the radio button
    //it does it for page 1 or page 2
    if ( pageNumber === 1 ) {
        console.log('we are showing page 1');
        horns.forEach(horner => {
            if (horner.horns === numHorns) {
                horner.render();
            }
        });
    }
    if ( pageNumber === 2 ) {
        console.log('this is showing page 2');
        horns2.forEach(horner => {
            if (horner.horns === numHorns) {
                horner.render();
            }
        });
    }
}

showPage(1);