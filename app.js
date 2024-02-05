const http = require('http')
const createUser = require('./server/server');

server = http.createServer((req, res) => {
    createUser.createUser(req, res);
})


server.listen(5000, () => {
    console.log('Server is listening!')
});