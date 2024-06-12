//use express to server the static files

const express = require('express');
const app = express();
const path = require('path');
const port = 1000;
const sql = require('mysql');

app.use('/sql',(req,res) => {
    const conn = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'project-ba'
    });
    
    conn.connect((err) => {
        if (err) {
            console.log('Error connecting to database');
            return;
        }
        console.log('Connected to database');
    });

    conn.query('SELECT * FROM login_credentials', (err, rows) => {
        if(err){
            console.log('Error in query');
            return;
        }
        console.log('Data received from database');
        res.send(rows);
    });   
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());

app.get('/User', (req, resp) => {
    resp.sendFile(path.join(__dirname, '../chat.html'));
});

function encodeTeluguText(text) {
    return Array.from(text)
        .map(char => {
            if (char === " ") {
                return " ";
            } else {
                return "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0");
            }
        })
        .join("");
}

app.post('/translate', (req, resp) => {
    var message = req.body.message;
    message = encodeTeluguText(message);
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['../server/translator.py', message]);
    pyProg.stdout.on('data', function (data) {
        console.log(data.toString());
        resp.send(data.toString());
    });
    pyProg.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    pyProg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});
app.get('/test', (req,res) => {
    res.send("<script>alert('Test Success');</script>");
})
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
}
);
