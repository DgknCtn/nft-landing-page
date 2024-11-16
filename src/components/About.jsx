import { motion } from 'framer-motion';
import { FaPalette, FaCubes, FaGem, FaUsers } from 'react-icons/fa';

function About() {
  const features = [
    {
      title: "Unique Art",
      description: "Each VANTH NFT is algorithmically generated with unique traits and characteristics, making every piece one of a kind.",
      icon: <FaPalette className="text-2xl" />,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Blockchain",
      description: "Secured by Ethereum blockchain technology, ensuring true ownership and authenticity of your digital assets.",
      icon: <FaCubes className="text-2xl" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Staking",
      description: "Stake your VANTH NFTs to earn $VNTH tokens, unlocking exclusive benefits and rewards.",
      icon: <FaGem className="text-2xl" />,
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Community",
      description: "Join an exclusive community of collectors and enthusiasts, with access to special events and future opportunities.",
      icon: <FaUsers className="text-2xl" />,
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            VANTH is Coming Soon
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            VANTH represents a groundbreaking collection of 4,444 uniquely generated characters on the Ethereum blockchain. 
            Each NFT is crafted with distinctive traits and characteristics, making it truly one of a kind.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="text-3xl font-bold text-accent mb-2">4,444</h3>
            <p className="text-gray-400">Total Supply</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="text-3xl font-bold text-accent mb-2">300+</h3>
            <p className="text-gray-400">Unique Traits</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="text-3xl font-bold text-accent mb-2">10 VNTH</h3>
            <p className="text-gray-400">Daily Rewards</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="text-3xl font-bold text-accent mb-2">1,000+</h3>
            <p className="text-gray-400">Community Members</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-accent/20 hover:border-accent/50 transition-all duration-300"
            >
              <div className={`
                w-12 h-12 rounded-lg mb-4 flex items-center justify-center
                bg-gradient-to-r ${feature.color} text-white
              `}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;