import { useEffect, useState } from 'react'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'

function Youtube() {
  const path = process.env.PUBLIC_URL
  const key = 'AIzaSyDcBGvXJV3oUXOEOuKGWX8KoJHrdp8sF4s'
  const playListId = 'PLjyJ0gUvOKvCsP_vyVlJZbiwgHIycsuKN'
  const num = 5
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`

  const [data, setData] = useState([])
  const [isPopup, setIsPopup] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    getYoutube(url)
  }, [])

  return (
    <main className="youtube">
      <section className="sub__visual">
        <figure>
          <video
            src={`${path}/video/youtube-sub-visual.mp4`}
            // autoPlay
            muted
            loop
          ></video>
        </figure>
        <div className="inner">
          <h1 className="title">YOUTUBE</h1>
          <p>
            Property Group offers a full-service, <br></br>
            residential project development.
          </p>
        </div>
      </section>

      <section className="contents">
        <div className="inner">
          <Swiper
            className="mySwiper"
            slidesPerView={3}
            spaceBetween={50}
            loop={true}
            loopedSlides={2}
            centeredSlides={true}
            breakpoints={
              ({ 320: { slidesPerView: 1, spaceBetween: 0 } },
              { 760: { slidesPerView: 'auto' } })
            }
          >
            {data.map((item, index) => {
              let tit = item.snippet.title
              let tit_len = tit.length

              let desc = item.snippet.description
              let desc_len = desc.length

              return (
                <SwiperSlide key={index}>
                  <article>
                    <div className="inner">
                      <figure
                        className="pic"
                        onClick={() => {
                          setIsPopup(true)
                          setIndex(index)
                        }}
                      >
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                      </figure>
                      <div className="text-box">
                        <div className="title">
                          <h2>
                            {tit_len >= 40 ? tit.substr(0, 30) + '...' : tit}
                          </h2>
                          <div className="date">
                            {item.snippet.publishedAt.split('T')[0].slice(2)}
                          </div>
                        </div>
                        <p>
                          {desc_len >= 20 ? desc.substr(0, 50) + '...' : desc}
                        </p>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {isPopup && <Pop />}
      </section>
    </main>
  )

  function Pop() {
    return (
      <aside className="pop">
        <iframe
          src={
            'https://www.youtube.com/embed/' +
            data[index].snippet.resourceId.videoId
          }
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
        <span
          onClick={() => {
            setIsPopup(false)
          }}
        >
          close
        </span>
      </aside>
    )
  }

  async function getYoutube(url) {
    await axios.get(url).then((json) => setData(json.data.items))
  }
}

export default Youtube
