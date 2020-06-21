const { vendor,vendorPPE }=require('../database/models')

async function createVendor(name,address,contact,email,password){
    const newVendor=await vendor.create({
        name:name,
        address:address,
        contact:contact,
        email:email,
        password:password
    })
    return newVendor
}

async function findAllVendors(){
    const allVendors=await vendor.findAll()
    return allVendors
}

async function findVendor(username,password){
    const memberVendor=await vendor.findOne({where:{name:username,password:password}})
    return memberVendor
}

async function createVendorPPE(vendorId,name,price){
    const newPPE=await vendorPPE.create({
        name:name,
        price:price,
        vendorId:vendorId,
    }) 
    return newPPE
}

async function findVendorPPE(vendorId){
    const allPPE=await vendorPPE.findAll({
    where:{vendorId:vendorId},  })
    return allPPE
}

module.exports={
    createVendor,
    findAllVendors,
    findVendor,
    createVendorPPE,
    findVendorPPE
}