import { Form, Link, useOutletContext, useNavigation} from "react-router-dom"
import { FaPencil } from "react-icons/fa6"



export async function action({ request }) {
  const bodyData = await request.formData()
  const bodyObject = Object.fromEntries(bodyData)
  console.log(bodyObject)
  const id = bodyData.get("id")
  //console.log(bodyData);
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      mode:'cors',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'form-data',
      },
      body: bodyData,
    }) 
    const user = await response.text()
    console.log(user)
    return user
    
  } catch (error) {
    throw new Error(error.message)
    
  }

 
  
}

export default function Profile() {
    const navigation = useNavigation()
    const [user] = useOutletContext()
    return (
      <>
        <Form
          method="post"
          encType="multipart/form-data"
          className="flex flex-col lg:flex-row justify-between m-3 p-3"
        >
          <div className="flex flex-col justify-around ">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              <span className="badge badge-primary">
                {' '}
                {user.isAdmin
                  ? 'Admin'
                  : user.isArtist
                  ? 'Artist'
                  : user.isOrganizer
                  ? 'Organisateur'
                  : 'Client'}{' '}
              </span>
            </div>
            <input name="id" value={user._id} type="hidden"/>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary file-input-xs m-2 w-full max-w-xs"
              name="avatar"
            />
            {!user.isAdmin && !user.isArtist && !user.organizer ? (
              <span className="text-md m-2">
                Voulez-vous etre{' '}
                <Link className="underline text-primary">Artist</Link> ou{' '}
                <Link className="underline text-primary">Organisateur</Link>?
              </span>
            ) : (
              ''
            )}
          </div>

          <div className="flex flex-col flex-wrap justify-between m-3 p-3">
            <label className="input input-bordered flex items-center gap-2 m-1">
              Nom Complet
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                name="fullName"
                defaultValue={user.name || ''}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-1">
              Email
              <input
                type="email"
                className="grow"
                placeholder="daisy@site.com"
                name="email"
                defaultValue={user.email || ''}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-1">
              Telephone
              <input
                type="text"
                className="grow"
                placeholder="+90 530 000 90 90"
                name="phone"
                defaultValue={user.phone || ''}
              />
            </label>
            <button className="btn btn-primary m-1">
              {navigation.state === 'submitting' ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                <>
                  <FaPencil /> Update
                </>
              )}
            </button>
          </div>
        </Form>
      </>
    )
    
}