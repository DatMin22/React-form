import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { btFormActions } from '../store/BTForm/slice'


export const ProductForm = () => {
    const [formValue, setFormValue] = useState({
        id: '',
        image: '',
        name: '',
        productType: '',
        price: '',
        description: '',


    })
    // state validate form
    const [formError, setFormError] = useState({
        id: "",
        image: "",
        name: "",
        productType: "",
        price: "",
        description: "",
    })

    const dispatch = useDispatch()
    const { productEdit } = useSelector((state) => state.btForm)
   
    // validate
    const validate = (name, value) => {
        switch (name) {
            case "id":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin";
                } else {
                    return "";
                }
            case "name":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin";
                } else {
                    return "";
                }

            case "image":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin";
                } else if (value.match(
                    new RegExp('(https?:\/\/)?[^\s]+\.(jpg|png|gif|svg)$'))) {
                    return "vui lòng nhập đúng  link ảnh";
                } else {
                    return ""
                }


            case "price":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin";
                } else if (!value.match(new RegExp("^[0-9]*$"))) {
                    return "Giá tiền không hợp lệ";
                } else {
                    return "";
                }


            case "productType":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin";
                } else {
                    return "";
                }

            case "description":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin";
                } else {
                    return "";
                }

            default:
                return "";
        }
    };
    // currying function
    const handleFormValue = (name) => (ev) => {
       
        setFormError(prevState => ({ ...prevState, [name]: validate(name, ev.target.value) }))


        setFormValue({
            ...formValue,
            [name]: ev.target.value,
        })
    }
    // chạy khi dữ liệu trong dependency thay đổi
    useEffect(() => {
        if (productEdit) {
            setFormValue(productEdit)
            setFormError({
                id: "",
                image: "",
                name: "",
                productType: "",
                price: "",
                description: "",
            })
        }

    }
        , [productEdit])
    // 
    return (
        <div className='container '>
            <form className="row"
                onSubmit={(event) => {
                    event.preventDefault()
                    const validationError = {}
                    Object.keys(formValue).forEach((name) => {
                        // key : id | name | price | image | productType
                        const error = validate(name, formValue[name])
                        if (error && error.length > 0) {
                            validationError[name] = error//thêm name vào obj validationError
                        }
                    })
                    if (Object.keys(validationError).length > 0) {
                        setFormError({ ...validationError });
                        return;
                    }

                    if (productEdit) {
                        dispatch(btFormActions.updateProduct(formValue))

                    } else {
                        dispatch(btFormActions.addProduct(formValue))
                    }

                    setFormValue({
                        id: '',
                        image: '',
                        name: '',
                        productType: '',
                        price: 0.0,
                        description: '',
                    })
                }
                }>
                <h2 className="p-3 bg-dark text-warning">Product Info</h2>
                <div className="col-6">
                    <div>
                        <p>ID</p>
                        <input type="text" className="form-control"
                            onChange={
                                handleFormValue('id')
                            }
                            onBlur={
                                handleFormValue('id')
                            }
                            value={formValue.id}

                            disabled={formValue.id === productEdit?.id}
                        />
                        {formError.id && (
                            <p>
                                <small className="text-danger">{formError.id}</small>
                            </p>
                        )}
                    </div>
                    <div className="mt-3">
                        <p>NAME</p>
                        <input type="text" className="form-control"
                            onChange={handleFormValue('name')

                            }
                            value={formValue.name}

                        />
                        {formError.name && (
                            <p>
                                <small className="text-danger">{formError.name}</small>
                            </p>
                        )}
                    </div>
                    <div className="mt-3">
                        <p>PRICE</p>
                        <input type="text" className="form-control"
                            onChange={handleFormValue('price')

                            }
                            value={formValue.price}
                        />
                        {formError.price && (
                            <p>
                                <small className="text-danger">{formError.price}</small>
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <p>IMAGE</p>
                        <input type="text" className="form-control"
                            onChange={handleFormValue('image')

                            }
                            value={formValue.image}
                        />
                        {formError.image && (
                            <p>
                                <small className="text-danger">{formError.image}</small>
                            </p>
                        )}
                    </div>
                    <div className="mt-3">
                        <p>PRODUCT TYPE</p>
                        <input type="text" className="form-control"
                            onChange={handleFormValue('productType')

                            }
                            value={formValue.productType}
                        />
                        {formError.productType && (
                            <p>
                                <small className="text-danger">{formError.productType}</small>
                            </p>
                        )}
                    </div>
                    <div className="mt-3">
                        <p>DESCRIPTION</p>
                        <input type="text" className="form-control"
                            onChange={handleFormValue('description')

                            }
                            value={formValue.description}
                        />
                        {formError.description && (
                            <p>
                                <small className="text-danger">{formError.description}</small>
                            </p>
                        )}
                    </div>
                </div>

                <div className='mt-4'>
                    {productEdit ? (

                        <button className="btn btn-info ms-3">Update</button>
                    ) : (
                        <button className="btn btn-success">Create</button>
                    )}


                </div>
            </form>
        </div>
    )
}
