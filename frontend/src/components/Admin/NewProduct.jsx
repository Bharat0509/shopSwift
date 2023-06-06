import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import './NewProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';

import { useNavigate } from 'react-router-dom'
import { clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstant'
import { newProduct } from '../../actions/productActions'
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

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { token } = useSelector(state => state.authToken)
  const { loading, error, success } = useSelector(state => state.newProduct)

  const [Name, setName] = useState('')
  const [Price, setPrice] = useState(0)
  const [Description, setDescription] = useState('')
  const [Category, setCategory] = useState('')
  const [Stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])



  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", Name)
    myForm.set("price", Price)
    myForm.set("description", Description)
    myForm.set("category", Category)
    myForm.set("stock", Stock)
    myForm.set("token", token)

    images.forEach(image => {
      myForm.append("images", image)
    })
    dispatch(newProduct(myForm))


  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([]);
    setImagesPreview([]);

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



  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (success) {
      alert.success("Product Created Successfully")
      navigate('/admin/dashboard')
      dispatch({ type: NEW_PRODUCT_RESET })

    }
  }, [dispatch, alert, error, navigate, success])

  return (
    <>
      <MetaData title={'Create Product'} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">

          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder='Product Name'
                required
                onChange={e => setName(e.target.value)} />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder='Price'
                required
                onChange={e => setPrice(e.target.value)} />
            </div>

            <div>
              <DescriptionIcon />
              <textarea

                placeholder='Product Description'
                required
                onChange={e => setDescription(e.target.value)}
                cols="30"
                rows="1"
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select
                onChange={e => setCategory(e.target.value)}
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
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {/* <div id="createProductFormFile">

              <input
                type="file"
                name='avatar'
                accept='image/*'
                // multiple
                onChange={e => createProductImagesChange}
              />
            </div> */}

            <div id='registerImage'>

              <input type="file"
                name='avatar'
                accept='image/*'
                multiple
                onChange={createProductImagesChange} />

            </div>

            <div id="createProductFormImage">
              {
                imagesPreview.map((image, idx) =>
                  <img key={idx} src={image} alt="Avatar Preview" />
                )

              }
            </div>
            <button
              className='createProductBtn'
              type='submit'
              disabled={loading ? true : false}
            >
              Create
            </button>



          </form>
        </div>
      </div>
    </>
  )
}

export default NewProduct
