//slider principal
var carousel = document.querySelector('.carousel');
var flkty = new Flickity( carousel, {
  imagesLoaded: true,
  percentPosition: false,
  autoPlay: true,
  lazyLoad: true,
  wrapAround: true,
  setGallerySize: false,
  prevNextButtons: false,
  pauseAutoPlayOnHover: false,
  pageDots:false
});

var imgs = carousel.querySelectorAll('.carousel-cell img');
// get transform property
var docStyle = document.documentElement.style;
var transformProp = typeof docStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

flkty.on( 'scroll', function() {
  flkty.slides.forEach( function( slide, i ) {
    var img = imgs[i];
    var x = ( slide.target + flkty.x ) * -2/3;
    img.style[ transformProp ] = 'translate(' + x  + 'px)';
  });
});
