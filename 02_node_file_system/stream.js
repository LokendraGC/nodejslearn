const fs = require('fs');

// File is read piece by piece (chunk), not all at once like readFile
const rs = fs.createReadStream('./files/stream.txt', { encoding: 'utf-8' });

// Write stream to write the chunks to a new file
const ws = fs.createWriteStream('./files/stream_copy.txt', { encoding: 'utf-8' });

// When a new chunk of data is available, write it to the new file
// rs.on('data',chunk => {
//  ws.write(chunk);
// });

// Pipe the read stream to the write stream, which will handle the data flow automatically
rs.pipe(ws);
