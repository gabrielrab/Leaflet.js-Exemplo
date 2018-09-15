      var customLabel = {
        restaurant: {
          label: 'R'
        },
        bar: {
          label: 'B'
        }
      };

        function initMap() { // Aqui começa a parte do mapa INICIA ELE
                      
        //Cria uma variavel para receber o mapa
        var map = new google.maps.Map(document.getElementById('map'), {
            //Aqui é a definição de onde o mapa deve iniciar
          center: new google.maps.LatLng(-20.189540, -44.751045),
            //Aqui define o zoom inical do mapa
          zoom: 17
        });
        var infoWindow = new google.maps.InfoWindow({map :map});
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var pos = {
                    lat : position.coords.latitude,
                    lng : position.coords.longitude
                    
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Estou aqui");
                map.setCenter(pos);
    
            }, function (){
                hendleLocationError(true, infoWindow, map.getCenter());
            });
        }

// ---------- AQUI COMEÇA A PARTE QUE BUSCA OS PONTOS CADASTRADOS NO BANCO DE DADOS ----------
            
          downloadUrl('resultado.php', function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
              var id = markerElem.getAttribute('id');
              var name = markerElem.getAttribute('name');
              var address = markerElem.getAttribute('address');
              var type = markerElem.getAttribute('type');
              var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('lat')),
                  parseFloat(markerElem.getAttribute('lng')));

              var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = name
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));
             
              var text = document.createElement('text');
              text.textContent = address
              infowincontent.appendChild(text);
              infowincontent.appendChild(document.createElement('br'));
              
              var pa = document.createElement('option');
              pa.setAttribute('id', 'link');
              pa.setAttribute('onclick', 'evento('+id+')');
              pa.setAttribute('value', id);
              pa.textContent = 'Informar Localidade do Ônibus'
              infowincontent.appendChild(pa);
    
             
              var icon = customLabel[type] || {};
              var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
              });
              marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
              });
            });
          });
            
// ---------- TERMINO DO NO BANCO DE DADOS ----------
        } // Fecha a funçao intMAp NAO APAGAR



      function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
      }

      function doNothing() {}