const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-wrap justify-between mb-8">
            {/* Company Info */}
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <h3 className="text-2xl font-bold text-orange-500">Invoisify</h3>
              <p className="mt-2 text-gray-400">
                Invoisify makes invoice creation simple, intuitive, and accessible. Generate professional invoices in minutes.
              </p>
            </div>
  
            {/* Links Section */}
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <h4 className="text-xl font-semibold text-gray-200">Quick Links</h4>
              <ul className="mt-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-200">Home</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-200">About</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-200">Services</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-200">Contact</a>
                </li>
              </ul>
            </div>
  
            {/* Contact Section */}
            <div className="w-full sm:w-1/3">
              <h4 className="text-xl font-semibold text-gray-200">Contact Us</h4>
              <p className="mt-4 text-gray-400">Email: support@invoisify.com</p>
              <p className="text-gray-400">Phone: +1 (800) 123-4567</p>
            </div>
          </div>
  
          <div className="border-t border-gray-700 pt-6">
            <p className="text-center text-sm text-gray-400">
              © 2024 Invoisify. All rights reserved. Designed with 💙 by Invoisify Team.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  