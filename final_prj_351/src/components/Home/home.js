import React from "react";
import Chart from "../Chart/chart";
import NavbarStock from "../Navbar/navbarstock"
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap';

import axios from 'axios'


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
        weburl: ""
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
            <NavbarStock/>

            <br/>
            <div>   
                <Container>
                    <Dropdown onSelect={handleDropdownSelect}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Stock Name
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
                        <Chart stock={selectedStock} />
                    </Col>
                    <Col md={4}>
                        <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Country: </Form.Label>
                            <Form.Control placeholder={companyData.country}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Country: </Form.Label>
                            <Form.Control placeholder={companyData.currency} disabled/>
                        </Form.Group>

                        <p>Currency: {companyData.currency}</p>
                        <p>Exchange: {companyData.exchange}</p>
                        <p>Name: {companyData.name}</p>
                        <p>Industry: {companyData.finnhubIndustry}</p>
                        <p>IPO: {companyData.ipo}</p>
                        <img src={companyData.logo} alt="Company Logo"></img>

                        <h5>Market Capitalization: {companyData.marketCapitalization}</h5>
                        <h5>Phone: {companyData.phone}</h5>
                        <h5>Web URL: {companyData.weburl}</h5>
                        <h5>Ticker: {companyData.ticker}</h5>
                        <h5>Share Outstanding: {companyData.shareOutstanding}</h5>
                        <h6 className="display-6">Selected Stock: {selectedStock}</h6>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
    
}