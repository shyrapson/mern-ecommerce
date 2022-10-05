import {createSlice} from "@reduxjs/toolkit"




const cartSlice = createSlice({
    name:"carts",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addproduct:(state,action)=>{
            state.quantity +=1
            console.log(action.payload,'wahala')
            state.products.push(action.payload)
            state.total += action.payload.price*action.payload.quantity

        },
    }
})

export const {addproduct} = cartSlice.actions
export default cartSlice.reducer;