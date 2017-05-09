var map, marker;
let tromso = {lat: 69.649208, lng:18.955324};
function initMap() {
    getLocation().then(function(location){
        let latitude = parseFloat(location[0].latitude);
        let longitude = parseFloat(location[0].longitude);
        $('#latitude').val(latitude);
        $('#longitude').val(longitude);
        let currentPos = {lat: latitude, lng: longitude}
        let options = {
            zoom: 13,
            center: currentPos
        };
        map = new google.maps.Map(document.getElementById('map'), options);
        marker = new google.maps.Marker({
            position: currentPos,
            map: map
        });
    })
}

function newPositionOne() {
    let latitude = parseFloat($('#latitude').val());
    let longitude = parseFloat($('#longitude').val());
    let newPos = {lat: latitude, lng: longitude};
    map.setCenter(newPos);
    marker.setPosition(newPos);
    saveLocationToDb(latitude, longitude);
}

function saveLocationToDb(lat, lng) {
    const searchString = '/model/location';
    $.post(searchString, {latitude: lat, longitude: lng});
}

function getLocation() {
    const searchString = '/model/location/';
    return $.get(searchString).then(function(data){
        return data;
    });
}