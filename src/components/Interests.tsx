export function Interests() {
  const interests = [
  
    {
      category: 'Sports',
      items: ['Hockey', 'Basketball', 'Baseball'],
      icon: '🏒',
      color: 'from-green-500/20 to-blue-500/20'
    },
    {
      category: 'Lifestyle',
      items: ['Gym', 'Cooking', 'Trying international foods'],
      icon: '🍳',
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      category: 'Traveling',
      items: ['10 Countries Visited'],
      icon: '✈️',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
  category: 'Music',
  items: ['Rap', 'Jazz', 'Lo-fi'],
  icon: '🎶',
  color: 'from-blue-500/20 to-violet-500/20'
}

  ];
  

  return (
    <section id="interests" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 glow-text">
            Interests & Hobbies
          </h2>
          <p className="text-xl text-white/70">
            What I'm passionate about beyond coding
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {interests.map((interest, index) => (
            <div 
              key={interest.category}
              className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${interest.color} rounded-xl p-4 mb-6 text-center`}>
                <div className="text-4xl mb-2">{interest.icon}</div>
                <h3 className="text-xl font-semibold text-white">
                  {interest.category}
                </h3>
              </div>

              <div className="space-y-3">
                {interest.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <span className="text-white/80 text-center font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}