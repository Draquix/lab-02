'use strict';
console.log('script is connected');
function Horn (img,title,desc,keyword,horns) {
    this.img = img;
    this.title = title;
    this.description = desc;
    this.keyword = keyword;
    this.horns = horns;
} 

Horn.prototype.render = function (){
    
    const $template = $('#photo-template').clone();
    const $h2 = $template.find('h2');
    $h2.text(this.title);
    const $image = $template.find('img');
    $image.attr('src', this.img);
    $image.attr('alt', this.keyword);
    $template.find('p').text(this.description);

    $('main').append($template);
}

const chameleon = new Horn("https://imgc.allpostersimages.com/img/print/posters/dlillc-jackson-s-chameleon_a-G-13448768-14258384.jpg",
"Serious Jackson's Chameleon",
"This one is very serious.",
"chameleon",
3);

chameleon.render();
