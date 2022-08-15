import '@styles/styles.scss'

const DETAIL_URL = 'https://www.themoviedb.org/movie'
const SEARCH_URL = 'https://www.themoviedb.org/search'

/**
 * Parses the current url and gets the tmdb id
 * @returns {number}
 */
const getTmdbIdFromUrl = (): number => {
    const url = window.location.toString()
    const parts = url.split('/')
    const id = Number(parts.slice(-1)[0].split('-')[0])

    return id
}

/**
 * Parses the item and gets the tmdb id
 * @returns {number}
 */
const getTmdbIdFromElement = (element: Element): number => {
    const link = document.querySelector(`#${element.id} .poster .result`) as HTMLAnchorElement
    return Number(link?.href.split('/').slice(-1)[0])
}

/**
 * Copies the imdb id to the clipboard
 *
 * @param event {PointerEvent}
 */
const copyTmdbId = (event: PointerEvent): void => {
    event.preventDefault()
    event.stopPropagation()
    const element = event.target as HTMLElement
    if (element === null || element === undefined) {
        return
    }
    navigator.clipboard.writeText(element.textContent as string)
    element.classList.add('active')
}

/**
 * Renders the tmdb id in the container element
 *
 * @param container {Element}
 * @param id {number}
 */
const renderTmdbId = (container: Element, id: number) => {
    const idElement = document.createElement('span')
    idElement.className = 'tag imdb-id'
    idElement.innerHTML = `{tmdb-${id}}`
    container?.append(idElement)

    idElement.addEventListener('click', copyTmdbId)
    idElement.addEventListener('mouseover', () => idElement.classList.toggle('hover'))
    idElement.addEventListener('mouseleave', () => idElement.classList.toggle('hover'))
}

const currentUrl = window.location.toString()

if (currentUrl.startsWith(DETAIL_URL)) {
    const id = getTmdbIdFromUrl()
    const container = document.querySelector('section.header .title h2')

    if (container) {
        renderTmdbId(container, id)
    }
} else if (currentUrl.startsWith(SEARCH_URL)) {
    const results = document.querySelectorAll('[id^="card_movie_"]')

    results.forEach((element) => {
        const id = getTmdbIdFromElement(element)
        const container = document.querySelector(`#${element.id} .title .result h2`)

        if (container) {
            renderTmdbId(container, id)
        }
    })
}
