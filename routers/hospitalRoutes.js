const { Router }=require('express')
const { createHospital, findAllHospitals, createPPE, findAllPPE} = require('../controllers/hospital')
const route=Router()

route.get('/',async (req,res)=>{
    const hospitals=await findAllHospitals()
    res.status(200).send(hospitals)
})

route.post('/registration',async (req,res)=>{
    console.log(req.body)
    const {name,address,contact,email,password}=req.body
   const newHospital=await createHospital(name,address,contact,email,password)
    res.redirect('/')
})

let ppes=[]
route.post('/profile/ppe',async (req,res)=>{
    console.log(req.body)
    const {hospitalId,name,quantity}=req.body
    const newPPE=await createVendorPPE(hospitalId,name,quantity)
    ppes.push(newPPE)
    res.send(ppes)
})


module.exports={
    hospitalRoutes:route
}
