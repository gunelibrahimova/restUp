import { Box, FormControl, FormLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './restaurants.scss'
import ImageUploading from 'react-images-uploading';
import MapPicker from 'react-google-map-picker';
import { collection, addDoc, GeoPoint } from "firebase/firestore";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { v4 } from 'uuid';
import Swal from 'sweetalert2'

const DefaultLocation = { lat: 40.4093, lng: 49.8671 };
const DefaultZoom = 10;

const CreateRestaurants = () => {
    const [restaurantName, setRestaurantName] = useState("")
    const [address, setAddress] = useState("")
    const [avgPrice, setAvaragePrice] = useState("")
    const [mainCuisine, setMainCuisine] = useState("")
    const [workingStartsAt, setWorkingStartsAt] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [reservStartTime, setReservStartTime] = useState(new Date())
    const [reservEndTime, setReservEndTime] = useState(new Date())
    const [socialNetworkAccount, setSocialNetworkAccount] = useState("")
    const [smokingRooms, setSmokingRooms] = useState("")
    const [nonSmokingRooms, setNonSmokingRooms] = useState("")
    const [description, setDescription] = useState("")
    const [bookingAvailable, setBookingAvailable] = useState(true)
    const [maxAllowedGuests, setMaxAllowedGuests] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [lat, setLat] = useState(defaultLocation.lat)
    const [lng, setLng] = useState(defaultLocation.lng)
    const [phoneNumbers, setPhoneNumbers] = useState([{ mobile: "" }]);
    const [roomList, setRoomList] = useState([{ room: "" }]);
    const [menu, setMenu] = useState("");
    const [images, setImages] = React.useState([]);
    const [singleImages, setSingleImages] = React.useState([]);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [age, setAge] = React.useState('');
    const maxNumber = 69;
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [thumbImage, setThumbImage] = useState("")
    // const [images, setThumbImage] = useState("")


    //for upload image
    const onChange = (imageList, addUpdateIndex, e) => {
        setSingleImages(imageList);
        if (imageList == null) {
            alert("null")
        };
        let image = imageList[0].file;
        const imageRef = ref(storage, `images/${v4() + image.name}`);
        uploadBytes(imageRef, image).then((value) => {
            getDownloadURL(imageRef).then((url) => {
                setThumbImage(url);
            });
        })
    };

    const onChangee = (imageList, addUpdateIndex) => {
        setImages(imageList);
        console.log(imageList)
        if (imageList == null) {
            alert("null")
        };
        for (let i = 0; i < imageList.length; i++) {
            let image = imageList[i].file;
            console.log("===" + image)

            const imageRef = ref(storage, `images/${v4() + image.name}`);
            uploadBytes(imageRef, image).then((value) => {
                getDownloadURL(imageRef).then((url) => {
                    console.log(url);
                    setImages(url)
                });
            })
        }
    };

    const imagesListRef = ref(storage, "menu/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `menu/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls(() => [url]);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls(() => [url]);
                });
            });
        });
    }, []);

    //for addorRemoveInput
    const handleServiceChange = (e, index) => {
        const { value } = e.target;
        const list = [...phoneNumbers];
        list[index] = value;
        setPhoneNumbers(list);
    };

    const handleServiceRemove = (index) => {
        const list = [...phoneNumbers];
        list.splice(index, 1);
        setPhoneNumbers(list);
    };

    const handleServiceAdd = (e) => {
        setPhoneNumbers([...phoneNumbers, ""]);
    };

    const handleRoomChange = (e, index) => {
        const { value } = e.target;
        const list = [...roomList];
        list[index] = value;
        setRoomList(list);
    };

    const handleRoomRemove = (index) => {
        const list = [...roomList];
        list.splice(index, 1);
        setRoomList(list);
    };

    const handleRoomAdd = () => {
        setRoomList([...roomList, ""]);
    };

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
        setLat(lat);
        setLng(lng)
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }

    const handleChange = (event) => {
        setAge(event.target.value)
    };

    const Save = async () => {
        try {
            const docRef = await addDoc(collection(db, "restaurantes"), {
                name: restaurantName,
                phoneNumbers: phoneNumbers,
                address: address,
                avgPrice: parseFloat(avgPrice),
                mainCuisine: mainCuisine,
                workingStartsAt: workingStartsAt,
                workingEndsAt: endTime,
                bookingStartsAt: reservStartTime,
                bookingEndsAt: reservEndTime,
                socialNetworkAccount: socialNetworkAccount,
                smokingRooms: smokingRooms,
                nonSmokingRooms: nonSmokingRooms,
                description: description,
                bookingAvailable: bookingAvailable,
                maxAllowedGuests: parseFloat(maxAllowedGuests),
                username: username,
                password: password,
                menu: menu,
                location: new GeoPoint(lat, lng),
                roomTypes: roomList,
                thumbImage: thumbImage,
                images: images
            });

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Məlumat əlavə olundu',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Xəta baş verdi',
            })
        }
    }
    Date.prototype.addHours = function (h) {
        this.setHours(this.getHours() + h);
        return this;
    }

    return (
        <div id='CreateRestaurants'>
            <TextField fullWidth id="outlined-basic" label="Restoranın adı" className='mb-4' variant="outlined" onChange={e => setRestaurantName(e.target.value)} />
            {phoneNumbers.map((singleService, index) => (

                <div key={index} className="row align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="first-division">
                            <TextField fullWidth id="outlined-basic" onChange={(e) => handleServiceChange(e, index)} label="Mobil nömrə" variant="outlined" />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="second-division">
                            {phoneNumbers.length !== 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleServiceRemove(index)}
                                    className="remove-btn"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-2">
                        {phoneNumbers.length - 1 === index && phoneNumbers.length < 100 && (
                            <button
                                type="button"
                                onClick={handleServiceAdd}
                                className="add-btn"
                            >
                                <i class="fa-solid fa-plus"></i> <span>Əlavə et</span>
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <TextField fullWidth id="outlined-basic" label="Adres" className='mb-4' variant="outlined" onChange={e => setAddress(e.target.value)} />
            <TextField fullWidth id="outlined-basic" label="Orta qiymət" className='mb-4' variant="outlined" onChange={e => setAvaragePrice(e.target.value)} />
            <TextField fullWidth id="outlined-basic" label="Əsas mətbəx" className='mb-4' variant="outlined" onChange={e => setMainCuisine(e.target.value)} />
            <div className="workTime">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <p>İş saatları</p>
                        <TextField
                            id="time"
                            label="Başlama saatı"
                            type="time"
                            className='startTime'
                            onChange={(e) => (
                                setWorkingStartsAt(e.target.valueAsDate.addHours(-4))
                            )}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            sx={{ width: 150 }}
                        />

                        <TextField
                            id="time"
                            label="Bitmə saatı"
                            type="time"
                            onChange={(e) => (
                                setEndTime(e.target.valueAsDate.addHours(-4))
                            )}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            sx={{ width: 150 }}
                        />
                    </div>
                    <div className="col-lg-6">
                        <p>Rezerv saatları</p>
                        <TextField
                            id="time"
                            label="Başlama saatı"
                            type="time"
                            className='startTime'
                            onChange={(e) => (
                                setReservStartTime(e.target.valueAsDate.addHours(-4))
                            )}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            sx={{ width: 150 }}
                        />

                        <TextField
                            id="time"
                            label="Bitmə saatı"
                            type="time"
                            onChange={(e) => (
                                setReservEndTime(e.target.valueAsDate.addHours(-4))
                            )}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            sx={{ width: 150 }}
                        />
                    </div>
                </div>
            </div>

            <TextField fullWidth id="outlined-basic" label="Sosial şəbəkə hesabı" className='mb-4' variant="outlined" onChange={e => setSocialNetworkAccount(e.target.value)} />
            <div className="cigarettesTrueFalse">
                <div className="row">
                    <div className="col-lg-6">
                        <TextField fullWidth id="outlined-basic" label="Siqaret çəkilən otaqlar" className='mb-4' type="number"
                            onChange={(event) => (
                                event.target.value < 0
                                    ? (event.target.value = 0)
                                    : event.target.value,
                                setSmokingRooms(event.target.value)
                            )} variant="outlined" />
                    </div>
                    <div className="col-lg-6">
                        <TextField fullWidth id="outlined-basic"
                            onChange={(event) => (
                                event.target.value < 0
                                    ? (event.target.value = 0)
                                    : event.target.value,
                                setNonSmokingRooms(event.target.value)
                            )}
                            label="Siqaret çəkilməyən otaqlar" className='mb-4' type="number"
                            variant="outlined" />
                    </div>
                </div>
            </div>
            <TextField
                id="outlined-multiline-static"
                label="Təsvir"
                multiline
                rows={4}
                fullWidth
                onChange={e => setDescription(e.target.value)}
            />
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <span>Rezervasiya mövcuddur</span>
                </div>
                <div className="col-lg-6 d-flex justify-content-end">
                    <FormLabel component="legend">
                        <Switch defaultChecked onChange={(e) => (
                            setBookingAvailable(e.target.checked)
                        )} />
                    </FormLabel>
                </div>

            </div>
            <div className="profilePhoto">
                <p>Profil şəkli</p>
                <ImageUploading
                    value={singleImages}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                className="uploadSinglePhoto"
                            >
                                Upload photo
                            </button>
                            &nbsp;
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} className="smallphoto" alt="" width="600" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)} className="update"><i class="fa-solid fa-arrows-rotate"></i></button>
                                        <button onClick={() => onImageRemove(index)} className="remove"><i class="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
            <div className="photos">
                <p>Səkillər</p>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChangee}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                className="uploadSinglePhoto"
                            >
                                Click or Drop here

                            </button>
                            &nbsp;
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} className="smallphoto" alt="" width="200" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)} className="update"><i class="fa-solid fa-arrows-rotate"></i></button>
                                        <button onClick={() => onImageRemove(index)} className="remove"><i class="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
            <TextField fullWidth id="outlined-basic" label="İcazə verilən ən çox qonaq sayı" className='mb-4 mt-4' type="number"
                onChange={(event) => (
                    event.target.value < 0
                        ? (event.target.value = 0)
                        : event.target.value,
                    setMaxAllowedGuests(event.target.value)
                )} variant="outlined" />
            {roomList.map((singleRoom, index) => (
                <div key={index} className="row align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="first-division">
                            <TextField fullWidth id="outlined-basic" onChange={(e) => handleRoomChange(e, index)} label="Otaq növləri" variant="outlined" />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="second-division">
                            {roomList.length !== 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRoomRemove(index)}
                                    className="remove-btn"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-2">
                        {roomList.length - 1 === index && roomList.length < 100 && (
                            <button
                                type="button"
                                onClick={handleRoomAdd}
                                className="add-btn"
                            >
                                <i class="fa-solid fa-plus"></i> <span>Əlavə et</span>
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <div className="nameAndPassword">
                <div className="row">
                    <div className="col-lg-6">
                        <TextField fullWidth id="outlined-basic" label="User name" className='mb-4' variant="outlined" onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="col-lg-6">
                        <TextField fullWidth id="outlined-basic" label="Password" className='mb-4' variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
            </div>

            <button onClick={handleResetLocation}>Reset Location</button>
            <label>Latitute:</label><input type='text' value={location.lat} disabled />
            <label>Longitute:</label><input type='text' value={location.lng} disabled />
            <label>Zoom:</label><input type='text' value={zoom} disabled />

            <MapPicker defaultLocation={defaultLocation}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{ height: '700px' }}
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyAkpCdayFL9fFwjqEG2DaSGYA0Vz73EVog'
            />

            <br />
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Menu</InputLabel>
                    <Select
                        className='select'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10} >Link</MenuItem>
                        <MenuItem value={20}>File</MenuItem>
                    </Select>
                    {
                        age == 10 ? <TextField fullWidth id="outlined-basic" label="Link" className='mb-4' variant="outlined" onChange={e => setMenu(e.target.value)} /> : ""
                    }
                    {
                        // age == 20 ? <div className="profilePhoto">
                        //     <p>Profil şəkli</p>
                        //     <ImageUploading
                        //         value={menuPhoto}
                        //         onChange={onChangeMenu}
                        //         maxNumber={maxNumber}
                        //         dataURLKey="data_url"
                        //     >
                        //         {({
                        //             imageList,
                        //             onImageUpload,
                        //             onImageRemoveAll,
                        //             onImageUpdate,
                        //             onImageRemove,
                        //             isDragging,
                        //             dragProps,
                        //         }) => (
                        //             <div className="upload__image-wrapper">
                        //                 <button
                        //                     style={isDragging ? { color: 'red' } : undefined}
                        //                     onClick={onImageUpload}
                        //                     {...dragProps}
                        //                     className="uploadSinglePhoto"
                        //                 >
                        //                     Upload photo
                        //                 </button>
                        //                 &nbsp;
                        //                 {imageList.map((image, index) => (
                        //                     <div key={index} className="image-item">
                        //                         <img src={image['data_url']} className="smallphoto" alt="" width="600" />
                        //                         <div className="image-item__btn-wrapper">
                        //                             <button onClick={() => onImageUpdate(index)} className="update"><i class="fa-solid fa-arrows-rotate"></i></button>
                        //                             <button onClick={() => onImageRemove(index)} className="remove"><i class="fa-solid fa-trash"></i></button>
                        //                         </div>
                        //                     </div>
                        //                 ))}
                        //             </div>
                        //         )}
                        //     </ImageUploading>
                        // </div> : ""
                        age == 20 ? <div className='fileUpload'>
                            <input
                                type="file"
                                onChange={(event) => {
                                    setImageUpload(event.target.files[0]);
                                }}
                            /> <br /> <br />
                            {/* <img width={200} src={imageUrls} alt="" /> <br/> <br/> */}

                            <button onClick={uploadFile}> Upload Image</button>

                        </div>
                            : ""
                    }


                </FormControl>
            </Box>
            <button onClick={Save} className="submit">Elave et</button>

        </div>
    )
}

export default CreateRestaurants