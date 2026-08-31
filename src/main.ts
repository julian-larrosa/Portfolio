import './style.css'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function setYear(): void {
  const el = document.getElementById('currentYear')
  if (el) el.textContent = String(new Date().getFullYear())
}

function initTopbar(): void {
  const topbar = document.querySelector<HTMLElement>('[data-topbar]')
  if (!topbar) return
  const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 12)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

function initMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const nav = document.querySelector<HTMLElement>('[data-mobile-nav]')
  if (!toggle || !nav) return

  const open = (value: boolean) => {
    nav.classList.toggle('open', value)
    toggle.classList.toggle('open', value)
    toggle.setAttribute('aria-expanded', String(value))
  }

  toggle.addEventListener('click', () => {
    open(!nav.classList.contains('open'))
  })

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => open(false))
  })

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
      open(false)
    }
  })
}

function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
  if (!items.length) return

  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'))
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )

  items.forEach((el) => io.observe(el))
}

function initModal(): void {
  const modal = document.querySelector<HTMLElement>('[data-modal]')
  if (!modal) return

  const close = () => {
    modal.hidden = true
    document.body.style.overflow = ''
  }
  const open = () => {
    modal.hidden = false
    document.body.style.overflow = 'hidden'
  }

  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', open)
  })
  modal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', close)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close()
  })
}

function typeTerminal(): void {
  const cmd = document.querySelector<HTMLElement>('[data-terminal] .t-cmd.typing')
  if (!cmd || reducedMotion) return

  const baseText = cmd.textContent ?? ''
  window.setTimeout(() => tick(cmd, baseText, 0), 600)
}

function tick(cmd: HTMLElement, text: string, index: number): void {
  cmd.textContent = text.slice(0, index)
  if (index < text.length) {
    window.setTimeout(() => tick(cmd, text, index + 1), 45)
  }
}

function initTerminal(): void {
  if (!document.querySelector('[data-terminal]')) return
  typeTerminal()
}

function main(): void {
  setYear()
  initTopbar()
  initMobileNav()
  initReveal()
  initModal()
  initTerminal()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}
