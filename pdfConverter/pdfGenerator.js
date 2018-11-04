const pug = require('pug');
const htmlPdf = require('html-pdf');

const tipo_documento = [
    'cotizacion',
    'orden_armar_paquete',
    'orden_empaquetar'
]

const options_pdf = {
    base: 'file:///var/task/'
}

let getTemplate = async (tipo_order, body) => {
    
    let path = `/var/task/templates/template_${tipo_documento[tipo_order]}.pug`

    return pug.renderFile(path, body);
}

let htmlCreate = (template) => {
    return new Promise( (res, rej) => {
        htmlPdf.create(template,options_pdf).toBuffer( (err, buffer) => {
            if (err) rej(err);
    
            res(buffer.toString('base64'));
        })
    })
}

exports.generatePdf = async (body) => {
    let c = JSON.parse(body);

    let template = await getTemplate(0, c);

    let bufferString = await htmlCreate(template);

    return bufferString;

}
