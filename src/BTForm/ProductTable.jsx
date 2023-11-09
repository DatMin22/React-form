import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { btFormActions } from '../store/BTForm/slice'

export const ProductTable = () => {
    // ***************
    // ***********************************************
    const { productList } = useSelector((state) => state.btForm)
    const dispatch = useDispatch()




    const handleChange = (event) => {
        btFormActions.searchProduct(event.target.value)

    };






    return (
        <div className='container mt-5'>
            <input
                className='form-control my-4'
                type="text"
                placeholder="Nhập tên sản phẩm để tìm kiếm"
                // value={keyword}
                onChange={handleChange}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>IMAGE</th>
                        <th>PRICE</th>
                        <th>DESC</th>
                        <th>TYPE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        productList.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td><img src={product.image} alt="" width="100" /></td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.productType}</td>
                                    <td>
                                        <button className='btn btn-primary'
                                            onClick={() => {
                                                dispatch(btFormActions.setProductEdit(product))
                                            }}><i className="fa-solid fa-marker"></i></button>
                                        <button className='btn btn-danger ms-2'
                                            onClick={() => {
                                                dispatch(btFormActions.removeProduct(product.id))
                                            }}><i className="fa-solid fa-trash"></i></button>
                                    </td>

                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
