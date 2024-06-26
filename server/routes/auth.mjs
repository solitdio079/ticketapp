import express from 'express'
import passport from 'passport'
import '../strategies/magic-link.mjs'

const router = express.Router()
router.use(express.json())

router.post(
  '/login/email',
  passport.authenticate('magiclink', {
    action: 'requestToken',
    failureRedirect: '/auth/status',
  }),
  function (req, res, next) {
    res.send({msg:"Check your email", data: null})
  }
)
router.get(
  '/login/email/verify',
  passport.authenticate('magiclink', {
    successReturnToOrRedirect: 'http://localhost:5173/admin',
    failureRedirect: '/auth/status',
  })
)
router.get("/status", (req, res) => {
  if (!req.user) return res.send({ msg: "You are not logged in!", data: null })
  return res.send({msg:"Logged in with success!", data: [req.user]})
})

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})
export default router