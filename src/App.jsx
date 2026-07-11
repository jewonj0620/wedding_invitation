import { useRef, useState } from 'react'
import heroImage from './assets/theme1.png'
import kakaoPayButton from './assets/kakaopay.svg'
import { Button } from './components/ui/Button'
import { buttonVariants } from './components/ui/buttonVariants'
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

const sortedGalleryImages = Object.entries(
  import.meta.glob('./assets/gallery/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))

const reorderedGalleryImages = [
  sortedGalleryImages[0],
  sortedGalleryImages.at(-1),
  ...sortedGalleryImages.slice(1, -1),
].filter(Boolean)

const galleryImages = reorderedGalleryImages.map(([, src], index) => ({
    src,
    alt: `지원과 제원의 웨딩 사진 ${index + 1}`,
  }))

const october2026LeadingEmptyDays = 4
const october2026Holidays = new Set([3, 9])
const coverStars = Array.from({ length: 14 }, (_, index) => index)
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
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const galleryTrackRef = useRef(null)
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

  function handleCoverScroll() {
    const introSection = document.getElementById('intro-section')

    introSection?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    })
  }

  function handleGalleryScroll(event) {
    const track = event.currentTarget
    const nextIndex = Math.round(track.scrollLeft / track.clientWidth)

    if (nextIndex !== activeGalleryIndex) {
      setActiveGalleryIndex(nextIndex)
    }
  }

  function selectGalleryImage(index) {
    const track = galleryTrackRef.current

    track?.scrollTo({
      left: index * track.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
    setActiveGalleryIndex(index)
  }

  return (
    <main className="invitation" aria-labelledby="invitation-title">
      <section className="cover" aria-label="결혼식 초대장 표지">
        <img className="cover__image" src={heroImage} alt="" />
        <div className="cover__stars" aria-hidden="true">
          {coverStars.map((star) => (
            <span key={star} />
          ))}
        </div>
        <div className="cover__content">
          <p className="cover__opening-line">
            우리들의 결혼식에 초대합니다.
          </p>
          <h1 id="invitation-title">
            <span>{couple.bride.name}</span>
            <span className="name-divider" aria-hidden="true">
              🤍
            </span>
            <span>{couple.groom.name}</span>
          </h1>
          <p className="cover__date">2026년 10월 24일 토요일</p>
          <p className="cover__time">낮 12시 30분</p>
        </div>
        <button
          className="cover__scroll-hint"
          type="button"
          aria-label="초대글로 스크롤하기"
          onClick={handleCoverScroll}
        >
          <span>스크롤 아래로</span>
          <span className="cover__scroll-arrows">
            <span />
            <span />
          </span>
        </button>
      </section>

      <section className="intro section" id="intro-section">
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
                <a
                  className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                  href={`tel:${person.phone}`}
                  aria-label={`${person.name}에게 전화하기`}
                >
                  <span aria-hidden="true">📞</span>
                  전화
                </a>
                <a
                  className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                  href={`sms:${person.phone}`}
                  aria-label={`${person.name}에게 문자 보내기`}
                >
                  <span aria-hidden="true">💬</span>
                  문자
                </a>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="host-contact-trigger"
          size="lg"
          onClick={() => setIsHostContactOpen(true)}
        >
          <span aria-hidden="true">📞</span>
          혼주에게 연락하기
        </Button>
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
            <a
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section className="gallery section" aria-labelledby="gallery-title">
        <h2 id="gallery-title">갤러리</h2>
        <div
          className="gallery-carousel"
          ref={galleryTrackRef}
          onScroll={handleGalleryScroll}
          aria-label="웨딩 사진 갤러리"
        >
          {galleryImages.map((image, index) => (
            <figure
              className={`gallery-slide ${index === 2 || index === 3 ? 'gallery-slide--fill' : ''}`}
              key={image.src}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </div>
        <div className="gallery-pagination" aria-label="사진 선택">
          {galleryImages.map((image, index) => (
            <button
              className={index === activeGalleryIndex ? 'is-active' : ''}
              type="button"
              aria-label={`${index + 1}번째 사진 보기`}
              aria-current={index === activeGalleryIndex ? 'true' : undefined}
              onClick={() => selectGalleryImage(index)}
              key={image.src}
            />
          ))}
        </div>
        <p className="gallery-caption">우리의 순간을 담았습니다.</p>
      </section>

      <section className="gift section" aria-labelledby="gift-title">
        <p className="gift-intro">
          먼 곳에서 마음을 보내고 싶으신 분들께 계좌번호를 안내해드립니다.
          전해주신 마음은 마음에 안고 살아가겠습니다.
        </p>
        <Button
          className={`gift-main-toggle ${isGiftOpen ? 'is-open' : ''}`}
          size="lg"
          aria-expanded={isGiftOpen}
          onClick={() => setIsGiftOpen((current) => !current)}
        >
          <span id="gift-title">마음 보내실 곳</span>
          <span className="gift-arrow" aria-hidden="true" />
        </Button>

        {isGiftOpen ? (
          <div className="gift-columns">
            {giftAccounts.map((group) => {
              const isSideOpen = Boolean(openGiftSides[group.side])

              return (
                <div className={`gift-side gift-side--${group.side}`} key={group.side}>
                  <Button
                    className={`gift-side__toggle ${isSideOpen ? 'is-open' : ''}`}
                    variant="secondary"
                    aria-expanded={isSideOpen}
                    onClick={() => toggleGiftSide(group.side)}
                  >
                    <span>{group.label}</span>
                    <span className="gift-arrow" aria-hidden="true" />
                  </Button>

                  {isSideOpen ? (
                    <div className="gift-account-list">
                      {group.accounts.map((person) => (
                        <div className="gift-account" key={`${group.side}-${person.name}`}>
                          <div className="gift-account__top">
                            <strong>
                              {person.role} {person.name}
                            </strong>
                            <Button
                              className="gift-copy"
                              variant="outline"
                              size="sm"
                              aria-label={`${person.role} ${person.name} 계좌번호 복사`}
                              onClick={() => handleCopyAccount(person.account)}
                            >
                              {copiedAccount === person.account ? '완료' : '복사'}
                            </Button>
                          </div>
                          <div className="gift-account__bank-row">
                            <span>{person.bank}</span>
                            {person.kakaoPayUrl ? (
                              <a
                                className="gift-kakao"
                                href={person.kakaoPayUrl}
                                aria-label={`${person.role} ${person.name} 카카오페이로 마음 보내기`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img src={kakaoPayButton} alt="" />
                              </a>
                            ) : null}
                          </div>
                          <p className="gift-account__number">
                            {person.account}
                          </p>
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

      {isHostContactOpen ? (
        <section
          className="contact-page"
          role="dialog"
          aria-modal="true"
          aria-labelledby="host-contact-title"
        >
          <div className="contact-page__bar">
            <p>연락처</p>
            <Button
              className="contact-page__close"
              variant="outline"
              size="sm"
              onClick={() => setIsHostContactOpen(false)}
            >
              닫기
            </Button>
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
                        className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                        href={`tel:${parent.phone}`}
                        aria-label={`${parent.role} ${parent.name}에게 전화하기`}
                      >
                        <span aria-hidden="true">📞</span>
                        전화
                      </a>
                      <a
                        className={buttonVariants({ variant: 'secondary', size: 'sm' })}
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
