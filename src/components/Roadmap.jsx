import React from 'react';
import { motion } from 'framer-motion';

function Roadmap() {
  const roadmapData = [
    {
      phase: "Phase 1",
      date: "Q4 2024",
      title: "Foundation",
      status: "completed",
      description: "Establishing the core infrastructure and community",
      items: [
        "Project Development & Planning",
        "Website & Social Media Launch",
        "Community Building",
        "Smart Contract Development",
        "Partnerships Establishment"
      ],
      color: "from-blue-500 to-purple-500"
    },
    {
      phase: "Phase 2",
      date: "Q1 2025",
      title: "NFT Launch",
      status: "current",
      description: "Introducing our unique NFT collection to the world",
      items: [
        "NFT Collection Release",
        "Whitelist Opening",
        "Public Mint Launch",
        "Secondary Market Listing",
        "Community Events & Giveaways"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      phase: "Phase 3",
      date: "Q2 2025",
      title: "Utility & Rewards",
      status: "upcoming",
      description: "Implementing staking and reward mechanisms",
      items: [
        "NFT Staking Platform",
        "VNTH Token Launch",
        "Reward System Implementation",
        "DAO Governance Structure",
        "Ecosystem Expansion"
      ],
      color: "from-pink-500 to-red-500"
    },
    {
      phase: "Phase 4",
      date: "Q3 2025",
      title: "Ecosystem Growth",
      status: "upcoming",
      description: "Expanding the project's ecosystem and utility",
      items: [
        "Marketplace Integration",
        "Cross-Chain Expansion",
        "New Utility Features",
        "Strategic Partnerships",
        "Community-Driven Development"
      ],
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <section id="roadmap" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Roadmap</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our strategic plan to revolutionize the NFT space
          </p>
        </motion.div>

        {/* Timeline - Yatay çizgi kaldırıldı */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          {roadmapData.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Phase Card */}
              <div className={`
                bg-black/40 backdrop-blur-sm rounded-xl p-6
                border border-accent/20 hover:border-accent/50
                transition-all duration-500 h-full
                ${phase.status === 'completed' ? 'border-accent/50' : 
                  phase.status === 'current' ? 'border-secondary/50' : ''}
              `}>
                {/* Phase Header */}
                <div className="mb-4">
                  <span className={`
                    inline-block px-3 py-1 rounded-full text-sm font-medium mb-2
                    bg-gradient-to-r ${phase.color} opacity-80
                  `}>
                    {phase.date}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-gray-400 text-sm">{phase.description}</p>
                </div>

                {/* Progress Indicator */}
                <div className={`
                  w-full h-1 rounded-full mb-4
                  ${phase.status === 'completed' ? 'bg-accent' : 
                    phase.status === 'current' ? 'bg-gradient-to-r from-secondary to-accent' : 
                    'bg-gray-700'}
                `}></div>

                {/* Items List */}
                <ul className="space-y-2">
                  {phase.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <span className={`
                        mr-2 text-xs
                        ${phase.status === 'completed' ? 'text-accent' : 
                          phase.status === 'current' ? 'text-secondary' : 
                          'text-gray-600'}
                      `}>
                        {phase.status === 'completed' ? '✓' : '○'}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Roadmap;