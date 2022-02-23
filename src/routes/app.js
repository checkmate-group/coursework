const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// config the database connection

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "172.20.0.2",
    port: "3306",
    user : "root",
    password : "password",
    database : "world"
});

// redirect to the index page 

router.get('/',(req,res) => {

    res.render('index');
});

// country

router.get('/world_countries_by_population',(req,res) => {

    console.log("connected...");

    pool.getConnection((err,connection) => {
            
        let query = "select Code,Name,Continent,Region,Population,Capital from country order by population desc";
            
        connection.query(query,(err,data)=>{
                
            connection.release();
                    
            if(!err)
            {
                res.render('world_countries_by_population',{data});
            }
            else 
            {
                console.log("error");
            }
        });
    });
});

router.get('/world_countries_by_population_in_continent',(req,res) => {

    pool.getConnection((err,connection) => {

        console.log("connected...");

        let query = "select Code,Name,Continent,Region,Population,Capital from country order by continent,population desc";

        connection.query(query,(err,data)=>{

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

            if(!err)
            {
                res.render('world_countries_by_population_in_continent',{continents,countriesInContinent});
            }
            else 
            {
                console.log("error");
            }
        });
    });
});

router.get('/world_countries_by_population_in_region',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select Code,Name,Continent,Region,Population,Capital from country order by region,population desc";

        connection.query(query,(err,data)=>{

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

            if(!err)
            {
                res.render('world_countries_by_population_in_region',{regions,countriesInRegion});
            }
            else
            {
                console.log("error");
            }

        });
    });
});

// city

router.get('/world_cities_by_population',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select * from city order by population desc";

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('world_cities_by_population',{data});
            }
            else
            {
                console.log("error");
            }
        });
        
    });
});

router.get('/world_cities_by_population_in_continent',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select ci.*,co.continent as 'Continent' from city ci,country co where co.Code = ci.CountryCode order by co.continent,ci.population desc";

        connection.query(query,(err,data)=>{

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

            if(!err)
            {
                res.render('world_cities_by_population_in_continent',{continents,citiesInContinent});
            }
            else 
            {
                console.log("error");
            }
        });
        
    });
});

router.get('/world_cities_by_population_in_region',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select ci.*,co.region as 'Region' from city ci,country co where co.Code = ci.CountryCode order by co.region,ci.population desc";

        connection.query(query,(err,data)=>{

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

            if(!err)
            {
                res.render('world_cities_by_population_in_region',{regions,citiesInRegion});
            }
            else
            {
                console.log("error");
            }

        });
    });
});

router.get('/world_cities_by_population_in_country',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select ci.*,co.Name as 'Country' from city ci,country co where co.Code = ci.CountryCode order by co.Name,ci.population desc";

        connection.query(query,(err,data)=>{

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

            if(!err)
            {
                res.render('world_cities_by_population_in_country',{countries,citiesInCountry});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

router.get('/world_cities_by_population_in_district',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select * from city order by district,population desc";

        connection.query(query,(err,data)=>{

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

            if(!err)
            {
                res.render('world_cities_by_population_in_district',{districts,citiesInDistrict});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

// capital

router.get('/world_capital_cities_by_population',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select ci.Name,co.Name as 'Country',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by ci.population desc";

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('world_capital_cities_by_population',{data});
            }
            else
            {
                console.log("error");
            }
        });
        
    });
});

router.get('/world_capital_cities_by_population_in_continant',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select ci.Name,co.Name as 'Country',co.Continent as 'Continent',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by co.Continent,ci.population desc";

        connection.query(query,(err,data)=>{

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

            if(!err)
            {
                res.render('world_capital_cities_by_population_in_continant',{continents,citiesInContinent});
            }
            else
            {
                console.log("error");
            }
        });
        
    });
});

router.get('/world_capital_cities_by_population_in_region',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select ci.Name,co.Name as 'Country',co.Region as 'Region',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by co.Region,ci.population desc";

        connection.query(query,(err,data)=>{

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


            if(!err)
            {
                res.render('world_capital_cities_by_population_in_region',{regions,citiesInRegion});
            }
            else
            {
                console.log("error");
            }
        });
        
    });
});

// population

router.get('/world_population',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select sum(population) as population from country"

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('world_population',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

router.get('/continent_population',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select continent,sum(population) as population from country group by continent"

        connection.query(query,(err,data)=>{
            
            connection.release();

            if(!err)
            {
                res.render('continent_population',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

router.get('/region_population',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select region,sum(population) as population from country group by region"

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('region_population',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

router.get('/country_population',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select name as country,sum(population) as population from country group by country";

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('country_population',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

router.get('/district_population',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select district,sum(population) as population from city group by district";

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('district_population',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

router.get('/city_population',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select name as city,sum(population) as population from city group by city";

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('city_population',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

// population languages

router.get('/population_languages',(req,res)=>{

    pool.getConnection((err,connection)=>{

        let query = "select sum(co.population) as population,cl.language as language from country co,countrylanguage cl where cl.countrycode = co.code and cl.language in('chinese','arabic','english','hindi','spanish') group by cl.language order by population desc"

        connection.query(query,(err,data)=>{

            connection.release();

            if(!err)
            {
                res.render('population_languages',{data});
            }
            else
            {
                console.log("error");
            }
        });
    });
});

module.exports = router;