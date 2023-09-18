import fs from 'fs';

// const fs = require('fs')

function Converter(data,filename){

    data = JSON.stringify(data);
        
    // Write data in 'Output.txt' .
    fs.writeFileSync(filename, data, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    })
}

export {Converter};