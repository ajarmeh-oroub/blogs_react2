import React from 'react';

export default function AboutUs() {
  return (
    <section className="about-us-area section-margin mt-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="about-us-text">
              <h2 className="section-title">About Us</h2>
              <p className="lead">
                Welcome to <strong>Next Page</strong>, your go-to destination for insightful articles, stories, and thought-provoking content across a wide range of topics.
              </p>
              <p>
                At Next Page, we believe in the power of words to inspire, inform, and entertain. Our mission is to bring you fresh perspectives on everything from lifestyle and culture to technology, business, and personal growth.
              </p>
              <p>
                Our team of passionate writers, journalists, and experts are dedicated to creating content that resonates with curious minds. We aim to spark conversation, encourage learning, and provide readers with valuable insights that help them navigate the ever-changing world around us.
              </p>
              <p>
                Whether you're here to explore new ideas, stay up-to-date on current events, or dive deep into specific topics of interest, you'll find something for you on Next Page. Our commitment to quality writing and engaging storytelling is at the heart of everything we do.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-us-image">
              <img
                src="https://media.istockphoto.com/id/2149838473/photo/business-meeting-blurred-background-and-people-in-office-for-teamwork-collaboration-and.jpg?s=612x612&w=0&k=20&c=HIpFm-ZVNOgtaIS4ql974iU_nhqriMhfp22zs6dFNcs=" // Replace with your image
                alt="Next Page Blog"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <h3>Our Mission</h3>
            <p>
              Our mission is to provide you with high-quality content that not only entertains but also informs and educates. We want to be a platform where you can always turn to for the next page of knowledge, creativity, and inspiration.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <h4>Our Values</h4>
            <ul>
              <li><strong>Creativity:</strong> We embrace creativity in all forms and encourage new ideas to take shape.</li>
              <li><strong>Integrity:</strong> We are committed to honesty and transparency in our content.</li>
              <li><strong>Engagement:</strong> Our goal is to spark meaningful conversations and build a community of like-minded individuals.</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Meet the Team</h4>
            <p>
              The Next Page team is a group of passionate writers, editors, and content creators from diverse backgrounds. We’re all driven by a love for storytelling and a commitment to providing content that matters.
            </p>
          </div>
          <div className="col-md-4">
            <h4>Join Our Community</h4>
            <p>
              Stay connected with us by following Next Page on social media, subscribing to our newsletter, and joining our ever-growing community of readers. Share your thoughts, leave comments, and let's make every page count together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
