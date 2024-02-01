import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux';
import { deleteCar, getAllCars } from '../redux/action/CarsActions';
import { Col, Row, message, Popconfirm } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function AdminHome() {
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCars());
    }, [])

    const [totalCars, setTotalCars] = useState([]);
    useEffect(() => {
        //cars[]
        setTotalCars(cars);
    }, [cars])


    return (
        <DefaultLayout>

            <Row gutter={16} className='mt-2' >
                <Col lg={20} sm={24}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='mt-1 mr-2 '>Admin Panel</h3>
                        <button className='btn1'><Link to="/addcar" style={{ textDecoration: 'none', color: 'orangered' }}>Add Car</Link></button>
                    </div>

                </Col>
            </Row>
            {loading == true && (<Spinner />)}

            <Row justify='center' gutter={16} >
                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1'>
                            <img src={car.image} alt="carimage" className='carimg' />

                            <div className='car-content d-flex align-items-center justify-content-between'>

                                <div>
                                    <p>{car.name}</p>
                                    <p>rent per hour {car.rentPerHour} /-</p>
                                </div>

                                <div className='mx-4'>

                                    <Link to={`/editcar/${car._id}`}><EditOutlined className='mx-3' style={{ color: "green", cursor: "pointer" }} /></Link>
                                    <Popconfirm
                                        title="Delete the Car"
                                        description="Are you sure to delete this car?"
                                        onConfirm={() => { dispatch(deleteCar({ carid: car._id })) }}
                                        // onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >

                                        <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>

                    </Col>
                })}
            </Row>
        </DefaultLayout>
    )
}
export default AdminHome;