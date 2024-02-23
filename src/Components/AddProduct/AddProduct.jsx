import  { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    //state for display image uploaded 
    const[image,setImage]=useState(false)
    const imageHandler=(e)=>{
       
        setImage(e.target.files[0])
    }
    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",old_price:""
    })
    const ChangeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_product=async()=>{
       // console.log(productDetails)
        let responseData;
        let product=productDetails;

        let formData= new FormData()
        formData.append('product',image);
        //connecting formData with backend
        await fetch('http://localhost:4000/Uploads',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((res)=>res.json()).then((data)=>{
            responseData=data
        })
        console.log(responseData)
        if(responseData.success)
        {
            product.image=responseData.image_url;
            console.log(product);


            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product)
            }).then((res)=>res.json()).then((data)=>{
                data.success?alert("Product Added"):alert('Failed')
            })
        }
    }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={ChangeHandler} type="text" name='name' placeholder='Type Here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={ChangeHandler}type="text" name="old_price" placeholder="Type Here" />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" name="new_price" placeholder="Type Here" value={productDetails.new_price} onChange={ChangeHandler} />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={ChangeHandler} name="category" className="add-product-selector">
            <option value="women">WOMEN</option>
            <option value="men">MEN</option>
            <option value="kid">KID</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-image' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={()=>{Add_product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
