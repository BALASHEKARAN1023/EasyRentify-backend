import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/action/CarsActions';
import Spinner from '../components/Spinner';
import moment from "moment";
import { bookCar } from '../redux/action/bookingAction';
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from 'react-router-dom';
AOS.init();


const { RangePicker } = DatePicker;

function BookingCars() {
  const user=JSON.parse(localStorage.getItem('users'));
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer)
  const dispatch = useDispatch();
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { carid } = useParams();
  useEffect(() => {
    if (cars.length == 0) {

      dispatch(getAllCars());
    }
    else {
      setCar(cars.find(o => o._id === carid))
    }
  }, [cars]);

  useEffect(() => {

    setTotalAmount((totalHours * 1000)); {/* car.rentPerHours after replace in 1000*/ }
    if (driver) {
      setTotalAmount(totalAmount + (30 * totalHours));
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    if (values && values.length === 2) {
      const fromDates = values[0];
      const toDates = values[1];
      setFrom(fromDates.format('MMM DD YYYY HH:mm'));
      setTo(toDates.format('MMM DD YYYY HH:mm'));
      setTotalHours(toDates.diff(fromDates, 'hours'));

    }
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: user.details._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to
      }
    }
    dispatch(bookCar(reqObj));
  }
  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh', backdropFilter: "blur(9px)" }}>
        <Col lg={10} sm={24} xs={24} className='p-3'>
          {/* {car.image} after i have replace in url to this*/}
          <img src={car.image} alt="image" className='carimg2 bs2 w-100' data-aos='flip-left' data-aos-duration='1500' />
        </Col>
        <Col lg={10} sm={24} xs={24} className='text-end'>
          <Divider type='horizontal' style={{ borderColor: "azure", color: "azure" }} dashed> Car Info </Divider>
          <div >
            <p>{car.name}</p>
            <p>Rent Per Hour : {car.rentPerHour} </p>
            <p>Fueltype : {car.fuelType}</p>
            <p> Max Person : {car.capacity} </p>

          </div>
          <Divider type='horizontal' style={{ borderColor: "azure", color: "azure" }} dashed>Select Time Slots </Divider>
          <RangePicker showTime={{
            format: 'HH:mm',
          }}
            format="MMM DD YYYY HH:mm" onChange={selectTimeSlots} className='tcolor' />
          <br />
          <button className='btn1 mt-2 ' onClick={() => {
            setShowModal(true);
          }}>See Booked Slots</button>
          {from && to && (
            <div>
              <p>Total Hours : {totalHours}</p>
              <p>Rent Per Hour : {car.rentPerHour}</p>
              <Checkbox onChange={(e) => {
                if (e.target.checked) {
                  setDriver(true);
                }
                else {
                  setDriver(false);
                }
              }}>Driver Required</Checkbox>
              <h3>Total Amount : {totalAmount} </h3>
              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51OPI1wSF9laeRyYRU5RZuKKltN34BWAcAlihkJwZsCn3jWSKTR3VlO5OQhk3uUgVYplhMSmpEZcPjNLyZmtpIM4Q00Dsq0okC6">

                <button className='btn1'>Book Now</button>
              </StripeCheckout>
            </div>
          )}

        </Col>
        <Modal open={showModal} closable={false} footer={false} title='Booked time slots'>
          {car.name && (
          <div className='p-2'>
            {car.bookedTimeSlots.map((slot)=>{
  return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
})}
        
           
            <div className='text-end mt-5'>
              <button className='btn1' onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
           )}
        </Modal>
      </Row>

    </DefaultLayout>
  )
}

export default BookingCars;




// {car.bookTimeSlots.map((slots)=>{
//   return <button className='btn1 mt-2'>{slots.from}-{slots.to}</button>

// })}
// <div className='text-start mt-5'>
//   <button className='btn1' onClick={setshowModal(false)}>Close</button>
// </div>