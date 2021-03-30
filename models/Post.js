const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

Post.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
	album_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
	photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

module.exports = Post;
