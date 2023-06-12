import express from "express";
import { z } from "zod";
import { ValidatedRequestHandler, createValidatedHandler, validate } from "../validator";

interface Body {
  name: string;
  age: number;
}

interface Params {
  limit?: number;
}

interface Query {
  search?: string;
}

const bodySchema = z.object({
	name: z.string(),
	age: z.number().positive(),
});

const paramsSchema = z.object({
	limit: z.number().int().positive().optional(),
});

const querySchema = z.object({
	search: z.string().optional(),
});

// Using Zod Schemas inference.
const handlerSchema: ValidatedRequestHandler<z.infer<typeof bodySchema>, z.infer<typeof paramsSchema>, z.infer<typeof querySchema>> = (req, res) => {
	const { body, params, query } = req;
  
	console.log({ body });
	console.log({ params });
	console.log({ query });

	return res.sendStatus(200);
};

// Using own TypeScript types and interfaces.
const handlerDto: ValidatedRequestHandler<Body, Params, Query> = (req, res) => {
	const { body, params, query } = req;
  
	console.log({ body });
	console.log({ params });
	console.log({ query });

	return res.sendStatus(200);
};

// Validated Handler function example.
const validatedHandler = createValidatedHandler({ body: bodySchema })((req, res, next) => {
	console.log(req.body.age);
	next();
});

// Express app example
const app = express();

app.post("/test", validate({
	body: bodySchema
}), (req, res, next) => {

	console.log(req.body.name);
	req.params.limit; // wtf why is it typed when it shouldn;t
	next();
},
handlerSchema,
handlerDto,
validatedHandler,
);

app.listen(3456, () => console.log("Server listening on Port 3456."));


const dupaSchema = z.object({
	dupa: z.object({
		jaja: z.number().positive().int()
	})
});

app.post("/api/dupa", validate({
	body: dupaSchema
}), (req, res) => {
	const { dupa } = req.body;

	console.log(dupa.jaja);


	return res.status(2137).json(req.body);
});

const cyckiHandler = createValidatedHandler({ body: dupaSchema })((req, res) => {
	const { dupa } = req.body;

	console.log(dupa.jaja);

	return res.status(2137).json(dupa);
});

app.post("/api/cycki", cyckiHandler);