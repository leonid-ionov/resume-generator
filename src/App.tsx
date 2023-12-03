import './App.scss';
import { IResumePreviewProps, ResumePreview } from './pages/ResumeReview/ResumePreview.tsx';
import { EmailIcon } from './components/Icons/EmailIcon.tsx';
import { PhoneIcon } from './components/Icons/PhoneIcon.tsx';
import { GitHubIcon } from './components/Icons/GitHubIcon.tsx';
import { LinkedInIcon } from './components/Icons/LinkedInIcon.tsx';

function App() {
  const initialResume: IResumePreviewProps = {
    userInfo: {
      userName: 'Leonid Ionov',
      desiredJob: 'Software Engineer',
      photoLink: './public/pirate.png',
      profile:
        'I am deeply passionate about my work - I rejoice in every success in the project and use every opportunity for\n' +
        'professional growth. And I think that development is quite an exciting! Moreover, I have a great technical\n' +
        'background - 6 years of experience in the field of technical engineering, practical experience as a senior\n' +
        'engineer at a previous job. In addition, I am super-friendly, open-minded and optimistic. You will enjoy working\n' +
        'with me.',
    },
    contacts: [
      { info: 'CALL +995 591 17 80 45', icon: <PhoneIcon /> },
      { info: 'leonid8ionov@gmail.com', icon: <EmailIcon /> },
      { info: 'github.com/Neonrul', icon: <GitHubIcon /> },
      { info: 'linkedin.com /in/leonid-8-ionov', icon: <LinkedInIcon /> },
    ],
  };

  return (
    <section className="App">
      <ResumePreview {...initialResume} />
    </section>
  );
}

export default App;
