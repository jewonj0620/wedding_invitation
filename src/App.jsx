import { useState } from 'react'
import heroImage from './assets/wedding-hero.png'
import './App.css'

const couple = {
  bride: {
    label: '신부',
    name: '최지원',
  },
  groom: {
    label: '신랑',
    name: '전제원',
  },
}

const ceremony = {
  date: '2026년 10월 24일 토요일',
  time: '낮 12시 30분',
  venue: '한국은행본부 컨퍼런스홀',
}

const mapSearch = '한국은행본부'
const encodedMapSearch = encodeURIComponent(mapSearch)
const mapLinks = [
  {
    label: '네이버 맵',
    href: `https://map.naver.com/p/search/${encodedMapSearch}`,
  },
  {
    label: '카카오맵',
    href: `https://map.kakao.com/link/search/${encodedMapSearch}`,
  },
  {
    label: 'T-map',
    href: `https://www.tmap.co.kr/tmap2/mobile/search.jsp?searchKeyword=${encodedMapSearch}`,
  },
]

const coupleContacts = [
  {
    side: 'groom',
    label: '신랑',
    relation: '전명문 / 정남희의 아들',
    name: '제원',
    phone: '01067337881',
  },
  {
    side: 'bride',
    label: '신부',
    relation: '최철운 / 고난영의 딸',
    name: '지원',
    phone: '01097753038',
  },
]

const hostContacts = [
  {
    side: 'groom',
    label: '신랑',
    parents: [
      {
        role: '아버지',
        name: '전명문',
        phone: '01092177881',
        message: '01092177881',
      },
      {
        role: '어머니',
        name: '정남희',
        phone: '01092187881',
        message: '01092177881',
      },
    ],
  },
  {
    side: 'bride',
    label: '신부',
    parents: [
      {
        role: '아버지',
        name: '최철운',
        phone: '01025865678',
        message: '01025865678',
      },
      {
        role: '어머니',
        name: '고난영',
        phone: '01073453038',
        message: '01073543038',
      },
    ],
  },
]

function App() {
  const [isHostContactOpen, setIsHostContactOpen] = useState(false)

  return (
    <main className="invitation" aria-labelledby="invitation-title">
      <section className="cover" aria-label="결혼식 초대장 표지">
        <img className="cover__image" src={heroImage} alt="" />
        <div className="cover__content">
          <h1 id="invitation-title">
            <span>{couple.bride.name}</span>
            <span className="name-divider" aria-hidden="true">
              ·
            </span>
            <span>{couple.groom.name}</span>
          </h1>
          <p className="cover__date">2026년 10월 24일 토요일</p>
          <p className="cover__time">낮 12시 30분</p>
        </div>
      </section>

      <section className="intro section">
        <p className="section-kicker">초대합니다</p>
        <h2>저희 두 사람이 부부로 첫걸음을 내딛습니다.</h2>
        <div className="letter">
          <p>
            늘 곁에서 아껴 주신 고마운 분들을 모시고, 작지만 깊은 약속의
            자리를 함께 나누고 싶습니다.
          </p>
          <p>
            바쁘신 날에도 귀한 걸음으로 축복해 주신다면 그 따뜻한 마음을
            오래도록 간직하겠습니다.
          </p>
        </div>
        <div className="people" aria-label="신랑 신부">
          {coupleContacts.map((person) => (
            <div className={`person person--${person.side}`} key={person.label}>
              <span>{person.label}</span>
              <small>{person.relation}</small>
              <strong>{person.name}</strong>
              <a
                className="person__phone"
                href={`tel:${person.phone}`}
                aria-label={`${person.name}에게 전화하기`}
              >
                <span className="person__phone-icon" aria-hidden="true">
                  📞
                </span>
              </a>
            </div>
          ))}
        </div>
        <button
          className="host-contact-trigger"
          type="button"
          onClick={() => setIsHostContactOpen(true)}
        >
          <span aria-hidden="true">📞</span>
          혼주에게 연락하기
        </button>
      </section>

      <section className="details section" aria-labelledby="details-title">
        <p className="section-kicker">우리의 날</p>
        <h2 id="details-title">따뜻한 마음으로 함께해 주세요.</h2>

        <div className="date-lockup" aria-label="예식 날짜">
          <div className="date-lockup__day">
            <span>10월</span>
            <strong>24</strong>
          </div>
          <div className="date-lockup__text">
            <p>{ceremony.date}</p>
            <p>{ceremony.time}</p>
          </div>
        </div>

        <dl className="info-list">
          <div>
            <dt>일시</dt>
            <dd>
              {ceremony.date}
              <br />
              {ceremony.time}
            </dd>
          </div>
          <div>
            <dt>장소</dt>
            <dd>{ceremony.venue}</dd>
          </div>
        </dl>
      </section>

      <section className="venue section" aria-labelledby="venue-title">
        <p className="section-kicker">오시는 곳</p>
        <h2 id="venue-title">{ceremony.venue}</h2>
        <p>
          소중한 분들과 한 공간에서 웃고 인사 나누는 시간을 기다리고
          있겠습니다. 편안한 마음으로 오셔서 저희의 시작을 밝혀 주세요.
        </p>
        <div className="map-card">
          <iframe
            title={`${mapSearch} 카카오맵`}
            src={`https://map.kakao.com/?q=${encodedMapSearch}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="map-actions" aria-label="지도 앱으로 장소 찾기">
          {mapLinks.map((link) => (
            <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section className="closing" aria-label="마무리 인사">
        <p>
          함께해 주시는 모든 마음이
          <br />
          저희에게는 가장 큰 선물입니다.
        </p>
        <strong>지원과 제원 드림</strong>
      </section>

      {isHostContactOpen ? (
        <section
          className="contact-page"
          role="dialog"
          aria-modal="true"
          aria-labelledby="host-contact-title"
        >
          <div className="contact-page__bar">
            <p>연락처</p>
            <button
              className="contact-page__close"
              type="button"
              onClick={() => setIsHostContactOpen(false)}
            >
              닫기
            </button>
          </div>
          <header className="contact-page__header">
            <h2 id="host-contact-title">혼주에게 연락하기</h2>
          </header>

          <div className="host-columns">
            {hostContacts.map((group) => (
              <article
                className={`host-column host-column--${group.side}`}
                key={group.label}
              >
                <h3>{group.label}</h3>
                {group.parents.map((parent) => (
                  <div className="host-person" key={`${group.side}-${parent.role}`}>
                    <strong>
                      {parent.role} {parent.name}
                    </strong>
                    <div className="host-actions">
                      <a
                        href={`tel:${parent.phone}`}
                        aria-label={`${parent.role} ${parent.name}에게 전화하기`}
                      >
                        <span aria-hidden="true">📞</span>
                        전화
                      </a>
                      <a
                        href={`sms:${parent.message}`}
                        aria-label={`${parent.role} ${parent.name}에게 문자 보내기`}
                      >
                        <span aria-hidden="true">💬</span>
                        문자
                      </a>
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default App
