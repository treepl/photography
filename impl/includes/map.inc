{% component type: "module", source: "Google Map", layout: "", collectionVariable: "map" %}
<section class="map-section" width="1920" height="615">
    <div class="google-map-holder" id="mapHolder" style="width:1920px; height:450px;"></div>
</section>
<script>
    $(function(){
        initGoogleMaps();
    });

    function initGoogleMaps() {
        var condition = $('#mapHolder').length
            // && false
        ;init(condition);

        function init(condition) {
            if(condition || condition == null) {
                var myLatLng = {lat: +'{{map.items[0].LocationLat}}', lng: +'{{map.items[0].LocationLong}}' };
                var mapOptions = {
                    zoom: 12,
                    center: myLatLng,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var mapElement = document.getElementById('mapHolder');
                var map = new google.maps.Map(mapElement, mapOptions);
                var _markers = [
                    {% for item in map.items -%}
                    {% if forloop.last == true -%}
                    ['{{map.items[0].Name}}', +'{{map.items[0].LocationLat}}', +'{{map.items[0].LocationLong}}']
                            {% else -%}
                        ['{{map.items[0].Name}}', +'{{map.items[0].LocationLat}}', +'{{map.items[0].LocationLong}}'],
                    {% endif -%}
                    {% endfor -%}
                ];

                var latlngbounds = new google.maps.LatLngBounds();

                for (var i = 0; i < _markers.length; i++) {
                    var _marker = _markers[i];
                    var myLatLng = new google.maps.LatLng(_marker[1], _marker[2]);
                    var marker = new google.maps.Marker({
                        position: {lat: _marker[1], lng: _marker[2]},
                        map: map,
                        icon: "{{siteinformation.site_information.map_marker}}",
                        title: _marker[0]
                    });
                    latlngbounds.extend(myLatLng);
                }

                if(_markers.length > 1) {
                    map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));
                }
            }
        }
    }
</script>