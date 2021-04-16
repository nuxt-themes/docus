const storage = {}
export function useStorage() {
    // TODO: implement storage
    return {
        getKeys() {
            return Object.keys(storage)
        },
        setItem(key, value) {
            storage[key] = value
        },
        getItem(key) {
            return storage[key]
        }
    }
}