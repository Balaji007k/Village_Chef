import React from 'react';
import { FiCheck } from 'react-icons/fi';

const About = () => {
  const team = [
    {
      name: 'Chef Rama Swamy',
      role: 'Master Chef & Co-Founder',
      imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&h=300&q=80',
      bio: 'Bringing 30+ years of cooking experience from the rustic brick stoves of rural South India.'
    },
    {
      name: 'Anjali Sharma',
      role: 'Head of Operations',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=80',
      bio: 'Ensuring fresh ingredients reach our master chefs directly from our local organic cooperative farms.'
    },
    {
      name: 'Vikram Singh',
      role: 'Founding Partner',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
      bio: 'Fusing traditional culinary arts with modern delivery systems to keep foods hot.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Story Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 pt-6">
          <div className="flex-1 space-y-6">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Our Heritage</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit]">
              Origin of the <span className="text-[#F59E0B]">Village Chef</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Village Chef started with a simple vision: to prevent the death of slow-cooked woodfire recipes. In an era of commercial fast-food chains, we realized people are losing touch with authentic flavors.
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              We partnered with village elders, local organic farmers, and master chefs who spent their lives cooking on handmade clay stoves. By using slow heat, custom brass pots, and hand-ground spices, we bring back pure flavors that nourish both body and soul.
            </p>
          </div>

          <div className="flex-1 max-w-lg aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-[#F59E0B]/5 bg-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
              alt="wood fire cooking"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-[#1C1C1E] border border-white/5 p-8 rounded-3xl space-y-4">
            <h3 className="text-2xl font-bold text-[#F59E0B] font-[Outfit]">Our Mission</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              To support sustainable local farming cooperatives and preserve traditional culinary methods while delivering healthy, incredibly flavorful farm-to-table food.
            </p>
            <ul className="space-y-2 text-zinc-500 text-xs font-semibold pt-2">
              <li className="flex items-center gap-2">
                <FiCheck className="text-[#F59E0B] w-4 h-4" />
                <span>100% Organic Local Sourcing</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-[#F59E0B] w-4 h-4" />
                <span>Zero Artificial Preservatives</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-[#1C1C1E] border border-white/5 p-8 rounded-3xl space-y-4">
            <h3 className="text-2xl font-bold text-[#F59E0B] font-[Outfit]">Our Vision</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              To build a global network of traditional kitchens that empower small-scale rural farmers and remind the world of the therapeutic power of slow-cooked meals.
            </p>
            <ul className="space-y-2 text-zinc-500 text-xs font-semibold pt-2">
              <li className="flex items-center gap-2">
                <FiCheck className="text-[#F59E0B] w-4 h-4" />
                <span>Empowering Farming Cooperatives</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-[#F59E0B] w-4 h-4" />
                <span>Global Village-Kitchen Networks</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest font-sans">Our Team</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-[Outfit]">Meet the Chefs & Founders</h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto">
              Our team consists of passionate culinary experts, organic farming advocates, and operations specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-[#1C1C1E] border border-white/5 rounded-3xl p-6 text-center space-y-4 hover:border-[#F59E0B]/20 transition-all duration-300 group"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-[#F59E0B]/20 group-hover:border-[#F59E0B] transition-colors duration-300 bg-zinc-800">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{member.name}</h4>
                  <span className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider block mt-1">
                    {member.role}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-[240px] mx-auto">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
