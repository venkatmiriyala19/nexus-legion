import { Instagram, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#171715] text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand/Logo */}
        <div>
          <h2 className="text-2xl font-cinzel font-bold mb-2">Nexus Legion</h2>
          <p className="text-sm text-gray-400">
            Uniting legends across dimensions. Discover, explore, and connect
            with your favorite heroes and universes.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a
                href="#heroes"
                className="hover:text-indigo-400 transition duration-300 ease-in-out"
              >
                Heroes
              </a>
            </li>
            <li>
              <a
                href="#villains"
                className="hover:text-indigo-400 transition duration-300 ease-in-out"
              >
                Villains
              </a>
            </li>
            <li>
              <a
                href="#stories"
                className="hover:text-indigo-400 transition duration-300 ease-in-out"
              >
                Stories
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-indigo-400 transition duration-300 ease-in-out"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Social - Improved */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
          <div className="flex flex-col space-y-3">
            <a
              href="https://linkedin.com/in/venkatmiriyala19"
              target="_blank"
              className="flex items-center space-x-3 group"
            >
              <div className="bg-[#3E065F] p-2 rounded-full group-hover:bg-[#4d0880] transition duration-300">
                <Linkedin
                  size={20}
                  className="text-purple-300 group-hover:text-white transition duration-300"
                />
              </div>
              <span className="text-gray-300 group-hover:text-[#b97aff] transition duration-300">
                LinkedIn
              </span>
            </a>

            <a
              href="https://www.instagram.com/_venkat._.here_/"
              target="_blank"
              className="flex items-center space-x-3 group"
            >
              <div className="bg-[#3E065F] p-2 rounded-full group-hover:bg-[#4d0880] transition duration-300">
                <Instagram
                  size={20}
                  className="text-purple-300 group-hover:text-white transition duration-300"
                />
              </div>
              <span className="text-gray-300 group-hover:text-[#b97aff] transition duration-300">
                Instagram
              </span>
            </a>

            <a
              href="https://github.com/venkatmiriyala19"
              target="_blank"
              className="flex items-center space-x-3 group"
            >
              <div className="bg-[#3E065F] p-2 rounded-full group-hover:bg-[#4d0880] transition duration-300">
                <Github
                  size={20}
                  className="text-purple-300 group-hover:text-white transition duration-300"
                />
              </div>
              <span className="text-gray-300 group-hover:text-[#b97aff] transition duration-300">
                GitHub
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Nexus Legion. All rights reserved.
      </div>
    </footer>
  );
}
