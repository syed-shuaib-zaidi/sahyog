const { Router }=require('express')
const { createVendor, findAllVendors, createVendorPPE,findVendorPPE} = require('../controllers/vendor')
const route=Router()

route.get('/',async (req,res)=>{
    const vendors=await findAllVendors()
    res.status(200).send(vendors)
})

route.post('/registration',async (req,res)=>{
    console.log(req.body)
    const {name,address,contact,email,password}=req.body
    const vendor=await createVendor(name,address,contact,email,password)
    res.redirect('/')
})

let ppes=[]
route.post('/profile/ppe',async (req,res)=>{
    console.log(req.body)
    const {vendorId,name,price}=req.body
    const newPPE=await createVendorPPE(vendorId,name,price)
    ppes.push(newPPE)
    res.send(ppes)
})



module.exports={
    vendorRoutes:route
}
