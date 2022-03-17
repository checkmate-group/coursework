const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// config the database connection
const pool = mysql.createPool({
    host: "172.22.0.1",
    port: "3306",
    user: "root",
    password: "password",
    database: "world"
});

router.get("/", (req, res) => {
    return res.render("index");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.get("/viewer", (req, res) => {
    return res.render("viewer");
});
router.get("/about", (req, res) => {
    return res.render("about");
});

router.get("/viewer/world_countries_by_population", (req, res) => {
    pool.getConnection((err, connection) => {
        let query = "select Code,Name,Continent,Region,Population,Capital from country order by population desc";

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("Error: world_countries_by_population failed to obtain data");
                return;
            }

            res.render("viewer", { name: "world_countries_by_population", data});
        });
    });  
});


router.get('/viewer/world_countries_by_population_in_region', (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select Code,Name,Continent,Region,Population,Capital from country order by region,population desc";

        connection.query(query, (err, data) => {

            connection.release();

            let countriesInRegion = [];
            let regionsSet = new Set();
            let regions = [];

            data.forEach(country => {

                regionsSet.add(country.Region);
                countriesInRegion.push(country);
            });

            regionsSet.forEach(region => {

                regions.push(region);
            });

            regionsSet = null;

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", { name: "world_countries_by_population_in_region", regions, countriesInRegion });
        });
    });
});


router.get("/viewer/world_countries_by_population_in_continent", (req, res) => {
    pool.getConnection((err, connection) => {
        let query = "select Code,Name,Continent,Region,Population,Capital from country order by continent,population desc";

        connection.query(query, (err, data) => {

            connection.release();

            let countriesInContinent = [];
            let continentsSet = new Set();
            let continents = [];

            data.forEach(country => {

                continentsSet.add(country.Continent);
                countriesInContinent.push(country);
            });

            continentsSet.forEach(continent => {

                continents.push(continent);
            });

            continentsSet = null;

            if (err) {
                console.log("Error: world_countries_by_population_in_continent failed to obtain data");
                return;
            }

            res.render("viewer", { name: "world_countries_by_population_in_continent", continents, countriesInContinent });

        });
    });
});


// city
router.get("/viewer/world_cities_by_population", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select * from city order by population desc";

        connection.query(query, (err, data) => {

            connection.release();

            if (err) {
                console.log("error");
                return;         
            }

            res.render("viewer", { name: "world_cities_by_population", data });
        });

    });
});

router.get("/viewer/world_cities_by_population_in_region", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select ci.*,co.region as 'Region' from city ci,country co where co.Code = ci.CountryCode order by co.region,ci.population desc";

        connection.query(query, (err, data) => {

            connection.release();

            let citiesInRegion = [];
            let regionsSet = new Set();
            let regions = [];

            data.forEach(city => {

                regionsSet.add(city.Region);
                citiesInRegion.push(city);

            });

            regionsSet.forEach(region => {

                regions.push(region);
            });

            regionsSet = null;

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", { name: "world_cities_by_population_in_region", regions, citiesInRegion });

        });
    });
});

router.get("/viewer/world_cities_by_population_in_district", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select * from city order by district,population desc";

        connection.query(query, (err, data) => {

            connection.release();

            let citiesInDistrict = [];
            let districtsSet = new Set();
            let districts = [];

            data.forEach(city => {

                districtsSet.add(city.District);
                citiesInDistrict.push(city);

            });

            districtsSet.forEach(district => {

                districts.push(district);
            });

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", { name: "world_cities_by_population_in_district", districts, citiesInDistrict });
        });
    });
});

router.get("/viewer/world_cities_by_population_in_country", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select ci.*,co.Name as 'Country' from city ci,country co where co.Code = ci.CountryCode order by co.Name,ci.population desc";

        connection.query(query, (err, data) => {

            connection.release();

            let citiesInCountry = [];
            let countriesSet = new Set();
            let countries = [];

            data.forEach(city => {

                countriesSet.add(city.Country);
                citiesInCountry.push(city);

            });

            countriesSet.forEach(country => {

                countries.push(country);
            });

            countriesSet = null;

            if (err) {
                console.log("error");
                return;
            }
            
            res.render("viewer", { name: "world_cities_by_population_in_country", countries, citiesInCountry });
        });
    });
});

router.get("/viewer/world_cities_by_population_in_continent", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select ci.*,co.continent as 'Continent' from city ci,country co where co.Code = ci.CountryCode order by co.continent,ci.population desc";

        connection.query(query, (err, data) => {

            connection.release();

            let citiesInContinent = [];
            let continentsSet = new Set();
            let continents = [];

            data.forEach(city => {

                continentsSet.add(city.Continent);
                citiesInContinent.push(city);

            });

            continentsSet.forEach(continent => {

                continents.push(continent);
            });

            continentsSet = null;

            if (err) {
                console.log("error");
                return;
            }


            res.render("viewer", { name: "world_cities_by_population_in_continent", continents, citiesInContinent });
        });

    });
});

