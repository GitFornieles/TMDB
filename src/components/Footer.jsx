import {FaLinkedinIn,FaGithub,FaIdBadge} from "react-icons/fa"
import {MdAlternateEmail} from "react-icons/md"

const Footer = () => {
  return (
    <footer>
      <div>
        <a class="navButton" href="https://github.com/GitFornieles">
        <FaGithub/>
        </a>
      </div>
      <div>
        <a class="navButton" href="https://www.linkedin.com/in/afornieles/">
        <FaLinkedinIn/>
        </a>
      </div>
      <div>
        <a class="navButton" href="https://www.linkedin.com/in/afornieles/">
            <FaIdBadge/>
        </a>
      </div>
      <div>
      <a class="navButton" href="mailto:alefornieles@hotmail.com">
            <MdAlternateEmail/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
