import React from "react";
import Chart from "../Chart/chart";
import NavbarStock from "../Navbar/navbarstock"
import { Container, Row, Col, Dropdown, Form, Table } from 'react-bootstrap';

import axios from 'axios'
import './home.css'


export default function Home(){
    const [companyData, setCompanyData] = React.useState({
        country: "",
        currency: "",
        exchange: "",
        finnhubIndustry: "",
        ipo: "",
        logo: "",
        marketCapitalization: 0,
        name: "",
        phone: "",
        shareOutstanding: 0.0,
        ticker: "",
        weburl: "",
        predictedPrice: 0.0
    })
    const [selectedStock, setSelectedStock] = React.useState('AAPL');

    const handleDropdownSelect = async (eventKey) => {
        console.log(eventKey);
        setSelectedStock(eventKey);
        const company = await axios({
          url: `http://localhost:8000/api/company/${eventKey}`,
          method: 'get',
        });
        console.log(company.data);
        setCompanyData(company.data);
      };
    
      React.useEffect(() => {
        async function fetchData() {
          const company = await axios({
            url: `http://localhost:8000/api/company/${selectedStock}`,
            method: 'get',
          });
          setCompanyData(company.data);
        }
        fetchData();
      }, [selectedStock]);

    return(
        <div>
            <NavbarStock className="navbarStock"/>

            <br/>
            <div>   
                <Container>
                    <Dropdown onSelect={handleDropdownSelect}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Choose Stock Name
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="AAPL">Apple</Dropdown.Item>
                        <Dropdown.Item eventKey="AMZN">Amazon</Dropdown.Item>
                        <Dropdown.Item eventKey="MSFT">Microsoft</Dropdown.Item>
                        <Dropdown.Item eventKey="IBM">IBM</Dropdown.Item>
                        <Dropdown.Item eventKey="CRM">Salesforce</Dropdown.Item>
                        <Dropdown.Item eventKey="GOOG">Google</Dropdown.Item>
                        <Dropdown.Item eventKey="NFLX">Netflix</Dropdown.Item>
                        <Dropdown.Item eventKey="LNKD">LinkedIn</Dropdown.Item>
                        <Dropdown.Item eventKey="ORCL">Oracle</Dropdown.Item>
                        <Dropdown.Item eventKey="META">Meta</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                <Row>
                    <Col md={8} className="text-center">
                        <div className='chart-container'>
                            <Chart stock={selectedStock} />
                        </div>

                        <h2>
                            Predicted Price: {companyData.predictedPrice}
                        </h2>
                    </Col>
                    <Col md={4}>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                <th colSpan={2}>{companyData.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Predicted Price:</td>
                                <td>{companyData.predictedPrice}</td>
                                </tr>
                                <tr>
                                <td>Country:</td>
                                <td>{companyData.country}</td>
                                </tr>
                                <tr>
                                <td>Currency:</td>
                                <td>{companyData.currency}</td>
                                </tr>
                                <tr>
                                <td>Exchange:</td>
                                <td>{companyData.exchange}</td>
                                </tr>
                                <tr>
                                <td>Industry:</td>
                                <td>{companyData.finnhubIndustry}</td>
                                </tr>
                                <tr>
                                <td>IPO:</td>
                                <td>{companyData.ipo}</td>
                                </tr>
                                <tr>
                                <td>Market Capitalization:</td>
                                <td>{companyData.marketCapitalization}</td>
                                </tr>
                                <tr>
                                <td>Phone:</td>
                                <td>{companyData.phone}</td>
                                </tr>
                                <tr>
                                <td>Web URL:</td>
                                <td>{companyData.weburl}</td>
                                </tr>
                                <tr>
                                <td>Ticker:</td>
                                <td>{companyData.ticker}</td>
                                </tr>
                                <tr>
                                <td>Share Outstanding:</td>
                                <td>{companyData.shareOutstanding}</td>
                                </tr>
                                <tr>
                                <td>Selected Stock:</td>
                                <td>{selectedStock}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
    
}