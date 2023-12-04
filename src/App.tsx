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
    experience: [
      {
        positionName: 'Software Engineer',
        companyName: 'EPAM',
        workingPeriod: '02.2021-Current',
        description:
          'In my current role, I develop and maintain two micro-frontends for a .NET application\n' +
          'using the React library - a scheduler and a assessment manager.\n' +
          'Here the most important achievements:\n' +
          '• Implement responsive and accessible the micro-frontend, allowing seamless\n' +
          'interaction and optimal user experience across different devices and accessibility\n' +
          'needs;\n' +
          '• Participated and assisted in the development of a Material UI based UI component library;\n' +
          '• Display practical knowledge in working with time zones;\n' +
          '• Practical experience in writing unit tests and E2E tests;\n' +
          '• Collaborate with a cross-functional team of designers, backend developers, and product\n' +
          'managers to understand requirements and implement features what align with project\n' +
          'goals.\n' +
          'In addition to the scheduler, I also implemented several small micro-frontends, as well as\n' +
          'worked on existing parts of the application:\n' +
          '• Hands-on expertise with legacy code (JavaScript ES5, jQuery, first Angular) and optimization\n' +
          'for different browsers and devices;\n' +
          '• Micro frontend development using web components, also responsive and accessible;\n' +
          '• Novice skills on Node.js.',
      },
    ],
  };

  return (
    <section className="App">
      <ResumePreview {...initialResume} />
    </section>
  );
}

export default App;
