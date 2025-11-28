import { useState } from 'react';
import { SportfyLogo } from './SportfyLogo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '../api/client';
import { setSession } from '../utils/auth';

export function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validasi sederhana
  if (!fullName || !email || !phone || !password) {
    toast.error("Mohon lengkapi data");
    return;
  }

  if (password !== confirmPassword) {
     toast.error("Password tidak sama");
     return;
  }

  // Kirim ke Backend
  try {
    const { data } = await apiClient('/auth/register', {
      method: 'POST',
      data: { fullName, email, phone, password }
    });

    setSession({ token: data.token, user: data.user });
    toast.success("Registrasi berhasil!");
    onRegister?.();
  } catch (error) {
    toast.error(error.message || "Gagal terhubung ke server");
  }
};

  const isFormValid = 
    fullName.trim() !== '' && 
    email.trim() !== '' && 
    phone.trim() !== '' && 
    password.trim() !== '' && 
    confirmPassword.trim() !== '' && 
    password === confirmPassword;

  return (
    <div className="min-h-screen bg-[#121212] flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center mb-12">
            <SportfyLogo className="w-16 h-16" />
            <h1 className="ml-4 text-white" style={{ fontSize: '2.5rem' }}>
              Sportfy
            </h1>
          </div>

          {/* Sign Up Title */}
          <div className="text-center mb-8">
            <h2 className="text-[#1DB954]" style={{ fontSize: '2rem' }}>
              Sign Up
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-400">
                Nama Lengkap
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Nama Lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-[#1a1a1a] border-[#282828] text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-400">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1a1a1a] border-[#282828] text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-400">
                No. Telepon
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="No. Telepon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-[#1a1a1a] border-[#282828] text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-400">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#1a1a1a] border-[#282828] text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-400">
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#1a1a1a] border-[#282828] text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white py-6 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isFormValid}
            >
              Sign Up
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#282828]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#121212] px-4 text-gray-400">
                  Or Sign up with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="w-12 h-12 rounded-full bg-[#1a1a1a] hover:bg-[#282828] border border-[#282828] flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-12 h-12 rounded-full bg-[#1a1a1a] hover:bg-[#282828] border border-[#282828] flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-12 h-12 rounded-full bg-[#1a1a1a] hover:bg-[#282828] border border-[#282828] flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
            </div>

            {/* Footer Link */}
            <div className="text-center mt-6">
              <span className="text-gray-400">Sudah punya akun? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#1DB954] hover:text-[#1ed760] transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#121212] z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzYyMDI2Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Basketball Court"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with sports info */}
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20 bg-gradient-to-t from-[#121212] to-transparent">
          <h3 className="text-white mb-4" style={{ fontSize: '1.5rem' }}>
            Bergabunglah dengan Sportfy
          </h3>
          <div className="flex flex-col gap-3 text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1DB954]"></div>
              <span>Booking lapangan kapan saja</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1DB954]"></div>
              <span>Cari lawan tanding dengan mudah</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1DB954]"></div>
              <span>15+ lapangan olahraga tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
