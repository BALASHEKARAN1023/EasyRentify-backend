import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Col, Form, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { addCar, editCar, getAllCars } from '../redux/action/CarsActions';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
function EditCar() {

  const { cars } = useSelector(state => state.carsReducer)
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer)
  const [car, setCar] = useState()
  const [totalCars, setTotalCars] = useState([]);
  const { carid } = useParams();
  useEffect(() => {
    if (cars.length == 0) {

      dispatch(getAllCars());
    }
    else {
      setTotalCars(cars);
      setCar(cars.find(o => o._id == carid))//carid no id and not o.id it is _id
    }
  }, [cars]);


  function onFinish(val) {
    val._id = car._id;
    dispatch(editCar(val));

  }
  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <Row justify='center mt-5'>
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalCars.length>0 && (
          <Form style={{ backdropFilter: "blur(20px)" }} initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
            <h3 className='text-center'>Edit Car</h3>
            {car.name}
            <hr />
            <Form.Item name='name' label='Car name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image url' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='capacity' label='Capacity' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='fuelType' label='Fuel Type' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='rentPerHour' label='Rent per hour' rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <div className='text-center'>

              <button className='btn1 ' >Edit Car</button>
            </div>
          </Form>
          )}
        </Col>
      </Row>

    </DefaultLayout>

  )
}

export default EditCar;