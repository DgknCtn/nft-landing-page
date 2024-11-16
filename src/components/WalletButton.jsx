import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaWallet, FaSignOutAlt } from 'react-icons/fa';
import { useWallet } from '../hooks/useWallet';
import toast from 'react-hot-toast';

export default function WalletButton() {
  const { connect, disconnect, account } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    toast.success('Wallet disconnected');
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!account) {
    return (
      <button
        onClick={handleConnect}
        className="bg-gradient-to-r from-secondary to-accent px-6 py-2 rounded-full hover:opacity-90 transition-all duration-300 flex items-center gap-2 font-medium"
      >
        <FaWallet className="text-lg" />
        Connect Wallet
      </button>
    );
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="bg-gradient-to-r from-secondary to-accent px-6 py-2 rounded-full hover:opacity-90 transition-all duration-300 flex items-center gap-2 font-medium">
        <FaWallet className="text-lg" />
        {formatAddress(account)}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-black/90 backdrop-blur-sm shadow-lg ring-1 ring-white/10 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDisconnect}
                  className={`${
                    active ? 'bg-secondary/20' : ''
                  } group flex w-full items-center rounded-lg px-2 py-2 text-sm text-white gap-2`}
                >
                  <FaSignOutAlt />
                  Disconnect
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}