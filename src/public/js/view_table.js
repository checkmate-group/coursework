const viewTableDropdown = document.getElementById("view-select");
const viewTableButton   = document.getElementById("view-table-button");
const viewTableHeader   = document.getElementById("view-header");
const table             = document.getElementById("table");

// view report button
viewTableButton.addEventListener("click", e => {
    // redirect to specific sub-view that is handled by express.js
    switch(viewTableDropdown.selectedIndex) {
        case 0:
            window.location.href = "/viewer/world_population/";
            break;
        case 1:
            window.location.href = "/viewer/world_countries_by_population/";
            break;
        case 2:
            window.location.href = "/viewer/world_countries_by_population_in_region/";
            break;
        case 3:
            window.location.href = "/viewer/world_countries_by_population_in_continent/";
            break;  
        case 4:
            window.location.href = "/viewer/world_cities_by_population/";
            break;
        case 5:
            window.location.href = "/viewer/world_cities_by_population_in_region/";
            break;
        case 6:
            window.location.href = "/viewer/world_cities_by_population_in_district/";
            break;
        case 7:
            window.location.href = "/viewer/world_cities_by_population_in_country/";
            break;
        case 8:
            window.location.href = "/viewer/world_cities_by_population_in_continent/";
            break;
        case 9:
            window.location.href = "/viewer/world_capital_cities_by_population/";
            break;
        case 10:
            window.location.href = "/viewer/world_capital_cities_by_population_in_region/";
            break;
        case 11:
            window.location.href = "/viewer/world_capital_cities_by_population_in_continent/";
            break;
        case 12:
            window.location.href = "/viewer/region_population/";
            break;
        case 13:
            window.location.href = "/viewer/population_languages/";
            break;
        case 14:
            window.location.href = "/viewer/district_population/";
            break;
        case 15:
            window.location.href = "/viewer/country_population/";
            break;
        case 16:
            window.location.href = "/viewer/continent_population/";
            break;
        case 17:
            window.location.href = "/viewer/city_population/";
            break; 
        case 18:
            window.location.href = "/viewer/population_in_out_cities_by_continent/";
            break; 
        case 19:
            window.location.href = "/viewer/population_in_out_cities_by_country/";
            break;
        case 20:
            window.location.href = "/viewer/population_in_out_cities_by_region/";
            break;
        default:
            window.location.href = "404";
            break;
    }

});