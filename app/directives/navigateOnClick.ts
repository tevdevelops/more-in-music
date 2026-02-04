import type { DirectiveBinding, ObjectDirective } from 'vue'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea'

function isInteractiveTarget(el: Element, target: EventTarget | null): boolean {
  if (!target || !(target instanceof Element)) return false
  const interactive = (target as Element).closest(INTERACTIVE_SELECTOR)
  return Boolean(interactive && el.contains(interactive))
}

const directive: ObjectDirective<HTMLElement, string> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const path = binding.value
    if (!path || typeof path !== 'string') return

    el.setAttribute('tabindex', '0')
    el.setAttribute('role', 'link')
    el.classList.add('cursor-pointer')

    const handleClick = (event: MouseEvent) => {
      if (isInteractiveTarget(el, event.target)) return
      navigateTo(path)
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      if (document.activeElement !== el) return
      event.preventDefault()
      navigateTo(path)
    }

    el.addEventListener('click', handleClick)
    el.addEventListener('keydown', handleKeydown)

    ;(el as any).__navigateOnClickCleanup = () => {
      el.removeEventListener('click', handleClick)
      el.removeEventListener('keydown', handleKeydown)
    }
  },
  unmounted(el: HTMLElement) {
    const cleanup = (el as any).__navigateOnClickCleanup
    if (typeof cleanup === 'function') cleanup()
  },
}

export default directive
