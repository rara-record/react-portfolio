import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FlickrData } from '../../data/FlickrData'
import Masonry from 'react-masonry-component'
const body = document.querySelector('body')

const MasonryOptions = {
  fitWidth: false,
  gutter: 0,
  itemSelector: '.gallery__item',
}

function Gallery() {
  const [items, setItems] = useState([])
  const [enableClick, setEnableClick] = useState(true)
  const [interest, setInterest] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isPopup, setIsPopup] = useState(false)
  const [index, setIndex] = useState(0)

  const input = useRef(null)
  const wrapper = useRef(null)

  useEffect(() => {
    getFlickr({
      type: 'interest',
    })
  }, [])

  return (
    <main className="gallery">
      <div className="inner">
        <h1
          onClick={() => {
            if (enableClick && !interest) {
              wrapper.current.classList.remove('on')
              setLoading(true)
              setEnableClick(false)

              getFlickr({
                type: 'interest',
              })
            }
          }}
        >
          Gallery
        </h1>

        {/* search */}
        <div className="search__wrapper">
          <input
            type="text"
            ref={input}
            placeholder="검색어를 입력해주세요"
            onKeyPress={(e) => {
              if (e.key !== 'Enter') return

              if (enableClick) {
                wrapper.current.classList.remove('on')
                setLoading(true)
                setInterest(false)
                setEnableClick(false)

                const tags = input.current.value
                input.current.value = ''
                getFlickr({
                  type: 'search',
                  tags: tags,
                })
              }
            }}
          />
          <button
            onClick={() => {
              if (enableClick) {
                wrapper.current.classList.remove('on')
                setLoading(true)
                setInterest(false)
                setEnableClick(false)
                const tags = input.current.value
                input.current.value = ''
                getFlickr({
                  type: 'search',
                  tags: tags,
                })
              }
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* loading */}
        {loading && (
          <div className="loading-container">
            <div className="loading"></div>
            <div className="loading-text">loading</div>
          </div>
        )}

        {/* gallery list*/}
        <div className="gallery__wrapper" ref={wrapper}>
          <List />
        </div>
      </div>

      {/* popup */}
      {isPopup && <Pop />}
    </main>
  )

  // 팝업 함수
  function Pop() {
    const target = items[index]
    const imgSrc = `https://live.staticflickr.com/${target.server}/${target.id}_${target.secret}_b.jpg`

    useEffect(() => {
      body.style.overflow = 'hidden'
      return () => {
        body.style.overflow = 'auto'
      }
    }, [])

    return (
      <aside className="pop">
        <h1>{target.title}</h1>
        <figure>
          <img src={imgSrc} alt={target.alt} />
        </figure>
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

  // flickr 데이터를 불러온다
  async function getFlickr(opt) {
    let url = ''

    if (opt.type === 'interest') {
      url = FlickrData.initURL
    } else if (opt.type === 'search') {
      url = `${FlickrData.searchURL}${opt.tags}`
    } else {
      console.error('api 요청 타입을 interest, search 중에서 지정하세요')
    }

    await axios.get(url).then((res) => {
      setItems(res.data.photos.photo)
    })

    setTimeout(() => {
      wrapper.current.classList.add('on')
      setLoading(false)
      setTimeout(() => {
        setEnableClick(true)
      }, 1000)
    }, 1000)
  }

  // 갤러리 리스트 함수
  function List() {
    return (
      <Masonry
        className={'gallery__list'}
        elementType={'ul'}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        options={MasonryOptions}
      >
        {items.map((data, index) => {
          // 썸네일 이미지 주소
          let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`

          return (
            <li className={'gallery__item'} key={index}>
              <div className="number">
                <span>
                  {parseInt(index) < 9 ? '0' + (index + 1) : index + 1}
                </span>
              </div>

              <div className="title__wrapper">
                <h2>{data.title}</h2>
                <p>{data.owner}</p>
              </div>

              <figure
                onClick={() => {
                  setIsPopup(true)
                  setIndex(index)
                }}
              >
                <img src={imgSrc} alt={data.alt} />
              </figure>

              <span className="date">2022.01.20</span>
            </li>
          )
        })}
      </Masonry>
    )
  }
}

export default Gallery

// 1. useState로 데이터를 담을 빈배열 만들기
// 2. useEffect로 데이터 불러오기
// 3. 받은 데이터로 맵 돌려서 출력하기
// 4. useRef로 조작할 돔 참조하기
// 5. masonery 설치하기
// 6. masonery 옵션 설정하고, ul 만들기
// 7. 데이터 불러올때 1초 지연주기 (모션 적용)
// 8. 검색 버튼 만들기
