const net = require('net');

// const server = net.createServer((socket) => {
//     console.log(socket.remoteAddress,socket.remotePort);
//     socket.write("Hello From Server!")
//     socket.on('data', (data) => {
//         console.log(data.toString());
//         // socket.write('Echo: ' + data);
//     });

//     socket.on('end', () => {
//         console.log('Socket ended');
//     });
// });

// server.listen(9000, () => {
//   console.log('Server listening on port 3000');
// });
const client = net.Socket();
client.connect({port : 8080, host : 'localhost'},function(){
    const len = '{"email":"amoghasdodawad@gmail.com","password":"Amogh123"}'.length;
    client.write('POST /api/auth/login HTTP/1.1\r\nConnection: keep-alive\r\nContent-type: application/json; charset=UTF-8\r\nContent-Length: '+len+'\r\n\r\n{"email":"amoghasdodawad@gmail.com","password":"Amogh123"}')
    // client.write('GET /video HTTP/1.1\r\nrange: bytes=0-\r\n\r\n');
})

client.on('data', function(chunk) {
    console.log(`Data received from the server: ${chunk}.`);
    
    // Request an end to the connection after the data has been received.
    // client.end();
});

client.on('end', function() {
    console.log('Requested an end to the TCP connection');
});