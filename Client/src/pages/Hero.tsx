


import { Link } from 'react-router-dom';
import Dashboard from '../assets/Dashboard.jpeg'
import { motion } from 'framer-motion';

const features = [
  {
    title: "Capture Instantly",
    description:
      "Save thoughts, links, and ideas the moment they strike. Use tags and types to keep everything organized from the start.",
  },
  {
    title: "Organize Your Brain",
    description:
      "Filter by tags, types, and more to find what you need instantly. Your brain is searchable, structured, and always accessible.",
  },
  {
    title: "Share Effortlessly",
    description:
      "Generate shareable links for your content—read-only and secure. Let others see your ideas without compromising your privacy.",
  },
];


const Hero = () => {
    return(
        <div className="bg-white min-h-screen relative overflow-hidden">
            {/* Get Started Button (Positioned Absolutely) */}
            <motion.div
                className="absolute top-4 right-4 z-50"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut",
                    delay: 0.2
                }}
            >
                <Link
                    to="/login"
                    className="text-white font-semibold bg-green-500 px-3 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                >
                    Get Started
                </Link>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex flex-col items-center pt-20 px-4 pb-12">

                {/* Welcome Text */}
                <motion.div
                    initial={{opacity:0, scale:0}}
                    animate={{opacity:1, scale:1}}
                    transition={{
                        duration:0.6
                    }}
                    className="text-center mb-6 max-w-2xl"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight transition-all duration-300 text-gray-800">
                        Welcome to Your
                    </h1>
                    <span className="text-4xl md:text-5xl font-extrabold leading-tight transition-all duration-300 text-green-500">Second Brain</span>
                </motion.div>

                

                {/* Dashboard Image */}
                <motion.div
                    initial={{y:100,opacity:0}}
                    whileInView={{y:0,opacity:1}}
                    transition={{
                        duration:0.8,
                        ease:"easeOut",
                        delay:0.1
                    }}
                    viewport={{
                        once:true,
                        amount:0.4
                    }}

                    className="relative w-full max-w-5xl h-[300px] md:h-[auto] overflow-hidden rounded-lg shadow-lg mb-12"
                    
                >
                    
                    <div className="flex items-center justify-center pointer-events-none">
                        <p className="text-sm md:text-md text-center text-gray-600 dark:text-slate-700 max-w-xl transition-all duration-300 px-4 py-2 rounded-md">
                        Capture, organize, and share everything you learn or discover — all in one place.
                        </p>
                    </div>

                    <img
                        src={Dashboard}
                        alt="Dashboard preview"
                        className="w-full h-full object-fit mask-gradient-bottom" 
                    />
                </motion.div>


                {/* Features Grid */}
                <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}

                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: window.innerWidth < 768 ? index * 0.3 : 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                            
                            className="rounded-2xl p-6 shadow-md border border-gray-300 hover:shadow-lg hover:border-cyan-400 cursor-pointer hover:shadow-slate-500/90 transition-all duration-300 bg-white"
                        >
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-slate-900">
                            {feature.title}
                        </h2>
                        <p className="text-slate-900">
                            {feature.description}
                        </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero;



