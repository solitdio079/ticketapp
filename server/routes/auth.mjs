import { Router } from 'express'
import passport from 'passport'
import '../strategies/magic-link.mjs'

const router = Router()

router.post(
  '/login/email',
  passport.authenticate('magiclink', {
    action: 'requestToken',
    failureRedirect: '/login',
  }),
  function (req, res, next) {
    res.redirect('/auth/login/email/check')
  }
)
router.get('/login/email/check', function (req, res, next) {
  res.send({msg:"Check your email", data:[]})
})

router.get(
  '/login/email/verify',
  passport.authenticate('magiclink', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login',
  })
)

export default router