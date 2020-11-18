import React, { Component } from 'react';
import { enGB } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';

import 'react-nice-dates/build/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const schema = yup.object({
  file: yup.string().required(),
  numPeople: yup.number().required(),
  numTests: yup.number().required()
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
  
  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
    
  //   this.setState({ responseToPost: body });
  // };

  handleSubmit = async e => {
    e.preventDefault();
    // console.log(e);
  }
  
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
            <Formik 
              initialValues={{
                numPeople: '',
              }}
              validationSchema={schema} onSubmit={this.handleSubmit}>
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.File
                  required
                  className="position-relative" 
                  label="Upload CSV"
                  name="file"
                  id="validationFormik01"
                  onChange={handleChange}
                  isInvalid={!!errors.file}
                  feedback={errors.file}
                  feedbackTooltip
                />
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column>
                        Number of people at location
                      </Form.Label>
                      <Col>
                        <Form.Control 
                          type="number"
                          name="numPeople"
                          id="validationFormik02"
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
                          id="validationFormik03"
                          onChange={handleChange}
                          isValid={touched.numTests && !errors.numTests}
                          isInvalid={!!errors.numTests}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.numTests}
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
