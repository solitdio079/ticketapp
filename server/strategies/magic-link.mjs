import passport from 'passport'
import magicLink from 'passport-magic-link'
import sendgrid from '@sendgrid/mail'
import User from '../schemas/users.mjs'


const MagicLinkStrategy = magicLink.Strategy
sendgrid.setApiKey(process.env['SENDGRID_API_KEY'])

passport.use(
  new MagicLinkStrategy(
    {
      secret: 'uoghqtigfuojsdnfr',
      userFields: ['email'],
      tokenField: 'token',
      verifyUserAfterToken: true,
    },
    function send(user, token) {
      var link = 'http://localhost:3000/auth/login/email/verify?token=' + token
      var msg = {
        to: user.email,
        from: process.env['EMAIL'],
        subject: 'Sign in to TicketApp',
        text:
          'Salut! Cliquez sur le lien ci-dessous pour vous connecter sur TicketApp.\r\n\r\n' +
          link,
        html:
          '<h3>Salut!</h3><p> Cliquez sur le lien ci-dessous pour vous connecter sur TicketApp.</p><p><a href="' +
          link +
          '">Connectez-vous</a></p>',
      }
      return sendgrid.send(msg)
    },
    async function verify(user) {
      try {
        const userVerify = await User.findOne({ email: user.email })
        if (!userVerify) {
          const newUser = new User({ email: user.email })
          await newUser.save()
          return new Promise((resolve, reject) => {
            resolve(newUser)
          })
        }
        return new Promise((resolve, reject) => {
          resolve(userVerify)
        })
      } catch (error) {
        return new Promise((resolve, reject) => {
          reject(error)
        })
      }
    }
  )
)


passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email, isAdmin: user.isAdmin, isArtist: user.isArtist })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})