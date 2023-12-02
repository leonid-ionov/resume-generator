import './App.scss';
import { IResumePreviewProps, ResumePreview } from './pages/ResumeReview/ResumePreview.tsx';

function App() {
  const initialResume: IResumePreviewProps = {
    userInfo: {
      userName: 'Leonid Ionov',
      desiredJob: 'Software Engineer',
    },
  };

  return <ResumePreview {...initialResume} />;
}

export default App;
