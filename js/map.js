ymaps.ready(init);

function init(){
  var map = new ymaps.Map('map',{
    center:[59.896317, 30.424305],
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });
  var placemark = new ymaps.Placemark([59.97, 30.31],{
    



  },
  {
    iconLayout: 'default#image',
    iconImageHref: './img/map/map-marker.png',
    iconImageSize: [46,57],
  
  });
  map.geoObjects.add(placemark);
}