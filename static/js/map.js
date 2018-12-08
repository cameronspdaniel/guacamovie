// Create a map object
const myMap = L.map("map", {
  center: [27, -8.22],
  zoom: 2.5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its score
function markerSize(score) {
  return score * 25000;
}

// Each city object contains the city's name, location and score
let countries = [
  {
    name: "Argentina",
    location: [-38.4161, -63.617],
    score: 7.34
  },
  {
    name: "Aruba",
    location: [12.52, -69.97],
    score: 4.8
  },
  {
    name: "Australia",
    location: [-25.27, 133.77],
    score: 6.69
  },
  {
    name: "Austria",
    location: [47.52, 14.55],
    score: 7.18
  },
  {
    name: "Bahamas",
    location: [25.03, -77.40],
    score: 5.3
  },
  {
    name: "Belgium",
    location: [50.50, 4.47],
    score: 7.28
  },
  {
    name: "Brazil",
    location: [-14.235, -51.925],
    score: 7.78
  },
  {
    name: "Canada",
    location: [56.13, -106.35],
    score: 6.22
  },
  {
    name: "Chile",
    location: [-35.675, -71.54],
    score: 7.03
  },
  {
    name: "China",
    location: [33.91, 101.36],
    score: 7.36
  },
  {
    name: "Colombia",
    location: [4.57, -74.293],
    score: 7.7
  },
  {
    name: "Cuba",
    location: [21.52, -77.78],
    score: 7.5
  },
  {
    name: "Czech Republic",
    location: [49.82, 15.47],
    score: 6.43
  },
  {
    name: "Denmark",
    location: [56.27, 9.5],
    score: 7.14
  },
  {
    name: "Finland",
    location: [61.92, 25.75],
    score: 6.53
  },
  {
    name: "France",
    location: [46.23, 2.2],
    score: 6.85
  },
  {
    name: "Germany",
    location: [51.17, 10.45],
    score: 6.33
  },
  {
    name: "Greece",
    location: [39.07, 21.82],
    score: 6.92
  },
  {
    name: "Hong Kong",
    location: [22.40, 114.11],
    score: 6.95
  },
  {
    name: "Hungary",
    location: [47.16, 19.5],
    score: 7.14
  },
  {
    name: "Iceland",
    location: [64.96, -19.02],
    score: 6.0
  },
  {
    name: "India",
    location: [20.59, 78.96],
    score: 7.68
  },
  {
    name: "Indonesia",
    location: [-.79, 113.92],
    score: 7.8
  },
  {
    name: "Iran",
    location: [32.43, 53.69],
    score: 7.92
  },
  {
    name: "Ireland",
    location: [53.14, -7.7],
    score: 6.86
  },
  {
    name: "Israel",
    location: [31.05, 34.85],
    score: 6.54
  },
  {
    name: "Italy",
    location: [41.87, 12.57],
    score: 6.96
  },
  {
    name: "Jamaica",
    location: [18.11, -77.30],
    score: 6.0
  },
  {
    name: "Japan",
    location: [36.205, 138.25],
    score: 6.98
  },
  {
    name: "Kenya",
    location: [-.0236, 37.9],
    score: 7.4
  },
  {
    name: "Malta",
    location: [35.94, 14.375],
    score: 7.3
  },
  {
    name: "Mexico",
    location: [23.63, -102.55],
    score: 6.89
  },
  {
    name: "Netherlands",
    location: [52.13, 5.29],
    score: 7.11
  },
  {
    name: "New Zealand",
    location: [-40.90, 174.89],
    score: 7.36
  },
  {
    name: "Norway",
    location: [60.47, 8.47],
    score: 6.99
  },
  {
    name: "Palestine",
    location: [31.95, 35.23],
    score: 7.5
  },
  {
    name: "Panama",
    location: [8.54, -80.78],
    score: 6.6
  },
  {
    name: "Peru",
    location: [-9.19, -75.015],
    score: 3.55
  },
  {
    name: "Poland",
    location: [51.92, 19.145],
    score: 6.85
  },
  {
    name: "Portugal",
    location: [39.4, -8.22],
    score: 6.3
  },
  {
    name: "Republic of Macedonia",
    location: [41.6086, 21.745],
    score: 8.1
  },
  {
    name: "Romania",
    location: [45.94, 24.67],
    score: 6.9
  },
  {
    name: "Russia",
    location: [61.52, 105.32],
    score: 6.95
  },
  {
    name: "Saudi Arabia",
    location: [23.886, 45.08],
    score: 7.6
  },
  {
    name: "South Africa",
    location: [-30.56, 22.94],
    score: 6.16
  },
  {
    name: "South Korea",
    location: [35.91, 127.77],
    score: 7.35
  },
  {
    name: "Spain",
    location: [40.46, -3.75],
    score: 7.04
  },
  {
    name: "Sweden",
    location: [60.13, 18.64],
    score: 7.41
  },
  {
    name: "Switzerland",
    location: [46.8, 8.23],
    score: 7.77
  },
  {
    name: "Taiwan",
    location: [23.7, 120.96],
    score: 7.49
  },
  {
    name: "Thailand",
    location: [15.87, 100.99],
    score: 6.97
  },
  {
    name: "UK",
    location: [52.36, -1.17],
    score: 6.67
  },
  {
    name: "USA",
    location: [37.09, -95.71],
    score: 6.22
  },
  {
    name: "Ukraine",
    location: [48.38, 31.1656],
    score: 7.1
  }
];

// Loop through the cities array and create one marker for each city object
for (let i = 0, ii = countries.length; i < ii; i++) {
  L.circle(countries[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "green",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its score
    radius: markerSize(countries[i].score)
  }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Average IMDB Score: " + countries[i].score + "</h3>").addTo(myMap);
};
