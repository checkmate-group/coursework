const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql2");
const misc = require("./misc");

// TODO: Could we replace this with just misc.reports throughout the file?
const reports = misc.reports;
const continents = misc.continents;
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const pool = mysql.createPool({
    host: "172.18.0.1",
    port: "3306",
    user: "root",
    password: "password",
    database: "world",
});

router.get("/", (req, res) => {
    return res.render("index", { username: req.session.username });
});

router.get("/about", (req, res) => {
    return res.render("about", { username: req.session.username });
});

router.get("/about/zakariya", (req, res) => {
    return res.render("about/zakariya", {
        name: "zakariya",
        username: req.session.username,
    });
});

router.get("/about/bogdan", (req, res) => {
    return res.render("about/bogdan", {
        name: "bogdan",
        username: req.session.username,
    });
});

router.get("/about/taylor", (req, res) => {
    return res.render("about/taylor", {
        name: "taylor",
        username: req.session.username,
    });
});
router.get("/about/client", (req, res) => {
    return res.render("about/client", {
        name: "client",
        username: req.session.username,
    });
});
router.get("/about/kezzy", (req, res) => {
    return res.render("about/kezzy", {
        name: "kezzy",
        username: req.session.username,
    });
});

router.get("/features", (req, res) => {
    return res.render("features", { username: req.session.username });
});

router.get("/faq", (req, res) => {
    return res.render("faq", { username: req.session.username });
});

router.get("/tutorial", (req, res) => {
    return res.render("tutorial", { username: req.session.username });
});

router.get("/contact", (req, res) => {
    return res.render("contact", { username: req.session.username });
});

router.get("/viewer", (req, res) => {
    return res.render("viewer", { reports, username: req.session.username });
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.get("/logout", (req, res) => {
    req.session.destroy();

    return res.render("index");
});

router.get("/register", (req, res) => {
    return res.render("register");
});
router.get("/technologies/PUG", (req, res) => {
    return res.render("technologies/PUG");
});
router.get("/technologies/Docker", (req, res) => {
    return res.render("technologies/Docker");
});
router.get("/technologies/node_js", (req, res) => {
    return res.render("technologies/node_js");
});
router.get("/technologies/Express_js", (req, res) => {
    return res.render("technologies/Express_js");
});



router.post("/register", urlencodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    pool.getConnection((err, connection) => {
        let query = `INSERT INTO user (username, email, password) VALUES ('${username}','${email}','${password}');`;
        connection.query(query, (err, data) => {
            connection.release();
            if (err) {
                console.log("not able to add", err.message);
                return;
            }
            res.render("register", {
                message: "User Added",
                username: req.session.username,
            });
        });
    });
});

router.post("/login", urlencodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let query, session;

    if (username !== "" && password !== "") {
        pool.getConnection((err, connection) => {
            query = `SELECT COUNT(*) FROM user WHERE username='${username}' and password ='${password}';`;

            connection.query(query, (err, data) => {
                connection.release();
                if (data[0]["COUNT(*)"] < 1) {
                    res.status(404);
                    res.render("login", { message: "User does not exist" });
                } else {
                    session = req.session;
                    session.username = username;
                    res.redirect("viewer");
                }
            });
        });
    } else {
        res.render("login", { message: "Username or password is wrong" });
    }
});

router.get("/edit-city/:data?", (req, res) => {
    const formData = JSON.parse(req.params.data);
    const filterOption = continents.filter((val) => val !== formData.Continent);
    return res.render("edit-city", {
        data: formData,
        username: req.session.username,
    });
});

