import React from 'react';

const Collection = () => {
  const nftExamples = [
    '/path/to/nft1.jpg',
    '/path/to/nft2.jpg',
    '/path/to/nft3.jpg',
    '/path/to/nft4.jpg',
    '/path/to/nft5.jpg',
    '/path/to/nft6.jpg'
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nftExamples.map((nft, index) => (
            <div 
              key={index}
              className="bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <img 
                src={nft} 
                alt={`NFT ${index + 1}`} 
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;