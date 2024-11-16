import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

function Team() {
  const team = [
    {
      name: "X",
      role: "Founder & Creative Director",
      image: "https://placehold.co/200x200/1a1a1a/cccccc",
      twitter: "#"
    },
    {
      name: "Y",
      role: "Lead Artist",
      image: "https://placehold.co/200x200/1a1a1a/cccccc",
      twitter: "#"
    },
    {
      name: "Z",
      role: "Blockchain Developer",
      image: "https://placehold.co/200x200/1a1a1a/cccccc",
      twitter: "#"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-8">Our Team</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the talented individuals behind VANTH
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="mb-4 relative group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
                <div className="absolute inset-0 bg-secondary/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={member.twitter} className="text-white hover:text-accent text-xl">
                    <FaTwitter />
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;