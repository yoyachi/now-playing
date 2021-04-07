const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          "artist",
          "album_title",
          "genre",
          "year",
          "format",
          "photo_url",
          "description",
          "createdAt",
          "updatedAt",
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      });
    });
  }
}

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
