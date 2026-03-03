import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  const ano = new Date().getFullYear();
  const iconeGithub = <FontAwesomeIcon icon={faGithub} />;

  return (
    <footer>
      <p className='text'>Patterson, {ano}</p>
      <div className='icons'>
        <a
          href='https://github.com/pattersonrptr'
          target='_blank'
          rel='noopener noreferrer'
          title='Github'
          alt='Github'
        >
          {iconeGithub}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
