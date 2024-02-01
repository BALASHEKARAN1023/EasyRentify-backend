import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/action/CarsActions';
import { Col, Row, message, DatePicker } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from "moment";
import { set } from 'mongoose';
const { RangePicker } = DatePicker;
function Home() {
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer)
  const dispatch = useDispatch();
  const [totalCars, setTotalCars] = useState([]);


  useEffect(() => {
    dispatch(getAllCars());
  }, [])

  useEffect(() => {
    //cars[]
    setTotalCars(cars);
  }, [cars])//[cars]
  function setFilter(values) {
    var temp = [];
    var selectedFrom = values[0].format('MMM DD YYYY HH:mm');
    var selectedTo = values[1].format('MMM DD YYYY HH:mm');

    for (var car of cars) {
      console.log(car.bookedTimeSlots.length);

      if (car.bookedTimeSlots.length == 0) {
        temp.push(car)
      }
      else {
        for (var booking of car.bookedTimeSlots) {

          if (moment(selectedFrom).isBetween(booking.from, booking.to) ||
            moment(selectedTo).isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {

            message.info("Oops Sorry! Only this cars are available . Thank you ");

          }
          else {
            console.log(cars.length + "esle   " + totalCars.length);
            temp.push(car);
            if (cars.length > totalCars.length) {
              message.success("All cars available Happy journey ");
            }

          }

        }

      }

    }
    setTotalCars(temp);

  }




  return (
    <DefaultLayout>
      <span className='text'>Check the car available in between yours given date and time slots
        already booked or not.</span><br />
      <Row className='mt-3' justify='center'>

        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker showTime={{ format: 'HH:mm' }} format="MMM DD YYYY HH:mm" onChange={setFilter} />
        </Col>
      </Row>

      {loading == true && (<Spinner />)}

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
                  <button className='btn1 mr-2'><Link style={{ textDecoration: 'none', color: "green" }} to={`/booking/${car._id}`}>Book Now</Link></button>
                </div>
              </div>
            </div>

          </Col>
        })}
      </Row>
    </DefaultLayout>
  )
}
export default Home