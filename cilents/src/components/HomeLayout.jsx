import React from 'react'
import { Button, Dropdown, Row, Col } from 'antd';
function HomeLayout(props) {
    const items = [
        {
            key: '1',
            label: (
                <a href="/login" style={{ textDecoration: 'none', color: "orangered" }}>
                    Login
                </a>
            ),
        }
    ];
    return (
        <div>
            <div className='header bs1'>
                <Row gutter={16} justify={'center'}>
                    <Col lg={20} sm={24} xs={24}>

                    </Col>
                </Row>
                <div className='d-flex justify-content-between'>
                    <h1 ><b ><span className='logo-animation'>EasyRentify</span></b></h1>

                    <Dropdown menu={{ items }} placement="bottom">

                        <Button>Join</Button>
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

export default HomeLayout;