// capital

router.get("/viewer/world_capital_cities_by_population_in_region", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select ci.Name,co.Name as 'Country',co.Region as 'Region',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by co.Region,ci.population desc";

        connection.query(query, (err, data) => {

            connection.release();

            let citiesInRegion = [];
            let regionsSet = new Set();
            let regions = [];

            data.forEach(city => {

                regionsSet.add(city.Region);
                citiesInRegion.push(city);

            });

            regionsSet.forEach(region => {

                regions.push(region);
            });

            regionsSet = null;


            if (err) {
                console.log("error");
                return;  
            }

            res.render("viewer", { name: "world_capital_cities_by_population_in_region", regions, citiesInRegion });
        });

    });
});

router.get("/viewer/world_capital_cities_by_population_in_continent", (req, res) => {
    pool.getConnection((err, connection) => {

        let query = "select ci.Name,co.Name as 'Country',co.Continent as 'Continent',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by co.Continent,ci.population desc";

        connection.query(query, (err, data) => {

            connection.release();

            let citiesInContinent = [];
            let continentsSet = new Set();
            let continents = [];

            data.forEach(city => {

                continentsSet.add(city.Continent);
                citiesInContinent.push(city);

            });

            continentsSet.forEach(continent => {

                continents.push(continent);
            });

            continentsSet = null;

            if (err) {
                console.log("error");
                return;
                
            }

            res.render("viewer", { name: "world_capital_cities_by_population_in_continent", continents, citiesInContinent });
        });

    });
});

router.get("/viewer/world_capital_cities_by_population", (req, res) => {

    pool.getConnection((err, connection )=> {
        let query = "select ci.Name,co.Name as 'Country',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by ci.population desc";

        connection.query(query, (err, data) => {

            connection.release();

            if(err) {
                console.log("error");
                return;           
            }

            res.render("viewer", { name: "world_capital_cities_by_population", data});
        });
        
    });
});


// population

router.get("/viewer/world_population", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select sum(population) as population from country"

        connection.query(query, (err, data) => {

            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", { name: "world_population", data });
        });
    });
});

router.get("/viewer/continent_population", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select continent,sum(population) as population from country group by continent"

        connection.query(query, (err, data) => {

            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", { name: "continent_population", data });
        });
    });
});

router.get("/viewer/region_population", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select region,sum(population) as population from country group by region"

        connection.query(query, (err, data) => {

            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", { name: "region_population", data });
        });
    });
});

router.get("/viewer/country_population", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select name as country,sum(population) as population from country group by country";

        connection.query(query, (err, data) => {

            connection.release();

            if (err) {
                console.log("error");
                return;              
            }
            
            res.render("viewer", { name: "country_population", data });
        });
    });
});

router.get("/viewer/district_population", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select district,sum(population) as population from city group by district";

        connection.query(query, (err, data) => {

            connection.release();

            if (err) {
                console.log("error");
                return;         
            }

            res.render("viewer", { name: "district_population", data });
        });
    });
});

router.get("/viewer/city_population", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select name as city,sum(population) as population from city group by city";

        connection.query(query, (err, data) => {

            connection.release();

            if (err) {
                console.log("error");
                return;
                
            }

            res.render("viewer", { name: "city_population", data });
        });
    });
});

// population languages

router.get("/viewer/population_languages", (req, res) => {

    pool.getConnection((err, connection) => {

        let query = "select sum(co.population) as population,cl.language as language from country co,countrylanguage cl where cl.countrycode = co.code and cl.language in('chinese','arabic','english','hindi','spanish') group by cl.language order by population desc"

        connection.query(query, (err, data) => {

            connection.release();

            if (err) {
                console.log("error");
                return;
                
            }

            res.render("viewer", { name: "population_languages", data });
        });
    });
});

// population in and out of cities

router.get('/population_in_out_cities_by_continent',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.continent as continent from country co,city ci where co.code = ci.countryCode group by co.continent"

        connection.query(query,(err,data)=>{

            connection.release();



            if(!err)
            {
                res.render('population_inout_by_continent',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

router.get('/population_in_out_cities_by_region',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.region as region from country co,city ci where co.code = ci.countryCode group by co.region"

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('population_inout_by_region',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

router.get('/population_in_out_cities_by_country',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.name as country from country co,city ci where co.code = ci.countryCode group by co.name"

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('population_inout_by_country',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

module.exports = router;