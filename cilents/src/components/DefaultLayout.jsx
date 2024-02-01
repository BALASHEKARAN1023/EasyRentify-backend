import React, { useState, useEffect } from 'react'
import { Button, Dropdown, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('users'));

  const [isAlert, setAlert] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (user.role === "admin") {
      setAdmin(true);

    }


  }, [])

  useEffect(() => {
    if (user.role === "admin") {
      setAdmin(true);

    }


  }, [])

  function alertMessage() {
    setAlert(true);
  }
  const items = [
    {
      key: '1',
      label: (
        <Link to="/home" style={{ textDecoration: 'none', color: "orangered" }}>
          Home
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/userbookings" style={{ textDecoration: 'none', color: "orangered" }}>
          Booking
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <div >
          {
            admin ? <Link to="/admin" style={{ textDecoration: 'none', color: "orangered" }}>
              Admin
            </Link>
              : <div>
                <span onClick={alertMessage}>
                  <Link to="/admin" onClick={alertMessage} style={{ textDecoration: 'none', color: "orangered", pointerEvents: "none" }}>
                    Admin
                  </Link></span>
              </div>


          }
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div onClick={() => {

          localStorage.removeItem('users');
          window.location.href = '/';
          //  window.location.reload();
        }}><div>
            <li style={{ color: "orangered" }}>
              Logout
            </li>
          </div>
        </div>
      ),
    },
  ];


  return (
    <div>
      <div className='header bs1'>
        {isAlert == true && message.info("Access Denied")}
        <Row gutter={16} justify={'center'}>
          <Col lg={20} sm={24} xs={24}>

          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <h1 ><b><Link to="/home" style={{ color: "orangered", textDecoration: 'none' }}><span className='logo-animation'>EasyRentify</span></Link></b></h1>

          <Dropdown menu={{ items }} placement="bottom">
            <Button>{user.details.userName}</Button>

          </Dropdown>

        </div>
      </div>
      <div className='content'>
        {props.children}
      </div>
      <div className='footer text-center'>
        <p>Desinged and Developed By</p>

        <p>BALASHEKARAN P R</p>
      </div>
    </div>
  )
}

export default DefaultLayout;