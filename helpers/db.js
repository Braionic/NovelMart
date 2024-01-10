require('dotenv').config()


const db = (express, app, mongoose)=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log('connected to the db')
        app.listen(process.env.PORT, ()=>{
            console.log(`listening on port ${process.env.PORT}`)
        })
    }).catch((err)=>{
        console.log(err)
    })
    
}

module.exports = db