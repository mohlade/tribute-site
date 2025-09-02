import { useState, useEffect, useRef } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

// --- Import all assets here ---
import tributeMusic from './assets/tribute.mp3';
import pic9 from './assets/picture1.JPG';
import pic2 from './assets/picture2.jpg';
import pic5 from './assets/picture3.JPG';
import pic4 from './assets/picture4.JPG';
import pic3 from './assets/picture14.JPG';
import pic6 from './assets/picture6.JPG';
import pic7 from './assets/picture7.JPG';
import pic8 from './assets/picture8.JPG';
import pic1 from './assets/picture15.JPG';
import pic10 from './assets/picture10.JPG';
import pic11 from './assets/picture11.JPG';
import pic12 from './assets/picture12.JPG';
import pic20 from './assets/picture20.JPG';
import pic30 from './assets/picture30.JPG';
import pic40 from './assets/picture40.JPG';
import pic50 from './assets/picture50.JPG';

// --- Reusable Component Abstractions ---

const HeroSection = ({ currentSlide, slideshowImages, setCurrentSlide }) => (
  <section className="min-h-[100vh] flex items-center justify-center py-16 hero-bg w-full">
    <div className="w-full px-4 md:px-8">
      <div className="relative backdrop-blur-custom bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full">
        <div className="relative p-6 md:p-12 responsive-p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
                <div className="relative w-full h-[60vh]">
                  {slideshowImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img 
                          src={image.src} 
                          alt={image.title} 
                          className="w-full h-full object-contain" 
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {slideshowImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-white shadow-sm' : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-slate-300 text-sm italic font-crimson">
                  {slideshowImages[currentSlide].description}
                </p>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl responsive-text-6xl font-light text-white mb-4 tracking-wide font-playfair">
                DEACONESS ALEXANDREA IJEAMAKA SOKUNBI
              </h1>
              <div className="w-32 h-px bg-gradient-to-r from-teal-300 via-blue-200 to-teal-300 mx-auto lg:mx-0 mb-6"></div>
              <p className="text-lg text-slate-200 mb-3 font-light font-inter">
              Beloved Wife, Mother, Sister , Aunt and Friend
              </p>
              <p className="text-base text-slate-400 mb-8 font-light tracking-wide">
              15th Sept 1970 — 25th Aug 2025
              </p>
              <div className="relative mb-8">
                <blockquote className="text-lg font-light text-slate-100 leading-relaxed italic font-crimson">
                  "Gone too soon, but never forgotten. Your love lives on in all the hearts you touched."
                </blockquote>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => document.querySelector('.about-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-slate-600 text-white font-light tracking-wide transition-all duration-300 hover:from-blue-500 hover:to-slate-500 hover:shadow-lg font-inter"
                >
                  Read More
                </button>
                <button
                  onClick={() => document.querySelector('.tribute-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center px-8 py-3 rounded-full border-2 border-teal-400/50 text-teal-200 font-light tracking-wide transition-all duration-300 hover:bg-teal-400/10 hover:border-teal-400 font-inter"
                >
                  Share a Tribute
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="py-16 about-section w-full px-4 md:px-8">
    <div className="relative backdrop-blur-custom bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full">
      <div className="relative p-6 md:p-12 responsive-p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-6 font-playfair">
            Remembering Her Life
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent mx-auto"></div>
        </div>
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6">
            <p className="text-base font-light text-slate-200 leading-relaxed first-letter:text-4xl first-letter:font-medium first-letter:text-teal-200 first-letter:float-left first-letter:mr-3 first-letter:mt-1 font-crimson">
              Maama, as she has always been called by the children closest to her, has a reputation for being a solid woman - a woman of substance. Anyone in her orbit will describe her as spirited, generous, and cultured in her relations with people both senior and junior to her. She was at her best when spending time with her family. She demonstrated her love in acts of service, and she absolutely loves children. She always had a certain connection with each child. She was passionate about God, her family, giving, and excelled in whatever role she found herself in. As a matter of fact, diligence was a scale on which she believed a person's character must be weighed on in addition to other things. People who knew her (specifically in her youth) recall her as a 'spitfire', with a tongue just as sharp as the mind working behind it.
              </p>
              <p className="text-base font-light text-slate-300 leading-relaxed font-crimson">
              She was blessed with confidence, loyalty, and a strong sense of justice - all traits that helped her along her career path of law. She conquered every obstacle encountered with the strength of a medieval warrior and unwavering faith in the Lord. She was gifted with words, a skill that everyone in her life recognised and admired. Her sisters recall how much trouble she would get into as a teenager because of her love for reading, which often resulted in overcooked food and a very unhappy mother. Her husband reflects on her ‘ability to coin things and words’ in ways that left a lasting impression. She earned herself the reputation of being 'hands-on' when it came to planning events and involvement in her children's activities.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-base font-light text-slate-300 leading-relaxed font-crimson">
              As a mother, her influence spread far beyond that of the only child she birthed, and she assumed maternal guidance on nearly every child in the vicinity. Strict and unbending as she could be, she made sure to make room for expression, and she made for her children a home in her arms.
              </p>
              <p className="text-base font-light text-slate-300 leading-relaxed font-crimson">
              As a wife, she was loving, honest, and incredibly supportive. As a daughter, she was dedicated, considerate, and responsible. As a friend, she was helpful, straightforward, and ever-present. In all of her relationships, her impact will endure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PhotoGallery = () => (
  <section className="py-16 w-full px-4 md:px-8">
    <div className="relative backdrop-blur-custom bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full">
      <div className="relative p-6 md:p-12 responsive-p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-6 font-playfair">
            Photo Memories
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent mx-auto mb-6"></div>
          <p className="text-slate-300 text-base font-light font-crimson">
            A collection of cherished moments and beautiful memories
          </p>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic1} alt="Tribute Photo 1" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic2} alt="Tribute Photo 2" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic3} alt="Tribute Photo 3" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic4} alt="Tribute Photo 4" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic5} alt="Tribute Photo 5" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic6} alt="Tribute Photo 6" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic7} alt="Tribute Photo 7" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic8} alt="Tribute Photo 8" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic9} alt="Tribute Photo 9" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic10} alt="Tribute Photo 10" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic11} alt="Tribute Photo 11" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic12} alt="Tribute Photo 12" className="w-full h-full object-cover" />
            </div>
            {/* New photos added here */}
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic20} alt="Tribute Photo 20" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic30} alt="Tribute Photo 30" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic40} alt="Tribute Photo 40" className="w-full h-full object-cover" />
            </div>
            <div className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800/20 border border-slate-600/30">
              <img src={pic50} alt="Tribute Photo 50" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
