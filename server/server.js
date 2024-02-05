// const path = require('path');
// const promise = require('fs/promises');
//
//
// const createUser = async (req, res) => {
//     try {
//         const url = req.url
//         const method = req.method
//         if (url === '/create-user' && res.method === 'POST') {
//             const body = [];
//             // req.on('data', (chunk) => {
//             //     body.push(chunk)
//             // });
//             //
//             // req.on('end', () => {
//             //
//             // })
//
//             const {name, phone, tariff} = req.body;
//             console.log(name)
//
//             if (!name.length || phone.length !== 12 || !tariff) {
//                 return res.writeHead(400, {
//                     ok: false,
//                     message: 'Data is incorrect'
//                 })
//             }
//             const users = JSON.parse(await fs.readFile(path.join(__dirname, '../', 'db', 'db.json'), {encoding: 'utf-8'}));
//
//
//             users.push({
//                 id: users.length + 1,
//                 name,
//                 phone,
//                 tariff,
//                 date: new Date().toLocaleString()
//             })
//
//             await fs.writeFile(path.join(__dirname, '../', 'db', 'db.json'), JSON.stringify(users));
//             console.log('hi')
//             return res.writeHead(200, {
//                 ok: true,
//                 message: 'User created Successfully!'
//             })
//
//         }
//
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// module.exports = {
//     createUser: createUser
// };

const path = require('path');
const fs = require('fs/promises');

const createUser = async (req, res) => {
    try {
        const url = req.url;
        const method = req.method;

        if (url === '/create-user' && method === 'POST') {
            const body = [];

            req.on('data', (chunk) => {
                body.push(chunk);
            });

            req.on('end', async () => {
                const requestBody = Buffer.concat(body).toString();
                const { name, phone, tariff } = JSON.parse(requestBody);

                if (!name || phone.length !== 12 || !tariff) {
                    res.writeHead(400, {
                        'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify({
                        ok: false,
                        message: 'Data is incorrect',
                    }));
                } else {
                    const users = JSON.parse(await fs.readFile(path.join(__dirname, '../', 'db', 'db.json'), { encoding: 'utf-8' }));

                    users.push({
                        id: users.length + 1,
                        name,
                        phone,
                        tariff,
                        date: new Date().toLocaleString(),
                    });

                    await fs.writeFile(path.join(__dirname, '../', 'db', 'db.json'), JSON.stringify(users));

                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify({
                        ok: true,
                        message: 'User created successfully!',
                    }));
                }
            });
        }
    } catch (e) {
        console.error(e);
        res.writeHead(500, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
            ok: false,
            message: 'Internal Server Error',
        }));
    }
};

module.exports = {
    createUser: createUser,
};
