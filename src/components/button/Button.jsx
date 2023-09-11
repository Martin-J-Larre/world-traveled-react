import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ onClick, children, type }) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.any,
};
