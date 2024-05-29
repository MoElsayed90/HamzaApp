import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import logo from "../../imgs/logo/Hamza Logo - BigCommerce Store Logo with Transparent Background.png"

const RootLayout = () => {
  return (
    <>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <div className="space-y-10">
            <Navbar />
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className="flex justify-center items-center mb-5">

              <img src={logo} className="w-28 h-15 flex" />
            </div>
            <li className="hover:bg-hoverColor  hover:rounded-lg"><a>Item 1</a></li>
            <li>
              <details open >
                <summary className="hover:bg-[#05553e8f]  hover:rounded-lg">Parent</summary>
                <ul>
                  <li className="hover:bg-[#05553e8f]  hover:rounded-lg"><a>Submenu 1</a></li>
                  <li className="hover:bg-[#05553e8f]  hover:rounded-lg"><a>Submenu 2</a></li>
                  <li>
                    <details open>
                      <summary className="hover:bg-[#05553e8f]  hover:rounded-lg">Parent</summary>
                      <ul>
                        <li className="hover:bg-[#05553e8f]  hover:rounded-lg"><a>Submenu 1</a></li>
                        <li className="hover:bg-[#05553e8f]  hover:rounded-lg"><a>Submenu 2</a></li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li className="hover:bg-[#05553e8f]  hover:rounded-lg"><a>Item 3</a></li>
          </ul>

        </div>
      </div>

    </>
  )

}

export default RootLayout;