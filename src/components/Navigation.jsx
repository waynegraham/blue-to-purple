function Navigation() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-purple-800 p-6">
      <div className="w-full bock flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            href="https://waynegraham.github.io/white-to-blue/"
          >
            White to Blue
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
