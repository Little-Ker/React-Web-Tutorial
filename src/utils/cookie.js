import Cookies from 'universal-cookie'

const cookies = new Cookies()

const getCookie = name => cookies.get(name)

const defaultOptions = {
  'path': '/',
  'sameSite': 'Lax',
  'maxAge': 259200, // 3 days
}

const setCookie = (name, value, options) => {
  const curOptions = options ? { ...defaultOptions, ...options } : defaultOptions
  cookies.set(name, value, curOptions)
}

const removeCookie = (name, options) => cookies.remove(name, {
  path: defaultOptions.path, domain: defaultOptions.domain,
})

export default cookies
export {
  getCookie, setCookie, removeCookie
}
