import React from 'react'
import { useState } from 'react'
import image from '../../assets/animated icons/image.gif'
import video from '../../assets/animated icons/video.gif'
import  nigerianStates  from '../data/States'
// import socialPlatforms from '../data/assets'
import { useEffect } from 'react'
import PaymentMethod from '../PaymentMethod'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'
import { GiCancel } from 'react-icons/gi'


const AdBuyForm = ({advert, service, adTitle, platform, selectedImages, imageArray, socialService, handleImageRemove, expBudget, costToPay, earnPerTask, handleInputChange, handleImageChange }) => {
    const [mediaTypeImage, setMediaTypeImage] = useState('image')
    const [selectPaymentBtn, setSelectPaymentBtn] = useState(false)
    const [hideCommentInputFields, setHideCommentInputFields] = useState(false)
    const [hideImageInputFields, setHideImageInputFields] = useState(false)
    const [hideLinkInputFields, setHideLinkInputFields] = useState(false)
    const [selectedState, setSelectedState] = useState("")
    const [selectedStateCommunities, setSelectedStateCommunities] = useState([])
    const [selectedCommunity, setSelectedCommunity] = useState("")
    const user = useSelector(selectUser)


    useEffect(() => {
      //Both comment field and image field hidden
      if ( service === "Facebook Friend" || 
      service === "Page Likes" ||
      service === "Page Followers" ||
      service === "Post Likes" ||
      service === "Video Views" ||
      service === "Share" ||
      service === "Instagram Story View" ||
      service === "Retweet" ||
      service === "Join Twitter Space" ||
      service === "TikTok Favourites" ||
      service === "Subscribers" ||
      service === "LinkedIn Connect" ||
      service === "Repost" ||
      service === "Download App" ||
      service === "Download App and Review" ||
      service === "Download App Review and Register" ||
      service === "Follow" ||
      service === "Like/Favourite" ||
      service === "Stream"
      ) {
        setHideCommentInputFields(true)
        setHideImageInputFields(true)
      }

      //Image field hidden
      if ( 
        service === "Comment" ||
        service === "Quote Tweet" ||
        service === "Share With Comment" ||
        service === "Repost With comment"
      ) {
        setHideCommentInputFields(false)
        setHideImageInputFields(true)
      }

      //Comment field hidden
      // if (  ) {
      //   setHideCommentInputFields(true)
      //   setHideImageInputFields(true)
      // }

      if (platform === "youtube" && service === "Share") {
        setHideCommentInputFields(false)
        setHideImageInputFields(false)
      }

      //Link field Hidden
      if (service === "Post Your Content") {
        setHideLinkInputFields(true) 
      }
    }, [platform, service])
    

    


    const handleStateChange = (event) => {
      const index = event.target.value;
      setSelectedState(index);
      setSelectedCommunity("");

      sortState()
    }

    const sortState = () => {
      const selectedStateObject = nigerianStates?.find((item) => item.state === selectedState);
      setSelectedStateCommunities(selectedStateObject?.community) 
    }

    const handleCommunityChange = (event) => {
      const city = event.target.value;
      setSelectedCommunity(city);
    }


    const formData = {
      platform,
      service: service,
      adTitle,
      desiredROI: advert.roi,
      gender: advert.gender,
      state: selectedState,
      imageArray: imageArray,
      lga: selectedCommunity,
      caption: advert.adText,
      socialPageLink: advert.socialPageLink,
      costPerTask: costToPay,
      expBudget,
      earnPerTask,
    }

    const togglePaymentSelect = (e) => {
      e.preventDefault()

      if (hideImageInputFields === false && imageArray == []) {
        toast.error("Please upload a media for your ad")
        return
      }

      if (!service || !adTitle || !advert.roi || !advert.gender || !selectedState || !selectedCommunity || !expBudget ) {
        toast.error("Some required fields are empty, please fill in all the fields")
      } else {
       setSelectPaymentBtn(!selectPaymentBtn)
      }
  }

  


  return (
    <div className='w-full h-fit'>
      {selectPaymentBtn && <PaymentMethod togglePaymentSelect={togglePaymentSelect} formData={formData} />}
       <form onSubmit={togglePaymentSelect} className='w-fit md:w-full p-6 border border-semi_tertiary rounded-2xl flex flex-col text-center gap-6'>
                <div className='form__container flex flex-col w-full md:flex-row'>
                  <div className='left flex-1 md:border-r md:border-gray-100 md:pr-5'>

                          {/* Services */}
                          <div className='flex flex-col md:gap-6 w-fit md:w-full md:flex-row'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Product Name " className='text-left'>Service on {platform}</label>
                                <input  value={service} disabled className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl' />
                                <small className='text-left'>{platform} service to advertise on</small>
                            </div>
                          </div>

                            {/* Unit */}
                            <div className='flex flex-col w-fit md:w-full items-center md:gap-3 md:flex-row'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Business Name" className='text-left mb-1 ml-1'>Unit</label>
                                <input type="number" placeholder='' name='roi' value={advert.roi} onChange={handleInputChange} className='w-fit md:w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'/>
                                <small className='text-left w-[200px] md:w-full'>Expected Cost per unit For this Campaign: ₦{costToPay}/task</small>
                            </div>

                             {/* Unit's total cost */}
                            <div className='flex flex-col mb-3 justify-center'>
                            <label className='text-left mb-1 ml-1 text-sm'>You will Pay:</label>
                            <div className='flex items-center ml-2'>
                            <span>₦</span>
                            <input type="number" placeholder='' value={expBudget} disabled className='w-fit md:w-full text-gray-800 bg-transparent text-sm font-extrabold'/>
                            </div>
                              
                            </div>
                          </div>
                          
                             {/* State */}
                          <div className='flex flex-col w-full md:flex-row md:gap-6'>
                          <div className='flex flex-col mt-3 mb-3'>
                              <label htmlFor="location" className='text-left mb-1 ml-1'>State</label>
                                <select 
                                  className='w-fit md:w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
                                  value={selectedState}
                                  name={selectedState}
                                  onChange={handleStateChange}>
                                    <option value="">Select a state</option>
                                    <option value="All">All States</option>
                                    {nigerianStates?.map((object, index) => (
                                      <option key={index} value={object.state}>{object.state}</option>
                                    ))}
                                </select>
                          </div>

                          {/* Local Government */}
                          {selectedState !== "" && (
                            <div className='flex flex-col mt-3 mb-3'>
                            <label htmlFor="city-select" className='text-left mb-1 ml-1'>LGAs from {selectedState}</label>
                              <select
                                className='w-fit md:w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
                                value={selectedCommunity}
                                name={selectedCommunity}
                                onChange={handleCommunityChange}>
                                  <option value="">Select Local Government</option>
                                  <option value="All">All  Local Governments</option>
                                  {nigerianStates
                                    .find((obj) => obj.state === selectedState)
                                    ?.community.map((city, index) => (
                                      <option key={index} value={city}>{city}</option>
                                    ))}
                              </select>
                            </div>
                          )}
                          </div>

                            {/* Gender */}
                          <div className='flex flex-col w-full md:flex-row md:gap-6'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Gender" className='text-left mb-1 ml-1'>Gender</label>
                                <select name="gender" id="gender" value={advert.gender} onChange={handleInputChange} className='w-fit md:w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'>
                                    <option value="">Select a Gender</option>
                                    <option value="All">All</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                          </div>

                          {/* Ad text/Caption/Comment */}
                          {hideCommentInputFields ? "" : (
                          <div className='w-[200px] md:w-full flex flex-col mt-3 mb-1'>
                              <label htmlFor="adText" className='text-left mt-4 mb-1 ml-1'>
                                {service == "Comment" && "Type of comments you want"}
                                {service === "Quote Tweet" && "Kind of quotes you want (Give as many example as possible)"}
                                {service === "Share With Comment" && "Kind of comments you want (Give as many example as possible)"}
                                {service === "Post Your Content" && "Write up/Post Content (include link if necessary)"}
                                {platform === "youtube" && service === "Share" && "Write up/Post Content (include link if necessary)"}
                                {platform === "linkedin" && service === "Repost With comment" && "Kind of comments you want (Give as many example as possible)"}
                              </label>

                              <div className='w-fit md:w-full'>
                              <textarea 
                              type="textarea" 
                              cols="60" 
                              rows="10" 
                              name='adText' 
                              placeholder =
                              {service === "Comment" || service === "Share With Comment" ? "Give as many examples as possible, write a comment example per line and seperated by fullstop" : "Ad description"
                              }
                              value={advert.adText} 
                              onChange={handleInputChange} 
                              className='shadow-inner bg-transparent border border-gray-200 rounded-xl p-3 mb-1 w-[250px] md:w-[100%] box-border'/>
                              </div>
                          </div>
                          )}
                  </div>


                    {/* Image and video upload */}
                  <div className='right w-full flex flex-col items-start flex-1 pt-3'>
                  {hideImageInputFields ? "" : (
                    <div className=''>
                        <label htmlFor="media" className='my-6'>Campaign Media</label>
                        <div className='w-full h-full flex flex-col pt-[1rem] items-center border-gray-200'>
                            {/* Upload Ad Media Contents */}
                            <label htmlFor="upload proof of work" className='text-gray-500 font-bold text-center mb-[1rem]'>Upload Ad Media Contents</label>
                                <div className='w-full h-fit flex flex-wrap items-center justify-center gap-2 p-5'>
                                {selectedImages?.map((item, index) => (   
                                  <div key={index} className='relative w-[200px] h-[200px]'>
                                    <img  src={item} alt="preview" className='w-full h-full object-cover'/>
                                    <GiCancel  size={20} className='absolute text-tertiary top-0 right-0 pr-1 pt-1' onClick={(e) => handleImageRemove(item)}/>
                                  </div> 
                                    
                                ))}
                                </div>
                                
                            {/* File Upload Input Tag  */}
                      <input type="file"  name="images"  placeholder='Upload Screenshots' multiple  onChange={handleImageChange} className='w-full p-3 shadow-inner rounded-2xl bg-gray-50 md:w-[300px]' />
                        </div>
                    </div>
                  )}

                     {/*Associated Link */}
                     {hideLinkInputFields ? "" : (
                    <div className='flex justify-center mt-[2rem] flex-col md:gap-6 w-full md:flex-row'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Page Link" className='text-left'>Associated link if any</label>
                                      <input type="text" name="socialPageLink" id="socialPageLink" placeholder={`https://${platform}.com/${user.username}`} value={advert.socialPageLink} onChange={handleInputChange} className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'/>
                                <small className='text-left'>Eg, copy and paste your {platform} page link here.</small>
                            </div>
                          </div>
                      )}
                    </div>
                     

                    

                </div>

                <button type="submit"  className='w-full px-4 py-2  text-md rounded-xl bg-tertiary text-gray-100 mb-5 hover:bg-secondary md:w-2/6 md:ml-[4.5rem]'>Submit!</button>
    </form>
    </div>
   
  )
}

export default AdBuyForm