const sessionAuth = (req, res, next) => {
    if (req.session && req.session.user) {
      next(); // Якщо сесія існує, переходимо далі
    } else {
      res.status(401).json({ message: 'Ви не авторизовані' });
    }
  };
  
  module.exports = sessionAuth;
  