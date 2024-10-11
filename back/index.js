const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const database = "empleos_react"
const user = "root"
const host = "localhost"
const password = ""


const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

const PORT = 3001;



app.use(cors());

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/', (req, res) => {
    res.send({ status: 200 });
})

app.post('/company', (req, res) => {
    const company = req.body.company;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const logo = req.body.logo;
    db.query(`INSERT INTO company (company, username, email, password, logo) VALUES (?, ?, ?, md5(?), ?)`, [company, username, email, password, logo], 
        (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    message: err
                })
            } else {
                res.send({
                    status: 200,
                    message: 'Empresa creada correctamente',
                    data: result
                })
            }
        }
    )
})
