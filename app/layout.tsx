import { Inter } from 'next/font/google';
import '../src/styles/tokens.css';
import '../src/index.scss';
import 'react-datetime/css/react-datetime.css';
import { Providers } from './providers';
import App from '../src/App';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = { title: 'Resume Generator', description: 'Create and share your resume' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
