import React from 'react'

export default function Contact() {
  return (
    <section className="section-margin--small section-margin">
    <div className="container">
      <div className="d-none d-sm-block mb-5 pb-4">
        <div className="row">
          <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-home" />
              </span>
              <div className="media-body">
                <h3>California United States</h3>
                <p>Santa monica bullevard</p>
              </div>
            </div>
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-headphone" />
              </span>
              <div className="media-body">
                <h3>
                  <a href="tel:454545654">00 (440) 9865 562</a>
                </h3>
                <p>Mon to Fri 9am to 6pm</p>
              </div>
            </div>
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-email" />
              </span>
              <div className="media-body">
                <h3>
                  <a href="mailto:support@colorlib.com">support@colorlib.com</a>
                </h3>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-9">
            <form
              action="#/"
              className="form-contact contact_form"
              method="post"
              id="contactForm"
              noValidate="novalidate"
            >
              <div className="row">
                <div className="col-lg-5">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="subject"
                      id="subject"
                      type="text"
                      placeholder="Enter Subject"
                    />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <textarea
                      className="form-control different-control w-100"
                      name="message"
                      id="message"
                      cols={30}
                      rows={5}
                      placeholder="Enter Message"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group text-center text-md-right mt-3">
                <button
                  type="submit"
                  className="btn btn-blue"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}
