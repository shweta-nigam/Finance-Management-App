import { Mail, Phone, MapPin } from "lucide-react";

function ContactPage() {
  return (
    <div className="min-h-screen w-full bg flex flex-col items-center text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-300 mb-10 max-w-xl text-center">
        Got questions or suggestions? We’d love to hear from you!  
        Fill out the form or reach us directly via the details below.
      </p>

      {/* Contact Form & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        <form className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Write your message..."
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold transition shadow-md btn-D-blue btn-D-blue:hover"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="text-blue-400" />
            <span>support@finease.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-green-400" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-red-400" />
            <span>Mumbai, India</span>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full max-w-5xl mt-12">
        <iframe
          title="FinEase Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11610068407!2d72.74109972066086!3d19.082197839283195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a6eebd6af%3A0x7c86951f7c5c4c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1693745152943!5m2!1sen!2sin"
          width="100%"
          height="400"
          loading="lazy"
          allowFullScreen
          className="rounded-2xl shadow-lg border-0"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactPage;
