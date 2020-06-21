const { hospital,hospitalPPE }=require('../database/models')

async function createHospital(name,address,contact,email,password){
    const newHospital=await hospital.create({
        name:name,
        address:address,
        contact:contact,
        email:email,
        password:password
    })
    return newHospital
}

async function findAllHospitals(){
    const allHospitals=await hospital.findAll()
    return allHospitals
}

async function findHospital(username,password){
    const memberHospital=await hospital.findOne({where:{name:username,password:password}})
    return memberHospital
}

async function createHospitalPPE(hospitalId,name,quantity){
    const newPPE=await hospitalPPE.create({
        name:name,
        quantity:quantity,
        hospitalId:hospitalId,
    }) 
    return newPPE
}

async function findHospitalPPE(hospitalId){
    const allPPE=await hospitalPPE.findAll({
        where:{hospitalId:hospitalId},
    })
    return allPPE
}

module.exports={
    createHospital,
    findAllHospitals,
    findHospitalPPE,
    createHospitalPPE,
    findHospital
}