import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    productList: [
        {
            id: "123",
            name: "Iphone 13 pro max",
            image:
                "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lfGVufDB8fDB8fHww",
            productType: "Iphone",
            price: 32000000,
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen boo",
        },
        {
            id: "124",
            name: "Iphone 14 pro max",
            image:
                "https://images.unsplash.com/photo-1663499827419-726641d53ef7?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTQlMjBwcm8lMjBtYXh8ZW58MHx8MHx8fDA%3D",
            productType: "Iphone",
            price: 35000000,
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen boo",
        },
        {
            id: "125",
            name: "Samsung Galaxy S20",
            image:
                "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZ3xlbnwwfHwwfHx8MA%3D%3D",
            productType: "Iphone",
            price: 35000000,
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen boo",
        },
    ],
    productEdit: undefined
}
const BTFormSlice = createSlice({
    name: 'BTForm',
    initialState,
    reducers: {
        addProduct(state, { payload }) {
            state.productList.push(payload)

        },
        removeProduct: (state, { payload }) => {

            state.productList = state.productList.filter((value) => value.id !== payload)
            // const index = state.productList.indexOf(action.payload);
            // if (index !== -1) {
            //     state.productList.splice(index, 1);
            // }
        },
        setProductEdit: (state, { payload }) => {
            // console.log('payload: ', payload)
            state.productEdit = payload

        },
        // cập nhật sản phẩm
        updateProduct: (state, { payload }) => {
            // Tim cái sản phẩm đang được chỉnh sửa
            const productIndex = state.productList.findIndex(
                (item) => item.id === payload.id
            );

            // khi ko tìm thấy sp dựa vào id thì productIndex=-1
            if (productIndex !== -1) {
                // CẬp nhật lại sản phẩm mới từ người dùng nhập vào
                state.productList[productIndex] = payload
                state.productEdit = undefined
            }
        },
        searchProduct: (state, { payload }) => {
            if (payload.trim() !== '') {
                state.productList = state.productList.filter((product) => {
                    return product.name.toLowerCase().includes(payload.toLowerCase())
                })
            }
            // else {
            //     state.productList = initialState.productList;
            // }



        },

    }
})

export const { reducer: btFormReducer, actions: btFormActions } = BTFormSlice