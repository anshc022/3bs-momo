import { MapPin, Clock, Phone, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <section id="location" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Find <span className="text-brand">Us</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden h-80 border border-white/10">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.098!2d85.8245!3d20.2961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDE3JzQ2LjAiTiA4NcKwNDknMjguMiJF!5e0!3m2!1sen!2sin!4v1" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" />
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-400">Kitt Road, Bhubaneswar, Odisha</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Hours</h3>
                <p className="text-gray-400">4:00 PM – 10:30 PM (Daily)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <a href="https://wa.me/916370013996" className="text-green-400 hover:underline">+91 6370013996</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-white/10 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥟</span>
            <span className="font-bold text-white">3BS MOMO</span>
            <span>• Kitt Road, Bhubaneswar</span>
          </div>
          <p>© 2025 3BS MOMO. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
