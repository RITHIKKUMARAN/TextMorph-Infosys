import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { LoginRegister } from './components/LoginRegister';
import { Dashboard } from './components/Dashboard';
import { ProfileModal } from './components/ProfileModal';
import { getProfile } from './api/api';
import toast from 'react-hot-toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [profileSettings, setProfileSettings] = useState({
    tone: 'Professional',
    language: 'English',
    style: 'Concise',
    depth: 'Medium',
  });

  useEffect(() => {
    // Check if user is already logged in
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
      loadProfile(savedUsername);
    }
  }, []);

  const loadProfile = async (user: string) => {
    try {
      const profile = await getProfile(user);
      setProfileSettings({
        tone: profile.preferred_tone,
        language: profile.preferred_language,
        style: profile.preferred_style,
        depth: profile.preferred_depth,
      });
    } catch (error) {
      // Profile might not exist yet, use defaults
      console.log('Profile not found, using defaults');
    }
  };

  const handleLogin = async (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
    await loadProfile(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
    toast.success('Logged out successfully');
  };

  const handleSaveProfile = (settings: typeof profileSettings) => {
    setProfileSettings(settings);
  };

  return (
    <>
      <AnimatedBackground />

      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        onProfileClick={() => setShowProfile(true)}
        onLogout={handleLogout}
      />

      {!isLoggedIn ? (
        <LoginRegister onLogin={handleLogin} />
      ) : (
        <Dashboard username={username} />
      )}

      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        currentSettings={profileSettings}
        onSave={handleSaveProfile}
      />
    </>
  );
}

export default App;
