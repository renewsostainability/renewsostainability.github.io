// 'use client';

export default function About() {
  return (
    <section className="about-section fix section-padding pb-0">
      <div className="container">
        <div className="about-wrapper-1 pt-0">
          <div className="random-shape float-bob-x">
            <img src="/index_files/random-shape.png" alt="random shape" />
          </div>
          <div className="star-shape float-bob-y">
            <img src="/index_files/star.png" alt="star shape" />
          </div>
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title">
                  <span className="wow fadeInUp">
                    <img src="/index_files/star-2.png" alt="star" />About Me
                  </span>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">
                    Solving Problems With <br /> <span>Intuitive Design</span>
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay=".3s">
                    I&apos;m a passionate Full Stack Developer with expertise in creating 
                    digital experiences that are both beautiful and functional. 
                    I believe in progress through innovation and creative problem-solving.
                  </p>
                </div>
                <div className="client-reviews mt-4 mt-md-0">
                  <div className="cr-item wow fadeInUp" data-wow-delay=".4s">
                    <h2><span className="count">5</span>+</h2>
                    <h6>Years <br />experience...</h6>
                  </div>
                  <div className="cr-item wow fadeInUp" data-wow-delay=".5s">
                    <h2><span className="count">50</span>+</h2>
                    <h6>Projects <br />Completed...</h6>
                  </div>
                  <div className="cr-item wow fadeInUp" data-wow-delay=".6s">
                    <h2><span className="count">30</span>+</h2>
                    <h6>Happy <br />Clients...</h6>
                  </div>
                </div>
                <div className="about-button">
                  <a 
                    href="#" 
                    className="theme-btn wow fadeInUp" 
                    data-wow-delay=".7s"
                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  >
                    Contact Me <i className="fa-solid fa-arrow-right"></i>
                  </a>
                  <div className="phone wow fadeInUp" data-wow-delay=".8s">
                    <div className="icon">
                      <img src="/index_files/phone.svg" alt="phone" />
                    </div>
                    <div className="text">
                      <span>Phone</span>
                      <h6>+1 100 234 5909</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="about-images">
                <img className="wow img-custom-anim-right" data-wow-delay=".3s" src="/index_files/man.png" alt="Tomiwa Oluwadare" />
                <div className="bg-shape wow img-custom-anim-top">
                  <img src="/index_files/bg-shape-2.png" alt="background shape" />
                </div>
                <div className="shape-left float-bob-x">
                  <img src="/index_files/shape-left.png" alt="shape left" />
                </div>
                <div className="shape-right float-bob-y">
                  <img src="/index_files/shape-right.png" alt="shape right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}