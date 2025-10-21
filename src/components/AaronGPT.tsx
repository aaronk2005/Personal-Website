import { useState, useEffect } from 'react';

// Custom CSS for scrollbar styling and animations
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(96, 165, 250, 0.5);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(96, 165, 250, 0.7);
  }

  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

export function AaronGPT() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Hi! I'm AaronGPT. Ask me anything about Aaron's projects, skills, or background." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Comprehensive system prompt for OpenAI
  const systemPrompt = `You are AaronGPT, Aaron Kleiman's personal AI assistant. You're friendly, enthusiastic, knowledgeable, and conversational. You know EVERYTHING about Aaron and can answer any question about him with personality and detail. Use emojis occasionally to be engaging.

AARON'S COMPLETE PROFILE:

🎓 EDUCATION:
* Third-year Computer Engineering student at Queen's University (Kingston, ON)
* Expected graduation: April 2028
* Registered in Queen's University co-op program
* Looking for 12-16 month internship starting May 2026
* Relevant courses: Digital Systems, Computer Architecture, Software Engineering, Algorithms & Data Structures, Signals and Systems
* INSPIRATION: Always loved coding and playing with Arduinos - loves the mix of hardware and software!
* ORIGIN STORY: Started coding in grade 11 when he took a coding class that sparked his passion
* LONG-TERM GOAL: To build products that improve people's lives, whether in hardware or software

💼 WORK EXPERIENCE:
* **TALLYSIGHT - Software Engineering Intern (Sept 2024 – Dec 2024, Toronto, ON):**
  * Worked on an Agile 5-person team, contributing to sprints, code reviews, and deployments
• Built a Python ETL pipeline that automated scraping of 100+ analyst articles, replacing an 8-hour task
• Cut data entry processes from hours to minutes with n8n workflows powered by LLMs and Slack automation
• Developed AI agents in Retool to update player icons and team logos, replacing search and MongoDB uploads

* **SWARMED - Software Developer Volunteer (Aug 2024 – Present, Remote):**
  * Redesigned UI/UX for a beekeeper–public platform, contributing to the rescue of 36M+ honey bees
• Built a dashboard survey element with JavaScript and Tally forms, streamlining user feedback collection
• Developed Bubble.io workflows with API integrations, streamlining user interaction and backend operations

🚀 PROJECTS:
1. Fantasy Basketball Platform — Full-stack app w/ React, Node.js, MongoDB, Express, Sports APIs. Real-time stats, player analysis, league management.
2. Queen's Space Engineering Dashboard — Software UI Team Lead. Built rover dashboard with React + ROS 2. Real-time telemetry, TF frames visualization, configurable widgets.
3. Spin2Dine (https://spin2dine.org) — Restaurant discovery app. React, TypeScript, Node.js, Google Places API + OpenAI API. Interactive spinning interface with AI suggestions.
4. Study Safe Device — Arduino + accelerometer. Anti-theft w/ Node.js backend, WebSockets, Twilio SMS alerts, live dashboard.
5. 911 Emergency Data Analysis — Python + Pandas/NumPy. Found patterns in 911 call datasets using stats + clustering.
6. Minesweeper Game — Java Swing/AWT, multiple difficulty levels, timer, flagging system, clean GUI.

🛠️ TECHNICAL SKILLS:
* **Languages:** Python, C/C++, Java, JavaScript/TypeScript, VHDL, Assembly, Bash
* **Frameworks & Tools:** React.js, Node.js, Express, REST APIs, HTML/CSS, Pandas, NumPy, WebSockets, Docker, Git/GitLab
* **Databases:** MySQL, MongoDB
* **AI/ML Tools:** OpenAI API, Claude Code, Cursor
* **Hardware:** Arduino, ROS 2, FPGA, JTAG, LTspice, Altium, Oscilloscope

FAVORITES & PERSONALITY:
* Favorite programming language: Java ☕ (first language, logical, loves OOP)
* Favorite sports team: Toronto Raptors 🏀
* Debugging approach: Break it down step by step, isolate issues, trace execution
* Learning style: "Build something, break it, fix it, understand it!"
* Tech opinion: Blockchain is overhyped, embedded systems are underappreciated

🎯 INTERESTS:
* Tech: AI/ML, rover systems, ETL pipelines, workflow automation
* Strategy: Chess, poker, fantasy sports (especially basketball)
* Sports: Basketball, hockey, golf, skiing
* Lifestyle: Traveling, cooking/baking, fitness

🎉 Fun Facts & Quirks:
* ☕ Go-to coffee order: Latte
* Late-night coding fuel: Chips & salsa
* Fun flex: Won a hockey championship as a kid with the George Bell Titans 🏆
* Cool fact: Has an identical twin brother 👯
* Guilty pleasure: Adam Sandler movies 🎬

📚 Learning & Curiosity:
* Favorite non-tech subject: History (ancient civilizations, world cultures)
* Inspiration: Leonardo da Vinci — master innovator of the Renaissance
* Loves random deep dives into niche topics

🕹️ Hobbies & Leisure:
* Favorite food: Pizza 🍕
* Main hobbies: Traveling, gaming, cooking/baking, chess, watching sports, gym
* Favorite sport to play: Hockey 🏒
* Favorite video games: NBA 2K, MLB The Show, NHL
* Board/card game: Poker ♠️
* Favorite shows: Breaking Bad 📺
* Favorite movie: Interstellar 🌌
* Music while coding: Lo-fi beats or Drake 🎧
* Stress relief: Gym, games, or music

🍳 Food & Lifestyle:
* Signature dish: BBQ chicken 🍗
* Sweet vs savory: Sweet 🍩
* Favorite restaurants: Kingston — KPOP Sushi Burrito; Toronto — Sugo

🎧 Music & Media:
* Song you'll never skip: "Child's Play" — Drake
* Artists on repeat: Drake, PARTYNEXTDOOR, Morgan Wallen, Post Malone

🚀 Personality & Preferences:
* Night owl 🌙
* Works well in teams but comfortable solo
* Motivation: Making a positive impact & being able to spoil family ❤️
* How tall is Aaron? 6 foot 4

✨ Dreams & Aspirations:
* Alternate career if not engineering: Finance 💹
* Dream city to live in for a year: San Francisco 🌉
* Dream collabs: Sam Altman, Lisa Su, Jensen Huang
* Dream house: TBD but modern, tech-integrated

🏀 Sports & Fitness:
* Fantasy basketball pick: Nikola Jokić
* Favorite athlete/GOAT: LeBron James 👑
* Fitness: Loves going to the gym 🏋️
* Best sports memory: George Bell Titans championship

🎮 Random "Get to Know Me":
* Instant skill mastery: Be an amazing chef 👨‍🍳
* Childhood favorite: Wii — Mario Kart & Wii Sports 🎮
* Favorite season: Spring 🌸 (birthday season)
* Favorite color: Yellow 💛 (represents happiness)
* Pets: Corky 🐶 (Kerry Blue Terrier)
* Cats vs Dogs: Dogs 🐾
* Bucket list (next 5 years): Backpack through Asia ✈️🎒

📞 CONTACT:
* Email: aaron.kleiman@queensu.ca
* LinkedIn: https://www.linkedin.com/in/aaron-kleiman-477b19286/
* GitHub: https://github.com/aaronk2005

Answer as AaronGPT with enthusiasm, personality, and detailed knowledge. Be conversational, use emojis occasionally, and always provide rich, engaging responses about Aaron!`;

  // Inject custom scrollbar styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const resetConversation = () => {
    setMessages([
      { type: 'bot', content: "Hi! I'm AaronGPT. Ask me anything about Aaron's projects, skills, or background." }
    ]);
    setInputValue('');
    setIsTyping(false);
  };

  const sendEmailToAaron = async () => {
    if (messages.length <= 1) {
      alert('Please have a conversation first before sending an email!');
      return;
    }

    setIsEmailSending(true);

    try {
      // Call backend API to send conversation
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/send-conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send conversation');
      }

      alert('Email sent successfully to Aaron! He\'ll get back to you soon. 📧');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again or contact Aaron directly at aaron.kleiman@queensu.ca');
    } finally {
      setIsEmailSending(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Call backend API for OpenAI chat
      const API_URL = (import.meta.env as any).VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          systemPrompt: systemPrompt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      const botMessage = { type: 'bot', content: data.message };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling OpenAI:', error);

      // Fallback to comprehensive mock responses
      let fallbackResponse = "Great question! ";
      const lowerInput = currentInput.toLowerCase();

      if (lowerInput.includes('project') || lowerInput.includes('work')) {
        fallbackResponse += "Aaron has built incredible projects! 🚀 His **Fantasy Basketball Platform** combines React, Node.js, MongoDB with real-time stats and player analysis. He's also the **Software UI Team Lead** for Queen's Space Engineering, building a rover dashboard with React + ROS 2. Check out **Spin2Dine** at spin2dine.org - a restaurant discovery app with AI suggestions! Plus his **Study Safe Device** with Arduino and anti-theft features. He loves building products that help people! 💻";
      } else if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('language')) {
        fallbackResponse += "Aaron's a tech powerhouse! 💻 His favorite language is **Java** ☕ (his first love - he adores OOP programming). He's skilled in Python, C/C++, JavaScript/TypeScript, React.js, Node.js, and more. He works with databases like MySQL & MongoDB, uses AI tools like OpenAI API, and even does hardware with Arduino, ROS 2, and FPGA. His debugging approach? Break it down step by step and trace execution - very methodical! 🔧";
      } else if (lowerInput.includes('school') || lowerInput.includes('education') || lowerInput.includes('university')) {
        fallbackResponse += "Aaron is a **third-year Computer Engineering student at Queen's University** in Kingston, ON! 🎓 He's expecting to graduate in April 2028 and is registered in Queen's co-op program. He's actively looking for a 12-16 month internship starting May 2026! He takes courses like Digital Systems, Computer Architecture, Software Engineering, and Algorithms. Fun fact: he started coding in grade 11 when a coding class sparked his passion! His goal is to build products that improve people's lives through the perfect mix of hardware and software! ⚙️";
      } else if (lowerInput.includes('basketball') || lowerInput.includes('sport') || lowerInput.includes('raptors')) {
        fallbackResponse += "Aaron is a HUGE sports fan! 🏀 He absolutely loves the **Toronto Raptors** and considers LeBron James the GOAT 👑. He's surprisingly good at fantasy basketball - his go-to pick is Nikola Jokić! He also plays hockey (his favorite sport to play 🏒), golf, and skiing. Fun memory: he won a hockey championship as a kid with the George Bell Titans! 🏆";
      } else if (lowerInput.includes('internship') || lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('tallysight') || lowerInput.includes('coop') || lowerInput.includes('co-op')) {
        fallbackResponse += "Aaron's building an impressive career! 💼 He recently worked as a **Software Engineering Intern at TallySight** (Sept-Dec 2024) where he built Python ETL pipelines processing 10,000+ records daily with 99.9% accuracy! He also developed AI-powered automation tools that saved 15+ hours of manual work weekly. Currently, he volunteers as a Software Developer at **SWARMED**, working on platform scalability. He's registered in Queen's co-op program and actively seeking a **12-16 month internship starting May 2026** in software engineering, AI/ML, or robotics! 🚀";
      } else {
        fallbackResponse += "I know SO much about Aaron! 😊 He's a Computer Engineering student at Queen's University, tech enthusiast, Raptors fan 🏀, pizza lover 🍕, and has an identical twin! He's built amazing projects, loves Java programming, plays hockey, and dreams of making a positive impact. Ask me about his projects, skills, hobbies, sports, food, music, dreams, or anything else - I'm here to share all the Aaron knowledge! 🚀";
      }

      const errorMessage = { type: 'bot', content: fallbackResponse };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '16px' : '24px',
            right: isMobile ? '16px' : '24px',
            left: isMobile ? '12px' : 'auto',
            width: isMobile ? 'calc(100vw - 28px)' : '400px',
            maxWidth: isMobile ? '100%' : '400px',
            height: isMobile ? 'calc(70vh)' : '500px',
            maxHeight: isMobile ? '70vh' : '500px',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(96, 165, 250, 0.7)',
            borderRadius: isMobile ? '16px' : '20px',
            boxShadow: '0 0 30px rgba(96, 165, 250, 0.5)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid rgba(96, 165, 250, 0.3)',
              background: 'rgba(96, 165, 250, 0.1)',
              borderRadius: '18px 18px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#4ade80',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}
              ></div>
              <span style={{ color: 'rgb(96, 165, 250)', fontWeight: 'bold', fontSize: '18px' }}>
                AaronGPT
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={sendEmailToAaron}
                disabled={isEmailSending || messages.length <= 1}
                style={{
                  background: messages.length > 1 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(75, 85, 99, 0.2)',
                  border: messages.length > 1 ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: messages.length > 1 ? '#22c55e' : 'rgba(255, 255, 255, 0.4)',
                  fontSize: '12px',
                  cursor: messages.length > 1 && !isEmailSending ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                title="Email this conversation to Aaron"
              >
                {isEmailSending ? '📧...' : '📧 Email Aaron'}
              </button>
              <button
                onClick={() => {
                  resetConversation();
                  setIsOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
            className="custom-scrollbar"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    background:
                      message.type === 'user'
                        ? 'rgba(96, 165, 250, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                    border:
                      message.type === 'user'
                        ? '1px solid rgba(96, 165, 250, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    color: message.type === 'user' ? '#ffffff' : 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '14px'
                  }}
                >
                  AaronGPT is typing...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid rgba(0, 255, 255, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '0 0 18px 18px'
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me about Aaron..."
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  background: 'rgba(96, 165, 250, 0.2)',
                  border: '1px solid rgba(96, 165, 250, 0.4)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: 'rgb(96, 165, 250)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(96, 165, 250, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(96, 165, 250, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: isMobile ? '16px' : '24px',
            right: isMobile ? '16px' : '24px',
            padding: isMobile ? '8px 12px' : '12px 20px',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(96, 165, 250, 0.6)',
            borderRadius: '25px',
            color: 'rgb(96, 165, 250)',
            fontSize: isMobile ? '12px' : '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 999999,
            boxShadow: '0 0 25px rgba(96, 165, 250, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 35px rgba(96, 165, 250, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(96, 165, 250, 0.4)';
          }}
        >
          AaronGPT
        </button>
      )}
    </div>
  );
}