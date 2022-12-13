import React from 'react'
import { Link } from 'react-router-dom'
import './restaurants.scss'


const Restaurants = () => {
    return (
        <div id='restaurant'>
            <div className='container my-5'>
                <div className="row">
                    <div className="col-lg-3 my-2">
                        <div className="card">
                            <div className="card-body">
                                <img width='100%' src="" alt="" />
                                <h5 className="card-title text-center">
                                    Büyükfırat Türk Restoranı
                                </h5>
                            </div>
                            <div className="card-footer">
                                <div className="row text-center">
                                    <div className="col-lg-6">
                                        <button className='btn btn-outline-danger w-100' >Delete</button>
                                    </div>
                                    <div className="col-lg-6">
                                        <Link to="">
                                            <button className='btn btn-outline-warning w-100' >Edit</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <div className="col-lg-3 my-2">
                        <div className="card">
                            <div className="card-body">
                                <img width='100%' src="" alt="" />
                                <h5 className="card-title text-center">
                                    Büyükfırat Türk Restoranı
                                </h5>
                            </div>
                            <div className="card-footer">
                                <div className="row text-center">
                                    <div className="col-lg-6">
                                        <button className='btn btn-outline-danger w-100' >Delete</button>
                                    </div>
                                    <div className="col-lg-6">
                                        <Link to="">
                                            <button className='btn btn-outline-warning w-100' >Edit</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <div className="col-lg-3 my-2">
                        <div className="card">
                            <div className="card-body">
                                <img width='100%' src="" alt="" />
                                <h5 className="card-title text-center">
                                    Büyükfırat Türk Restoranı
                                </h5>
                            </div>
                            <div className="card-footer">
                                <div className="row text-center">
                                    <div className="col-lg-6">
                                        <button className='btn btn-outline-danger w-100' >Delete</button>
                                    </div>
                                    <div className="col-lg-6">
                                        <Link to="">
                                            <button className='btn btn-outline-warning w-100' >Edit</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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