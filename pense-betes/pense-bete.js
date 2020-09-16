//Module FS : lire, écrire fichier, déplacer, parcourir répertoire, etc...
    const fs = require('fs');

    //open  read
    fs.open('./fichiertest.text', 'a+', (err, fd) => {
        if(err) throw err;
        console.log(fd);
        // fs.write(fd, 'Bonjour123', (err, written, str) => {
        //     console.log({err, written, str});
        //     fs.close(fd, (err) => {})
        // })
        const buffer = new Buffer.from(new ArrayBuffer(8), 'utf-8');
        let content = '';
        fs.read(fd, buffer, 0, 8, 0, (err, bytesRead, buffer) => {
            content += buffer.toString();
            console.log({err, bytesRead, buffer, content})
            fs.read(fd, buffer, 0, 8, 8, (err, bytesRead, buffer) => {
                content += buffer.toString();
                console.log({err, bytesRead, buffer, content})
                fs.close(fd, (err) => {})
            })
        })
    })

    //read a file
    fs.readFile('./fichiertest.txt', (err, data) => {
        if(err) throw err;
        console.log(data.toString());
    })
    
    //add text to file
    fs.appendFile('./fichiertest.txt', 'ma nouvelle data', (err)=> {
        if(err) throw err;
    })
    
    //delete file
    fs.unlink('./fichiertest.txt', err => {
        if(err) throw err;
    })

    //create directory
    fs.mkdir('./mondossier/mondossier2', err => {
        if(err) throw err
    })
    
    //delete directory
    fs.rmdir('./mondossier/mondossier2', err => {
        if(err) throw err
    })
    
    //read directory
    fs.readdir('./mondossier', (err, files) => {
        if(err) throw err;
        console.log(files);
    })

    //copy file
    fs.copyFile('./file.txt', './file2.txt', (err) => {
        if(err) throw err;
    })

    //add Sync to the method to be synchrone:
    const data = fs.readFileSync('./file.txt');
    console.log(data);

    //see stat of a file
    fs.stat('./file.txt', (err, stats) => {
        if(err) throw err;
        console.log(stats);
        console.log(stats.isFile())
    })

////////////////////
//Egalement le module 'path' pour le traitement de dossiers/fichiers


/////////////////////////////////////////////////////////////
// Serveur à la main

const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', (req, res) => {
    const url = req.url;
    let fileContent;
    if(url === '/home') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        fileContent = fs.readFileSync('./index.html', 'utf-8');
    } else if(url === '/user/:id') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        fileContent = fs.readFileSync('./info.html', 'utf-8');
    } else {
        res.writeHead(404, {
            'content-type': 'text/html'
        });
        fileContent = fs.readFileSync('./notfound.html', 'utf-8');
    }
    res.end(fileContent);
})

server.listen(8080);




//res.send('<html><head><head/><body><h1>hello</h1></body></html>');


////////////////////////////////////////////////////////////////////

//TEMPLATE ENGINE EXPRESS

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'toto')

app.engine('toto', (path, options, callback) => {
    fs.readFile(path, (err, data) => {
        if(err) callback(err);
        const template = data.toString().replace('%name', options.name);
        callback(null, template);
    });
});

app.get('/', (req, res) => {
    res.render('index.toto', { name : 'Jean' });
})


app.listen(4000);


//TEAMPLATE ENGINE PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('index', { 
        name : 'Jean', 
        authenticated: true, 
        friends: 11,
        products : [
            { title:  'product1', content: 'content1' },
            { title:  'product2', content: 'content2' },
            { title:  'product3', content: 'content3' },
        ]
    });
})
app.listen(4000);
// <!DOCTYPE html>
// html
//     head
//     body
//         h1 Hello World
//         div(class=['test', 'test2'], id='id123')
//             p(style={color:'red', background: 'purple'}) Je suis dans la div
//         div.container
//             .content
//             p.test. 
//                 testfdsfsdfsdfsfd
//                 testfdsfsdfsdfsfd
//                 testfdsfsdfsdfsfd 
//         style. 
//             .test{
//                 font-size: 50px 
//             }

// <!DOCTYPE html>
// html
//     head
//     body
//         h1 Hello World
//         div.container
//             .content
//             p #{ name }
//             p= name
//             if authenticated
//                 p Je suis connecté
//             else
//                 p Je ne suis pas connecté
//             case friends
//                 when 0
//                     span you have no friend
//                 when 1
//                     span you have 1 friend
//                 default
//                     span you have #{ friends } friends
//             each product in products
//                 .product
//                     h4= product.title
//                     p #{ product.content }




//////////////////////////////////////
// MIDDLE WARE

const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const getCurrentUser = (req, res, next) => {
    req.user = {
        name: 'toto',
        authenticated: false
    };
    next();
}
const isAuthenticated = (req, res, next) => {
    if(req.user.authenticated) {
        console.log('user ok');
        next();
    }
    else next('route');
}

const middlex = (req, res, next) => {
    console.log('hello');
    next();
}

app.get('/foo', getCurrentUser, isAuthenticated, middlex, (req, res) => {
    res.render('index')
});

app.get('/foo', (req, res) => {
    console.log('response 2')
    res.sendStatus(403);
})


app.listen(4000);


//MIDDLEWARE STATIC (to get file automatic)
app.use(express.static(path.join(__dirname, 'public')));