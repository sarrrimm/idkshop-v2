const Footer = () => {
  return (
    <footer className=" border-t border-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Brand Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">YourBrand</h2>
          <p className="text-sm text-gray-600 mt-2">
            A next-gen consignment store where we purchase products or securely
            list them on ALC.
          </p>
        </div>

        {/* Selling Process */}
        <div>
          <h3 className="text-gray-900 font-medium mb-3 text-sm">
            Sell with Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-teal-600">
                How It Works
              </a>
            </li>
            <li>
              <a href="/sell-with-us" className="hover:text-teal-600">
                List on ALC
              </a>
            </li>
            <li>
              <a href="/sell-with-us" className="hover:text-teal-600">
                Get Paid
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 font-medium mb-3 text-sm">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-teal-600">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-teal-600">
                Browse Products
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-teal-600">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Secure Transactions & ALC */}
        <div>
          <h3 className="text-gray-900 font-medium mb-3 text-sm">
            Security & ALC
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-teal-600">
                What is ALC?
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-600">
                Safe Transactions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-600">
                Buyer Protection
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-6 py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} CuratedFinds. All rights reserved.</p>
        <div className="flex gap-3 mt-2 sm:mt-0">
          <a href="#" className="hover:text-teal-600">
            Privacy Policy
          </a>
          |
          <a href="#" className="hover:text-teal-600">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
