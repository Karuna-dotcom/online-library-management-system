
import { useEffect } from 'react';
import './App.css';

import LoginPage from './pages/login.jsx';
import SignupPage from './pages/signup.jsx';
import AdminPage from './pages/admin.jsx';
import BooksPage from './pages/books.jsx';
import DashboardPage from './pages/user.jsx';
import FeedbackPage from './pages/feedback.jsx';
import HistoryPage from './pages/history.jsx';

const routes = {
  login: { title: 'Login - LibraX', component: LoginPage },
  admin: { title: 'Admin Dashboard - LibraX', component: AdminPage },
  books: { title: 'Library Books - LibraX', component: BooksPage },
  feedback: { title: 'Feedback - LibraX', component: FeedbackPage },
  history: { title: 'Borrow History - LibraX', component: HistoryPage },
  signup: { title: 'Sign Up - LibraX', component: SignupPage },
  user: { title: 'User Dashboard - LibraX', component: DashboardPage },
};

export default function App() {
  const currentPage =
    window.location.pathname.split('/').filter(Boolean).pop() || 'login';

  const route = routes[currentPage];
  const Page = route?.component || LoginPage;

  useEffect(() => {
    document.title = route?.title || 'Login - LibraX';
  }, [route]);

  return <Page />;
}
