const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ message: 'Ви не авторизовані' });
      }
  
      const { role } = req.session.user;
  
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: 'У вас немає прав доступу' });
      }
  
      next();
    };
  };
  module.exports = function(role) {
    return (req, res, next) => {
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: 'У вас немає доступу до цієї функції' });
      }
      next();
    };
  };
  module.exports = checkRole;
  