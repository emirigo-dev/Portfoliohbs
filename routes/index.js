var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Emirigo-dev' });
});

router.post('/send-email', async(req, res) => {
    const { nombre, apellido, email, empresa, texto } = req.body;

    contentHTML = ` User information:
      Nombre: ${nombre}
      Apellido: ${apellido}   
      Email: ${email}   
      Empresa: ${empresa} 
    Mensaje: ${texto}   

  `;
    console.log(contentHTML);


    const transporte = nodemailer.createTransport({
        host: 'smtp.hostinger.com.ar',
        port: 587,
        secure: false,
        auth: {
            user: 'testemail@emirigo-dev.com',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }

    });

    const info = await transporte.sendMail({
        from: "'EmilianoRigobello Server' <testemail@emirigo-dev.com>",
        to: 'emirigobello@gmail.com',
        subject: 'Formulario de contacto de mi pagina',
        text: contentHTML
    });

    const inf2 = await transporte.sendMail({
        from: "'EmilianoRigobello Server' <testemail@emirigo-dev.com>",
        to: email,
        subject: 'Formulario Emiliano Rigobello',
        text: "Gracias por contactarte conmigo, su correo a llegado perfectamente, saludos!"
    });


    console.log('Mnesaje enviado', info.textoId);

    res.send('Mensaje enviado correctamente, se ha enviado a su email una respuesta, revise correo no deseado!');

});


module.exports = router;
