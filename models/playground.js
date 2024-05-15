const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const testUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{timestamps: true})

const testUserModel = mongoose.model('users', testUserSchema)

testUserSchema.pre('save', function(next){
if(!this.isPasswordModified('password')){
    return next()
}
this.password = bcrypt.hashSync(this.password, 10)
return next()
})

testUserSchema.methods.isPasswordMatch = async function(password){
    const passwordResult = await bcrypt.compare(password, this.password)
   return passwordResult
}

testUserSchema.methods.createToken = function(userId){
const token = crypto.randomBytes(10).toString('hex')
this.passwordToken = crypto.createHash('sha256').update(token).digest('hex')
this.tokenExpiration = Date.now() * 20 * 10
return token
}


interface initialState {
    value: number
}

const initialState: initialState = {
    value: 0
}

const counterSlice = createSlice({
    name: "counter Slice",
    initialState,
    reducer: {
       increment: (state, action: Payload<number>)=>{
            state.value = state.value + 1 || action
        },
        decrement: ()=>{
            state.value = state.value - 1
        },
        incrementByNumber: (state, action)=>{
            state.value = state.value + action.payload()
        }
    }
})

module.exports = {testUserModel}