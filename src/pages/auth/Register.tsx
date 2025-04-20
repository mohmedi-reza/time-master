import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/common/icon/icon.component';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate password match
    if (password !== confirmPassword) {
      setError(t('passwordsDoNotMatch'));
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError(t('passwordTooShort'));
      return;
    }

    setLoading(true);

    try {
      await register({ username, email, password, firstName, lastName });
      setIsAuthenticated(true);
      navigate('/me');
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 409) {
          setError(t('emailAlreadyExists'));
        } else {
          setError(t('serverError'));
        }
      } else {
        setError(t('networkError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-base-300 to-base-200 px-4 animate-fadeIn">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl transition-all duration-300 hover:shadow-primary/10">
        <div className="card-body p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-primary/10 rounded-full">
              <Icon name="logo" className="text-primary text-5xl" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Time Master</h1>
              <span className="text-gray-500 font-light">{t('projectManagement')}</span>
            </div>
          </div>
          
          <h2 className="card-title justify-center text-2xl mb-8 text-center">{t('signUp')}</h2>
          
          {error && (
            <div className="alert alert-error shadow-lg mb-6 animate-shake">
              <Icon name="activity" className="text-lg" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6" id="register-form" name="register-form">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('firstName')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="user" className="text-lg" />
                </span>
                <input
                  type="text"
                  placeholder={t('enterFirstName')}
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                  name="firstName"
                  id="firstName"
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('lastName')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="user" className="text-lg" />
                </span>
                <input
                  type="text"
                  placeholder={t('enterLastName')}
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                  name="lastName"
                  id="lastName"
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('username')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="user" className="text-lg" />
                </span>
                <input
                  type="text"
                  placeholder={t('enterUsername')}
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  name="username"
                  id="username"
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('email')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="sms" className="text-lg" />
                </span>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  name="email"
                  id="email"
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('password')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="lock" className="text-lg" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  name="password"
                  id="password"
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-gray-500">{t('passwordRequirements')}</span>
              </label>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('confirmPassword')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="lock" className="text-lg" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  name="confirmPassword"
                  id="confirmPassword"
                />
              </div>
            </div>
            
            <div className="form-control mt-2">
              <label className="label cursor-pointer justify-start gap-2">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-primary checkbox-sm" 
                  required
                />
                <span className="label-text">
                  {t('agreeToTerms')} <a href="#" className="link link-primary">{t('termsOfService')}</a> {t('and')} <a href="#" className="link link-primary">{t('privacyPolicy')}</a>
                </span>
              </label>
            </div>
            
            <div className="form-control mt-8">
              <button 
                className={`btn btn-primary w-full ${loading ? 'loading' : ''} hover:shadow-lg hover:shadow-primary/20 transition-all`}
                disabled={loading}
              >
                {loading ? t('loading') : t('signUp')}
              </button>
            </div>
          </form>
          
          <div className="divider my-8">{t('or')}</div>
          
          <div className="grid grid-cols-1 gap-3">
            <button className="btn btn-outline gap-2">
              <Icon name="github" className="text-lg" />
              {t('continueWithGithub')}
            </button>
            <button className="btn btn-outline gap-2">
              <Icon name="google" className="text-lg" />
              {t('continueWithGoogle')}
            </button>
          </div>
          
          <div className="text-center mt-8">
            <p>{t('alreadyHaveAccount')} <a href="/auth/login" className="link link-primary font-medium">{t('signIn')}</a></p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Time Master. {t('allRightsReserved')}
      </div>
    </div>
  );
};

export default RegisterPage; 