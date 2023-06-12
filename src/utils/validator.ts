import { Request, RequestHandler } from "express";
import { z } from "zod";

export type ValidatedRequestHandler<Body, Params, Query> = RequestHandler<Params, any, Body, Query, any>;

type RequestSchema<Body extends z.ZodTypeAny, Params extends z.ZodTypeAny, Query extends z.ZodTypeAny> = {
  body?: Body,
  params?: Params,
  query?: Query,
};

// type Body = z.infer<typeof User>;

type ValidationMiddleware = <Body extends z.ZodTypeAny, Params extends z.ZodTypeAny, Query extends z.ZodTypeAny>
({ body, params, query }: RequestSchema<Body, Params, Query>) => RequestHandler<z.infer<Params>, any, z.infer<Body>, z.infer<Query>, any>;


type ParseRequestFn = <Body extends z.ZodTypeAny, Params extends z.ZodTypeAny, Query extends z.ZodTypeAny>
(schema: RequestSchema<Body, Params, Query>, req: Request<z.infer<Params>, any, z.infer<Body>, z.infer<Query>, any>) => void;

const parseRequest: ParseRequestFn = async (schema, req) => {
  if (schema.body) {
    req.body = await schema.body.parseAsync(req.body);
  }
  if (schema.params) {
    req.params = await schema.params.parseAsync(req.params);
  }
  if (schema.query) {
    req.query = await schema.query.parseAsync(req.query);
  }
};

export const validate: ValidationMiddleware = (schema) => async (req, res, next) => {
  try {
    await parseRequest(schema, req);
    next();
  } catch(error: unknown) {
    // Todo: Adjust error codes etc.
    return res.status(400).json(error);
  }
};

type ValidatedHandlerFactory = <Body extends z.ZodTypeAny, Params extends z.ZodTypeAny, Query extends z.ZodTypeAny>
(schema?: RequestSchema<Body, Params, Query>) => (handler: RequestHandler<z.infer<Params>, any, z.infer<Body>, z.infer<Query>, any>) => ValidatedRequestHandler<z.infer<Body>, z.infer<Params>, z.infer<Query>>;

// TODO: apply schema parsing
export const createValidatedHandler: ValidatedHandlerFactory = (schema = {}) => (handler) => {
  return async (req, res, next) => {
    try {
      await parseRequest(schema, req);
      return handler(req, res, next);
    } catch(error: unknown) {
      // Todo: Adjust error codes etc.
      return res.status(400).json(error);
    }
    
  };
};
