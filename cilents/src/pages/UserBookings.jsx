import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { getAllBookings } from '../redux/action/bookingAction';
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector(state => state.bookingsReducer)
  const user = JSON.parse(localStorage.getItem('users'));
  const { loading } = useSelector(state => state.alertsReducer);
  useEffect(() => {
    dispatch(getAllBookings());
  }, [])
  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <h3 className='text-center mt-2'>My booking</h3>
      <Row justify="center" gutter={16} style={{ backdropFilter: "blur(9px)" }} >
        <Col lg={16} sm={24}>


          {bookings.filter(o => o.user == user.details._id).map((booking) => {

            return <Row gutter={16} className='bs1 mt-3 text-start' style={{ backdropFilter: "blur(9px)" }}>
              <Col lg={6} sm={24} style={{ backdropFilter: "blur(9px)" }}>

                <p><b>{booking.car.name}</b></p>
                <p>Total hours : <b>{booking.totalHours}</b></p>
                <p>rent Per Hour :<b>{booking.car.rentPerHour}</b></p>
                <p>Total amount :<b>{booking.totalAmount}</b></p>


              </Col>
              <Col lg={12} sm={24}>
                <p>Transaction Id : <b>{booking.transactionId}</b></p>
                <p>From : <b>{booking.bookedTimeSlots.from}</b> </p>
                <p>to : <b>{booking.bookedTimeSlots.to} </b> </p>
                <p>Date of Booking : <b>{moment(booking.createdAt).format('DD MMM YYYY HH:mm')}</b></p>
              </Col>
              <Col lg={6} sm={24} className='text-end'>
                <img style={{ borderRadius: 5 }} src={booking.car.image} height={140} className='p-2'></img>
              </Col>
            </Row>

          })}


        </Col>

      </Row>
    </DefaultLayout>
  )
}

export default UserBookings