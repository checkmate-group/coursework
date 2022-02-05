const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// config the database connection

const pool = mysql.createPool({
    port: 3306,
    host: "172.19.0.2",
    user: 'root',
    password: 'password',
    database: 'world'
});


// redirect to the index page 

router.get('/',(req,res) => {

    res.render('index');
});

// redirect to the dashboard page 

router.get('/r1',(req,res) => {

    pool.getConnection((err,connection) => {

        let query = "select * from country order by population desc";

        connection.query(query,(err,rows)=>{

            connection.release();

            if(!err)
            {
                res.render('r1',{rows});
            }
            else 
            {
                console.log("error");
            }
        });
    });
});

router.get('/r2',(req,res) => {

    pool.getConnection((err,connection) => {

        let query = "select * from country order by continent,population desc";

        connection.query(query,(err,rows)=>{

            connection.release();

            let North_America = [];
            let Asia = [];       
            let Africa = [];     
            let Europe = [];   
            let South_America = []; 
            let Oceania = [];                  
            let Antarctica = [];

            rows.forEach(country => {
     
                if(country.Continent === "North America")
                {
                    North_America.push(country);
                }
                if(country.Continent === "Asia")
                {
                    Asia.push(country);
                }
                if(country.Continent === "Africa")
                {
                    Africa.push(country);
                }
                if(country.Continent === "Europe")
                {
                    Europe.push(country);
                }
                if(country.Continent === "South America")
                {
                    South_America.push(country);
                }
                if(country.Continent === "Oceania")
                {
                    Oceania.push(country);
                }
                if(country.Continent === "Antarctica")
                {
                    Antarctica.push(country);
                }
            });

            if(!err)
            {
                res.render('r2',{North_America,Europe,South_America,Antarctica,Oceania,Africa,Asia});
            }
            else 
            {
                console.log("error");
            }
        });
    });
});

module.exports = router;