import { Box, FormControl, FormLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import React, { useState } from 'react'
import './restaurants.scss'
import ImageUploading from 'react-images-uploading';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import MapPicker from 'react-google-map-picker';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


const DefaultLocation = { lat: 40.4093, lng: 49.8671 };
const DefaultZoom = 10;

const CreateRestaurants = () => {
    const [restaurantName, setRestaurantName] = useState("")
    const [address, setAddress] = useState("")
    const [avaragePrice, setAvaragePrice] = useState("")
    const [kitchen, setKitchen] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [reservStartTime, setReservStartTime] = useState("")
    const [reservEndTime, setReservEndTime] = useState("")
    const [social, setSocial] = useState("")
    const [smookTrue, setSmookTrue] = useState("")
    const [smookFalse, setSmookFalse] = useState("")
    const [description, setDescription] = useState("")
    const [bool, setBool] = useState("")
    const [menuPhoto, setMenuPhoto] = useState("")
    const [guest, setGuest] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [serviceList, setServiceList] = useState([{ service: "" }]);
    const [roomList, setRoomList] = useState([{ room: "" }]);
    const [images, setImages] = React.useState([]);
    const [singleImages, setSingleImages] = React.useState([]);
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [age, setAge] = React.useState('');
    const maxNumber = 69;



    //for upload image
    const onChange = (imageList, addUpdateIndex, e) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const onChangee = (imageList, addUpdateIndex) => {
        setSingleImages(imageList);
    };

    const onChangeMenu = (imageList, addUpdateIndex) => {
        setMenuPhoto(imageList);
    };

    //for addorRemoveInput
    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };

    const handleRoomChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...roomList];
        list[index][name] = value;
        setRoomList(list);
    };

    const handleRoomRemove = (index) => {
        const list = [...roomList];
        list.splice(index, 1);
        setRoomList(list);
    };

    const handleRoomAdd = () => {
        setRoomList([...roomList, { room: "" }]);
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
                mobileNumbers: ["ndc ", "jncz"],
                address: address,
                avaragePrice: parseFloat(avaragePrice),
                kitchen: kitchen,
                startTime: startTime,
                endTime: endTime,
                reservStartTime: reservStartTime,
                reservEndTime: reservEndTime,
                social: social,
                smookTrue: smookTrue,
                smookFalse: smookFalse,
                description: description,
                bool: bool,
                guest: guest,
                userName: userName,
                password: password,
                lat: lat,
                lng: lng
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id='CreateRestaurants'>
            <TextField fullWidth id="outlined-basic" label="Restoranın adı" className='mb-4' variant="outlined" onChange={e => setRestaurantName(e.target.value)} />

            {serviceList.map((singleService, index) => (

                <div key={index} className="row align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="first-division">
                            <TextField fullWidth id="outlined-basic" onChange={(e) => handleServiceChange(e, index)} label="Mobil nömrə" variant="outlined" />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="second-division">
                            {serviceList.length !== 1 && (
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
                        {serviceList.length - 1 === index && serviceList.length < 100 && (
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
            <TextField fullWidth id="outlined-basic" label="Əsas mətbəx" className='mb-4' variant="outlined" onChange={e => setKitchen(e.target.value)} />
            <div className="workTime">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <p>İş saatları</p>
                        <TextField
                            id="time"
                            label="Başlama saatı"
                            type="time"
                            className='startTime'
                            defaultValue="07:30"
                            onChange={(e) => (
                                setStartTime(e.target.value)
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
                            defaultValue="18:00"
                            onChange={(e) => (
                                setEndTime(e.target.value)
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
                            defaultValue="07:30"
                            onChange={(e) => (
                                setReservStartTime(e.target.value)
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
                            defaultValue="07:30"
                            onChange={(e) => (
                                setReservEndTime(e.target.value)
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

            <TextField fullWidth id="outlined-basic" label="Sosial şəbəkə hesabı" className='mb-4' variant="outlined" onChange={e => setSocial(e.target.value)} />
            <div className="cigarettesTrueFalse">
                <div className="row">
                    <div className="col-lg-6">
                        <TextField fullWidth id="outlined-basic" label="Siqaret çəkilən otaqlar" className='mb-4' type="number"
                            onChange={(event) => (
                                event.target.value < 0
                                    ? (event.target.value = 0)
                                    : event.target.value,
                                setSmookTrue(event.target.value)
                            )} variant="outlined" />
                    </div>
                    <div className="col-lg-6">
                        <TextField fullWidth id="outlined-basic"
                            onChange={(event) => (
                                event.target.value < 0
                                    ? (event.target.value = 0)
                                    : event.target.value,
                                setSmookFalse(event.target.value)
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
                        <Switch onChange={(e) => (
                            setBool(e.target.value)
                        )} />
                    </FormLabel>
                </div>

            </div>
            <div className="profilePhoto">
                <p>Profil şəkli</p>
                <ImageUploading
                    value={images}
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
                    value={singleImages}
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
                    setGuest(event.target.value)
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
                        <MenuItem value={10} onClick={console.log("salam")}>Link</MenuItem>
                        <MenuItem value={20}>File</MenuItem>


                    </Select>
                    {
                        age == 10 ? <TextField fullWidth id="outlined-basic" label="Link" className='mb-4' variant="outlined" /> : ""
                    }
                    {
                        age == 20 ? <div className="profilePhoto">
                            <p>Profil şəkli</p>
                            <ImageUploading
                                value={menuPhoto}
                                onChange={onChangeMenu}
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
                        </div> : ""
                    }


                </FormControl>
            </Box>
            <button onClick={Save} className="submit">Elave et</button>

        </div>
    )
}

export default CreateRestaurants