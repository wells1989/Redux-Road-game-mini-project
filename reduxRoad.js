const initialWagonState = {
  days: 0,
  distance: 0,
  supplies: 100,
  cash: 200,
}

const reducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case 'gather': {
      return {
      ...state, 
      days: state.days + 1,
      supplies: state.supplies + 15
      };
    }

    case 'buy supplies': {
      if (state.cash - action.amount > 0) {
      return {
      ...state, 
      days: state.days + 1,
      supplies: state.supplies + (10 * action.amount),
      cash: state.cash - action.amount
      };
      } else {
        return "You do not have enough cash for this request!"
      }

    }

    case 'sell supplies': {
      if(state.supplies - action.amount > 0 ) {
      return {
      ...state, 
      days: state.days + 1,
      supplies: state.supplies - action.amount,
      cash: state.cash + (20 * action.amount)
      };
      } else {
        return "You do not have enough supplies!"
      }
    }

    case 'travel': {
      if(state.supplies - (20 * action.payload) > 0 ) {
        return {
        ...state, 
        days: state.days + action.payload,
        distance: state.distance + (10 * action.payload),
        supplies: state.supplies - (20 * action.payload) 
      };
      } else {
        return "not enough supplies, maybe try gathering resources!"
      }
      }

    case 'randomEvent1': {
      if (state.supplies - 30 > 0) {
        return ["your wagon tipped over", {
       ...state, 
        days: state.days + 1,
        supplies: state.supplies - 30,   
        }];
      } else {
        return "Your wagon tipped over, but your supplies are safe!"
      }
    }

    case 'randomEvent2': {
      if (state.supplies - action.amount > 0) {
       return ["Someone stole some of your supplies!", {
      ...state, 
      days: state.days + 1,
      supplies: state.supplies -action.amount
      }]; 
      } else {
        return "someone tried to steal your supplies but there wasn't enough for them to take...."
      }
      
    }

    case 'randomEvent3': {
      return ["You found some supplies!", {
      ...state, 
      days: state.days + 1,
      supplies: state.supplies + action.amount,
      }];
    }

    case 'randomEvent4': {
      return ["You found some cash!", {
      ...state, 
      days: state.days + 1,
      cash: state.cash + action.amount,
      }];
    }

    default: {
      return state;
    }
    }
  };

let  wagon = reducer(undefined, {});

console.log(wagon);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let random = randomInt(1, 4);

wagon = reducer(wagon, {
  type: `randomEvent${random}`,
  amount: randomInt(10, 100)
})

console.log(wagon);









