import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }

    const httpResponse: HttpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.data)
  }
}
