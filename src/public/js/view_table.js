const viewTableDropdown = document.getElementById("view-select");
const viewTableButton = document.getElementById("view-table-button");
const viewTableHeader = document.getElementById("view-header");
const table = document.getElementById("table");
const filter = document.querySelector("#quantity");
const editTableButton = document.getElementById("edit-button");
const viewTableDropdownDatabase = document.getElementById("view-select-database");
const addTableButton = document.getElementById("add-table-button");

addTableButton?.addEventListener("click", (e) => {
    // redirect to specific sub-view that is handled by express.js
    switch (viewTableDropdownDatabase.selectedIndex) {
        case 0:
            window.location.href = "/add-city/city";
            break;
        case 1:
            window.location.href = "/add/country";
            break;
        default:
            window.location.href = "404";
            break;
    }
});

// view report button
viewTableButton.addEventListener("click", (e) => {
    switch (viewTableDropdown.selectedIndex) {
        case 0:
            window.location.href = `/viewer/world_population/`;
            break;
        case 1:
            window.location.href = `/viewer/world_countries_by_population/${filter.value}`;
            break;
        case 2:
            window.location.href = `/viewer/world_countries_by_population_in_region/${filter.value}`;
            break;
        case 3:
            window.location.href = `/viewer/world_countries_by_population_in_continent/${filter.value}`;
            break;
        case 4:
            window.location.href = `/viewer/world_cities_by_population/${filter.value}`;
            break;
        case 5:
            window.location.href = `/viewer/world_cities_by_population_in_region/${filter.value}`;
            break;
        case 6:
            window.location.href = `/viewer/world_cities_by_population_in_district/${filter.value}`;
            break;
        case 7:
            window.location.href = `/viewer/world_cities_by_population_in_country/${filter.value}`;
            break;
        case 8:
            window.location.href = `/viewer/world_cities_by_population_in_continent/${filter.value}`;
            break;
        case 9:
            window.location.href = `/viewer/world_capital_cities_by_population/${filter.value}`;
            break;
        case 10:
            window.location.href = `/viewer/world_capital_cities_by_population_in_region/${filter.value}`;
            break;
        case 11:
            window.location.href = `/viewer/world_capital_cities_by_population_in_continent/${filter.value}`;
            break;
        case 12:
            window.location.href = `/viewer/region_population/${filter.value}`;
            break;
        case 13:
            window.location.href = `/viewer/population_languages/${filter.value}`;
            break;
        case 14:
            window.location.href = `/viewer/district_population/${filter.value}`;
            break;
        case 15:
            window.location.href = `/viewer/country_population/${filter.value}`;
            break;
        case 16:
            window.location.href = `/viewer/continent_population/${filter.value}`;
            break;
        case 17:
            window.location.href = `/viewer/city_population/${filter.value}`;
            break;
        case 18:
            window.location.href = `/viewer/population_in_out_cities_by_continent/${filter.value}`;
            break;
        case 19:
            window.location.href = `/viewer/population_in_out_cities_by_country/${filter.value}`;
            break;
        case 20:
            window.location.href = `/viewer/population_in_out_cities_by_region/${filter.value}`;
            break;
        default:
            window.location.href = "404";
            break;
    }
});
