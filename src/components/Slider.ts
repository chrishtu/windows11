import createElement from "../createElement";

interface SliderOptions {
  color?: string
  showBagde?: boolean

  onChange?(percent: number, cb: (value: number) => void): void
  onHoverMove?(percent: number, cb: (value: number) => void): void
  onHoding?(): void
  onRelease?(percent: number): void
}

export default function Slider(options: SliderOptions) {
  let lastPercent: number
  let slider: HTMLDivElement,
    sliderInner: HTMLDivElement,
    sliderThumbPrimary: HTMLDivElement,
    sliderThumbSecondary: HTMLDivElement,
    sliderThumbSecondaryText: HTMLDivElement

  let sliderMouseDown = false,
    sliderBounds = {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }

  function getSliderBounds() {
    sliderBounds = sliderInner.getBoundingClientRect();
  }

  function getPercent(x: number, cb: (_percent: number) => void) {
    let currentWidth = x - sliderBounds.left;
    if (currentWidth < 0) {
      currentWidth = 0
    }
    else if (currentWidth > sliderBounds.width) {
      currentWidth = sliderBounds.width
    }

    let percent = (currentWidth / sliderBounds.width) * 100
    cb(percent)
  }

  function _onChange(x: number) {
    if (typeof x !== 'number') return

    getPercent(x, percent => {
      lastPercent = percent
      sliderThumbPrimary.style.width = percent + '%'
      sliderThumbSecondary.style.width = percent + '%'

      if (typeof options.onChange === 'function') {
        options.onChange(percent, value => {
          if (options.showBagde) {
            sliderThumbSecondaryText.textContent = value.toString()
          }
        })
      } else {
        if (options.showBagde) {
          sliderThumbSecondaryText.textContent = Math.round(percent).toString()
        }
      }
    })
  }

  function onMouseDown(e: MouseEvent) {
    sliderMouseDown = true
    slider.classList.add('hoding')
    getSliderBounds()

    _onChange(e.x)

    if (typeof options.onHoding === 'function') {
      options.onHoding()
    }

    document.addEventListener('mousemove', onDocumnetMouseMove, false)
    document.addEventListener('mouseup', onDocumnetMouseUp, false)
  }

  function onDocumnetMouseMove(e: MouseEvent) {
    if (!sliderMouseDown) return

    _onChange(e.x)
  }

  function onDocumnetMouseUp() {
    sliderMouseDown = false
    slider.classList.remove('hoding')

    if (typeof options.onRelease === 'function') {
      options.onRelease(lastPercent)
    }

    document.removeEventListener('mousemove', onDocumnetMouseMove, false)
    document.removeEventListener('mouseup', onDocumnetMouseUp, false)
  }

  function onMouseOver() {
    getSliderBounds()
  }

  function onMouseMove(e: MouseEvent) {
    if (sliderMouseDown) return

    getPercent(e.x, percent => {
      if (!percent) percent = 0

      sliderThumbSecondary.style.width = percent + '%'
      if (typeof options.onHoverMove === 'function') {
        options.onHoverMove(percent, value => {
          if (options.showBagde) {
            sliderThumbSecondaryText.textContent = value.toString()
          }
        })
      } else {
        if (options.showBagde) {
          sliderThumbSecondaryText.textContent = Math.round(percent).toString()
        }
      }
    })
  }

  function onMouseLeave() {
    sliderThumbSecondary.style.width = '0%'
  }

  slider = createElement('div', {
    className: 'slider',
    onmousedown: onMouseDown,
    onmouseover: onMouseOver,
    onmousemove: onMouseMove,
    onmouseleave: onMouseLeave
  },
    sliderInner = createElement('div', {
      className: 'slider-inner'
    },
      [
        sliderThumbPrimary = createElement('div', {
          className: 'slider-thumb-primary'
        },
          createElement('div', {
            className: 'slider-thumb-primary-inner'
          })
        ),
        sliderThumbSecondary = createElement('div', {
          className: 'slider-thumb-secondary'
        },
          createElement('div', {
            className: 'slider-thumb-secondary-inner'
          },
            options.showBagde ? sliderThumbSecondaryText = createElement('div', {
              className: 'slider-thumb-secondary-text'
            }) : null
          )
        ),
      ]
    )
  )

  function update(percent: number) {
    if (percent > 100) percent = 100

    if (!sliderMouseDown) {
      sliderThumbPrimary.style.width = percent + '%'
    }
  }

  return {
    element: slider,
    update
  }
}
