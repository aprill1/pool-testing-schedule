import React, { Component } from 'react';
import { enGB } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as yup from 'yup';

import 'react-nice-dates/build/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const schema = yup.object({
  file: yup.string().required(),
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
            <Formik validationSchema={schema} onSubmit={this.handleSubmit}>
              <Form>
                <Form.File
                  required
                  className="position-relative" 
                  label="Upload CSV"
                  feedbackTooltip
                />
                <Button type="submit">Create Schedule</Button>
              </Form>
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
