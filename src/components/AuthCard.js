const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="subtitle">{subtitle}</p>
      {children}
    </div>
  );
};

export default AuthCard;