import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Whitelist = () => {
  const [formData, setFormData] = useState({
    email: '',
    wallet: '',
    discord: '',
    twitter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://joinvanth.com/api/whitelist.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const text = await response.text();
      console.log('Raw response:', text);

      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      toast.success('Successfully registered for whitelist!');

      setFormData({
        email: '',
        wallet: '',
        discord: '',
        twitter: ''
      });

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Whitelist Registration</h1>
            <p className="text-gray-400">
              Join our whitelist to get early access.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/70 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Wallet Address</label>
              <input
                type="text"
                name="wallet"
                value={formData.wallet}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/70 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                placeholder="0x..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Discord Username</label>
              <input
                type="text"
                name="discord"
                value={formData.discord}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/70 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                placeholder="username#0000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Twitter Username</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/70 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                placeholder="@username"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full bg-gradient-to-r from-secondary to-accent 
                py-4 px-6 rounded-lg font-medium 
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} 
                transition-opacity
              `}
            >
              {isSubmitting ? 'Processing...' : 'Join Whitelist'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
