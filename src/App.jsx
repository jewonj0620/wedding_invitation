import { useState } from 'react'
import heroImage from './assets/theme1.png'
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
  venue: '한국은행 본부 컨퍼런스홀',
  address: '서울시 중구 남대문로39',
}

const mapPlaceName = '한국은행'
const encodedMapPlaceName = encodeURIComponent(mapPlaceName)
const mapLatitude = '37.5620000'
const mapLongitude = '126.9806611'
const displayMapUrl = `https://www.google.com/maps?output=embed&q=${mapLatitude},${mapLongitude}&hl=ko&z=17`
const mapLinks = [
  {
    label: '네이버 맵',
    href: 'https://naver.me/xSFkCOa1',
  },
  {
    label: '카카오맵',
    href: `https://map.kakao.com/link/map/${encodedMapPlaceName},${mapLatitude},${mapLongitude}`,
  },
  {
    label: 'T-map',
    href: `https://www.tmap.co.kr/tmap2/mobile/route.jsp?name=${encodedMapPlaceName}&lon=${mapLongitude}&lat=${mapLatitude}`,
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

const galleryImages = Object.entries(
  import.meta.glob('./assets/gallery/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, src], index) => ({
    src,
    alt: `지원과 제원의 웨딩 사진 ${index + 1}`,
  }))

const initialGalleryCount = 6
const initialGalleryImages = galleryImages.slice(0, initialGalleryCount)
const extraGalleryImages = galleryImages.slice(initialGalleryCount)
const october2026LeadingEmptyDays = 4
const october2026Holidays = new Set([3, 9])
const giftAccounts = [
  {
    side: 'groom',
    label: '신랑측',
    accounts: [
      {
        role: '신랑',
        name: '전제원',
        bank: '국민은행',
        account: '21700204548423',
        kakaoPayUrl: 'https://qr.kakaopay.com/Ej8syGljZ',
      },
      {
        role: '신랑 아버지',
        name: '전명문',
        bank: '기업은행',
        account: '01092177881',
        kakaoPayUrl: '',
      },
      {
        role: '신랑 어머니',
        name: '정남희',
        bank: '기업은행',
        account: '01092187881',
        kakaoPayUrl: '',
      },
    ],
  },
  {
    side: 'bride',
    label: '신부측',
    accounts: [
      {
        role: '신부',
        name: '최지원',
        bank: '국민은행',
        account: '13150204219076',
        kakaoPayUrl: 'https://qr.kakaopay.com/Ej7peiamn',
      },
      {
        role: '신부 아버지',
        name: '최철운',
        bank: 'SC제일은행',
        account: '51220164527',
        kakaoPayUrl: '',
      },
      {
        role: '신부 어머니',
        name: '고난영',
        bank: '국민은행',
        account: '118240051886',
        kakaoPayUrl: '',
      },
    ],
  },
]

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function App() {
  const [isHostContactOpen, setIsHostContactOpen] = useState(false)
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null)
  const [isGiftOpen, setIsGiftOpen] = useState(false)
  const [openGiftSides, setOpenGiftSides] = useState({})
  const [copiedAccount, setCopiedAccount] = useState('')

  async function handleCopyAccount(account) {
    await copyTextToClipboard(account)
    setCopiedAccount(account)
    window.setTimeout(() => setCopiedAccount(''), 1400)
  }

  function toggleGiftSide(side) {
    setOpenGiftSides((current) => ({
      ...current,
      [side]: !current[side],
    }))
  }

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
        <div className="cover__scroll-hint" aria-hidden="true">
          <span>스크롤 아래로</span>
          <span className="cover__scroll-arrows">
            <span />
            <span />
          </span>
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
              <div className="person-actions">
                <a href={`tel:${person.phone}`} aria-label={`${person.name}에게 전화하기`}>
                  <span aria-hidden="true">📞</span>
                  전화
                </a>
                <a href={`sms:${person.phone}`} aria-label={`${person.name}에게 문자 보내기`}>
                  <span aria-hidden="true">💬</span>
                  문자
                </a>
              </div>
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

        <div className="wedding-calendar" aria-label="2026년 10월 달력">
          <div className="wedding-calendar__header">
            <span>2026</span>
            <strong>10월</strong>
          </div>
          <div className="wedding-calendar__weekdays" aria-hidden="true">
            <span>일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span>토</span>
          </div>
          <div className="wedding-calendar__days">
            {Array.from({ length: october2026LeadingEmptyDays }, (_, index) => (
              <span className="is-empty" key={`empty-${index}`} />
            ))}
            {Array.from({ length: 31 }, (_, index) => {
              const day = index + 1
              const isWeddingDay = day === 24
              const isHoliday = october2026Holidays.has(day)

              return (
                <span
                  className={[
                    isWeddingDay ? 'is-wedding-day' : '',
                    isHoliday ? 'is-holiday' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={
                    isWeddingDay
                      ? '2026년 10월 24일 예식일'
                      : isHoliday
                        ? `2026년 10월 ${day}일 공휴일`
                        : undefined
                  }
                  key={day}
                >
                  {day}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      <section className="venue section" aria-labelledby="venue-title">
        <p className="section-kicker">오시는 곳</p>
        <h2 id="venue-title">{ceremony.venue}</h2>
        <p>{ceremony.address}</p>
        <div className="map-card">
          <iframe
            title={`${mapPlaceName} 위치 지도`}
            src={displayMapUrl}
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

      <section className="gallery section" aria-labelledby="gallery-title">
        <h2 id="gallery-title">갤러리</h2>
        <div className="gallery-grid">
          {initialGalleryImages.map((image) => (
            <figure className="gallery-item" key={image.src}>
              <button
                className="gallery-image-button"
                type="button"
                aria-label={`${image.alt} 크게 보기`}
                onClick={() => setSelectedGalleryImage(image)}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
              </button>
            </figure>
          ))}
        </div>
        {extraGalleryImages.length > 0 ? (
          <>
            <div
              className={`gallery-extra ${isGalleryExpanded ? 'is-open' : ''}`}
              aria-hidden={!isGalleryExpanded}
            >
              <div className="gallery-grid gallery-grid--extra">
                {extraGalleryImages.map((image) => (
                  <figure className="gallery-item" key={image.src}>
                    <button
                      className="gallery-image-button"
                      type="button"
                      tabIndex={isGalleryExpanded ? 0 : -1}
                      aria-label={`${image.alt} 크게 보기`}
                      onClick={() => setSelectedGalleryImage(image)}
                    >
                      <img src={image.src} alt={image.alt} loading="lazy" />
                    </button>
                  </figure>
                ))}
              </div>
            </div>
            <button
              className={`gallery-toggle ${isGalleryExpanded ? 'is-expanded' : ''}`}
              type="button"
              aria-expanded={isGalleryExpanded}
              onClick={() => setIsGalleryExpanded((current) => !current)}
            >
              <span>{isGalleryExpanded ? '접기' : '더보기'}</span>
              <span className="gallery-toggle__arrow" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </section>

      <section className="gift section" aria-labelledby="gift-title">
        <p className="gift-intro">
          먼 곳에서나마 함께 하시고 싶으신 분들께 계좌번호를 안내드립니다.
          전해주신 마음은 마음에 안고 살아가겠습니다.
        </p>
        <button
          className={`gift-main-toggle ${isGiftOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={isGiftOpen}
          onClick={() => setIsGiftOpen((current) => !current)}
        >
          <span id="gift-title">마음 보내실 곳</span>
          <span className="gift-arrow" aria-hidden="true" />
        </button>

        {isGiftOpen ? (
          <div className="gift-columns">
            {giftAccounts.map((group) => {
              const isSideOpen = Boolean(openGiftSides[group.side])

              return (
                <div className={`gift-side gift-side--${group.side}`} key={group.side}>
                  <button
                    className={`gift-side__toggle ${isSideOpen ? 'is-open' : ''}`}
                    type="button"
                    aria-expanded={isSideOpen}
                    onClick={() => toggleGiftSide(group.side)}
                  >
                    <span>{group.label}</span>
                    <span className="gift-arrow" aria-hidden="true" />
                  </button>

                  {isSideOpen ? (
                    <div className="gift-account-list">
                      {group.accounts.map((person) => (
                        <div className="gift-account" key={`${group.side}-${person.name}`}>
                          <div className="gift-account__top">
                            <strong>
                              {person.role} {person.name}
                            </strong>
                            <button
                              className="gift-copy"
                              type="button"
                              aria-label={`${person.role} ${person.name} 계좌번호 복사`}
                              onClick={() => handleCopyAccount(person.account)}
                            >
                              {copiedAccount === person.account ? '완료' : '복사'}
                            </button>
                          </div>
                          <p className="gift-account__number">
                            <span>{person.bank}</span>
                            <span>{person.account}</span>
                          </p>
                          {person.kakaoPayUrl ? (
                            <a
                              className="gift-kakao"
                              href={person.kakaoPayUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              KakaoPay
                            </a>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        ) : null}
      </section>

      <section className="closing" aria-label="마무리 인사">
        <p>
          함께해 주시는 모든 마음이
          <br />
          저희에게는 가장 큰 선물입니다.
        </p>
        <strong>지원과 제원 드림</strong>
      </section>

      {selectedGalleryImage ? (
        <section
          className="gallery-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="갤러리 사진 크게 보기"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <button
            className="gallery-viewer__close"
            type="button"
            aria-label="갤러리 사진 닫기"
            onClick={() => setSelectedGalleryImage(null)}
          >
            ×
          </button>
          <img
            src={selectedGalleryImage.src}
            alt={selectedGalleryImage.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </section>
      ) : null}

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
