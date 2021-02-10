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
    $template.removeAttr('id');
    $template.attr('id',this.keyword);
    console.log($template.attr('id'));
  
    const $h2 = $template.find('h2');
    $h2.text(this.title);
    console.log('within render function, h2:',this.title);
    const $image = $template.find('img');
    $image.attr('src', this.img);
    $image.attr('alt', this.keyword);
    $template.find('p').text(this.description);
    console.log($template);
    $('main').append($template);
}



$.ajax('data/page-1.json').then(callStuffBack => {
    console.log(callStuffBack);
    const horns = [];
    callStuffBack.forEach( (horner) => {
        horns.push(new Horn(horner.image_url,horner.title,horner.description,horner.keyword,horner.horns));
        $('select').append(`<option value="${horner.keyword}">${horner.keyword}</option>`);
        console.log('json horners:',horner);
    });
    
    horns.forEach(horner => { horner.render();});
})