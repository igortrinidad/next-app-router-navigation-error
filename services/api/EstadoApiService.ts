import axios from 'axios'

export default class EstadoApiService {

  static get_all() {
    return axios.get('/api/estados/get_all')
      .then(response => {
        return response.data.estados
      })
  }

  static get(sigla_estado: string) {
    return axios.get(`/api/estados/${ sigla_estado }/get`)
      .then(response => {
        return response.data.estado.cidades
      })
  }

}