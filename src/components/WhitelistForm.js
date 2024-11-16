import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';
import toast from 'react-hot-toast';
import { z } from 'zod';

const whitelistSchema = z.object({
  wallet_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  email: z.string().email().optional(),
  discord: z.string().optional(),
});

const API_URL = 'http://localhost:3306/api';

export default function WhitelistForm() {
  const { account } = useWallet();
  const [email, setEmail] = useState('');
  const [discord, setDiscord] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = {
        wallet_address: account,
        email: email || undefined,
        discord: discord || undefined,
      };

      // Validate form data
      whitelistSchema.parse(formData);

      // Submit to API
      const response = await fetch(`${API_URL}/whitelist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join whitelist');
      }

      toast.success('Successfully added to whitelist!');
      setEmail('');
      setDiscord('');
    } catch (error) {
      console.error('Whitelist error:', error);
      toast.error(error.message || 'Failed to join whitelist');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="whitelist" className="py-20 bg-black/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-8">Join Whitelist</h2>
          <div className="bg-black/40 rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Wallet Address</label>
                <input
                  type="text"
                  value={account || ''}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300"
                  placeholder="Connect wallet to continue..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Discord Username (Optional)</label>
                <input
                  type="text"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-accent"
                  placeholder="username#0000"
                />
              </div>
              <button
                type="submit"
                disabled={!account || isSubmitting}
                className="w-full bg-gradient-to-r from-secondary to-accent py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:opacity-90"
              >
                {isSubmitting ? 'Submitting...' : 'Join Whitelist'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}