const TributeList = ({ allTributes }) => (
  <section className="py-16 tributes-display w-full px-4 md:px-8">
    <div className="relative backdrop-blur-custom bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full">
      <div className="relative p-6 md:p-12 responsive-p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-6 font-playfair">
            Tributes & Memories
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent mx-auto mb-6"></div>
          <p className="text-slate-300 text-base font-light font-crimson">
            {allTributes.length} {allTributes.length === 1 ? 'tribute has' : 'tributes have'} been shared in her memory
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[80vh] overflow-y-scroll pr-4 custom-scrollbar">
          {allTributes.map((tribute, index) => (
            <div
              key={tribute.id}
              className="tribute-card rounded-xl overflow-hidden shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col">
                    <div className="text-lg font-medium text-white font-inter">
                      {tribute.name}
                    </div>
                    <div className="text-xs text-slate-500 font-light font-inter mt-1">
                      {tribute.relationship}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs text-slate-500 font-light font-inter mb-2">
                      {tribute.dateSubmitted}
                    </div>
                  </div>
                </div>
                <div className="relative flex-grow">
                  <p className="text-slate-200 leading-relaxed font-light text-sm font-crimson">
                    {tribute.memory}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const TributeForm = ({ formData, setFormData, submitTribute, isSubmitting, allTributes }) => (
  <section className="py-16 tribute-form w-full px-4 md:px-8">
    <div className="relative backdrop-blur-custom bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full">
      <div className="relative p-6 md:p-12 responsive-p-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-6 font-playfair">
            Share Your Tribute
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent mx-auto mb-6"></div>
          <p className="text-slate-300 text-base font-light mx-auto leading-relaxed font-crimson">
            Your memories, stories, and words of comfort help us celebrate her life and keep her spirit alive
          </p>
        </div>
        <div className="w-full">
          <div className="relative backdrop-blur-sm bg-slate-800/30 border border-slate-600/30 rounded-xl shadow-lg p-8 responsive-p-12">
            <div className="space-y-6">
              <div>
                <label className="block text-slate-200 font-light mb-3 text-base font-inter">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 bg-slate-900/50 border border-slate-600/40 rounded-lg text-slate-200 placeholder-slate-500 text-base font-light focus:bg-slate-800/60 focus:border-teal-400/50 focus:outline-none transition-all duration-300"
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-200 font-light mb-3 text-base font-inter">
                  Your Relationship to Her
                </label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full p-4 bg-slate-900/50 border border-slate-600/40 rounded-lg text-slate-200 placeholder-slate-500 text-base font-light focus:bg-slate-800/60 focus:border-teal-400/50 focus:outline-none transition-all duration-300"
                  placeholder="e.g., Niece, Friend, Colleague (optional)"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-200 font-light mb-3 text-base font-inter">
                  Your Tribute Message *
                </label>
                <textarea
                  value={formData.memory}
                  onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                  rows={6}
                  className="w-full p-4 bg-slate-900/50 border border-slate-600/40 rounded-lg text-slate-200 placeholder-slate-500 text-base font-light focus:bg-slate-800/60 focus:border-teal-400/50 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Share your tribute message here..."
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  onClick={submitTribute}
                  disabled={isSubmitting || !formData.name.trim() || !formData.memory.trim()}
                  className={`px-12 py-3 rounded-full font-light tracking-wide transition-all duration-300 font-inter ${
                    isSubmitting || !formData.name.trim() || !formData.memory.trim()
                      ? 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-500 hover:to-blue-500 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? 'Sharing...' : 'Share Tribute'}
                </button>
              </div>
              {allTributes.length > 0 && (
                <div className="text-center pt-6 border-t border-slate-600/30">
                  <button
                    onClick={() => document.querySelector('.tributes-display')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-teal-300 hover:text-teal-200 text-sm font-light transition-colors duration-300 font-inter"
                  >
                    View All {allTributes.length} Tributes ↑
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BurialCeremony = () => (
  <section className="py-16 w-full px-4 md:px-8">
    <div className="relative backdrop-blur-custom bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full">
      <div className="relative p-6 md:p-12 responsive-p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-6 font-playfair">
            Burial Ceremony Dates
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent mx-auto"></div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Service of Songs */}
            <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-600/30 transition-all hover:bg-slate-700/30">
              <p className="text-2xl font-light text-teal-300 mb-2 font-inter">Tuesday 9th September 2025</p>
              <h3 className="text-xl font-medium text-white mb-2 font-crimson">Service of Songs</h3>
              <p className="text-base text-slate-300 mb-1 font-inter">Lagos</p>
              <p className="text-base text-slate-300 font-inter">5pm</p>
            </div>
            {/* Funeral Service */}
            <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-600/30 transition-all hover:bg-slate-700/30">
              <p className="text-2xl font-light text-teal-300 mb-2 font-inter">Friday 19th September 2025</p>
              <h3 className="text-xl font-medium text-white mb-2 font-crimson">Funeral Service</h3>
              <p className="text-base text-slate-300 mb-1 font-inter">Lagos</p>
              <p className="text-base text-slate-300 font-inter">9am</p>
            </div>
            {/* Interment */}
            <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-600/30 transition-all hover:bg-slate-700/30">
              <p className="text-2xl font-light text-teal-300 mb-2 font-inter">Friday 19th September 2025</p>
              <h3 className="text-xl font-medium text-white mb-2 font-crimson">Interment</h3>
              <p className="text-base text-slate-300 mb-1 font-inter">Lagos</p>
              <p className="text-base text-slate-300 font-inter">11:30am</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


// --- Main App Component ---

function App() {
  const [allTributes, setAllTributes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    memory: ''
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioRef = useRef(null);

  // Updated slideshow with imported image paths
  const slideshowImages = [
    { src: pic1, title: "In Loving Memory", description: "Forever in our hearts" },
    { src: pic2, title: "Cherished Moments", description: "Beautiful memories we hold dear" },
    { src: pic3, title: "Life's Journey", description: "A life that touched so many" },
    { src: pic4, title: "Joyful Spirit", description: "A smile that lit up the room" },
  ];

  // Listener for Firestore data
  useEffect(() => {
    const q = query(collection(db, 'tributes'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tributesArray = [];
      querySnapshot.forEach((doc) => {
        tributesArray.push({ ...doc.data(), id: doc.id });
      });
      setAllTributes(tributesArray);
    });
    return () => unsubscribe();
  }, []);

  // Slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  // Audio player and control
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(error => {
          console.error("Autoplay failed:", error);
        });
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const submitTribute = async () => {
    if (!formData.name.trim() || !formData.memory.trim()) {
      alert('Please fill in your name and tribute message before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'tributes'), {
        name: formData.name.trim(),
        relationship: formData.relationship.trim() || 'Family & Friend',
        memory: formData.memory.trim(),
        dateSubmitted: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        timestamp: new Date()
      });
      setFormData({ name: '', relationship: '', memory: '' });
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to share your tribute. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTribute = async (id) => {
    if (window.confirm("Are you sure you want to delete this tribute? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'tributes', id));
        console.log("Tribute deleted successfully!");
      } catch (e) {
        console.error("Error deleting document: ", e);
        alert("Failed to delete the tribute. Please try again.");
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=Crimson+Text:wght@400;600&family=Inter:wght@300;400;500&display=swap');
        
        @keyframes subtleGlow {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-subtle-glow { animation: subtleGlow 10s infinite ease-in-out; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-crimson { font-family: 'Crimson Text', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
        .backdrop-blur-custom { backdrop-filter: blur(20px); }
        
        .hero-bg {
          background-image:
            linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.98) 100%),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><rect width="1000" height="1000" fill="%23e2e8f0"/><text x="500" y="500" font-size="60" text-anchor="middle" fill="%23cbd5e1" opacity="0.3">Your Photo Here</text></svg>');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        
        .tribute-card {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.2);
          transition: all 0.3s ease;
          position: relative;
        }
        .tribute-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 3px;
            background: linear-gradient(180deg, rgba(59, 130, 246, 0.6) 0%, rgba(20, 184, 166, 0.6) 100%);
            border-radius: 4px 0 0 4px;
        }
        .tribute-card:hover {
          background: rgba(30, 41, 59, 0.6);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(100, 116, 139, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(100, 116, 139, 0.8);
        }

        @media (max-width: 768px) {
          .responsive-text-6xl { font-size: 2.5rem !important; }
          .responsive-text-7xl { font-size: 3rem !important; }
          .responsive-p-16 { padding: 1.5rem !important; }
          .responsive-p-12 { padding: 1rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-subtle-glow,
          .animate-fade-in-up {
            animation: none !important;
          }
        }
        
        html, body, #root { width: 100%; height: 100%; margin: 0; padding: 0; }
      `}</style>

      {/* Audio player */}
      <audio ref={audioRef} autoPlay loop>
        <source src={tributeMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="min-h-screen relative overflow-hidden w-full bg-slate-900">
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 animate-subtle-glow"></div>
          <div className="absolute w-96 h-96 rounded-full bg-teal-500/10 animate-subtle-glow" style={{ animationDelay: '-5s' }}></div>
        </div>

        <div className="relative z-10 w-full flex flex-col">
          <HeroSection
            currentSlide={currentSlide}
            slideshowImages={slideshowImages}
            setCurrentSlide={setCurrentSlide}
          />
          <AboutSection />
          <PhotoGallery />
          {allTributes.length > 0 && <TributeList allTributes={allTributes} deleteTribute={deleteTribute} />}
          <TributeForm
            formData={formData}
            setFormData={setFormData}
            submitTribute={submitTribute}
            isSubmitting={isSubmitting}
            allTributes={allTributes}
          />
          <BurialCeremony />
          <section className="py-16 w-full px-4 md:px-8">
            <div className="relative backdrop-blur-custom bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden w-full">
              <div className="relative p-6 md:p-12 responsive-p-12 text-center">
                <div className="w-full">
                  <div className="relative mb-10">
                    <blockquote className="text-xl font-light text-slate-100 leading-relaxed italic font-crimson">
                      "Those we love never truly leave us. Though we cannot see you, we feel your presence in every gentle breeze, every ray of sunlight, and every moment of love we share."
                    </blockquote>
                  </div>
                  <h3 className="text-3xl font-light text-blue-100 mb-8 font-playfair">
                    Forever in Our Hearts
                  </h3>
                  <div className="flex justify-center items-center space-x-6 mb-8">
                    <div className="w-6 h-px bg-gradient-to-r from-transparent to-teal-300"></div>
                    <div className="text-3xl text-teal-200/60">🕊️</div>
                    <div className="w-6 h-px bg-gradient-to-l from-transparent to-teal-300"></div>
                  </div>
                  <p className="text-slate-300 text-base font-light leading-relaxed mb-8 font-crimson">
                    Until we meet again, may you rest in peace, knowing how deeply you were loved and how greatly you are missed.
                  </p>
                  <div className="relative">
                    <div className="p-6 rounded-xl bg-gradient-to-r from-teal-900/20 to-blue-800/20 border border-teal-400/20">
                      <p className="text-lg font-light text-teal-100 italic font-crimson">
                        "May flights of angels sing thee to thy rest"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="py-12 text-center w-full px-4 md:px-8">
            <div className="text-slate-500 text-sm font-light tracking-wide font-inter">
              In Loving Memory • Tribute Site
            </div>
            <div className="flex justify-center items-center space-x-3 mt-3">
              <div className="w-6 h-px bg-gradient-to-r from-transparent to-slate-500"></div>
              <div className="text-lg text-slate-500">✨</div>
              <div className="w-6 h-px bg-gradient-to-l from-transparent to-slate-500"></div>
            </div>
            {allTributes.length > 0 && (
              <div className="mt-4 text-xs text-slate-600 font-light font-inter">
                {allTributes.length} tributes shared with love
              </div>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;