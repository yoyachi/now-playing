const session = require("express-session");


module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
          date
        ).getFullYear()}`;
      },
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
    
        return word;
    },
    trash_button: (loggedIn) => {
      if(loggedIn) {
        return `fas fa-trash`
      }
    }
}