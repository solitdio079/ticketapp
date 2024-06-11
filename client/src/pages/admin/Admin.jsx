import {Outlet, NavLink, useOutletContext} from "react-router-dom"
import { FaTicket, FaMicrophone , FaUserGroup, FaGear, FaChartLine } from 'react-icons/fa6'
export default function Admin() {
  const [user] = useOutletContext()
  console.log(user);
    return (
      <>
        <div className="flex flex-col lg:flex-row m-5 p-5">
          <div className="max-w-1/3">
            <ul className="menu bg-base-200 rounded-box">
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'bg-primary text-white'
                      : isPending
                      ? 'bg-neutral'
                      : ''
                  }
                >
                  <FaGear className="h-5 w-5" />
                  Profile
                  <span className="badge badge-sm">99+</span>
                </NavLink>
              </li>
              {user.isAdmin ? (
                <li>
                  <NavLink
                    to="/admin/users"
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'bg-primary text-white'
                        : isPending
                        ? 'bg-neutral'
                        : ''
                    }
                  >
                    <FaUserGroup className="h-5 w-5" />
                    Utilisateurs
                    <span className="badge badge-sm badge-warning">NEW</span>
                  </NavLink>
                </li>
              ) : (
                ''
              )}

              <li>
                <NavLink
                  to="/admin/tickets"
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'bg-primary text-white'
                      : isPending
                      ? 'bg-neutral'
                      : ''
                  }
                >
                  <FaTicket className="h-5 w-5" />
                  Tickets
                  <span className="badge badge-xs badge-info"></span>
                </NavLink>
              </li>
              {user.isArtist ? (
                <li>
                  <NavLink
                    to="/admin/artists"
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'bg-primary text-white'
                        : isPending
                        ? 'bg-neutral'
                        : ''
                    }
                  >
                    <FaMicrophone className="h-5 w-5" />
                    Bookings
                    <span className="badge badge-xs badge-warning"></span>
                  </NavLink>
                </li>
              ) : (
                ''
              )}

              {user.isOrganizer ? (
                <li>
                  <NavLink
                    to="/admin/artists"
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'bg-primary text-white'
                        : isPending
                        ? 'bg-neutral'
                        : ''
                    }
                  >
                    <FaMicrophone className="h-5 w-5" />
                    Evenements
                    <span className="badge badge-xs badge-warning"></span>
                  </NavLink>
                </li>
              ) : (
                ''
              )}

              <li>
                <NavLink
                  to="/admin/stats"
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'bg-primary text-white'
                      : isPending
                      ? 'bg-neutral'
                      : ''
                  }
                >
                  <FaChartLine className="h-5 w-5" />
                  Stats
                  <span className="badge badge-xs badge-primary"></span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <Outlet context={[user]} />
          </div>
        </div>
      </>
    )
}