router.get("/edit/:data?", (req, res) => {
    const formData = JSON.parse(req.params.data);
    const filterOption = continents.filter((val) => val !== formData.Continent);
    return res.render("edit", {
        data: formData,
        options: filterOption,
        username: req.session.username,
    });
});
router.post("/edit/:data?", urlencodedParser, (req, res) => {
    const reqCode = JSON.parse(req.params.data);
    pool.getConnection((err, connection) => {
        const code = reqCode.Code;
        const name = req.body.name;
        const continent = req.body.continent;
        const region = req.body.region;
        const population = Number(req.body.population);
        const capital = Number(req.body.capital);
        let query = `UPDATE country SET Name='${name}',Continent='${continent}',Region='${region}',Population=${population},Capital=${capital} WHERE Code = '${code}'`;
        // let query = `INSERT INTO country VALUES ('${code}','${name}','${continent}','${region}',193.00,NULL,${population},78.4,828.00,793.00,'Aruba','Nonmetropolitan Territory of The Netherlands','Beatrix',${capital},'AW');`;
        connection.query(query, (err, data) => {
            connection.release();
            if (err) {
                console.log("not able to update", err.message);
                return;
            }
            res.render("viewer", { username: req.session.username });
        });
    });
});
router.post("/edit-city/:data?", urlencodedParser, (req, res) => {
    const reqCode = JSON.parse(req.params.data);
    pool.getConnection((err, connection) => {
        const id = reqCode.ID;
        const name = req.body.name;
        const countryCode = req.body.countryCode;
        const population = Number(req.body.population);
        const district = req.body.district;
        let query = `UPDATE city SET Name='${name}',CountryCode='${countryCode}',District='${district}',Population='${population}' WHERE ID =${id}`;
        connection.query(query, (err, data) => {
            connection.release();
            if (err) {
                console.log("not able to update", err.message);
                return;
            }
            res.render("viewer", { username: req.session.username });
        });
    });

    //return res.render("edit", { data: JSON.parse(req.params.data) });
});

router.get("/add/:name?", (req, res) => {
    return res.render("add", {
        data: req.params,
        success: false,
        username: req.session.username,
    });
});
router.post("/add/:data?", urlencodedParser, (req, res) => {
    pool.getConnection((err, connection) => {
        console.log(req.body, "asas");
        const code = req.body.code;
        const name = req.body.name;
        const continent = req.body.continent;
        const region = req.body.region;
        const population = Number(req.body.population);
        const capital = Number(req.body.capital);
        // let query = `UPDATE country SET Name='${name}',Continent='${continent}',Region='${region}',Population=${population},Capital=${capital} WHERE Code = '${code}'`;
        let query = `INSERT INTO country VALUES ('${code}','${name}','${continent}','${region}',193.00,NULL,${population},78.4,828.00,793.00,'Aruba','Nonmetropolitan Territory of The Netherlands','Beatrix',${capital},'AW');`;
        connection.query(query, (err, data) => {
            connection.release();
            if (err) {
                console.log("not able to update", err.message);
                return;
            }
            res.render("add", { success: true, username: req.session.username });
        });
    });
});

router.get("/add-city/:name?", (req, res) => {
    return res.render("add-city", {
        data: req.params,
        success: false,
        username: req.session.username,
    });
});

router.post("/add-city/:data?", urlencodedParser, (req, res) => {
    pool.getConnection((err, connection) => {
        const name = req.body.name;
        const countryCode = req.body.countryCode;
        const population = Number(req.body.population);
        const district = req.body.district;
        console.log(req.body);
        let query = `INSERT INTO city (Name, CountryCode, District, Population) VALUES ('${name}','${countryCode}','${district}',${population});`;
        connection.query(query, (err, data) => {
            connection.release();
            if (err) {
                console.log("not able to update", err.message);
                return;
            }
            res.render("add-city", { success: true, username: req.session.username });
        });
    });
});

