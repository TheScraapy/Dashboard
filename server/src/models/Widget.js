module.exports = (sequelize, DataTypes) => {
  const Widget = sequelize.define('Widget', {
    email: DataTypes.STRING,
    widget: DataTypes.STRING,
    data: DataTypes.STRING
  })
  
  return Widget
}