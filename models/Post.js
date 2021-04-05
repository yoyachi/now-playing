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
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
	  photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
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
