import React, { useState } from 'react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Container>
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-blue-100 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              We'd love to hear from you. Get in touch with our team.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Contact Info Cards */}
          <motion.div 
            className="bg-gray-50 p-8 rounded-lg text-center space-y-4"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex justify-center"
              whileHover={{ y: [-5, 0, -5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="bg-blue-100 p-4 rounded-full">
                <MapPin size={40} className="text-blue-600" />
              </div>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">Address</h3>
            <p className="text-gray-600">123 Tech Lane<br />Innovation City, NY 10001<br />United States</p>
          </motion.div>

          <motion.div 
            className="bg-gray-50 p-8 rounded-lg text-center space-y-4"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex justify-center"
              whileHover={{ y: [-5, 0, -5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="bg-blue-100 p-4 rounded-full">
                <Mail size={40} className="text-blue-600" />
              </div>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">Email</h3>
            <p className="text-gray-600"><a href="mailto:support@novamart.com" className="hover:text-blue-600">support@novamart.com</a><br /><a href="mailto:info@novamart.com" className="hover:text-blue-600">info@novamart.com</a></p>
          </motion.div>

          <motion.div 
            className="bg-gray-50 p-8 rounded-lg text-center space-y-4"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex justify-center"
              whileHover={{ y: [-5, 0, -5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="bg-blue-100 p-4 rounded-full">
                <Phone size={40} className="text-blue-600" />
              </div>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">Phone</h3>
            <p className="text-gray-600"><a href="tel:+1234567890" className="hover:text-blue-600">+1 (234) 567-890</a><br />Available 24/7</p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Send us a Message
          </motion.h2>
          <AnimatePresence mode="wait">
            {submitted && (
              <motion.div 
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-center"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Thank you! We'll get back to you soon.
              </motion.div>
            )}
          </AnimatePresence>
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message..."
                rows="6"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Message
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </Container>
    </div>
  );
};

export default Contact;