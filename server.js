const express=require('express')
const session=require('express-session')
const {hospitalRoutes}=require('./routers/hospitalRoutes')
const {vendorRoutes}=require('./routers/vendorRoutes')
const {homeRoutes}=require('./routers/homeRoutes')
const { db }=require('./database/models')
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','hbs')
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'this_is_encoding_string_for_sahyog_project',
  }))
  

app.use('/', express.static(__dirname + '/public'))
app.use('/',homeRoutes)


const PORT=process.env.PORT
db.sync()
.then(()=>{
    app.listen(PORT,()=>{console.log(`server started at http://localhost:${PORT}`)})
})
.catch((err)=>{
    console.error(new Error('server could not start'))
    console.error(err)
})