import { StationsService } from 'src/app/services/Stations.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Station } from '../model/Station';
import { Circuit } from '../model/Circuit';
import { Marker } from '../model/Marker';
import 'leaflet-routing-machine';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  stations!: Station[];
  markers!: Marker[];
  markerGroup: L.LayerGroup = L.layerGroup();
  map!: L.Map;
  myIcon!: L.Icon;

  constructor(
    private StationsService: StationsService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  loadmarkers() {
    this.StationsService.getstations().subscribe(data => {
      this.stations = data;
      const markerArray: L.Marker[] = [];
      const polylinePoints: L.LatLng[] = []; // Array to store polyline points
      let totalDistance = 0; // Variable to store the total distance
      
      data.forEach((element, index) => {
        const marker = L.marker([element.latitude, element.longitude], { icon: this.myIcon });
        marker.addTo(this.markerGroup).bindPopup(element.lieu);
        markerArray.push(marker);
        this.addMarkerLabel(marker, element.lieu);
        
        polylinePoints.push(marker.getLatLng()); // Add marker position to polyline points
        
        if (index > 0) {
          const previousMarker = markerArray[index - 1];
          const currentMarker = marker;
          
          const distance = previousMarker.getLatLng().distanceTo(currentMarker.getLatLng());
          totalDistance += distance;
          
          const line = L.polyline([previousMarker.getLatLng(), currentMarker.getLatLng()], { color: 'blue' }).addTo(this.map);
          const distanceLabel = L.tooltip({ permanent: true, direction: 'center', className: 'distance-label-tooltip' })
            .setContent(`Distance: ${distance.toFixed(2)} meters`);
          line.bindTooltip(distanceLabel);
        }
      });
      
      this.markerGroup.addTo(this.map);
      this.zoomToMarkers(markerArray);
      
      if (polylinePoints.length >= 2) {
        const polyline = L.polyline(polylinePoints, { color: 'blue' }).addTo(this.map);
        const animatedMarker = this.animateMarker(polylinePoints, this.myIcon).addTo(this.map);
      }
      
      console.log(`Total Distance: ${totalDistance.toFixed(2)} meters`); // Log the total distance
    });
  }
  
  
  animateMarker(polylinePoints: L.LatLng[], icon: L.Icon): L.Marker {
    let currentIndex = 0;
    const animate = () => {
      const currentLatLng = polylinePoints[currentIndex];
      const marker = L.marker(currentLatLng, { icon: icon });
      marker.addTo(this.map);
      marker.bindTooltip('', {
        permanent: true,
        direction: 'top',
        className: 'marker-label-tooltip'
      }).openTooltip();
  
      if (currentIndex < polylinePoints.length - 1) {
        currentIndex++;
        setTimeout(() => {
          animate();
        }, 2000); // Adjust the animation delay as needed
      }
    };
  
    animate();
    return L.marker(polylinePoints[0]); // Return the initial marker position
  }
  
  
  
  addMarkerLabel(marker: L.Marker, label: string) {
    const icon = L.divIcon({
      className: 'marker-label', // CSS class for styling the label
      html: label
    });
  
    marker.bindTooltip(label, {
      permanent: true,
      direction: 'bottom',
      className: 'marker-label-tooltip' // CSS class for styling the tooltip
    }).openTooltip();
  
    marker.setIcon(icon);
  }
  
  
  calculateTotalDistance(waypoints: L.LatLng[]): number {
    let totalDistance = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const distance = waypoints[i].distanceTo(waypoints[i + 1]);
      totalDistance += distance;
    }
    return totalDistance;
  }
  
  zoomToMarkers(markers: L.Marker[]) {
    const group = L.featureGroup(markers);
    const bounds = group.getBounds();
    if (bounds.isValid()) {
      this.map.fitBounds(bounds);
    }
  }



  ngOnInit() {
    this.map = L.map('map').setView([33.892166, 9.561555], 5);
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(this.map);
    this.loadmarkers();
    this.myIcon = L.icon({
      iconUrl: '../assets/bus.jpg',
      iconSize: [40, 40],
    });
  }
}
