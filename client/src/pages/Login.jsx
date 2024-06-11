import { Form, useNavigation, redirect } from "react-router-dom"


export async function action({ request }) {
    const body = await request.formData()
    const bodyObject = Object.fromEntries(body)
    console.log(bodyObject);
    
    const response = await fetch('http://localhost:3000/auth/login/email', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    })
  const status = await response.json()
  if (status.msg === 'You are not logged in!')
    return redirect('/')
  
  return redirect('/check-email')
    

}

export default function Login() {
    const navigation = useNavigation()
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Se Connectez!</h1>
            <p className="py-6">Entrez votre mail s&apos;il vous plait!</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Form method="post" className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">
                  {navigation.state === 'submitting' ? (
                    <span className="loading loading-infinity loading-md"></span>
                  ) : (
                    ' Se connecter'
                  )}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
}