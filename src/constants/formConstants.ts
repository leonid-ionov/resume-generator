import { IFormData, IIconOption } from '../types/formTypes.ts';
import EmailIcon from '../assets/icons/email.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import GithubIcon from '../assets/icons/github.svg';
import InstagramIcon from '../assets/icons/instagram.svg';
import LinkedinIcon from '../assets/icons/linkedin.svg';
import WebsiteIcon from '../assets/icons/website.svg';
import FacebookIcon from '../assets/icons/facebook.svg';

const IconsOptions: IIconOption[] = [
  { label: 'Email', value: new URL(EmailIcon, import.meta.url).href },
  { label: 'Phone', value: new URL(PhoneIcon, import.meta.url).href },
  { label: 'GitHub', value: new URL(GithubIcon, import.meta.url).href },
  { label: 'Instagram', value: new URL(InstagramIcon, import.meta.url).href },
  { label: 'LinkedIn', value: new URL(LinkedinIcon, import.meta.url).href },
  { label: 'Web site', value: new URL(WebsiteIcon, import.meta.url).href },
  { label: 'Facebook', value: new URL(FacebookIcon, import.meta.url).href },
];

const initialFormData: IFormData = {
  userName: '',
  desiredJob: '',
  profile: '',
  photoLink: {},
  dayOfBirth: '',
  city: '',
  languages: '',
  contacts: [
    {
      icon: IconsOptions[0].value,
      info: '',
    },
    {
      icon: IconsOptions[1].value,
      info: '',
    },
  ],
  experience: [{ positionName: '', companyName: '', startDate: '', endDate: '', description: '' }],
  skills: [{ name: '', details: [{ level: '50%' }] }],
  education: [{ speciality: '', startDate: '', endDate: '', institution: '', description: '' }],
  interests: [{ name: '', icon: '' }],
};

const VALIDATION_STRING = 'Neonrul Resume Generator File' as const;
const BLANK_IMAGE = 'about:blank' as const;

export { initialFormData, IconsOptions, VALIDATION_STRING, BLANK_IMAGE };
