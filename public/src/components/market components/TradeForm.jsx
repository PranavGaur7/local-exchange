import React, { useEffect, useRef, useState } from 'react'
import { Buffer } from 'buffer';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import useMarketCreation from '../../hooks/useMarketCreation';
import { motion } from 'framer-motion'
const TradeForm = ({ role, setShowModal }) => {
  const ref = useRef(null)
  const { mutateAsync } = useMutation({
    mutationFn: useMarketCreation
  })
  const categories = [
    "All Categories",
    "Electronics",
    "Clothing & Apparel",
    "Home & Kitchen Appliances",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Sports & Outdoors",
    "Toys & Games",
    "Books & Media",
    "Automotive & Tools",
    "Furniture & Home Decor",
    "Food & Beverages",
    "Office Supplies",
    "Pet Supplies",
    "Baby & Kids",
    "Jewelry & Accessories",
    "Groceries",
    "Fitness & Exercise Equipment",
    "Arts & Crafts",
    "Gardening & Outdoor Living",
    "Travel & Luggage"
  ]
  const result = useSelector((store) => store.user.userDetails);
  const [imageArray, setImageArray] = useState([]);
  const [location, setLocation] = useState([])
  const [latlong, setLatLong] = useState({});
  const getLocation = async (latitude, longitude) => {
    setLatLong({
      latitude: latitude,
      longitude: longitude
    })
    const geo = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`)
    setLocation(geo.data.localityInfo.administrative);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getLocation(position.coords.latitude, position.coords.longitude)
    }, (error) => {
      console.log(error.message);
    })

  }, [])
  const [details, setDetails] = useState({
    product: "",
    description: "",
    role: role,
    category: "",
    user: "",
    productImages: imageArray,
    price: "",
    location: location,
    latitude: latlong.latitude,
    longitude: latlong.longitude
  })
  const onProductImageChange = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        const aspectRatio = width / height;
        const binaryDataSize = Buffer.from(reader.result, 'base64').length / 1024;
        if (binaryDataSize > 100) {
          toast.error("Image size should be less than 100KB");
        } else {

          if (aspectRatio<0.6) {
            toast.error("Image is too wide");
          } else {
            if (imageArray.length < 5) {
              let newimageArray = [...imageArray, reader.result]; // Create a new array with the updated value
              setImageArray(newimageArray);
            } else {
              toast.error("Only 5 images can be uploaded");
            }
          }
        }
      };
    };
    reader.onerror = (err) => {
      console.log("error: " + err);
    };
  };

  const onChangeHandler = (e) => {
    setDetails({
      ...details, [e.target.name]: e.target.value, user: result._id, location: location, productImages: imageArray, latitude: latlong.latitude,
      longitude: latlong.longitude
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const market = await mutateAsync(details);
      ref.current.click()
      console.log(market);
    }
  }
  const handleValidation = () => {
    const { product, description, category, productImages, price, location } = details;
    if (product.length < 15) {

      toast.error("Product description should be minimum 15 characters")
      return false;
    }
    else if (description.length < 40) {

      toast.error("Product details should be minimum 40 characters")
      return false;
    }
    else if (category === "") {

      toast.error("Select a category")
      return false;
    }
    else if (imageArray.length <= 4) {
      toast.error("Upload Minimum 5 Images")
      return false;
    }
    else if (price === "") {

      toast.error("price is required")
      return false;
    }
    else if (location.length === 0) {

      toast.error("Please Allow Location")
      return false;
    }

    return true;
  }
  const removeImage = (index) => {
    const newImageArray = [...imageArray];
    newImageArray.splice(index, 1);
    setImageArray(newImageArray);
  }
  return (
    <motion.div className='fixed font-unbounded w-screen h-screen  z-50 flex items-center justify-center top-0 left-0 bg-gray-950/85 '
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 0.4
      }}
    >
      <motion.div className='w-2/3   relative py-10 bg-white flex flex-col px-16   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'
        initial={{
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        exit={{
          opacity: 0,
          scale: 0.5
        }}
        transition={{
          duration: 0.5
        }}
      >
        <div className='bx bx-x h-8 w-8 bg-white text-3xl absolute top-2 right-2 rounded-full flex items-center justify-center cursor-pointer'
          onClick={() => setShowModal(false)} ref={ref}
        >
          <i className="bi bi-x-circle"></i>
        </div>
        <h1 className='text-white font-semibold text-4xl'>{`Be a ${role}`}</h1>
        <label className='w-full mt-5'>
          <p className='text-sm text-white'>Product Description:</p>
          <input autoComplete="off" onChange={onChangeHandler} type="text" name='product' className='w-full outline-none border-none mt-1 py-2 px-2 rounded-lg text-secondary-color focus:ring-2 focus:ring-tertiary-color' />
        </label>
        <label className='w-full mt-5'>
          <p className='text-sm text-white'>Product Details:</p>
          <textarea autoComplete="off" onChange={onChangeHandler} className='w-full outline-none border-none mt-1 py-2 px-2 resize-none rounded-lg text-secondary-color focus:ring-2 focus:ring-tertiary-color' name="description" id="" cols="30" rows="6" ></textarea>
        </label>
        <select onChange={onChangeHandler} id="search-dropdown" className="py-2 px-2 mt-5 outline-none border-none rounded-lg text-secondary-color focus:ring-2 focus:ring-tertiary-color" name='category' required>
          {
            categories.map((element, index) => {
              return (
                <option key={index} value={element} className='pt-1 text-sm'>{element}</option>
              )
            })
          }
        </select>


        <label className="block mt-5 mb-1 text-sm  text-gray-900 dark:text-white" htmlFor="multiple_files">Upload 5 Images</label>
        <input className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="multiple_files" type="file" onChange={onProductImageChange} multiple />
        <div className='flex items-center justify-evenly relative'>

          {
            imageArray.map((element, index) => {
              return (
                <div className='relative mt-6 rounded-lg h-16 w-24 bg-center bg-cover bg-no-repeat bg-local border-2' style={{ "backgroundImage": `url(${element})` }} key={index}>
                  <div className='bx bx-x h-4 w-4 bg-white text-xl absolute -top-2 -right-2 rounded-full flex items-center justify-center cursor-pointer'
                    onClick={() => removeImage(index)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className=' flex items-center justify-between mt-5 '>
          <label className='flex items-center'>
            <p className='text-white me-2'>Price:</p>
            <input autoComplete="off" onChange={onChangeHandler} type="number" name='price' className='outline-none border-none  py-2 px-2 resize-none rounded-lg text-secondary-color focus:ring-2 focus:ring-tertiary-color' />
          </label>
          <button onClick={handleSubmit} className='bg-white  py-2 px-4 text-xl outline-none border-none rounded-lg text-tertiary-color focus:ring-2 focus:ring-tertiary-color'>Submit</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TradeForm