import React, { Component } from 'react';
import { enGB } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import FileUpload from './FileUpload';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';

import 'react-nice-dates/build/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  // startDate
});

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }
  
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
    
  //   return body;
  // };
  
  handleSubmit = async (values) => {
    // values.preventDefault();
    const response = await fetch('/api/schedule/inputs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: values,
    });
    const body = await response.json();
    console.log(body);
    
    // this.setState({ responseToPost: body });
  };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   // console.log(e);
  // }
  
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
          <FileUpload />
            <Formik 
              initialValues={{}}
              validationSchema={schema} onSubmit={this.handleSubmit}>
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                setFieldValue
              }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {/* <Form.File
                  required
                  className="position-relative" 
                  label="Upload CSV"
                  name="file"
                  id="validationFormik01"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  isInvalid={!!errors.file}
                  feedback={errors.file}
                  feedbackTooltip
                /> */}
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
                  </Form.Group>
                <Button type="submit">Create Schedule</Button>
              </Form>
              )}
            </Formik>
            {/* <form onSubmit={this.handleSubmit}>
              <p>
                <strong>Upload CSV</strong>
              </p>
              <input
                type="text"
                value={this.state.post}
                onChange={e => this.setState({ post: e.target.value })}
              />
              <button type="submit">Submit</button>
            </form>
            <p>{this.state.responseToPost}</p> */}
          </div>
          <div className="calendar">
            <DatePickerCalendar locale={enGB} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
