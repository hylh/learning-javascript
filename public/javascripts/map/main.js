var map;
function initMap() {
    let tromso = {lat: 69.649208, lng:18.955324};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: tromso
    });
    var marker = new google.maps.Marker({
        position: tromso,
        map: map
    });
}
function newPositionOne() {
    let uluru = {lat: -25.363, lng: 131.044};
    map.setCenter(uluru);
}