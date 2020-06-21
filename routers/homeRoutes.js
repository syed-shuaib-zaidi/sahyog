const { Router }=require('express')
const {createHospital,findHospital,findHospitalPPE,createHospitalPPE,findAllHospitals}=require('../controllers/hospital')
const {createVendor,findVendor,findVendorPPE,createVendorPPE,findAllVendors}=require('../controllers/vendor')
const {vendor,hospital,orderReceipt}=require('../database/models')
const route=Router()

route.get('/',(req,res)=>{
    console.log(req.session.userId)
    res.render('index',{userId:req.session.userId})
})

route.get('/signup.hbs',(req,res)=>{
    res.render('signup')
})


route.post('/signup.hbs',async (req,res)=>{
const {name,email,password,confirm_password,type,address,contact}=req.body
    if(password!=confirm_password)
            res.render('/signup.hbs',{passError:`Password doesn't match`})
    if(type!='Hospital' && type!='Vendor')
            res.render('/signup.hbs',{typeError:`Enter either Hospital or Vendor`})
    if(type=='Hospital'){
        console.log(req.body)
        const {name,address,contact,email,password}=req.body
        const newHospital=await createHospital(name,address,contact,email,password)
    }else{
        console.log(req.body)
        const {name,address,contact,email,password}=req.body
        const vendor=await createVendor(name,address,contact,email,password)
    }
    res.redirect('/')
})

route.get('/login.hbs',(req,res)=>{
    res.render('login')
})

route.post('/login.hbs',async (req,res)=>{
    const { username,password }= req.body
    const hospital=await findHospital(username,password)
    const vendor=await findVendor(username,password)
        if(hospital) req.session.userId=hospital.id
        else if(vendor)   req.session.userId=vendor.id
        else  res.render('login',{error:`Invalid email or password`})

    res.redirect('/')
    })

route.get('/logout',(req,res)=>{
    req.session.userId=null
    res.redirect('/')
})

route.get('/profile',async (req,res)=>{
    const vendorUser=await vendor.findByPk(req.session.userId)
    const hospitalUser=await hospital.findByPk(req.session.userId)
    const user=vendorUser||hospitalUser

    const receipts=await orderReceipt.findAll({where:{hospitalId:user.id}})
    ppes=await findHospitalPPE(req.session.userId)
    let myProfile=false
    if(user==hospitalUser && user.id == req.session.userId && user!=undefined)
        myProfile=true
    res.render('profile',{user,ppes,myProfile,receipts})
    })

route.post('/profile',async (req,res)=>{
  const {name,value}=req.body
    const hospitalUser=await hospital.findByPk(req.session.userId)  
    await createHospitalPPE(req.session.userId,name,value).catch((err)=>{console.error(err)})
    ppes=await findHospitalPPE(req.session.userId)
    const user=hospitalUser
    let myProfile=false
    if(user == hospitalUser && user.id == req.session.userId && user!=undefined)
        myProfile=true
    res.render('profile',{user,ppes,myProfile})
})

route.get('/hospitals',async (req,res)=>{
    const hospitalList=await findAllHospitals()
    const vendorUser=await vendor.findByPk(req.session.userId)
    const hospitalUser=await hospital.findByPk(req.session.userId)
    const user=vendorUser||hospitalUser
    let vendorFlag=false
    if(user == vendorUser && user!=undefined)
        vendorFlag=true
    res.render('hospital_list',{hospitalList:hospitalList,vendorFlag:vendorFlag,user:user})
})

route.get('/hospitals/:id',async(req,res)=>{
    const hospitalUser=await hospital.findByPk(req.params.id)
    ppes=await findHospitalPPE(req.params.id)
    const user=hospitalUser
    let myProfile=false
    if(user == hospitalUser && user.id == req.session.userId && user!=undefined)
        myProfile=true
    res.render('profile',{user,ppes,myProfile})
})

route.get('/receipt/:hospitalId/:vendorId',async(req,res)=>{
    const {hospitalId,vendorId}=req.params
    let cost=Math.floor(Math.random()*10000)
    const vendorUser=await vendor.findByPk(vendorId)
    const hospitalUser=await hospital.findByPk(hospitalId)
    const ppes=await findHospitalPPE(hospitalId)

    const vendorName=vendorUser.name
    const hospitalName=hospitalUser.name
    const vendorContact=vendorUser.contact
    const hospitalContact=hospitalUser.contact
    
    const receipt=await orderReceipt.create({
        hospitalId:hospitalId,
        vendorId:vendorId,
        vendorName:vendorName,
        hospitalName:hospitalName,
        vendorContact:vendorContact,
        hospitalContact:hospitalContact,
        cost:cost
    })

    receipt.vendorUser=vendorUser
    receipt.hospitalUser=hospitalUser
    receipt.ppes=ppes
    console.log(receipt)
    res.render('payment_reciept',{receipt})
})

module.exports={
    homeRoutes:route
}



