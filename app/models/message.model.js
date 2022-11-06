module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("messages", {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  return Message;
};