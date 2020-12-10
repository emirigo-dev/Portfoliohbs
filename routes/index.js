var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send-email', async(req, res) => {
  const { nombre, apellido, email, empresa, texto } = req.body;

  contentHTML = `<h1> User information < /h1>
  <ul>
      <li>Nombre: ${nombre}</li>
      <li>Apellido: ${apellido}</li>   
      <li>Email: ${email}</li>   
      <li>Empresa: ${empresa}</li>   
  </ul>
  <p>Mensaje: ${texto}</p>   

  `;
  console.log(contentHTML);


  const transporte = nodemailer.createTransport({
      host: 'smtp.hostinger.com.ar',
      port: 587,
      secure: false,
      auth: {
          user: 'testemail@emirigo-dev.com',
          pass: 'Emiboca98'
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

  console.log('Mnesaje enviado', info.textoId);

  res.send('recived');

});


module.exports = router;
