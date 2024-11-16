import React, { useState } from "react";

const Whitelist = () => {
  const [wallet, setWallet] = useState("");
  const [discord, setDiscord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", { wallet, discord });

    try {
        const response = await fetch('https://joinvanth.com/api/whitelist.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wallet, discord }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message); // Kullanıcıya hata mesajı göster
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Whitelist Registration</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our project's whitelist to gain early access and special benefits. 
              Please fill in the information below to complete the registration process.
            </p>
          </div>
          <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Wallet Address</label>
                  <input
                    type="text"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F172A] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0x..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Discord Username</label>
                  <input
                    type="text"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F172A] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="username#0000"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-4 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Join Whitelist
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
