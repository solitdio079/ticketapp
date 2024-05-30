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
    res.redirect('/login/email/check')
  }
)

export default router