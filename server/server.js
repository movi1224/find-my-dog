import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import fetch from 'isomorphic-fetch';

const app = new Koa();
const router = new Router();
const port = 3011;

app.use(cors({ origin: '*' }));

router.get('/', (ctx) => {
	ctx.body = 'hello!';
});

router.get('/search', async (ctx) => {
	let request = ctx.request
	const { q } = request.query
	let res
	if (q === '' || q === 'random') {
		res = await fetch(`https://dog.ceo/api/breeds/image/random`)
	}
	else res = await fetch(`https://dog.ceo/api/breed/${q}/images/random`)
	const data = await res.json()
	// console.log(data)
	ctx.body = data
})

router.get('/load', async (ctx) => {
	const res = await fetch('https://dog.ceo/api/breeds/list/all')
	const data = await res.json()
	// console.log(data)
	ctx.body = data
})

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});


app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());


app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
