import React, { useState } from 'react';

const Stake = () => {
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  
  const stakingInfo = {
    totalNFTsStaked: '789 NFTs',
    totalRewardsDistributed: '450,000 VNTH',
    yourStakedNFTs: '2 NFTs',
    yourRewards: '1,250 VNTH'
  };

  const userNFTs = [
    { id: 1, name: 'Vanth #123', image: '/path/to/nft1.jpg', isStaked: false },
    { id: 2, name: 'Vanth #124', image: '/path/to/nft2.jpg', isStaked: false },
    { id: 3, name: 'Vanth #125', image: '/path/to/nft3.jpg', isStaked: true },
    { id: 4, name: 'Vanth #126', image: '/path/to/nft4.jpg', isStaked: true }
  ];

  const handleStake = (e) => {
    e.preventDefault();
    // Staking işlemleri burada yapılacak
  };

  const handleClaim = () => {
    // Ödül talep işlemleri burada yapılacak
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Staking İstatistikleri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-gray-400 text-sm">Total NFTs Staked</h3>
              <p className="text-xl font-bold mt-2">{stakingInfo.totalNFTsStaked}</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-gray-400 text-sm">Total VNTH Distributed</h3>
              <p className="text-xl font-bold mt-2 text-accent">{stakingInfo.totalRewardsDistributed}</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-gray-400 text-sm">Your Staked NFTs</h3>
              <p className="text-xl font-bold mt-2">{stakingInfo.yourStakedNFTs}</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-gray-400 text-sm">Your VNTH Rewards</h3>
              <p className="text-xl font-bold mt-2 text-secondary">{stakingInfo.yourRewards}</p>
            </div>
          </div>

          {/* NFT Staking Alanı */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">NFT Staking</h2>
              <button
                onClick={handleClaim}
                className="px-6 py-2 bg-gradient-to-r from-secondary to-accent rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Claim VNTH Rewards
              </button>
            </div>

            {/* NFT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userNFTs.map((nft) => (
                <div 
                  key={nft.id}
                  className={`
                    bg-black/70 rounded-xl overflow-hidden border-2 
                    ${nft.isStaked ? 'border-accent' : 'border-transparent'}
                    hover:border-accent/50 transition-all duration-300
                  `}
                >
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{nft.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${nft.isStaked ? 'text-accent' : 'text-gray-400'}`}>
                        {nft.isStaked ? 'Staked' : 'Not Staked'}
                      </span>
                      <button
                        onClick={() => {
                          // Stake/Unstake toggle işlemi
                        }}
                        className={`
                          px-4 py-1 rounded-lg text-sm font-medium
                          ${nft.isStaked 
                            ? 'bg-black/50 border border-accent/50 hover:bg-accent/10' 
                            : 'bg-gradient-to-r from-secondary to-accent hover:opacity-90'
                          }
                          transition-all duration-300
                        `}
                      >
                        {nft.isStaked ? 'Unstake' : 'Stake'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Staking Bilgileri */}
            <div className="mt-8 bg-black/70 rounded-lg p-6">
              <h3 className="font-medium mb-4 text-accent">Staking Information</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <i className="fas fa-info-circle text-accent"></i>
                  Earn 10 VNTH per NFT daily
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-info-circle text-accent"></i>
                  Minimum staking period: 7 days
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-info-circle text-accent"></i>
                  Rewards are distributed daily
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
