const Koa = require('koa');
const router = require('koa-router')();
const app = module.exports = new Koa();

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

router.get('/', async (ctx, next)=>{
  ctx.body = "hello";
  next()
})

app.use(router.routes())

if (!module.parent) app.listen(3000);