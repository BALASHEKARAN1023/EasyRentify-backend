import React, { useState } from 'react'
import { Row, Col, Form, Input, message } from "antd";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/action/userAction';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css';
AOS.init();
function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer);
  function onFinish(values) {
    if (values.password !== values.confirmpassword) {
         message.warning("Please check Password");
    } else {

      dispatch(userRegister(values));
    }
  }
  return (
    <div className='login'>
      {loading == true && (<Spinner />)}
      <Row gutter={16} className='d-flex align-items-center'>

        <Col lg={16} style={{ position: 'relative' }}>
          <img data-aos='slide-left' data-aos-duration='1500' src='https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80' alt='carimg' />
          <h1 className='login-logo'><span className='logo-animation'>EasyRentify</span></h1>


        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5 ' onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Form.Item name='userName' label='Username' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name='confirmpassword' label='Confirm-Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>



            <button className='btn1 mt-2 mb-3'>Register</button>

            <br />

            <Link to='/login'>Click Here to Login</Link>







          </Form>
        </Col>

      </Row>

    </div>
  )
}

export default Register