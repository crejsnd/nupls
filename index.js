require('dotenv').config()
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    const mailData = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: `Message from ${req.body.name} ${req.body.email}`,
        text: req.body.message
    }
    transporter.sendMail(mailData, (error, info)=>{
        if(error){
            console.log(error)
            res.send('error')
        }else{
            console.log('Email sent: ' + info.response)
            res.send('success')
        }
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})