router.get("/viewer/world_countries_by_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        if (limit) {
            query = `select Code,Name,Continent,Region,Population,Capital from country order by population desc LIMIT ${limit}`;
        } else {
            query =
                "select Code,Name,Continent,Region,Population,Capital from country order by population desc";
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log(
                    "Error: world_countries_by_population failed to obtain data"
                );
                return;
            }
            //console.log(data);

            res.render("viewer", {
                name: "world_countries_by_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get(
    "/viewer/world_countries_by_population_in_region/:limit?",
    (req, res) => {
        pool.getConnection((err, connection) => {
            const limit = req.params.limit;
            let query;
            if (limit) {
                query = `select Code,Name,Continent,Region,Population,Capital from country order by region,population desc LIMIT ${limit}`;
            } else {
                query = `select Code,Name,Continent,Region,Population,Capital from country order by region,population desc`;
            }

            connection.query(query, (err, data) => {
                connection.release();

                let countriesInRegion = [];
                let regionsSet = new Set();
                let regions = [];

                data.forEach((country) => {
                    regionsSet.add(country.Region);
                    countriesInRegion.push(country);
                });

                regionsSet.forEach((region) => {
                    regions.push(region);
                });

                regionsSet = null;

                if (err) {
                    console.log("error");
                    return;
                }

                res.render("viewer", {
                    name: "world_countries_by_population_in_region",
                    reports,
                    regions,
                    countriesInRegion,
                    username: req.session.username,
                });
            });
        });
    }
);

router.get(
    "/viewer/world_countries_by_population_in_continent/:limit?",
    (req, res) => {
        pool.getConnection((err, connection) => {
            const limit = req.params.limit;
            let query;
            if (limit) {
                query = `select Code,Name,Continent,Region,Population,Capital from country order by continent,population desc LIMIT ${limit} `;
            } else {
                query = `select Code,Name,Continent,Region,Population,Capital from country order by continent,population desc `;
            }

            connection.query(query, (err, data) => {
                connection.release();

                let countriesInContinent = [];
                let continentsSet = new Set();
                let continents = [];

                data.forEach((country) => {
                    continentsSet.add(country.Continent);
                    countriesInContinent.push(country);
                });

                continentsSet.forEach((continent) => {
                    continents.push(continent);
                });

                continentsSet = null;

                if (err) {
                    console.log(
                        "Error: world_countries_by_population_in_continent failed to obtain data"
                    );
                    return;
                }

                res.render("viewer", {
                    name: "world_countries_by_population_in_continent",
                    reports,
                    continents,
                    countriesInContinent,
                    username: req.session.username,
                });
            });
        });
    }
);

// city
router.get("/viewer/world_cities_by_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select * from city order by population desc LIMIT ${limit}`;
        } else {
            query = `select * from city order by population desc`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "world_cities_by_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get(
    "/viewer/world_cities_by_population_in_region/:limit?",
    (req, res) => {
        pool.getConnection((err, connection) => {
            const limit = req.params.limit;
            let query;
            if (limit) {
                query = `select ci.*,co.region as 'Region' from city ci,country co where co.Code = ci.CountryCode order by co.region,ci.population desc LIMIT ${limit}`;
            } else {
                query = `select ci.*,co.region as 'Region' from city ci,country co where co.Code = ci.CountryCode order by co.region,ci.population desc`;
            }

            connection.query(query, (err, data) => {
                connection.release();

                let citiesInRegion = [];
                let regionsSet = new Set();
                let regions = [];

                data.forEach((city) => {
                    regionsSet.add(city.Region);
                    citiesInRegion.push(city);
                });

                regionsSet.forEach((region) => {
                    regions.push(region);
                });

                regionsSet = null;

                if (err) {
                    console.log("error");
                    return;
                }

                res.render("viewer", {
                    name: "world_cities_by_population_in_region",
                    reports,
                    regions,
                    citiesInRegion,
                    username: req.session.username,
                });
            });
        });
    }
);

router.get(
    "/viewer/world_cities_by_population_in_district/:limit?",
    (req, res) => {
        pool.getConnection((err, connection) => {
            const limit = req.params.limit;
            let query;
            if (limit) {
                query = `select * from city order by district,population desc LIMIT ${limit}`;
            } else {
                query = `select * from city order by district,population desc`;
            }

            connection.query(query, (err, data) => {
                connection.release();

                let citiesInDistrict = [];
                let districtsSet = new Set();
                let districts = [];

                data.forEach((city) => {
                    districtsSet.add(city.District);
                    citiesInDistrict.push(city);
                });

                districtsSet.forEach((district) => {
                    districts.push(district);
                });

                if (err) {
                    console.log("error");
                    return;
                }

                res.render("viewer", {
                    name: "world_cities_by_population_in_district",
                    reports,
                    districts,
                    citiesInDistrict,
                    username: req.session.username,
                });
            });
        });
    }
);

router.get(
    "/viewer/world_cities_by_population_in_country/:limit?",
    (req, res) => {
        pool.getConnection((err, connection) => {
            const limit = req.params.limit;
            let query;
            if (query) {
                query = `select ci.*,co.Name as 'Country' from city ci,country co where co.Code = ci.CountryCode order by co.Name,ci.population desc LIMIT ${limit}`;
            } else {
                query = `select ci.*,co.Name as 'Country' from city ci,country co where co.Code = ci.CountryCode order by co.Name,ci.population desc`;
            }

            connection.query(query, (err, data) => {
                connection.release();

                let citiesInCountry = [];
                let countriesSet = new Set();
                let countries = [];

                data.forEach((city) => {
                    countriesSet.add(city.Country);
                    citiesInCountry.push(city);
                });

                countriesSet.forEach((country) => {
                    countries.push(country);
                });

                countriesSet = null;

                if (err) {
                    console.log("error");
                    return;
                }

                res.render("viewer", {
                    name: "world_cities_by_population_in_country",
                    reports,
                    countries,
                    citiesInCountry,
                    username: req.session.username,
                });
            });
        });
    }
);

router.get(
    "/viewer/world_cities_by_population_in_continent/:limit?",
    (req, res) => {
        pool.getConnection((err, connection) => {
            const limit = req.params.limit;
            let query;
            if (limit) {
                query = `select ci.*,co.continent as 'Continent' from city ci,country co where co.Code = ci.CountryCode order by co.continent,ci.population desc LIMIT ${limit}`;
            } else {
                query = `select ci.*,co.continent as 'Continent' from city ci,country co where co.Code = ci.CountryCode order by co.continent,ci.population desc`;
            }

            connection.query(query, (err, data) => {
                connection.release();

                let citiesInContinent = [];
                let continentsSet = new Set();
                let continents = [];

                data.forEach((city) => {
                    continentsSet.add(city.Continent);
                    citiesInContinent.push(city);
                });

                continentsSet.forEach((continent) => {
                    continents.push(continent);
                });

                continentsSet = null;

                if (err) {
                    console.log("error");
                    return;
                }

                res.render("viewer", {
                    name: "world_cities_by_population_in_continent",
                    reports,
                    continents,
                    citiesInContinent,
                    username: req.session.username,
                });
            });
        });
    }
);

// capital

router.get(
    "/viewer/world_capital_cities_by_population_in_region/:limit?",
    (req, res) => {
        pool.getConnection((err, connection) => {
            const limit = req.params.limit;
            let query;
            if (limit) {
                query = `select ci.Name,co.Name as 'Country',co.Region as 'Region',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by co.Region,ci.population desc LIMIT ${limit}`;
            } else {
                query = `select ci.Name,co.Name as 'Country',co.Region as 'Region',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by co.Region,ci.population desc`;
            }

            connection.query(query, (err, data) => {
                connection.release();

                let citiesInRegion = [];
                let regionsSet = new Set();
                let regions = [];

                data.forEach((city) => {
                    regionsSet.add(city.Region);
                    citiesInRegion.push(city);
                });

                regionsSet.forEach((region) => {
                    regions.push(region);
                });

                regionsSet = null;

                if (err) {
                    console.log("error");
                    return;
                }

                res.render("viewer", {
                    name: "world_capital_cities_by_population_in_region",
                    reports,
                    regions,
                    citiesInRegion,
                    username: req.session.username,
                });
            });
        });
    }
);

router.get(
    "/viewer/world_capital_cities_by_population_in_continent/:limit?",
    (req, res) => {
        pool.getConnection((err, connection) => {
            const limit = req.params.limit;
            let query;
            if (limit) {
                query = `select ci.Name,co.Name as 'Country',co.Continent as 'Continent',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by co.Continent,ci.population desc LIMIT ${limit}`;
            } else {
                query = `select ci.Name,co.Name as 'Country',co.Continent as 'Continent',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by co.Continent,ci.population desc`;
            }

            connection.query(query, (err, data) => {
                connection.release();

                let citiesInContinent = [];
                let continentsSet = new Set();
                let continents = [];

                data.forEach((city) => {
                    continentsSet.add(city.Continent);
                    citiesInContinent.push(city);
                });

                continentsSet.forEach((continent) => {
                    continents.push(continent);
                });

                continentsSet = null;

                if (err) {
                    console.log("error");
                    return;
                }

                res.render("viewer", {
                    name: "world_capital_cities_by_population_in_continent",
                    reports,
                    continents,
                    citiesInContinent,
                    username: req.session.username,
                });
            });
        });
    }
);

router.get("/viewer/world_capital_cities_by_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select ci.Name,co.Name as 'Country',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by ci.population desc LIMIT ${limit}`;
        } else {
            query = `select ci.Name,co.Name as 'Country',ci.Population from city ci,country co where co.Code = ci.CountryCode and co.capital = ci.id order by ci.population desc`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "world_capital_cities_by_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

// population

router.get("/viewer/world_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        console.log(req.session.username);
        let query;
        if (limit) {
            query = `select sum(population) as population from country LIMIT ${limit}`;
        } else {
            query = `select sum(population) as population from country`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "world_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/continent_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select continent,sum(population) as population from country group by continent LIMIT ${limit}`;
        } else {
            query = `select continent,sum(population) as population from country group by continent`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "continent_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/region_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select region,sum(population) as population from country group by region LIMIT ${limit}`;
        } else {
            query = `select region,sum(population) as population from country group by region`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "region_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/country_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select name as country,sum(population) as population from country group by country LIMIT ${limit}`;
        } else {
            query = `select name as country,sum(population) as population from country group by country`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "country_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/district_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select district,sum(population) as population from city group by district LIMIT ${limit}`;
        } else {
            query = `select district,sum(population) as population from city group by district`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "district_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/city_population/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select name as city,sum(population) as population from city group by city LIMIT ${limit}`;
        } else {
            query = `select name as city,sum(population) as population from city group by city`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "city_population",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

// population languages

router.get("/viewer/population_languages/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select sum(co.population) as population,cl.language as language from country co,countrylanguage cl where cl.countrycode = co.code and cl.language in('chinese','arabic','english','hindi','spanish') group by cl.language order by population desc LIMIT ${limit}`;
        } else {
            query = `select sum(co.population) as population,cl.language as language from country co,countrylanguage cl where cl.countrycode = co.code and cl.language in('chinese','arabic','english','hindi','spanish') group by cl.language order by population desc`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "population_languages",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

// population in and out of cities

router.get("/viewer/population_in_out_cities_by_continent/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.continent as continent from country co,city ci where co.code = ci.countryCode group by co.continent LIMIT ${limit}`;
        } else {
            query = `select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.continent as continent from country co,city ci where co.code = ci.countryCode group by co.continent`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "population_in_out_cities_by_continent",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/population_in_out_cities_by_country/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.name as country from country co,city ci where co.code = ci.countryCode group by co.name LIMIT ${limit}`;
        } else {
            query = `select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.name as country from country co,city ci where co.code = ci.countryCode group by co.name`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "population_in_out_cities_by_country",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/population_in_out_cities_by_region/:limit?", (req, res) => {
    pool.getConnection((err, connection) => {
        const limit = req.params.limit;
        let query;
        if (limit) {
            query = `select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.region as region from country co,city ci where co.code = ci.countryCode group by co.region LIMIT ${limit} `;
        } else {
            query = `select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.region as region from country co,city ci where co.code = ci.countryCode group by co.region LIMIT`;
        }

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "population_in_out_cities_by_region",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/population_in_out_cities_by_country", (req, res) => {
    pool.getConnection((err, connection) => {
        let query =
            "select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.name as country from country co,city ci where co.code = ci.countryCode group by co.name";

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "population_in_out_cities_by_country",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

router.get("/viewer/population_in_out_cities_by_region", (req, res) => {
    pool.getConnection((err, connection) => {
        let query =
            "select sum(distinct ci.population) as pinc,sum(distinct co.population) - sum(ci.population) as poutc,co.region as region from country co,city ci where co.code = ci.countryCode group by co.region";

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.log("error");
                return;
            }

            res.render("viewer", {
                name: "population_in_out_cities_by_region",
                reports,
                data,
                username: req.session.username,
            });
        });
    });
});

module.exports = router;
