const Button = ({ children, classes, type }) => <button type={type} className={`bg-gradient-to-r from-[#6f134f] via-[#5e1544] to-[#34192b] text-white ${classes}`}>{children}</button>

export default Button