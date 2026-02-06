import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { Award, Heart, Zap, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Top-quality products from trusted brands worldwide'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Lightning-fast and secure shipping to your doorstep'
    },
    {
      icon: Shield,
      title: 'Expert Support',
      description: 'Reliable customer support available 24/7'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Easy returns and hassle-free shopping experience'
    }
  ];

  const values = [
    {
      title: 'Integrity',
      description: 'We believe in honest dealings and transparent pricing'
    },
    {
      title: 'Innovation',
      description: 'Constantly evolving to bring you the latest tech'
    },
    {
      title: 'Excellence',
      description: 'Committed to the highest standards in service'
    },
    {
      title: 'Community',
      description: 'Building relationships with our customers and partners'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
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
              About NovaMart
            </motion.h1>
            <motion.p 
              className="text-blue-100 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Your one-stop destination for the latest and greatest in electronics. From cutting-edge gadgets to must-have accessories, we're here to power up your tech life.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <Container className="py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          {/* Mission */}
          <motion.div 
            className="space-y-4"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At NovaMart, our mission is to make innovative technology accessible to everyone. We're passionate about connecting people with the tools and tech they need to thrive in a digital world — all at competitive prices and delivered with speed and care.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            className="space-y-4"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We envision a future where technology elevates everyday life. At NovaMart, we're committed to staying ahead of the curve, offering cutting-edge solutions that are both practical and affordable.
            </p>
          </motion.div>
        </motion.div>
      </Container>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose NovaMart?</h2>
            <p className="text-gray-600 text-lg">We deliver excellence in every interaction</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index} 
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="bg-blue-100 p-4 rounded-full">
                      <Icon size={32} className="text-blue-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Core Values Section */}
      <Container className="py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 text-lg">These principles guide everything we do</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index} 
              className="border-l-4 border-blue-600 pl-6 py-4"
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Container>
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join the NovaMart Family
            </motion.h2>
            <motion.p 
              className="text-blue-100 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Whether you're a tech enthusiast, a professional, or just looking for something cool and functional — NovaMart has something for everyone.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/products')}
              >
                Start Shopping
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default About;
