import { Hono } from 'hono'

type Bindings = {
	MY_BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/bucket-list', async (c) => {
	const list = await c.env.MY_BUCKET.list({ include: ['httpMetadata', 'customMetadata'] })
	return c.json(list)
})

export default app
