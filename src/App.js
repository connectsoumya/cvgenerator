import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Landing/Header";
import Footer from "./Components/Landing/Footer";
import About from "./Components/Landing/About";
import Resume from "./Components/Landing/Resume";
import Contact from "./Components/Landing/Contact";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {}
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />
        <About data={this.state.resumeData.main} />
        <Contact data={this.state.resumeData.main} />
        <Footer data={this.state.resumeData.main} />

        <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/template/1" exact>
            <PDFViewer>
              <Template1 resume={resume}/>
            </PDFViewer>
          </Route>

          <Route path="/template/2" exact>
            <PDFViewer>
              <Template2 resume={resume}/>
            </PDFViewer>
          </Route>

          <Route path="/create" exact>
            <Resume />
          </Route>

          <Route path="/contributors" exact>
            <Contributors />
          </Route>

          <Route component={FourNotFour} />

        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
