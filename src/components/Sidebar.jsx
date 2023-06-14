import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick }) => (
  <div className=" mt-10">
    {links.map((item) => (
      <NavLink
        end
        key={item.name}
        to={item.to}
        className=" flex items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 w-1/2"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className=" w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className=" hidden flex-col md:flex bg-[#191624] py-10 px-4 w-[250px]">
        <img
          src={logo}
          alt="logo"
          className=" h-[52px] w-full object-contain"
        />
        <NavLinks />
      </div>
      <div className=" absolute right-3 top-6 block md:hidden cursor-pointer z-20">
        {mobileMenuOpen ? (
          <RiCloseLine
            className=" text-white w-6 h-6 mr-4"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          />
        ) : (
          <HiOutlineMenu
            className=" text-white w-6 h-6 mr-4"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
          />
        )}
      </div>
      <div
        className={` absolute z-10 h-screen w-full bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-md p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? ' -left-0' : ' -left-full'
        }`}
      >
        <img
          src={logo}
          alt="logo"
          className=" h-[52px] w-full object-contain"
        />
        <NavLinks />
      </div>
    </>
  );
};

export default Sidebar;
