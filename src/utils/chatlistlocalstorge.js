export const domain = document.domain

export const PriviteLocalCache = function(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data))
}

export const PriviteCacheGet = function(name) {
    return JSON.parse(window.localStorage.getItem(name))
}
