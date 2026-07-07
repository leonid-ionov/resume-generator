import '../src/index.scss';
import 'react-datetime/css/react-datetime.css';
import { Providers } from './providers';
import App from '../src/App';

export const metadata = { title: 'Resume Generator', description: 'Create and share your resume' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
