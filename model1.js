const mongoose = require('mongoose')

// create schema

let schema = new mongoose.Schema({
	roll:{
		type:String,
		required:true,
		unique:true
	},
	date_of_adm: {
		type:Date,
		default:Date.now
	},
	name: {
		type:String,
		required:true
	},
	marks: Number,
	repeat: Boolean
})

//create a collection

let Student = new mongoose.model("Student", schema)

// saving document

saveDoc=()=>{

let s1 = new Student({
    roll:"2",
    name:"amita",
    marks:"76",
    repeat:false
})

s1.save()
}


// saveDoc async

saveDoc=async ()=>{

    let s1 = new Student({

        roll:"3",
        name:"amitabh",
        marks:"16",
        repeat:true

    })

    await s1.save()

}


saveMultipleDoc=async ()=>{

    let s1 = new Student({
        roll:"12",
        name:"karan",
        marks:"26",
        repeat:true

    })

    let s2 = new Student({
        roll:"13",
        name:"kavit",
        marks:"96",
        repeat:false

    })
    let s3 = new Student({
        roll:"14",
        name:"ram",
        marks:"6",
        repeat:true

    })

  // let res = await s1.save()
  // console.log(res)
  // await s2.save()
  // await s3.save()

   let res= await Student.insertMany([s1,s2,s3])
   console.log(res)

}


// Read

let readData = async ()=>{

//   let res= await Student.find()

// let res= await Student.find({roll:"5"})

// let res= await Student.find({marks:86})

// let res= await Student.find({marks:86}).limit(1)

// let res= await Student.find({marks:86}).select({marks:1}) // by deafult it always returns

// object id inaddtion to the filed requested to be fetched

// let res= await Student.find({marks:86}).select({marks:0})

// let res= await Student.find({marks:86}).select({_id:0,marks:0})

// let res= await Student.find({marks:86}).select({_id:1,marks:0})

//   let res= await Student.find().sort({"marks":1})

// ascending order by marks, notice 1 for marks

	let res= await Student.find().sort({"marks":-1})
 	console.log(res)

}


let updateData = async (roll)=>{

    let res = await Student.updateOne(
    {roll},
    {$set:{"marks":99}}

    )
}


let deleteData = async (roll)=>{

  let res = await Student.deleteOne({roll})
  console.log(res)
}

module.exports = saveDoc
module.exports = saveMultipleDoc
module.exports = readData
module.exports = updateData
module.exports = deleteData