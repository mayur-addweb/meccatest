<template>
   <div id="error">
    <section class="blogWrap-sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-sm-12 d-lg-flex justify-content-lg-center">
            <div class="blog-left">
              <img src="/meccabook/404-blog.png" alt="404" />
            </div>
          </div>
          <div class="col-lg-5 col-sm-12">
            <div class="blog-right">
              <span class="er-title">Error 404</span>
              <h2 class="pageInfo-title about-title colorBlue">
                Page Not Found
              </h2>
              <p class="desc">
                We searched through every book we have, but the
                page you seek could not be found. Please check your
                query and try again.
              </p>
              <p class="desc last-child">
                If you continue to experience issues please get in touch through the contact page. This page is sure to be found.
              </p>
              <router-link class="btn readmore-btn" to="/contact-us"
                ><span>Contact Us</span></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
        <!-- Browse Section End -->
    <section class="browse-subject">
      <div class="container">
        <h3 class="th-sec-title text-md-center">Browse by subject</h3>
        <h3 class="th-sec-title text-md-center blue-text d-none">
          Browse by subject
        </h3>
        <ul
          class="
            subject-list
            d-flex
            text-center
            d-flex
            flex-wrap
            justify-content-start justify-content-xl-center
          "
        >
          <li>
            <span class="icon-img"
              ><img src="/meccabook/technology.svg" alt="icon"
            /></span>
            <p class="desc">Islamic Theology</p>
          </li>
          <li>
            <span class="icon-img"
              ><img src="/meccabook/politics.svg" alt="icon"
            /></span>
            <p class="desc">History & Politics</p>
          </li>
          <li>
            <span class="icon-img"
              ><img src="/meccabook/worship.svg" alt="icon"
            /></span>
            <p class="desc">Worship</p>
          </li>
          <li>
            <span class="icon-img"
              ><img src="/meccabook/prophet.svg" alt="icon"
            /></span>
            <p class="desc">Prophet Muhammad</p>
          </li>
          <li>
            <span class="icon-img"
              ><img src="/meccabook/spirituality.svg" alt="icon"
            /></span>
            <p class="desc">Spirituality / Tasawwuf</p>
          </li>
          <li>
            <span class="icon-img"
              ><img src="/meccabook/science.svg" alt="icon"
            /></span>
            <p class="desc">Science</p>
          </li>
          <li>
            <span class="icon-img"
              ><img src="/meccabook/society.svg" alt="icon"
            /></span>
            <p class="desc">Society, Art & Culture</p>
          </li>
        </ul>
      </div>
    </section>
     <!-- donated list Section Start -->
    <section class="donatelist-sec d-none d-md-block">
      <div class="container">
        <ul class="donated-list d-none d-md-flex flex-wrap">
          <li>
            <div class="donate-card">
              <img src="/meccabook/donate-placeholder.jpg" alt="placeholder" />
              <a href="#!" class="card-tag">Top 50</a>
            </div>
          </li>
          <li>
            <div class="donate-card">
              <img src="/meccabook/donate-img1.jpg" alt="image" />
              <a href="#!" class="card-tag">Kids</a>
            </div>
          </li>
          <li>
            <div class="donate-card">
              <img src="/meccabook/donate-img2.jpg" alt="image" />
              <a href="#!" class="card-tag">Ramadan</a>
            </div>
          </li>
          <li>
            <div class="donate-card">
              <img src="/meccabook/donate-placeholder.jpg" alt="" />
              <a href="#!" class="card-tag">Signed Books</a>
            </div>
          </li>
          <li>
            <div class="donate-card">
              <img src="/meccabook/donate-img3.jpg" alt="image" />
              <a href="#!" class="card-tag">Arabic</a>
            </div>
          </li>
          <li>
            <div class="donate-card">
              <img src="/meccabook/donate-img4.jpg" alt="image" />
              <a href="#!" class="card-tag">Gifts</a>
            </div>
          </li>
        </ul>
      </div>
    </section>
        <!-- Follow Us Section Start -->
    <section class="followus-sec d-none d-md-block">
      <div class="container">
        <h4 class="followUs text-center">Followww us @MeccaBooks</h4>
      </div>
      <div class="powr-instagram-feed" id="dd6f9094_1648207969"></div><script src="https://www.powr.io/powr.js?platform=vuejs"></script>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.blogWrap-sec{
  background-image:url('/meccabook/404-page-bg.png');
  background-size:cover;
  background-repeat:no-repeat;
}
.donatelist-sec{
  margin-bottom:60px;
}
</style>