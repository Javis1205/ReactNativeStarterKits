export default {
  header: {
    MAX_HEIGHT: 340,
    MIN_HEIGHT: 60,
  },
  avatar: {
    size: 120,
    get halfSize(){
      return this.size / 2
    }
  },
}