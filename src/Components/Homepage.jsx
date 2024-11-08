import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './Footer';
import c1 from '../assets/c1.png'
import c2 from '../assets/c2.png'
import c3 from '../assets/c3.png'
import Flashlight from './Flashlight';

const carouselImages = [
  c1, c2, c3
];

const useMousePosition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const updateMousePosition = useCallback((e) => {
    console.log(e.clientX, e.clientY);  // Add this for debugging
    x.set(e.clientX);
    y.set(e.clientY);
  }, [x, y]);
  

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [updateMousePosition]);

  return { x, y };
};

const MenuItem = ({ name, description, price }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold text-gold mb-2">{name}</h3>
      <p className="text-gray-400 mb-1">{description}</p>
      <span className="text-gold">{price}</span>
    </motion.div>
  );
};

const LazyImage = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
  const [imageRef, setImageRef] = useState(null);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return <img ref={setImageRef} src={imageSrc} alt={alt} {...props} />;
};

const Header = () => (
  <motion.header
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    <nav className="fixed top-0 left-0 right-0 z-20 bg-black bg-opacity-80">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-gold">Le Grande</Link>
        <ul className="flex space-x-6">
          {['Home', 'Menu', 'About', 'Reservations', 'Contact'].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/${item.toLowerCase()}`} className="hover:text-gold transition duration-300">
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  </motion.header>
);

const SpoonForkAnimation = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="flex justify-center items-center my-12"
  >
    <motion.div
      animate={{
        rotate: [0, 45, 0],
        x: [-20, 0, -20],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="w-16 h-16 relative"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-gold">
        <path d="M11.28 1.72a.75.75 0 0 1 1.44 0l1.14 3.51a.75.75 0 0 0 .71.52h3.69a.75.75 0 0 1 .44 1.36l-2.98 2.17a.75.75 0 0 0-.27.84l1.14 3.51a.75.75 0 0 1-1.16.86l-2.98-2.17a.75.75 0 0 0-.88 0l-2.98 2.17a.75.75 0 0 1-1.16-.86l1.14-3.51a.75.75 0 0 0-.27-.84l-2.98-2.17a.75.75 0 0 1 .44-1.36h3.69a.75.75 0 0 0 .71-.52l1.14-3.51Z" />
      </svg>
    </motion.div>
    <motion.div
      animate={{
        rotate: [0, -45, 0],
        x: [20, 0, 20],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="w-16 h-16 relative"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-gold">
        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
      </svg>
    </motion.div>
  </motion.div>
);

export default function HomePage() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Flashlight/>
      <Header />

      <Slider {...settings} className="h-screen">
        {carouselImages.map((image, index) => (
          <div key={index} className="relative h-screen">
            <LazyImage
              src={image}
              alt={`Carousel image ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center z-10">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-7xl font-bold mb-4 text-white shadow-text"
                >
                  Le Grande
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl md:text-2xl mb-8 text-white shadow-text"
                >
                  Experience Culinary Excellence
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link 
                    to="/reservations"
                    className="bg-gold text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition duration-300"
                  >
                    Reserve a Table
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <main>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Featured Dishes
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <MenuItem 
                name="Truffle Infused Risotto" 
                description="Creamy Arborio rice with black truffle and aged Parmesan" 
                price="$32"
              />
              <MenuItem 
                name="Pan-Seared Foie Gras" 
                description="With caramelized figs and port wine reduction" 
                price="$38"
              />
              <MenuItem 
                name="Lobster Thermidor" 
                description="Succulent lobster in a rich brandy cream sauce" 
                price="$45"
              />
              <MenuItem 
                name="Wagyu Beef Tenderloin" 
                description="A5 grade Wagyu beef with roasted garlic mash" 
                price="$65"
              />
            </div>
          </div>
        </section>

        <SpoonForkAnimation />

        <section className="py-20 bg-black">
          <div className="container mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-8"
            >
              About Le Grande
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              Le Grande is more than a restaurant; it's a culinary journey. Our passionate chefs craft each dish with precision, using only the finest ingredients to create unforgettable dining experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                to="/about"
                className="border-2 border-gold text-gold px-8 py-3 rounded-full text-lg font-semibold hover:bg-gold hover:text-black transition duration-300"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Chef's Specials
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Seafood Paella",
                  description: "A Spanish delicacy with saffron rice, shrimp, mussels, and calamari",
                  image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  name: "Beef Wellington",
                  description: "Tender beef fillet wrapped in puff pastry with mushroom duxelles",
                  image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  name: "Chocolate Soufflé",
                  description: "Light and airy chocolate dessert served with vanilla crème anglaise",
                  image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                }
              ].map((dish, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                >
                  <LazyImage src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gold mb-2">{dish.name}</h3>
                    <p className="text-gray-400">{dish.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-black">
          <div className="container mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-8"
            >
              Make a Reservation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              Experience the epitome of fine dining at Le Grande. Reserve your table now and embark on a gastronomic journey like no other.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                to="/reservations"
                className="bg-gold text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition duration-300"
              >
                Reserve a Table
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              What Our Guests Say
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Emily S.",
                  review: "An unforgettable dining experience. The attention to detail in every dish is remarkable.",
                  rating: 5
                },
                {
                  name: "Michael R.",
                  review: "The wine pairing suggestions were spot on. A perfect evening from start to finish.",
                  rating: 5
                },
                {
                  name: "Sophie L.",
                  review: "The ambiance and service are as exquisite as the food. A true culinary gem.",
                  rating: 5
                }
              ].map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-400 mb-4">"{review.review}"</p>
                  <p className="text-gold font-semibold">{review.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 py-8"
      >
        <Footer />
      </motion.footer>
    </div>
  );
}