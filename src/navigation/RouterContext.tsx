import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { PATHS, type AppPath } from './paths'

interface NavigateOptions {
  replace?: boolean
  search?: string
}

interface RouterContextValue {
  pathname: string
  search: string
  navigate: (to: AppPath, options?: NavigateOptions) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return PATHS.LANDING
  return rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(() => ({
    pathname:
      typeof window !== 'undefined' ? normalizePath(window.location.pathname) : PATHS.LANDING,
    search: typeof window !== 'undefined' ? window.location.search : '',
  }))

  useEffect(() => {
    const handlePopState = () => {
      setLocation({
        pathname: normalizePath(window.location.pathname),
        search: window.location.search,
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to: AppPath, options?: NavigateOptions) => {
    const normalizedTarget = normalizePath(to)
    const search = options?.search ? (options.search.startsWith('?') ? options.search : `?${options.search}`) : ''
    const targetUrl = `${normalizedTarget}${search}`
    const currentUrl = `${window.location.pathname}${window.location.search}`

    if (currentUrl !== targetUrl) {
      if (options?.replace) {
        window.history.replaceState({}, '', targetUrl)
      } else {
        window.history.pushState({}, '', targetUrl)
      }
    }

    setLocation({ pathname: normalizedTarget, search })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const value = useMemo(
    () => ({ ...location, navigate }),
    [location, navigate],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useLocation() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useLocation must be used within a RouterProvider')
  }
  return { pathname: context.pathname, search: context.search }
}

export function useNavigate() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useNavigate must be used within a RouterProvider')
  }
  return context.navigate
}

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: AppPath
  replace?: boolean
}

export function Link({ to, replace, onClick, children, ...rest }: LinkProps) {
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }
    event.preventDefault()
    navigate(to, { replace })
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export interface NavLinkProps extends Omit<LinkProps, 'className' | 'children'> {
  to: AppPath
  className?: string | ((state: { isActive: boolean }) => string)
  children?: ReactNode | ((state: { isActive: boolean }) => ReactNode)
}

export function NavLink({ to, className, children, ...rest }: NavLinkProps) {
  const { pathname } = useLocation()
  const isActive = pathname === to

  const resolvedClassName =
    typeof className === 'function' ? className({ isActive }) : className

  const resolvedChildren =
    typeof children === 'function' ? children({ isActive }) : children

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={resolvedClassName}
      {...rest}
    >
      {resolvedChildren}
    </Link>
  )
}

