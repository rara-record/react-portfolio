import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Members() {
  const path = process.env.PUBLIC_URL
  const members = useSelector((state) => state.memberReducer.members)

  return (
    <section className="members myScroll">
      <div className="inner">
        <div id="section__title">
          <h1>Introduce Members</h1>
          <p>
            Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin,
            lorem quis
          </p>
        </div>
        <div className="members__contents">
          {members.map((member, index) => {
            return (
              <article key={index}>
                <Link to="/about">
                  <img src={path + member.image} alt={member.alt} />
                  <h2>{member.name}</h2>
                  <p>{member.position}</p>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Members
