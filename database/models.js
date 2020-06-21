const Sequelize=require('sequelize')

const db=new Sequelize({
    dialect:'sqlite',
    storage:'./hackathon.db'
    }
)

const ID_COL={
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
}

const NAME_COL={
    type:Sequelize.DataTypes.STRING,
    allowNull:false
}

const ADDRESS_COL={
    type:Sequelize.DataTypes.STRING,
    allowNull:false
}

const CONTACT_COL={
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false,
}

const EMAIL_COL={
    type:Sequelize.DataTypes.STRING,
    unique:true,
    allowNull:false
}

const PASSWORD_COL={
    type:Sequelize.DataTypes.STRING,
    allowNull:false
}

const IMAGE_COL={
    type:Sequelize.DataTypes.STRING,
    allowNull:true
}

const hospital=db.define('hospital',{
    id:ID_COL,
    name:NAME_COL,
    address:ADDRESS_COL,
    contact:CONTACT_COL,
    email:EMAIL_COL,
    password:PASSWORD_COL
    // image:IMAGE_COL
})

const hospitalPPE=db.define('hospitalPPE',{
    id:ID_COL,
    name:NAME_COL,
    quantity:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
})

const vendorPPE=db.define('vendorPPE',{
    id:ID_COL,
    name:NAME_COL,
    price:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    }
})

const vendor=db.define('vendor',{
    id:ID_COL,
    name:NAME_COL,
    address:ADDRESS_COL,
    contact:CONTACT_COL,
    email:EMAIL_COL,
    password:PASSWORD_COL
    // image:IMAGE_COL
})

const orderReceipt=db.define('orderReceipt',{
    id:ID_COL,
    vendorName:NAME_COL,
    hospitalName:NAME_COL,
    vendorContact:CONTACT_COL,
    hospitalContact:CONTACT_COL,
    vendorId:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    hospitalId:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    cost:{
        type:Sequelize.DataTypes.INTEGER
    }
})

hospital.hasMany(hospitalPPE)
hospitalPPE.belongsTo(hospital)
vendor.hasMany(vendorPPE)
vendorPPE.belongsTo(vendor)

module.exports={
    hospital,
    vendorPPE,
    hospitalPPE,
    vendor,
    orderReceipt,
    db
}

