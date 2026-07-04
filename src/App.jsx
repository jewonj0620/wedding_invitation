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
  venue: '한국은행 컨퍼런스홀',
}

function App() {
  return (
    <main className="invitation" aria-labelledby="invitation-title">
      <section className="cover" aria-label="결혼식 초대장 표지">
        <img className="cover__image" src={heroImage} alt="" />
        <div className="cover__content">
          <p className="cover__kicker">Wedding Invitation</p>
          <h1 id="invitation-title">
            <span>{couple.bride.name}</span>
            <span className="name-divider" aria-hidden="true">
              ·
            </span>
            <span>{couple.groom.name}</span>
          </h1>
          <p className="cover__date">2026. 10. 24. SAT</p>
          <p className="cover__time">12:30 PM</p>
        </div>
      </section>

      <section className="intro section">
        <p className="section-kicker">초대합니다</p>
        <h2>
          저희 두 사람이 부부로 첫걸음을 내딛습니다.
        </h2>
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
          <div className="person">
            <span>{couple.bride.label}</span>
            <strong>{couple.bride.name}</strong>
            <small>{couple.bride.englishName}</small>
          </div>
          <div className="person">
            <span>{couple.groom.label}</span>
            <strong>{couple.groom.name}</strong>
            <small>{couple.groom.englishName}</small>
          </div>
        </div>
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
      </section>

      <section className="closing" aria-label="마무리 인사">
        <p>
          함께해 주시는 모든 마음이
          <br />
          저희에게는 가장 큰 선물입니다.
        </p>
        <strong>지원과 제원 드림</strong>
      </section>
    </main>
  )
}

export default App
