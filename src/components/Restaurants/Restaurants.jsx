import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../config/firebase';
import './restaurants.scss'


const Restaurants = () => {

    const [restaurantes, setRestaurantes] = useState([]);
    const restaurantCollectionRef = collection(db, "restaurantes");
    // const [deletee, setDeletee] = useState("")
    
    const deleteRestaurant = async (id) => {
        const userDoc = doc(db, "restaurantes", id);
        let dlt = await deleteDoc(userDoc);
        // setDeletee(dlt)
    };

    useEffect(() => {
        const getRestaurantes = async () => {
            const data = await getDocs(restaurantCollectionRef);
            console.log(data)
            setRestaurantes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getRestaurantes();
    }, []);
    return (
        <div id='restaurant'>
            <div className='container my-5'>
                <div className="row">
                    {
                        restaurantes &&
                        restaurantes.map((restaurant) => {
                            console.log(restaurant)
                            return (
                                <div className="col-lg-3 my-2">
                                    <div className="card">
                                        <div className="card-body">
                                            <img width='100%' src={restaurant.thumbImage} alt="" />
                                            <h5 className="card-title text-center">
                                                {restaurant.name}
                                            </h5>
                                        </div>
                                        <div className="card-footer">
                                            <div className="row text-center">
                                                <div className="col-lg-6">
                                                    <button className='btn btn-outline-danger w-100' onClick={() => {
                                                        deleteRestaurant(restaurant.id);
                                                    }} >Delete</button>
                                                </div>
                                                <div className="col-lg-6">
                                                    <Link to={`/restaurants/update/${restaurant.id}`}>
                                                        <button className='btn btn-outline-warning w-100' >Edit</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        })
                    }

                </div>
                <div className="col-lg-4 my-4">
                    <Link to="/restaurants/create">
                        <button className='btn btn-outline-success'>Create</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Restaurants