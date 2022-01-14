import { useEffect, useState, useRef } from 'react'

function Contact() {
  //윈도우 전역에 등록되어 있는 kakao객체를 불러옴
  const { kakao } = window
  //useRef로 #map 참조
  const container = useRef(null)
  const btnBranch = useRef(null)
  //생성된 map인스턴스가 담길 state생성
  const [map, setMap] = useState(null)
  // 순서값을 index스테이트에 넣어서 관리
  const [index, setIndex] = useState(0)
  //toggle값에 따라 트래픽보기 버튼 활성화, 비활성화
  const [toggle, setToggle] = useState(false)
  //state에 담을 초기 정보값
  const info = [
    {
      title: '본점',
      latlng: new kakao.maps.LatLng(37.5132313, 127.0594368),
      //public폴더 안쪽의 절대경로와 이미지 주소 연결
      imgSrc: process.env.PUBLIC_URL + '/img/marker1.png',
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: '지점1',
      latlng: new kakao.maps.LatLng(37.507099899564444, 126.75639338893572),
      imgSrc: process.env.PUBLIC_URL + '/img/marker2.png',
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: '지점2',
      latlng: new kakao.maps.LatLng(35.17422705914147, 129.10766665201712),
      imgSrc: process.env.PUBLIC_URL + '/img/marker3.png',
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
  ]

  const [mapInfo, setMapInfo] = useState(info)

  //컴포넌트 생성시
  useEffect(() => {
    const options = {
      center: mapInfo[index].latlng,
      level: 3,
    }

    //카카오맵 생성자로부터 인스턴스 복사해서 맵 실행
    const map = new kakao.maps.Map(container.current, options)
    setMap(map)

    // 마커 인스턴스 호출 (호출시 mapInfo라는 stae에서 정보값 호출)
    new kakao.maps.Marker({
      map: map,
      position: mapInfo[index].latlng,
      title: mapInfo[index].title,
      image: new kakao.maps.MarkerImage(
        mapInfo[index].imgSrc,
        mapInfo[index].imgSize,
        mapInfo[index].imgPos
      ),
    })

    map.setCenter(mapInfo[index].latlng)

    //지도 타입변경 패널 프레임에 생성
    const mapTypeControl = new kakao.maps.MapTypeControl()
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)
    //휠로 줌 기능 활성화
    map.setZoomable(true)
    //마우스 드래그기능 활성화
    map.setDraggable(true)

    // 모든 버튼 초기화 한 뒤, index state번째의 li요소만 활성화
    for (const btn of btnBranch.current.children) {
      btn.classList.remove('on')
      btnBranch.current.children[index].classList.add('on')
    }

    const mapSet = () => map.setCenter(mapInfo[index].latlng)

    // 윈도우 리사이즈시 마커 위치 중앙배치
    window.addEventListener('resize', mapSet)

    // 해당 컴포넌트가 사라질때 기존 window에 등록된 이벤트 제거
    return () => window.addEventListener('resize', mapSet)
  }, [index]) // 의존성에 index스테이트를 추가해 추후 순서값이 바뀔때마다 지도 다시 렌더링

  return (
    <main className="contact">
      <section className="sub__visual">
        <h1>Contact</h1>
        <p>
          Property Group offers a full-service, residential project development.
        </p>
      </section>

      <div className="contents">
        <section className="location">
          <div className="inner">
            {/* 맵이 출력될 프레임 useRef로 참조 */}
            <div id="map" ref={container}></div>

            <ul className="traffic">
              {
                //토글값이 true일때 끄기버튼 활성화
                toggle ? (
                  <li
                    onClick={() => {
                      map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
                      //현재 토글의 boolean값을 반전
                      setToggle(!toggle)
                    }}
                  >
                    교통정보 끄기
                  </li>
                ) : (
                  //토글값이 false일때 켜기버튼 활성화
                  <li
                    onClick={() => {
                      map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
                      //현재 토글의 boolean값을 반전
                      setToggle(!toggle)
                    }}
                  >
                    교통정보 보기
                  </li>
                )
              }
            </ul>

            {/* 각 브랜치 버튼 클릭시 mapInfo state에서 정보값 불러와 지도 위치 변경 */}
            <ul className="branch" ref={btnBranch}>
              <li
                onClick={() => {
                  setIndex(0)
                }}
              >
                본점
              </li>
              <li
                onClick={() => {
                  setIndex(1)
                }}
              >
                지점1
              </li>
              <li
                onClick={() => {
                  setIndex(2)
                }}
              >
                지점2
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Contact
