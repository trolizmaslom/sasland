function googleMap(mapWrap){
    function initialize() {
        var myLatlng = new google.maps.LatLng(cordX,cordY);
        var myOptions = {
            zoom: 16,
            center: myLatlng,
            disableDefaultUI: false, //без управляющих елементов
            mapTypeId: google.maps.MapTypeId.ROADMAP, // SATELLITE - снимки со спутника,
        }
        var map = new google.maps.Map(document.getElementById(mapWrap), myOptions);

        var contentString = '<div class="marker-test">'+googleText+'</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var image = 'images/footer-contact-marker.png';   // иконка картинкой

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP, // анимация при загрузке карты
            icon: image //  иконка картинкой
        });

        /*анимация при клике на маркер*/
        marker.addListener('click', toggleBounce);
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
        /*/анимация при клике на маркер*/

        /*По клику открываеться инфоблок*/
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });

        map.set('styles', [
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              { color: '#000000' },
              { weight: 1.6 }
            ]
          }, {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              { saturation: -100 },
              { invert_lightness: true }
            ]
          }, {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              { hue: '#ffff00' },
              { gamma: 1.4 },
              { saturation: 82 },
              { lightness: 96 }
            ]
          }, {
            featureType: 'poi.school',
            elementType: 'geometry',
            stylers: [
              { hue: '#fff700' },
              { lightness: -15 },
              { saturation: 99 }
            ]
          }
        ]);

    }
    initialize();
}


$(document).ready(function(){
    googleMap('google_map'); //id
});

$(window).load(function(){

});