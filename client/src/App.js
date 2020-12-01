import React, { Component } from 'react';
import { enUS } from 'date-fns/locale';
import { Calendar } from 'react-nice-dates';
import FileUpload from './FileUpload';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import DatePicker from "react-datepicker"

import 'react-nice-dates/build/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

const schema = yup.object({
  // file: yup.string().required(),
  numPeople: yup.number().required(),
  numTests: yup.number().required(),
  numTestDays: yup.number().required(),
  numTestHours: yup.number().required(),
  numStaff: yup.number().required(),
  testTime: yup.number().required(),
  numWeeks: yup.number().required(),
  maxGroups: yup.number().required(),
  startDate: yup.date().required()
});

class App extends Component {
  state = {
    scheduleMap: '',
    startDate: new Date(),
    fileUploaded: false,
    showModal: false,
    currentDate: new Date(),
    peopleToBeTested: []
  };
  
  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }
  
  handleSubmit = async (values) => {
    // values.preventDefault();
    this.setState({startDate: values.startDate});
    axios.post('/api/schedule/inputs', values, {}).then(res => {
      this.setState({scheduleMap: new Map(JSON.parse(res.data.schedule))});
      console.log(this.state.scheduleMap.keys());
    }).catch(err => console.log(err));
  };

  handleDayClick = date => {
    // console.log(new Date(date));
    const selectedDate = new Date(date);
    // console.log(selectedDate.toLocaleDateString("en-US"))
    if (this.state.scheduleMap.has(selectedDate.toLocaleDateString("en-US"))) {
      console.log("this day is part of schedule");
      this.setState({showModal: true});
      this.setState({currentDate: selectedDate});
      this.setState({peopleToBeTested: this.state.scheduleMap.get(selectedDate.toLocaleDateString("en-US"))});
    }
  };

  handleClose = () => {
    this.setState({showModal: false});
  }

  setFileUpload = () => {
    this.setState({fileUploaded: true});
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
          Testing Scheduler
          </p>
        </header>
        <div className="body">
          <div className="sidebar">
          <FileUpload onSubmit={this.setFileUpload}/>
          {this.state.fileUploaded &&
            <Formik 
              initialValues={{startDate: new Date()}}
              validationSchema={schema} onSubmit={this.handleSubmit}>
              {({
                handleSubmit,
                handleChange,
                // handleBlur,
                values,
                touched,
                // isValid,
                errors,
                setFieldValue
              }) => (
              <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column>
                        Number of people at location
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="numPeople"
                          id="validationFormik01"
                          onChange={handleChange}
                          isValid={touched.numPeople && !errors.numPeople}
                          isInvalid={!!errors.numPeople}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.numPeople}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label column>
                        Cap of PCR tests processed/day
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="numTests"
                          id="validationFormik02"
                          onChange={handleChange}
                          isValid={touched.numTests && !errors.numTests}
                          isInvalid={!!errors.numTests}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.numTests}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label column>
                        # testing days in a week
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="numTestDays"
                          id="validationFormik03"
                          onChange={handleChange}
                          isValid={touched.numTestDays && !errors.numTestDays}
                          isInvalid={!!errors.numTestDays}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.numTestDays}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label column>
                        # testing hours in a day
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="numTestHours"
                          id="validationFormik04"
                          onChange={handleChange}
                          isValid={touched.numTestHours && !errors.numTestHours}
                          isInvalid={!!errors.numTestHours}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.numTestHours}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label column>
                        # staff
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="numStaff"
                          id="validationFormik05"
                          onChange={handleChange}
                          isValid={touched.numStaff && !errors.numStaff}
                          isInvalid={!!errors.numStaff}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.numStaff}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label column>
                        Time per test in hours
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="testTime"
                          id="validationFormik06"
                          onChange={handleChange}
                          isValid={touched.testTime && !errors.testTime}
                          isInvalid={!!errors.testTime}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.testTime}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label column>
                        Trial length in weeks
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="numWeeks"
                          id="validationFormik07"
                          onChange={handleChange}
                          isValid={touched.numWeeks && !errors.numWeeks}
                          isInvalid={!!errors.numWeeks}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.numWeeks}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label column>
                        Max groups testing per day
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="maxGroups"
                          id="validationFormik08"
                          onChange={handleChange}
                          isValid={touched.maxGroups && !errors.maxGroups}
                          isInvalid={!!errors.maxGroups}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.maxGroups}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label column>
                        Starting date
                      </Form.Label>
                      <Col>
                        <DatePicker 
                        id="validationFormilk09"
                        selected={values.startDate}
                        dateFormat="MMMM d, yyyy"
                        className="form-control"
                        name="startDate"
                        onChange={date => setFieldValue('startDate', date)}
                        />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                <Button type="submit">Create Schedule</Button>
              </Form>
              )}
            </Formik>}
          </div>
          <div className="calendar">
            <Calendar onDayClick={this.handleDayClick} locale={enUS} />
          </div>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.currentDate.toDateString()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Number of people to test: {this.state.peopleToBeTested.length}</h4>
              <ul>
                {this.state.peopleToBeTested.map(function(name, index){
                    return <li key={ index }>{name}</li>;
                  })}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              {/* <Button variant="primary" onClick={this.handleClose}>
                Save Changes
              </Button> */}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
