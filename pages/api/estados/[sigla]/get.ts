import type { NextApiRequest, NextApiResponse } from 'next'
import estadosJson from '@/constants/estados.json'

type Data = {
  estado: Array<{ nome: string, sigla: string, cidades: Array<string> }>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {

  const { sigla } = req.query;

  const estado = estadosJson.find((e) => e.sigla == sigla)

  if(!estado) {
    res.status(404).json({ error: 'Estado não encontrado' })
    return
  }

  res.status(200).json({ estado })

}
