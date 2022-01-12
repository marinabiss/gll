
function initialize() {
    let options = {zooming: false };
    let earth = new WE.map('earth_div', options);
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options).addTo(earth);
    
   
  
    let marker2 = WE.marker([51.2538, -79.3832]).addTo(earth);
    marker2.bindPopup("Ontario is here!", {maxWidth: 120, closeButton: false});
  
    earth.setView([45.2538, -101.3832,], 1.5, );

  }
  