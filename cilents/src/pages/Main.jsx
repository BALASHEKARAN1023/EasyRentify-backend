import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/action/CarsActions';
import { Col, Row,Modal } from 'antd';
import Spinner from '../components/Spinner';
import HomeLayout from '../components/HomeLayout';
function Main() {
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer)
    const dispatch = useDispatch();
    const [totalCars, setTotalCars] = useState([]);
    const[isAlert,setAlert]=useState(false);
    useEffect(() => {
        dispatch(getAllCars());
    }, [])

    useEffect(() => {

        setTotalCars(cars);
    }, [cars])
    function alertMessage() {
       setAlert(true);
    }
    const handleOk = () => {
        setAlert(false);
      };
      const handleCancel = () => {
        setAlert(false);
      };
    return (
        <HomeLayout>
    
    
            {loading == true && (<Spinner />)}
            {isAlert == true && 
            <Modal title="Information " open={isAlert} onOk={handleOk} onCancel={handleCancel}>
                  You cannot be booked this car please Login and Happy journey.
       
        </Modal>}
            <Row justify='center' gutter={16} >
                {/* //demo.map corrent is cars.map after use Backend for the testing  */}
                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1'>
                            <img src={car.image} alt="carimage" className='carimg' />

                            <div className='car-content d-flex align-items-center justify-content-between'>

                                <div className='text-start pl-2' >
                                    <p>{car.name}</p>
                                    <p>rent per hour {car.rentPerHour} /-</p>
                                </div>
                                <div>
                                   
                                    <button className='btn1 mr-2' onClick={alertMessage}>Book Now</button>
                                </div>
                            </div>
                        </div>

                    </Col>
                })}
            </Row>
        </HomeLayout>
    )
}
export default Main




