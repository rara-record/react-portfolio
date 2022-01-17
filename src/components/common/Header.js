import { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const active = { color: 'aqua' }
  const [state, setstate] = useState(false)
  const header = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    console.log('렌더링')
  }, [])

  const handleScroll = () => {
    window.scrollY > 120 ? setstate(true) : setstate(false)
  }

  return (
    <header
      className={`header ${state ? 'whiteBg' : 'transparent'}`}
      ref={header}
    >
      <h1 className="logo">
        <NavLink exact to="/">
          D.
        </NavLink>
      </h1>

      <ul id="gnb-desktop">
        <li>
          <NavLink activeStyle={active} exact to="/about">
            About Us
          </NavLink>
        </li>

        <li>
          <NavLink activeStyle={active} exact to="/gallery">
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={active} exact to="/community">
            Community
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={active} exact to="/youtube">
            Youtube
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={active} exact to="/Contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={active} exact to="/join">
            Join
          </NavLink>
        </li>
      </ul>

      <NavLink exact to="#" className="menu__bars">
        <i className="fas fa-bars"></i>
      </NavLink>
    </header>
  )
}

export default Header