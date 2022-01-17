import './css/style.css'
import Anime from './class/anime.js'
import { Route } from 'react-router-dom'

// import common component
import Header from './components/common/Header'
import Footer from './components/common/Footer'

// import main component
import Visual from './components/main/Visual'
import Intro from './components/main/Intro'
import Banner from './components/main/Banner'
import Project from './components/main/Project'
import Brand from './components/main/Brand'
import Btns from './components/main/Btns'

// import sub component
import AboutUs from './components/sub/AboutUs'
import Youtube from './components/sub/Youtube'
import Gallery from './components/sub/Gallery'
import Community from './components/sub/Community'
import Contact from './components/sub/Contact'
import Join from './components/sub/Join'

// hook
import { useEffect, useRef, useState } from 'react'

function App() {
  /*
  const main = useRef(null)
  // useRef로 값이 변경될때마다 재렌더링을 막으면서 특정값을 컴포넌트에서 사용해야 될떄
  let position = useRef([])
  // 버튼 클릭할때마다 변경될 순서값을 담을 state 추가
  const [index, setIndex] = useState(0)

  // index 함수로 wrapping
  const getIndex = (index) => {
    setIndex(index)
  }

  const handleResize = () => {
    // 참조된 main요소 안쪽에 myScroll박스를 모두 찾아서
    // 해당 요소의 세로 위치값을 배열에 담는다.
    // 다시 useRef로 참조한 position 변수에 옮겨담는다
    const sections = main.current.querySelectorAll('.myScroll')
    let offSetArray = []
    for (let sec of sections) offSetArray.push(sec.offsetTop)
    position.current = offSetArray
  }

  // useRef로 담아놓은 세로 섹션 위치만큼 반복을 돌면서
  // 스크롤 조건이 맞을때에만 해당 순번의 버튼 활성화
  const handleScroll = () => {
    let scroll = window.scrollY
    const btns = main.current.querySelectorAll('.myScroll')
    const sections = main.current.querySelectorAll('.myScroll')

    position.current.map((pos, index) => {
      if (scroll >= pos) {
        for (const btn of btns) btn.classList.remove('on')
        btns[index].classList.add('on');
      }
    })
  }

  
  useEffect(() => {
    console.log(index)
    // 처음 컴포넌트 생성시 배열값 생성
    handleResize()
    // 브라우저가 리사이즈 될 때마다 getPosition호출해서 배열값 갱신
    window.addEventListener('resize', handleResize)
    window.addEventListener('resize', handleScroll)

    new Anime(window, {
      prop: 'scroll',
      value: position.current[index],
      duration: 500,
    })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [index])
  */

  return (
    <div className="App">
      <Header />

      <Route exact path="/">
        <main>
          <div>
            <Visual />
            <Intro />
            <Banner />
            <Project />
            <Brand />
            {/* <Btns getIndex={getIndex} /> */}
          </div>
        </main>
      </Route>

      <Route exact path="/about" component={AboutUs}></Route>
      <Route exact path="/youtube" component={Youtube}></Route>
      <Route exact path="/community" component={Community}></Route>
      <Route exact path="/gallery" component={Gallery}></Route>
      <Route exact path="/contact" component={Contact}></Route>
      <Route exact path="/Join" component={Join}></Route>

      <Footer />
    </div>
  )
}

export default App
