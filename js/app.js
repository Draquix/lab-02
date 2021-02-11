'use strict';
console.log('script is connected');
let pageNumber = 1;
function Horn (img,title,desc,keyword,horns) {
    this.image_url = img;
    this.title = title;
    this.description = desc;
    this.keyword = keyword;
    this.horns = horns;
} 

Horn.prototype.render = function (){
    const htmlTemplate = $('#photo-template').html();
    const hornObject = this;
    const renderedHornObject = Mustache.render(htmlTemplate, hornObject);
    $('section').append(renderedHornObject);
}

const horns2 = [];
const horns = [];

$.ajax('data/page-1.json').then(callStuffBack => {
    console.log(callStuffBack);

    callStuffBack.forEach( (horner) => {
        horns.push(new Horn(horner.image_url,horner.title,horner.description,horner.keyword,horner.horns));
        $('select').append(`<option value="${horner.keyword}">${horner.keyword}</option>`);
        console.log('json horners:',horner);
    });

    
    $('select').change( function () {
        const choice = $('select').find(':selected').text();
        console.log(choice);
        $('div').hide();
        $(`.${choice}`).show();
    });
    horns.forEach(horner => { horner.render();});
})

$.ajax('data/page-2.json').then(callStuffBack => {
        callStuffBack.forEach( (horner) => {
        horns2.push(new Horn(horner.image_url,horner.title,horner.description,horner.keyword,horner.horns));
        $('select').append(`<option value="${horner.keyword}">${horner.keyword}</option>`);
    });

    
    $('select').change( function () {
        const choice = $('select').find(':selected').text();
        console.log(choice);
        $('div').hide();
        $(`.${choice}`).show();
    });
    
})
function showPage(page) {
    console.log(`page ${page} clicked`);
    if ( page === 1 ) {
        pageNumber = 1;
        $('section').empty();
        horns.forEach(horner => { horner.render();});
    }
    if ( page === 2 ) {
        pageNumber = 2;
        $('section').empty();
        horns2.forEach(horner => { horner.render();});
    }
}

function showForHorns(numHorns) {
    console.log(pageNumber);
    $('section').empty();
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