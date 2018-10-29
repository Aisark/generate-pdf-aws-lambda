const pdfGenerator = require('./pdfConverter/pdfGenerator')

var options = {
    format: 'Letter',
    phantomPath: './node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs'
};


process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

const response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Content-type' : 'application/pdf'
    },
    body: null,
    isBase64Encoded : true,
}


exports.handler = (e, ctx, c) => {

    pdfGenerator.generatePdf(e.body)
        .then( buffer => {
            response.body = JSON.stringify({
                htmlPdf: buffer
            });

            c(null, response);
        })
        .catch(err => {
            response.statusCode = 500;
            response.body = JSON.stringify({
                err
            })

            c(null, response)
        } )
    
}