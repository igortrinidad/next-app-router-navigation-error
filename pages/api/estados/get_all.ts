// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import estadosJson from '@/constants/estados.json'

type Data = {
  estados: Array<{ nome: string, sigla: string }>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const estados = estadosJson.map((estado: any) => {
    return {
      nome: estado.nome,
      sigla: estado.sigla
    }
  })

  res.status(200).json({ estados })
  
}
