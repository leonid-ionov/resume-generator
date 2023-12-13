import { TResumeData } from '../pages/ResumeReview/ResumePreview.tsx';
import { EmailIcon } from '../components/Icons/EmailIcon.tsx';
import { PhoneIcon } from '../components/Icons/PhoneIcon.tsx';

export const resumePreviewData: TResumeData = {
  userName: 'Blackbeard',
  desiredJob: 'Flight attendant',
  profile:
    'Ahoy, ye scallywags! I be Blackbeard, the most fearsome pirate to sail the Seven Seas. I like me rum, I loves me ship and I sails under no flag but me own! With me trusty sword and cunning mind, I seek to carve me name into the annals of pirate legend.',
  photoLink: './public/pirate.png',
  info: [
    { type: 'dayOfBirth', value: 'Somewhere in 1680' },
    { type: 'city', value: 'The High Seas' },
    { type: 'languages', value: 'Pirate Speak, English' },
  ],

  contacts: [
    { info: 'blackbeard@pirate.com', icon: <EmailIcon /> },
    { info: '+1 800 PIR-RATE', icon: <PhoneIcon /> },
  ],
  experience: [
    {
      positionName: 'Software Engineer',
      companyName: 'EPAM',
      workingPeriod: '02.2021-Current',
      description: 'In my current role, I develop and maintain two micro-frontends for a .NET application',
    },
    {
      positionName: 'Captain',
      companyName: "The Queen Anne's Revenge",
      workingPeriod: '1716 - 1718',
      description:
        'Commanding the most dread pirate ship ever, brought fear to hearts, and gold to me pockets! Led a fearsome crew, engaged in epic sea battles, and amassed a legendary treasure hoard. Known for strategic brilliance and ruthless tactics.',
    },
    {
      positionName: 'First Mate',
      companyName: 'The Jolly Roger',
      workingPeriod: '1660 - 1680',
      description:
        "Served under the infamous Captain Kidd, learning the ways of the pirate's life. Mastered the art of navigation and plundering.",
    },
  ],
  education: [
    {
      speciality: 'MASTER OF TECHNICAL PHYSICS',
      educationPeriod: '2008-2014',
      institution: 'SAINT-PETERSBURG STATE POLYTECHNICAL UNIVERSITY',
      description: 'PHYSICS OF SEM ICONDUCTORS NANOELECTRONICS',
    },
  ],
  skills: [
    { name: 'Swashbuckling', details: [{ level: '80%' }] },
    { name: 'Buccaneering', details: [{ level: '67%' }] },
    { name: 'Sea Shanties', details: [{ level: '85%' }] },
    { name: 'Treasure Hunting', details: [{ level: '95%' }] },
    { name: 'Sword Fighting', details: [{ level: '90%' }] },
    { name: 'Jolly Roger Hoisting', details: [{ level: '73%' }] },
  ],
  interests: [
    {
      name: 'some interest 1',
      icon: 'some icon',
    },
    {
      name: 'some interest 2',
      icon: <EmailIcon />,
    },
  ],
};
