import Api from '@/services/Api'

export default {
  add (credentials) {
    return Api().post('add', credentials)
  },
  remove (credentials) {
	  return Api().post('remove', credentials)
  },
  widget (credentials) {
	  return Api().post('widget', credentials)
  }
}