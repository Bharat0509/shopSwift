import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import './UpdateProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';

import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, updateProduct, getProductsDetails } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'

import Loader from '../layout/Loader/Loader'
import Sidebar from './Sidebar';

const categories = [
    "Select Category",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attries",
    "Camera",
    "SmartPhones"
]

const UpdateProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { token } = useSelector(state => state.authToken)
    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)

    const [Name, setName] = useState('')
    const [Price, setPrice] = useState(0)
    const [Description, setDescription] = useState('')
    const [Category, setCategory] = useState('')
    const [Stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [OldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])



    const UpdateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = {
            name: Name,
            price: Price,
            description: Description,
            category: Category,
            stock: Stock,
            token: token,
            images: []
        }

        images?.forEach(image => {
            myForm.images.push(image)
        })
        dispatch(updateProduct(params.id, myForm))


    }

    const UpdateProductImagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
        setImagesPreview([]);
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {

                    setImagesPreview((old) => [...old, reader.result])
                    setImages((old) => [...old, reader.result])

                }
            }
            reader.readAsDataURL(file)


        })
    }


    let productId = params.id;
    useEffect(() => {

        if (!product || product._id !== productId) {
            dispatch(getProductsDetails(productId))


        }
        else {

            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setCategory(product.category)
            setStock(product.stock)
            setOldImages(product.images)

        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Product Updated Successfully")
            dispatch({ type: UPDATE_PRODUCT_RESET })
            navigate('/admin/products')

        }
    }, [dispatch, alert, error, navigate, isUpdated, product, productId, updateError])

    return (
        <> {
            loading ? <Loader /> :
                <>
                    <MetaData title={'Create Product'} />
                    <div className="dashboard">
                        <Sidebar />
                        <div className="newProductContainer">

                            <form
                                className='createProductForm'
                                encType='multipart/form-data'
                                onSubmit={UpdateProductSubmitHandler}
                            >
                                <h1>Update Product</h1>
                                <div>
                                    <SpellcheckIcon />
                                    <input
                                        type="text"
                                        placeholder='Product Name'
                                        required
                                        value={Name}
                                        onChange={e => setName(e.target.value)} />
                                </div>

                                <div>
                                    <AttachMoneyIcon />
                                    <input
                                        type="number"
                                        placeholder='Price'
                                        required
                                        value={Price}
                                        onChange={e => setPrice(e.target.value)} />
                                </div>

                                <div>
                                    <DescriptionIcon />
                                    <textarea

                                        placeholder='Product Description'
                                        required
                                        value={Description}
                                        onChange={e => setDescription(e.target.value)}
                                        cols="30"
                                        rows="5"
                                    />
                                </div>

                                <div>
                                    <AccountTreeIcon />
                                    <select
                                        onChange={e => setCategory(e.target.value)}
                                        value={Category}
                                    >
                                        {
                                            categories.map(cate => (<option key={cate} value={cate}>{cate}</option>))
                                        }

                                    </select>
                                </div>
                                <div>
                                    <StorageIcon />
                                    <input
                                        type="Number"
                                        placeholder='Stock'
                                        required
                                        value={Stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                <div id='registerImage'>

                                    <input type="file"
                                        name='avatar'
                                        accept='image/*'
                                        multiple
                                        onChange={UpdateProductImagesChange} />

                                </div>

                                <div id="createProductFormImage">
                                    {
                                        OldImages?.map((image, idx) =>
                                            <img key={idx} src={image.url} alt="Old Product Preview" />
                                        )

                                    }
                                </div>

                                <div id="createProductFormImage">
                                    {
                                        imagesPreview?.map((image, idx) =>
                                            <img key={idx} src={image} alt="Product Preview" />
                                        )

                                    }
                                </div>
                                <button
                                    className='createProductBtn'
                                    type='submit'
                                    disabled={loading ? true : false}
                                >
                                    Update
                                </button>



                            </form>
                        </div>
                    </div>
                </>
        }
        </>
    )
}

export default UpdateProduct
