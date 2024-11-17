// import DarkmodeSelector from './DarkmodeSelector';
import { Navbar, DarkThemeToggle } from "flowbite-react";

function Navigation() {
  return (
    <div className="print:hidden">
      <Navbar fluid rounded>
        {/* <Navbar.Brand href="https://waynegraham.github.io/blue-to-purple">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            BJJ Study Guide
          </span>
        </Navbar.Brand> */}
        <div className="flex md:order-2">
          <Navbar.Toggle />
          <DarkThemeToggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link
            className="hover:underline md:hover:text-blue-700"
            href="https://waynegraham.github.io/white-to-blue"
          >
            White to Blue
          </Navbar.Link>
          <Navbar.Link
            className="hover:underline md:text-purple-700 bg-purple-700 underline"
            href="https://waynegraham.github.io/blue-to-purple"
            active
          >
            Blue to Purple
          </Navbar.Link>
          <Navbar.Link
            className="hover:underline md:hover:text-yellow-900"
            href="https://waynegraham.github.io/purple-to-brown"
          >
            Purple to Brown
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

// function Navigation() {
//   return (
//     // from https://www.freecodecamp.org/news/how-to-build-a-dark-mode-switcher-with-tailwind-css-and-flowbite/
//     <nav classNameName="bg-white border-gray-200 px- bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
//       <div classNameName="container mx-auto flex flex-wrap items-center justify-between">
//         <a href="https://waynegraham.github.io/white-to-blue" classNameName="flex">
//           <span classNameName="self-center text-lg font-semibold whitespace-nowrap dark:text-white">White to Blue</span>
//         </a>

//         <a href="https://waynegraham.github.io/blue-to-purple/" classNameName="flex">
//           <span classNameName="self-center text-lg font-semibold whitespace-nowrap dark:text-white underline underline-offset-8">Blue to Purple</span>
//         </a>

//         <a href="#" classNameName="flex">
//           <span classNameName="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Purple to Brown</span>
//         </a>

//         <div classNameName="flex md:order-2">
//           <DarkmodeSelector /> {/* Darkmode toggle */}
//         </div>
//       </div>
//     </nav>
//   );
// }

export default Navigation;
